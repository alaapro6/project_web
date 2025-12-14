import React, { useEffect, useState } from 'react';
import { Sparkles, Loader2, DollarSign, Calendar, MapPin, Search } from 'lucide-react';

// =================================================================================
// 1. MOCK DEPENDENCIES (Mocks for API and Child Components)
// =================================================================================

// 1.1. MOCK: Gift Type Definition
/**
 * @typedef {object} Gift
 * @property {string} id
 * @property {string} name_ar
 * @property {string} description_ar
 * @property {number} min_budget
 * @property {number} max_budget
 * @property {number} min_age
 * @property {number} max_age
 * @property {string} category
 * @property {object} store
 * @property {string} store.name_ar
 * @property {string} store.location_url
 * @property {string} image_url
 */

// 1.2. MOCK: Data
const mockGiftsData = [
    { id: '1', name_ar: 'سماعات بلوتوث متوهجة', description_ar: 'مثالية لمحبي الموسيقى والتقنية.', min_budget: 150, max_budget: 300, min_age: 18, max_age: 45, category: 'تقنية', store: { name_ar: 'متجر التقنية', location_url: '#' }, image_url: 'https://placehold.co/600x400/22d3ee/ffffff?text=Tech+Gift' },
    { id: '2', name_ar: 'كاميرا فورية كلاسيكية', description_ar: 'هدية رائعة للمبدعين وهواة التصوير.', min_budget: 80, max_budget: 120, min_age: 16, max_age: 35, category: 'فنون وهوايات', store: { name_ar: 'متجر الفنون', location_url: '#' }, image_url: 'https://placehold.co/600x400/f472b6/ffffff?text=Creative+Gift' },
    { id: '3', name_ar: 'جهاز مساج محمول فاخر', description_ar: 'للاسترخاء بعد يوم طويل ومجهد.', min_budget: 50, max_budget: 100, min_age: 25, max_age: 60, category: 'صحة وعافية', store: { name_ar: 'مستلزمات الصحة', location_url: '#' }, image_url: 'https://placehold.co/600x400/a855f7/ffffff?text=Fitness+Gift' },
    { id: '4', name_ar: 'كتاب إلكتروني جديد', description_ar: 'مناسب لمحبي القراءة والمعرفة.', min_budget: 30, max_budget: 60, min_age: 15, max_age: 70, category: 'تعليم وثقافة', store: { name_ar: 'مكتبة القارئ', location_url: '#' }, image_url: 'https://placehold.co/600x400/374151/ffffff?text=Book+Gift' },
    { id: '5', name_ar: 'اشتراك سنوي في نادي رياضي', description_ar: 'لمن يهتم باللياقة البدنية والرياضة.', min_budget: 200, max_budget: 500, min_age: 18, max_age: 50, category: 'صحة وعافية', store: { name_ar: 'نادي رياضي', location_url: '#' }, image_url: 'https://placehold.co/600x400/10b981/ffffff?text=Sports+Gift' },
];
const mockCategoriesData = ['تقنية', 'فنون وهوايات', 'صحة وعافية', 'تعليم وثقافة'];

// 1.3. MOCK: API Functions
const getGifts = async (filters) => { 
    await new Promise(resolve => setTimeout(resolve, 800)); 
    if (filters && filters.category) {
        return mockGiftsData.filter(g => g.category === filters.category);
    }
    return mockGiftsData; 
};
const getCategories = async () => { 
    await new Promise(resolve => setTimeout(resolve, 400)); 
    return mockCategoriesData; 
};

