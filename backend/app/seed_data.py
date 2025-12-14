"""
Seed database with initial data
Enhanced with new fields: gender, occasion, personality_type
"""
from .models import db, Store, Gift


def seed_stores():
    """Seed stores data"""
    stores_data = [
        {
            'name_ar': 'متجر 974',
            'name_en': '974 Store',
            'location_url': 'https://maps.app.goo.gl/sD8QwHSGtRFor9R17',
            'description_ar': 'متجر متخصص في الألعاب والإكسسوارات الإلكترونية',
            'description_en': 'Gaming and electronics accessories store',
            'image_url': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800'
        },
        {
            'name_ar': 'ماركس آند سبنسر',
            'name_en': 'Marks & Spencer',
            'location_url': 'https://maps.app.goo.gl/sD8QwHSGtRFor9R17',
            'description_ar': 'متجر للملابس والهدايا الراقية',
            'description_en': 'Fashion and premium gifts store',
            'image_url': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'
        },
        {
            'name_ar': 'سبورتس كورنر',
            'name_en': 'Sports Corner',
            'location_url': 'https://maps.app.goo.gl/KhaZLQV7B9BrkHHQ8',
            'description_ar': 'متجر متخصص في المعدات الرياضية',
            'description_en': 'Sports equipment and apparel store',
            'image_url': 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800'
        },
        {
            'name_ar': 'جيكاي',
            'name_en': 'Geekay',
            'location_url': 'https://maps.app.goo.gl/kmx8kfqGizidxV8W6',
            'description_ar': 'متجر ألعاب الفيديو والمحتوى الرقمي',
            'description_en': 'Video games and digital content store',
            'image_url': 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800'
        },
        {
            'name_ar': 'هوم سنتر',
            'name_en': 'Home Centre',
            'location_url': 'https://maps.app.goo.gl/2i1vq2Nkb5Z73R9Q8',
            'description_ar': 'متجر الديكور والأثاث المنزلي',
            'description_en': 'Home decor and furniture store',
            'image_url': 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800'
        },
        {
            'name_ar': 'فيرتشوسيتي',
            'name_en': 'Virtuocity',
            'location_url': 'https://maps.app.goo.gl/oqnSQBTWjdpwM2Ga8',
            'description_ar': 'مركز ألعاب وتجارب الواقع الافتراضي',
            'description_en': 'Gaming and VR experience center',
            'image_url': 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800'
        },
        {
            'name_ar': 'فيرجن ميغاستور',
            'name_en': 'Virgin Megastore',
            'location_url': 'https://maps.app.goo.gl/MvcS7oFRaqZ3wbcQA',
            'description_ar': 'متجر متعدد الأقسام للترفيه والتكنولوجيا',
            'description_en': 'Entertainment and technology megastore',
            'image_url': 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800'
        }
    ]
    
    for store_data in stores_data:
        if not Store.query.filter_by(name_en=store_data['name_en']).first():
            store = Store(**store_data)
            db.session.add(store)
    
    db.session.commit()
    print(f"✅ Seeded {len(stores_data)} stores")


