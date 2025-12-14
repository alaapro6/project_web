"""
Database models for Gift Finder application
"""
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Store(db.Model):
    """Store model - represents gift stores"""
    __tablename__ = 'stores'
    
    id = db.Column(db.Integer, primary_key=True)
    name_ar = db.Column(db.String(200), nullable=False)
    name_en = db.Column(db.String(200), nullable=False)
    location_url = db.Column(db.String(500), nullable=False)
    description_ar = db.Column(db.Text)
    description_en = db.Column(db.Text)
    image_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    gifts = db.relationship('Gift', backref='store', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name_ar': self.name_ar,
            'name_en': self.name_en,
            'location_url': self.location_url,
            'description_ar': self.description_ar,
            'description_en': self.description_en,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Gift(db.Model):
    """Gift model - represents individual gifts"""
    __tablename__ = 'gifts'
    
    id = db.Column(db.Integer, primary_key=True)
    store_id = db.Column(db.Integer, db.ForeignKey('stores.id'), nullable=False)
    name_ar = db.Column(db.String(200), nullable=False)
    name_en = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    
    # Age range
    min_age = db.Column(db.Integer, nullable=False)
    max_age = db.Column(db.Integer, nullable=False)
    
    # Budget range
    min_budget = db.Column(db.Float, nullable=False)
    max_budget = db.Column(db.Float, nullable=False)
    
    # New fields for better matching
    gender = db.Column(db.String(20))  # male, female, unisex
    occasion = db.Column(db.String(100))  # birthday, graduation, wedding, etc.
    personality_type = db.Column(db.String(100))  # sporty, reader, tech-savvy, etc.
    
    # Interests (array of strings)
    interests = db.Column(db.JSON, nullable=False)
    
    # Media
    image_url = db.Column(db.String(500))
    
    # Descriptions
    description_ar = db.Column(db.Text)
    description_en = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'store_id': self.store_id,
            'name_ar': self.name_ar,
            'name_en': self.name_en,
            'category': self.category,
            'min_age': self.min_age,
            'max_age': self.max_age,
            'min_budget': self.min_budget,
            'max_budget': self.max_budget,
            'gender': self.gender,
            'occasion': self.occasion,
            'personality_type': self.personality_type,
            'interests': self.interests,
            'image_url': self.image_url,
            'description_ar': self.description_ar,
            'description_en': self.description_en,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'store': self.store.to_dict() if self.store else None
        }


class Recommendation(db.Model):
    """Recommendation history model"""
    __tablename__ = 'recommendations'
    
    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.Integer, nullable=False)
    budget = db.Column(db.Float, nullable=False)
    gender = db.Column(db.String(20))
    occasion = db.Column(db.String(100))
    personality_type = db.Column(db.String(100))
    relationship = db.Column(db.String(100))
    interests = db.Column(db.JSON, nullable=False)
    results_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'age': self.age,
            'budget': self.budget,
            'gender': self.gender,
            'occasion': self.occasion,
            'personality_type': self.personality_type,
            'relationship': self.relationship,
            'interests': self.interests,
            'results_count': self.results_count,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Admin(db.Model):
    """Admin user model for dashboard access"""
    __tablename__ = 'admins'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
