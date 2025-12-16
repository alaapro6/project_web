"""
API Routes for Gift Finder
Public & Admin routes (JWT Authentication)
"""

from flask import Blueprint, request, jsonify
from functools import wraps
from sqlalchemy import func
import jwt
import os

from .models import db, Store, Gift, Recommendation, Admin
from .recommendation import get_recommendations

# ================== CONFIG ==================
JWT_SECRET = os.getenv("JWT_SECRET", "super-secret-key")
JWT_ALGORITHM = "HS256"

# ================== BLUEPRINTS ==================
api = Blueprint("api", __name__)
admin_bp = Blueprint("admin", __name__)

# ================== AUTH DECORATOR ==================
def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Authorization header missing"}), 401

        try:
            token = auth_header.split(" ")[1]
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])

            if payload.get("role") != "admin":
                return jsonify({"error": "Unauthorized"}), 401

        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)
    return decorated

# ================== PUBLIC ROUTES ==================
@api.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "Gift Finder API is running"})

@api.route("/stores", methods=["GET"])
def get_stores():
    return jsonify([s.to_dict() for s in Store.query.all()])

@api.route("/stores/<int:store_id>", methods=["GET"])
def get_store(store_id):
    store = Store.query.get_or_404(store_id)
    return jsonify(store.to_dict())

@api.route("/gifts", methods=["GET"])
def get_gifts():
    category = request.args.get("category")
    min_budget = request.args.get("min_budget", type=float)
    max_budget = request.args.get("max_budget", type=float)

    query = Gift.query
    if category:
        query = query.filter(Gift.category == category)
    if min_budget:
        query = query.filter(Gift.max_budget >= min_budget)
    if max_budget:
        query = query.filter(Gift.min_budget <= max_budget)

    return jsonify([g.to_dict() for g in query.all()])

@api.route("/gifts/<int:gift_id>", methods=["GET"])
def get_gift(gift_id):
    gift = Gift.query.get_or_404(gift_id)
    return jsonify(gift.to_dict())

@api.route("/gifts/recommend", methods=["POST"])
def recommend_gifts():
    data = request.get_json()

    if not data.get("age") or not data.get("budget"):
        return jsonify({"error": "Age and budget required"}), 400

    criteria = {
        "age": data["age"],
        "budget": data["budget"],
        "interests": data.get("interests", []),
        "gender": data.get("gender"),
        "occasion": data.get("occasion"),
        "personality_type": data.get("personality_type"),
        "relationship": data.get("relationship"),
    }

    gifts = Gift.query.all()
    recommendations = get_recommendations(gifts, criteria)

    history = Recommendation(
        age=criteria["age"],
        budget=criteria["budget"],
        gender=criteria.get("gender"),
        occasion=criteria.get("occasion"),
        personality_type=criteria.get("personality_type"),
        relationship=criteria.get("relationship"),
        interests=criteria["interests"],
        results_count=len(recommendations),
    )

    db.session.add(history)
    db.session.commit()

    return jsonify(recommendations)

@api.route("/interests", methods=["GET"])
def get_interests():
    return jsonify([
        "gaming", "sports", "reading", "music", "technology",
        "fashion", "cooking", "travel", "art", "fitness"
    ])

@api.route("/categories", methods=["GET"])
def get_categories():
    categories = db.session.query(Gift.category).distinct().all()
    return jsonify([c[0] for c in categories])

# ================== ADMIN AUTH ==================
@admin_bp.route("/login", methods=["POST"])
def admin_login():
    data = request.get_json()

    admin = Admin.query.filter_by(username=data.get("username")).first()
    if not admin or not admin.check_password(data.get("password")):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode(
        {"role": "admin", "admin_id": admin.id},
        JWT_SECRET,
        algorithm=JWT_ALGORITHM,
    )

    if isinstance(token, bytes):
        token = token.decode("utf-8")

    return jsonify({"token": token})

# ================== ADMIN DASHBOARD ==================
@admin_bp.route("/stats", methods=["GET"])
@admin_required
def admin_stats():
    return jsonify({
        "total_stores": Store.query.count(),
        "total_gifts": Gift.query.count(),
        "total_searches": Recommendation.query.count(),
        "category_stats": [
            {"category": c, "count": n}
            for c, n in db.session.query(
                Gift.category, func.count(Gift.id)
            ).group_by(Gift.category).all()
        ]
    })

# ================== ADMIN STORES ==================
@admin_bp.route("/stores", methods=["GET"])
@admin_required
def admin_get_stores():
    return jsonify([s.to_dict() for s in Store.query.all()])

@admin_bp.route("/stores", methods=["POST"])
@admin_required
def admin_create_store():
    store = Store(**request.get_json())
    db.session.add(store)
    db.session.commit()
    return jsonify(store.to_dict()), 201

@admin_bp.route("/stores/<int:store_id>", methods=["PUT"])
@admin_required
def admin_update_store(store_id):
    store = Store.query.get_or_404(store_id)
    for k, v in request.get_json().items():
        setattr(store, k, v)
    db.session.commit()
    return jsonify(store.to_dict())

@admin_bp.route("/stores/<int:store_id>", methods=["DELETE"])
@admin_required
def admin_delete_store(store_id):
    store = Store.query.get_or_404(store_id)
    db.session.delete(store)
    db.session.commit()
    return jsonify({"message": "Store deleted"})

# ================== ADMIN GIFTS ==================
@admin_bp.route("/gifts", methods=["GET"])
@admin_required
def admin_get_gifts():
    return jsonify([g.to_dict() for g in Gift.query.all()])

@admin_bp.route("/gifts", methods=["POST"])
@admin_required
def admin_create_gift():
    gift = Gift(**request.get_json())
    db.session.add(gift)
    db.session.commit()
    return jsonify(gift.to_dict()), 201

@admin_bp.route("/gifts/<int:gift_id>", methods=["PUT"])
@admin_required
def admin_update_gift(gift_id):
    gift = Gift.query.get_or_404(gift_id)
    for k, v in request.get_json().items():
        setattr(gift, k, v)
    db.session.commit()
    return jsonify(gift.to_dict())

@admin_bp.route("/gifts/<int:gift_id>", methods=["DELETE"])
@admin_required
def admin_delete_gift(gift_id):
    gift = Gift.query.get_or_404(gift_id)
    db.session.delete(gift)
    db.session.commit()
    return jsonify({"message": "Gift deleted"})