def seed_gifts():
    """Seed gifts data with enhanced fields"""
    
    # Get store references
    store_974 = Store.query.filter_by(name_en='974 Store').first()
    store_ms = Store.query.filter_by(name_en='Marks & Spencer').first()
    store_sports = Store.query.filter_by(name_en='Sports Corner').first()
    store_geekay = Store.query.filter_by(name_en='Geekay').first()
    store_home = Store.query.filter_by(name_en='Home Centre').first()
    store_virtuo = Store.query.filter_by(name_en='Virtuocity').first()
    store_virgin = Store.query.filter_by(name_en='Virgin Megastore').first()
    
    gifts_data = [
        # 974 Store
        {
            'store': store_974,
            'name_ar': 'بطاقة هدية منصة ألعاب',
            'name_en': 'Gaming Platform Gift Card',
            'category': 'gaming',
            'min_age': 13, 'max_age': 25,
            'min_budget': 20, 'max_budget': 100,
            'gender': 'unisex',
            'occasion': 'birthday',
            'personality_type': 'gamer',
            'interests': ['gaming', 'technology'],
            'description_ar': 'بطاقة هدية Steam Wallet أو منصات الألعاب',
            'description_en': 'Steam Wallet or gaming platform gift card',
            'image_url': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500'
        },
        {
            'store': store_974,
            'name_ar': 'سماعة ألعاب احترافية',
            'name_en': 'Professional Gaming Headset',
            'category': 'gaming',
            'min_age': 13, 'max_age': 30,
            'min_budget': 50, 'max_budget': 200,
            'gender': 'unisex',
            'occasion': 'any',
            'personality_type': 'gamer',
            'interests': ['gaming', 'music', 'technology'],
            'description_ar': 'سماعة ألعاب عالية الجودة مع ميكروفون',
            'description_en': 'High-quality gaming headset with microphone',
            'image_url': 'https://images.unsplash.com/photo-1599669454699-248893623440?w=500'
        },
        {
            'store': store_974,
            'name_ar': 'كرسي ألعاب مريح',
            'name_en': 'Ergonomic Gaming Chair',
            'category': 'gaming',
            'min_age': 15, 'max_age': 35,
            'min_budget': 150, 'max_budget': 500,
            'gender': 'unisex',
            'occasion': 'graduation',
            'personality_type': 'gamer',
            'interests': ['gaming', 'comfort'],
            'description_ar': 'كرسي ألعاب مريح ومخصص للجلسات الطويلة',
            'description_en': 'Comfortable gaming chair for long sessions',
            'image_url': 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500'
        },
        
        # Marks & Spencer
        {
            'store': store_ms,
            'name_ar': 'مجموعة عناية وتجميل',
            'name_en': 'Beauty Care Set',
            'category': 'beauty',
            'min_age': 15, 'max_age': 35,
            'min_budget': 30, 'max_budget': 100,
            'gender': 'female',
            'occasion': 'birthday',
            'personality_type': 'fashionista',
            'interests': ['beauty', 'fashion', 'self-care'],
            'description_ar': 'مجموعة عناية بالجسم والتجميل الفاخرة',
            'description_en': 'Luxury body care and beauty set',
            'image_url': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500'
        },
        {
            'store': store_ms,
            'name_ar': 'هودي عصري فاخر',
            'name_en': 'Premium Trendy Hoodie',
            'category': 'fashion',
            'min_age': 13, 'max_age': 30,
            'min_budget': 40, 'max_budget': 120,
            'gender': 'unisex',
            'occasion': 'any',
            'personality_type': 'fashionista',
            'interests': ['fashion', 'style'],
            'description_ar': 'هودي أنيق وعصري بجودة عالية',
            'description_en': 'Stylish trendy hoodie with premium quality',
            'image_url': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500'
        },
        {
            'store': store_ms,
            'name_ar': 'إكسسوارات موضة راقية',
            'name_en': 'Elegant Fashion Accessories',
            'category': 'fashion',
            'min_age': 18, 'max_age': 40,
            'min_budget': 25, 'max_budget': 80,
            'gender': 'female',
            'occasion': 'wedding',
            'personality_type': 'fashionista',
            'interests': ['fashion', 'style'],
            'description_ar': 'حقيبة صغيرة أو محفظة أنيقة',
            'description_en': 'Small elegant handbag or wallet',
            'image_url': 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500'
        },
        
        # Sports Corner
        {
            'store': store_sports,
            'name_ar': 'حذاء رياضي احترافي',
            'name_en': 'Professional Sports Shoes',
            'category': 'sports',
            'min_age': 13, 'max_age': 30,
            'min_budget': 50, 'max_budget': 200,
            'gender': 'unisex',
            'occasion': 'any',
            'personality_type': 'athlete',
            'interests': ['sports', 'fitness', 'running'],
            'description_ar': 'حذاء رياضي احترافي للركض والتمارين',
            'description_en': 'Professional running and training shoes',
            'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
        },
        {
            'store': store_sports,
            'name_ar': 'كرة رياضية',
            'name_en': 'Sports Ball',
            'category': 'sports',
            'min_age': 10, 'max_age': 30,
            'min_budget': 15, 'max_budget': 60,
            'gender': 'unisex',
            'occasion': 'birthday',
            'personality_type': 'athlete',
            'interests': ['sports', 'football', 'basketball'],
            'description_ar': 'كرة قدم أو سلة احترافية',
            'description_en': 'Professional football or basketball',
            'image_url': 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500'
        },
        {
            'store': store_sports,
            'name_ar': 'حقيبة رياضية عملية',
            'name_en': 'Functional Gym Bag',
            'category': 'sports',
            'min_age': 15, 'max_age': 35,
            'min_budget': 30, 'max_budget': 100,
            'gender': 'unisex',
            'occasion': 'any',
            'personality_type': 'athlete',
            'interests': ['sports', 'fitness', 'gym'],
            'description_ar': 'حقيبة رياضية واسعة للتمارين',
            'description_en': 'Spacious gym bag for workouts',
            'image_url': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
        },
        
        # Geekay
        {
            'store': store_geekay,
            'name_ar': 'بطاقة محتوى رقمي',
            'name_en': 'Digital Content Card',
            'category': 'gaming',
            'min_age': 13, 'max_age': 30,
            'min_budget': 20, 'max_budget': 100,
            'gender': 'unisex',
            'occasion': 'birthday',
            'personality_type': 'gamer',
            'interests': ['gaming', 'technology'],
            'description_ar': 'بطاقة PSN، Xbox، Steam للمحتوى الرقمي',
            'description_en': 'PSN, Xbox, Steam digital content card',
            'image_url': 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500'
        },
        {
            'store': store_geekay,
            'name_ar': 'لعبة فيديو شهيرة',
            'name_en': 'Popular Video Game',
            'category': 'gaming',
            'min_age': 13, 'max_age': 25,
            'min_budget': 40, 'max_budget': 80,
            'gender': 'unisex',
            'occasion': 'birthday',
            'personality_type': 'gamer',
            'interests': ['gaming'],
            'description_ar': 'أحدث ألعاب الفيديو الشهيرة',
            'description_en': 'Latest popular video games',
            'image_url': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500'
        },
        {
            'store': store_geekay,
            'name_ar': 'مجسم شخصية أنمي',
            'name_en': 'Anime Character Figurine',
            'category': 'collectibles',
            'min_age': 13, 'max_age': 30,
            'min_budget': 20, 'max_budget': 80,
            'gender': 'unisex',
            'occasion': 'any',
            'personality_type': 'collector',
            'interests': ['gaming', 'anime', 'collectibles'],
            'description_ar': 'مجسم احترافي لشخصيات الأنمي والألعاب',
            'description_en': 'Professional anime and game character figurine',
            'image_url': 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=500'
        },
        
        # Home Centre
        {
            'store': store_home,
            'name_ar': 'ديكور غرفة عصري',
            'name_en': 'Modern Room Decor',
            'category': 'home',
            'min_age': 15, 'max_age': 35,
            'min_budget': 25, 'max_budget': 100,
            'gender': 'unisex',
            'occasion': 'housewarming',
            'personality_type': 'creative',
            'interests': ['home', 'decoration'],
            'description_ar': 'وسادة مزخرفة أو إضاءة ليلية عصرية',
            'description_en': 'Decorative cushion or modern night light',
            'image_url': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500'
        },
        {
            'store': store_home,
            'name_ar': 'حامل هاتف ولابتوب',
            'name_en': 'Phone & Laptop Stand',
            'category': 'technology',
            'min_age': 15, 'max_age': 35,
            'min_budget': 15, 'max_budget': 50,
            'gender': 'unisex',
            'occasion': 'any',
            'personality_type': 'professional',
            'interests': ['technology', 'work'],
            'description_ar': 'حامل عصري ومريح للأجهزة',
            'description_en': 'Modern ergonomic device stand',
            'image_url': 'https://images.unsplash.com/photo-1586210579191-33b45e38fa8c?w=500'
        },
        {
            'store': store_home,
            'name_ar': 'أدوات مكتبية فاخرة',
            'name_en': 'Premium Stationery Set',
            'category': 'study',
            'min_age': 13, 'max_age': 25,
            'min_budget': 20, 'max_budget': 70,
            'gender': 'unisex',
            'occasion': 'graduation',
            'personality_type': 'student',
            'interests': ['study', 'writing', 'organization'],
            'description_ar': 'مجموعة دفاتر وأدوات مكتبية راقية',
            'description_en': 'Premium notebooks and desk accessories set',
            'image_url': 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=500'
        },
        
        # Virtuocity
        {
            'store': store_virtuo,
            'name_ar': 'تذكرة تجربة VR',
            'name_en': 'VR Experience Ticket',
            'category': 'experience',
            'min_age': 13, 'max_age': 40,
            'min_budget': 30, 'max_budget': 100,
            'gender': 'unisex',
            'occasion': 'birthday',
            'personality_type': 'adventurer',
            'interests': ['gaming', 'technology', 'experience'],
            'description_ar': 'تذكرة لتجربة الواقع الافتراضي المثيرة',
            'description_en': 'Exciting virtual reality experience ticket',
            'image_url': 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500'
        },
        {
            'store': store_virtuo,
            'name_ar': 'كرسي ألعاب احترافي',
            'name_en': 'Pro Gaming Chair',
            'category': 'gaming',
            'min_age': 15, 'max_age': 35,
            'min_budget': 150, 'max_budget': 500,
            'gender': 'unisex',
            'occasion': 'any',
            'personality_type': 'gamer',
            'interests': ['gaming', 'comfort'],
            'description_ar': 'كرسي ألعاب احترافي فائق الراحة',
            'description_en': 'Ultra-comfortable professional gaming chair',
            'image_url': 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500'
        },
        
        # Virgin Megastore
        {
            'store': store_virgin,
            'name_ar': 'سماعة بلوتوث فاخرة',
            'name_en': 'Premium Bluetooth Headphones',
            'category': 'technology',
            'min_age': 15, 'max_age': 40,
            'min_budget': 40, 'max_budget': 200,
            'gender': 'unisex',
            'occasion': 'any',
            'personality_type': 'music-lover',
            'interests': ['music', 'technology'],
            'description_ar': 'سماعة بلوتوث عالية الجودة',
            'description_en': 'High-quality Bluetooth headphones',
            'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
        },
        {
            'store': store_virgin,
            'name_ar': 'كتاب أو رواية ملهمة',
            'name_en': 'Inspiring Book or Novel',
            'category': 'reading',
            'min_age': 13, 'max_age': 35,
            'min_budget': 10, 'max_budget': 40,
            'gender': 'unisex',
            'occasion': 'graduation',
            'personality_type': 'reader',
            'interests': ['reading', 'books'],
            'description_ar': 'كتب ملهمة للمراهقين والشباب',
            'description_en': 'Inspiring books for teens and young adults',
            'image_url': 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500'
        },
        {
            'store': store_virgin,
            'name_ar': 'ألعاب ذهنية وألغاز',
            'name_en': 'Brain Games & Puzzles',
            'category': 'entertainment',
            'min_age': 10, 'max_age': 30,
            'min_budget': 15, 'max_budget': 60,
            'gender': 'unisex',
            'occasion': 'any',
            'personality_type': 'thinker',
            'interests': ['puzzles', 'games', 'thinking'],
            'description_ar': 'ألعاب كلمات وألغاز ذهنية مسلية',
            'description_en': 'Fun word games and brain puzzles',
            'image_url': 'https://images.unsplash.com/photo-1566694271453-390536dd1f0d?w=500'
        }
    ]
    
    for gift_data in gifts_data:
        store = gift_data.pop('store')
        if store and not Gift.query.filter_by(
            name_en=gift_data['name_en'],
            store_id=store.id
        ).first():
            gift = Gift(store_id=store.id, **gift_data)
            db.session.add(gift)
    
    db.session.commit()
    print(f"✅ Seeded {len(gifts_data)} gifts")


def seed_all_data():
    """Seed all data"""
    seed_stores()
    seed_gifts()
    print("✅ All data seeded successfully!")
