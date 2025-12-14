"""
API Routes for Gift Finder
Includes public routes and admin routes
"""
from flask import Blueprint, request, jsonify, session
from functools import wraps
from .models import db, Store, Gift, Recommendation, Admin
from .recommendation import get_recommendations
from sqlalchemy import func

# Create blueprints
api = Blueprint('api', __name__)
admin_bp = Blueprint('admin', __name__, url_prefix='/admin')


# ============= Authentication Decorator =============
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'admin_id' not in session:
            return jsonify({'error': 'Authentication required'}), 401
        return f(*args, **kwargs)
    return decorated_function


# ============= PUBLIC API ROUTES =============

@api.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Gift Finder API is running'})


@api.route('/stores', methods=['GET'])
def get_stores():
    """Get all stores"""
    stores = Store.query.all()
    return jsonify([store.to_dict() for store in stores])


@api.route('/stores/<int:store_id>', methods=['GET'])
def get_store(store_id):
    """Get single store by ID"""
    store = Store.query.get_or_404(store_id)
    return jsonify(store.to_dict())


@api.route('/gifts', methods=['GET'])
def get_gifts():
    """Get all gifts with optional filters"""
    category = request.args.get('category')
    min_budget = request.args.get('min_budget', type=float)
    max_budget = request.args.get('max_budget', type=float)
    
    query = Gift.query
    
    if category:
        query = query.filter(Gift.category == category)
    if min_budget:
        query = query.filter(Gift.max_budget >= min_budget)
    if max_budget:
        query = query.filter(Gift.min_budget <= max_budget)
    
    gifts = query.all()
    return jsonify([gift.to_dict() for gift in gifts])


@api.route('/gifts/<int:gift_id>', methods=['GET'])
def get_gift(gift_id):
    """Get single gift by ID"""
    gift = Gift.query.get_or_404(gift_id)
    return jsonify(gift.to_dict())


@api.route('/gifts/recommend', methods=['POST'])
def recommend_gifts():
    """Get gift recommendations based on criteria"""
    data = request.get_json()
    
    # Validate required fields
    if not data.get('age') or not data.get('budget'):
        return jsonify({'error': 'Age and budget are required'}), 400
    
    # Extract criteria
    criteria = {
        'age': data.get('age'),
        'budget': data.get('budget'),
        'interests': data.get('interests', []),
        'gender': data.get('gender'),
        'occasion': data.get('occasion'),
        'personality_type': data.get('personality_type'),
        'relationship': data.get('relationship')
    }
    
    # Get all gifts
    gifts = Gift.query.all()
    
    # Get recommendations
    recommendations = get_recommendations(gifts, criteria)
    
    # Save search history
    history = Recommendation(
        age=criteria['age'],
        budget=criteria['budget'],
        gender=criteria.get('gender'),
        occasion=criteria.get('occasion'),
        personality_type=criteria.get('personality_type'),
        relationship=criteria.get('relationship'),
        interests=criteria['interests'],
        results_count=len(recommendations)
    )
    db.session.add(history)
    db.session.commit()
    
    return jsonify(recommendations)


@api.route('/interests', methods=['GET'])
def get_interests():
    """Get all available interests"""
    interests = [
        'gaming', 'sports', 'reading', 'music', 'technology',
        'fashion', 'cooking', 'travel', 'art', 'fitness',
        'photography', 'movies', 'nature', 'beauty', 'home',
        'education', 'business', 'crafts', 'collectibles'
    ]
    return jsonify(interests)


@api.route('/categories', methods=['GET'])
def get_categories():
    """Get all gift categories"""
    categories = db.session.query(Gift.category).distinct().all()
    return jsonify([cat[0] for cat in categories])


# ============= ADMIN AUTHENTICATION ROUTES =============

