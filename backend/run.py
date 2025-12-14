"""
Application entry point
Run this file to start the Flask server
"""
import sys
from app import create_app, db
from app.models import Store, Gift, Admin

app = create_app()


@app.cli.command()
def init_db():
    """Initialize the database"""
    with app.app_context():
        db.create_all()
        print("✅ Database initialized successfully!")


@app.cli.command()
def seed_db():
    """Seed database with sample data"""
    from app.seed_data import seed_all_data
    with app.app_context():
        seed_all_data()
        print("✅ Database seeded successfully!")


@app.cli.command()
def create_admin():
    """Create a new admin user"""
    with app.app_context():
        username = input("Enter username: ")
        password = input("Enter password: ")
        
        if Admin.query.filter_by(username=username).first():
            print(f"❌ Admin with username '{username}' already exists!")
            return
        
        admin = Admin(username=username)
        admin.set_password(password)
        db.session.add(admin)
        db.session.commit()
        
        print(f"✅ Admin '{username}' created successfully!")


if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == 'init-db':
            with app.app_context():
                db.create_all()
                print("✅ Database initialized!")
        elif sys.argv[1] == 'seed-db':
            from app.seed_data import seed_all_data
            with app.app_context():
                seed_all_data()
                print("✅ Database seeded!")
    else:
        # Run the application
        print("🚀 Starting Gift Finder Backend...")
        print("📍 Server running on: http://localhost:5000")
        print("📊 API Base URL: http://localhost:5000/api/v1")
        print("🔐 Admin Dashboard API: http://localhost:5000/api/v1/admin")
        print("\n⚠️  Default Admin Credentials:")
        print("   Username: admin")
        print("   Password: admin123")
        print("\n🛑 Press CTRL+C to stop\n")
        
        app.run(debug=True, host='0.0.0.0', port=5000)