// 1.4. MOCK: GiftCard Component (Visuals Enhanced - Same as HomePage)
// نستخدم نفس تصميم البطاقة الداكن لضمان تناسق المظهر
const GiftCard = ({ gift, score }) => {
    // محاكاة لـ t() للنصوص
    const t = (key) => {
        if (key === 'common.priceRange') return 'نطاق السعر';
        if (key === 'common.suitableAge') return 'العمر المناسب';
        if (key === 'common.years') return 'سنة';
        if (key === 'common.goToWebsite') return 'الذهاب إلى المتجر';
        if (score >= 0.8) return 'تطابق ممتاز';
        return 'تطابق جيد';
    };
    const scoreText = score !== undefined ? (score >= 0.8 ? t('common.excellentMatch') : t('common.goodMatch')) : '';
    const scoreColor = score !== undefined && score >= 0.8 ? 'bg-cyan-500/80' : 'bg-fuchsia-500/80';

    return (
        <div 
            className={`
                relative bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden 
                transition-all duration-500 ease-out border border-white/10 text-gray-100
                hover:shadow-3xl hover:border-fuchsia-400 transform hover:scale-[1.03]
            `}
        >
            <div className="h-40 bg-gray-800 relative overflow-hidden">
                <img 
                    src={gift.image_url} 
                    alt={gift.name_ar} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    // Placeholder fallback
                    onError={(e) => e.currentTarget.src = `https://placehold.co/600x400/1f2937/d1d5db?text=${encodeURIComponent(gift.name_ar)}`}
                />
                 {score !== undefined && (
                    <div className={`absolute top-0 right-0 px-4 py-2 text-white font-bold rounded-bl-xl text-sm shadow-md ${scoreColor}`}>
                        {Math.round(score * 100)}% {scoreText}
                    </div>
                )}
            </div>
            <div className="p-5 space-y-3">
                <h3 className="font-extrabold text-xl text-cyan-400 line-clamp-1">{gift.name_ar}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">{gift.description_ar}</p>
                <div className="flex justify-between text-sm text-gray-400 border-t border-white/10 pt-3">
                    <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-fuchsia-400" />
                        <span>{t('common.priceRange')}: ${gift.min_budget}-{gift.max_budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span>{t('common.suitableAge')}: {gift.min_age}-{gift.max_age} {t('common.years')}</span>
                    </div>
                </div>
                <a 
                    href={gift.store?.location_url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 mt-4 px-4 py-2 bg-fuchsia-600/70 hover:bg-fuchsia-500 rounded-lg text-white font-medium text-sm transition-colors shadow-lg shadow-fuchsia-500/30"
                >
                    <MapPin className="w-4 h-4" />
                    {t('common.goToWebsite')}
                </a>
            </div>
        </div>
    );
};

// =================================================================================
// 2. GIFTS PAGE COMPONENT (التصميم الداكن والرسوم المتحركة)
// =================================================================================

export default function GiftsPage() {
    /** @type {[Gift[], React.Dispatch<React.SetStateAction<Gift[]>>]} */
    const [gifts, setGifts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        loadCategories();
        loadGifts();
    }, []);
  
    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (e) {
            console.error(e);
        }
    };
  
    const loadGifts = async (category) => {
        setLoading(true);
        try {
            const data = await getGifts(
                category && category !== 'all' ? { category } : undefined
            );
            setGifts(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
  
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        loadGifts(category);
    };
  
    return (
        <div dir="rtl" className="relative min-h-screen overflow-hidden bg-gray-950 text-gray-100">
            {/* Floating Background Orbs (مطابقة للصفحة الرئيسية) */}
            <div className="absolute -top-64 -left-64 w-[30rem] h-[30rem] bg-fuchsia-500/15 rounded-full blur-3xl animate-orb-slow" style={{ animationDelay: '0s' }} />
            <div className="absolute top-1/4 -right-80 w-[40rem] h-[40rem] bg-cyan-500/15 rounded-full blur-3xl animate-orb-slow" style={{ animationDelay: '5s' }} />

            <div className="container mx-auto px-4 py-16 relative z-10">
                {/* ===== العنوان (Animated) ===== */}
                <div className="text-center mb-16 animate-fade-in-down">
                    <div className="inline-flex items-center gap-4 mb-4">
                        <Sparkles className="w-10 h-10 text-cyan-400 animate-pulse-light" />
                        <h1 className="text-5xl font-extrabold tracking-tight" style={{ 
                            textShadow: '0 0 15px rgba(255, 255, 255, 0.2), 0 0 30px rgba(126, 34, 206, 0.4)',
                            background: 'linear-gradient(90deg, #60a5fa, #a855f7, #22d3ee)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            تصفّح جميع الهدايا
                        </h1>
                        <Sparkles className="w-10 h-10 text-fuchsia-400 animate-pulse-light" />
                    </div>
                    <p className="text-indigo-300 text-lg font-light">
                        اختر الفئة المناسبة واستكشف أفضل الهدايا
                    </p>
                </div>

                {/* ===== الفئات (Dark Glassmorphism Buttons) ===== */}
                <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in-up">
                    {/* زر الكل */}
                    <button
                        onClick={() => handleCategoryClick('all')}
                        className={`
                            px-5 py-2 rounded-full font-semibold transition-all duration-300 
                            border border-white/10 backdrop-blur-sm shadow-md
                            ${activeCategory === 'all'
                                ? 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white shadow-lg shadow-fuchsia-500/30 scale-[1.05]'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-cyan-400'
                            }
                        `}
                    >
                        الكل
                    </button>

                    {/* فئات الهدايا */}
                    {categories.map((cat, index) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={`
                                px-5 py-2 rounded-full font-semibold transition-all duration-300 
                                border border-white/10 backdrop-blur-sm shadow-md
                                ${activeCategory === cat
                                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/30 scale-[1.05]'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-cyan-400'
                                }
                            `}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ===== الهدايا ===== */}
                {loading ? (
                    <div className="text-center py-20 animate-fade-in">
                        <Loader2 className="w-16 h-16 text-fuchsia-400 animate-spin-slow mx-auto" />
                        <p className="text-lg text-fuchsia-300 mt-4">جار تحميل الهدايا...</p>
                    </div>
                ) : gifts.length === 0 ? (
                    <div className="text-center text-gray-400 py-20 animate-fade-in">
                        <Search className="w-12 h-12 mx-auto mb-4 text-gray-500 animate-bounce-slow" />
                        <p className="text-xl">لا توجد هدايا في هذه الفئة حاليًا.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gifts.map((gift, index) => (
                            <div
                                key={gift.id}
                                className="animate-slide-in-up"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <GiftCard gift={gift} score={1} matchDetails={{}} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

             {/* ----------------- Custom Styles and Animations ----------------- */}
            <style jsx="true">{`
                /* Hero Animations */
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fadeInDown 0.8s ease-out forwards;
                    opacity: 0; /* يبدأ مخفياً */
                }
                
                @keyframes pulseLight {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                .animate-pulse-light {
                    animation: pulseLight 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                /* Element Entrance Animation */
                @keyframes slideInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                    opacity: 0;
                }
                .animate-slide-in-up {
                    animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                    opacity: 0; /* Ensures elements are hidden before animation */
                }

                /* Background Orb Animation */
                @keyframes orbSlow {
                    0% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-100px, 50px) scale(1.1) rotate(15deg); }
                    66% { transform: translate(50px, -80px) scale(0.9) rotate(-10deg); }
                    100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                }
                .animate-orb-slow {
                    animation: orbSlow 20s infinite alternate-reverse;
                }
                
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spinSlow 3s linear infinite;
                }
                
                @keyframes bounceSlow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounceSlow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}