@admin_bp.route('/login', methods=['POST'])
def admin_login():
    """Admin login"""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400
    
    admin = Admin.query.filter_by(username=username).first()
    
    if admin and admin.check_password(password):
        session['admin_id'] = admin.id
        session['admin_username'] = admin.username
        return jsonify({
            'message': 'Login successful',
            'admin': admin.to_dict()
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401


@admin_bp.route('/logout', methods=['POST'])
def admin_logout():
    """Admin logout"""
    session.pop('admin_id', None)
    session.pop('admin_username', None)
    return jsonify({'message': 'Logout successful'})


@admin_bp.route('/check', methods=['GET'])
def check_admin():
    """Check if admin is logged in"""
    if 'admin_id' in session:
        admin = Admin.query.get(session['admin_id'])
        return jsonify({'authenticated': True, 'admin': admin.to_dict()})
    return jsonify({'authenticated': False}), 401


# ============= ADMIN DASHBOARD ROUTES =============

@admin_bp.route('/stats', methods=['GET'])
@admin_required
def get_stats():
    """Get dashboard statistics"""
    total_stores = Store.query.count()
    total_gifts = Gift.query.count()
    total_searches = Recommendation.query.count()
    
    # Recent searches
    recent_searches = Recommendation.query.order_by(
        Recommendation.created_at.desc()
    ).limit(10).all()
    
    # Popular interests
    popular_interests = db.session.query(
        func.count(Recommendation.id).label('count')
    ).group_by(Recommendation.interests).all()
    
    # Category distribution
    category_stats = db.session.query(
        Gift.category,
        func.count(Gift.id).label('count')
    ).group_by(Gift.category).all()
    
    return jsonify({
        'total_stores': total_stores,
        'total_gifts': total_gifts,
        'total_searches': total_searches,
        'recent_searches': [s.to_dict() for s in recent_searches],
        'category_stats': [{'category': c[0], 'count': c[1]} for c in category_stats]
    })


# ============= ADMIN STORES MANAGEMENT =============

@admin_bp.route('/stores', methods=['GET'])
@admin_required
def admin_get_stores():
    """Get all stores (admin)"""
    stores = Store.query.all()
    return jsonify([store.to_dict() for store in stores])


@admin_bp.route('/stores', methods=['POST'])
@admin_required
def admin_create_store():
    """Create new store"""
    data = request.get_json()
    
    store = Store(
        name_ar=data['name_ar'],
        name_en=data['name_en'],
        location_url=data['location_url'],
        description_ar=data.get('description_ar'),
        description_en=data.get('description_en'),
        image_url=data.get('image_url')
    )
    
    db.session.add(store)
    db.session.commit()
    
    return jsonify(store.to_dict()), 201


@admin_bp.route('/stores/<int:store_id>', methods=['PUT'])
@admin_required
def admin_update_store(store_id):
    """Update store"""
    store = Store.query.get_or_404(store_id)
    data = request.get_json()
    
    store.name_ar = data.get('name_ar', store.name_ar)
    store.name_en = data.get('name_en', store.name_en)
    store.location_url = data.get('location_url', store.location_url)
    store.description_ar = data.get('description_ar', store.description_ar)
    store.description_en = data.get('description_en', store.description_en)
    store.image_url = data.get('image_url', store.image_url)
    
    db.session.commit()
    
    return jsonify(store.to_dict())


@admin_bp.route('/stores/<int:store_id>', methods=['DELETE'])
@admin_required
def admin_delete_store(store_id):
    """Delete store"""
    store = Store.query.get_or_404(store_id)
    db.session.delete(store)
    db.session.commit()
    
    return jsonify({'message': 'Store deleted successfully'})


# ============= ADMIN GIFTS MANAGEMENT =============

@admin_bp.route('/gifts', methods=['GET'])
@admin_required
def admin_get_gifts():
    """Get all gifts (admin)"""
    gifts = Gift.query.all()
    return jsonify([gift.to_dict() for gift in gifts])


@admin_bp.route('/gifts', methods=['POST'])
@admin_required
def admin_create_gift():
    """Create new gift"""
    data = request.get_json()
    
    gift = Gift(
        store_id=data['store_id'],
        name_ar=data['name_ar'],
        name_en=data['name_en'],
        category=data['category'],
        min_age=data['min_age'],
        max_age=data['max_age'],
        min_budget=data['min_budget'],
        max_budget=data['max_budget'],
        gender=data.get('gender'),
        occasion=data.get('occasion'),
        personality_type=data.get('personality_type'),
        interests=data.get('interests', []),
        image_url=data.get('image_url'),
        description_ar=data.get('description_ar'),
        description_en=data.get('description_en')
    )
    
    db.session.add(gift)
    db.session.commit()
    
    return jsonify(gift.to_dict()), 201


@admin_bp.route('/gifts/<int:gift_id>', methods=['PUT'])
@admin_required
def admin_update_gift(gift_id):
    """Update gift"""
    gift = Gift.query.get_or_404(gift_id)
    data = request.get_json()
    
    # Update fields
    for field in ['store_id', 'name_ar', 'name_en', 'category', 'min_age', 'max_age',
                  'min_budget', 'max_budget', 'gender', 'occasion', 'personality_type',
                  'interests', 'image_url', 'description_ar', 'description_en']:
        if field in data:
            setattr(gift, field, data[field])
    
    db.session.commit()
    
    return jsonify(gift.to_dict())


@admin_bp.route('/gifts/<int:gift_id>', methods=['DELETE'])
@admin_required
def admin_delete_gift(gift_id):
    """Delete gift"""
    gift = Gift.query.get_or_404(gift_id)
    db.session.delete(gift)
    db.session.commit()
    
    return jsonify({'message': 'Gift deleted successfully'})
