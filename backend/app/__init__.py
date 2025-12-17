from flask import Flask
from flask_cors import CORS
from .models import db, Admin
from .routes import api, admin_bp
from config import Config

def create_app(config_class=Config):
    """Create and configure Flask application"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    
    # Configure CORS
    # تم التعديل هنا للسماح للجميع (*)
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    # ملاحظة: إذا كنت تحتاج إلى cookies/credentials مع *، 
    # قد ترفض المتصفحات ذلك لأسباب أمنية.
    # في حال أردت تفعيلها للكل (غير مستحسن أمنياً) يمكنك استخدام:
    # CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True) 
    
    # Register blueprints
    app.register_blueprint(api, url_prefix='/api/v1')
    app.register_blueprint(admin_bp, url_prefix='/api/v1/admin')
    
    # Create tables and default admin
    with app.app_context():
        db.create_all()
        
        # Create default admin if not exists
        if not Admin.query.filter_by(username='admin').first():
            admin = Admin(username='admin')
            admin.set_password('admin123')  # Default password
            db.session.add(admin)
            db.session.commit()
            print("✅ Default admin created (username: admin, password: admin123)")
    
    return app
