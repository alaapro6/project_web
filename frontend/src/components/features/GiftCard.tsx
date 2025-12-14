import React, { useState, useMemo } from 'react';
import { MapPin, TrendingUp, DollarSign, Calendar, ShoppingBag, Globe, Tag } from 'lucide-react';

// تعريف الواجهات داخل الملف لجعله مُتكاملًا وقابلاً للتشغيل
interface Store {
  name_ar: string;
  location_url: string;
}

interface Gift {
  id: string;
  name_ar: string;
  description_ar: string;
  name_en: string;
  description_en: string;
  image_url?: string;
  min_budget: number;
  max_budget: number;
  min_age: number;
  max_age: number;
  store?: Store;
}

interface GiftCardProps {
  gift: Gift;
  score?: number;
  matchDetails?: any; 
}

// كائن النصوص الثابتة لدعم اللغات
const texts = {
  ar: {
    priceRange: 'نطاق السعر',
    suitableAge: 'العمر المناسب',
    store: 'المتجر',
    goToWebsite: 'الذهاب إلى موقع',
    years: 'سنة',
    excellentMatch: 'تطابق ممتاز',
    goodMatch: 'تطابق جيد',
    averageMatch: 'تطابق متوسط',
    poorMatch: 'تطابق ضعيف',
    toggleLang: 'English (EN)',
    placeholderText: 'هدية',
  },
  en: {
    priceRange: 'Price Range',
    suitableAge: 'Suitable Age',
    store: 'Store',
    goToWebsite: 'Go to Website',
    years: 'years',
    excellentMatch: 'Excellent Match',
    goodMatch: 'Good Match',
    averageMatch: 'Average Match',
    poorMatch: 'Poor Match',
    toggleLang: 'العربية (AR)',
    placeholderText: 'Gift',
  }
};

/**
 * يعرض بطاقة هدية بتصميم أنيق ومضغوط وحديث مع دعم كامل للغة العربية (RTL) وتأثيرات حركية جذابة.
 */
export default function GiftCard({ gift, score }: GiftCardProps) {
  // الحالة الافتراضية للغة هي العربية (ar)
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const t = texts[lang]; // اختصار للوصول إلى نصوص اللغة الحالية

  // تحديد اسم ووصف الهدية بناءً على اللغة
  const giftName = lang === 'ar' ? gift.name_ar : (gift.name_en || gift.name_ar);
  const giftDescription = lang === 'ar' ? gift.description_ar : (gift.description_en || gift.description_ar);

  const toggleLanguage = () => {
    setLang(prevLang => (prevLang === 'ar' ? 'en' : 'ar'));
  };

  // --- وظائف مساعدة لدرجة المطابقة ---

  // تحدد لون النص، لون الإطار، ولون الخلفية لدرجة المطابقة
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-500 ring-green-500/50 bg-green-500/10 border-green-500/20 hover:bg-green-500 hover:text-white';
    if (score >= 0.6) return 'text-blue-500 ring-blue-500/50 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500 hover:text-white';
    if (score >= 0.4) return 'text-yellow-500 ring-yellow-500/50 bg-yellow-500/10 border-yellow-500/20 hover:bg-yellow-500 hover:text-white';
    return 'text-orange-500 ring-orange-500/50 bg-orange-500/10 border-orange-500/20 hover:bg-orange-500 hover:text-white';
  };

  // تحدد التسمية لدرجة المطابقة بناءً على اللغة
  const getScoreLabel = (score: number, lang: 'ar' | 'en') => {
    if (score >= 0.8) return texts[lang].excellentMatch;
    if (score >= 0.6) return texts[lang].goodMatch;
    if (score >= 0.4) return texts[lang].averageMatch;
    return texts[lang].poorMatch;
  };

  const scoreClass = score !== undefined ? getScoreColor(score) : '';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  // رابط صورة بديل في حالة عدم وجود صورة أو فشل التحميل
  // تم تغيير لون الخلفية Placeholder ليتناسب مع التصميم الجديد
  const placeholderImageUrl = `https://placehold.co/600x380/3f3f46/f9fafb?text=${encodeURIComponent(t.placeholderText)}`;

  return (
    <div
      dir={dir} // تفعيل الاتجاه بناءً على اللغة
      className={`
        relative 
        bg-gradient-to-br from-white dark:from-gray-900 to-indigo-50 dark:to-gray-800 
        border border-gray-100 dark:border-gray-700 rounded-3xl 
        shadow-2xl overflow-hidden transition-all duration-500 ease-in-out 
        hover:shadow-4xl hover:ring-4 hover:ring-indigo-400/50 hover:ring-offset-4 hover:ring-offset-white dark:hover:ring-offset-gray-900 
        transform hover:scale-[1.02] hover:rotate-z-1 group
      `}
      style={{
        // ظل مخصص أكثر جاذبية
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
      }}
    >
      
      {/* 1. قسم الصورة (أقصر) مع تأثير التكبير */}
      <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={gift.image_url || placeholderImageUrl}
          alt={giftName}
          onError={(e) => {
            e.currentTarget.onerror = null; 
            e.currentTarget.src = placeholderImageUrl;
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.1]"
        />
        
        {/* شارة درجة المطابقة الأنيقة - في زاوية الصورة */}
        {score !== undefined && (
          <div 
            className={`
              absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} bg-white dark:bg-gray-900/90 
              backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-xl ring-2 ${scoreClass.split(' ')[1]} 
              transform transition-all duration-300 ease-out 
              font-extrabold
            `}
          >
            <TrendingUp className={`w-5 h-5 ${scoreClass.split(' ')[0]} animate-pulse-slow`} />
            <span className={`text-lg ${scoreClass.split(' ')[0]}`}>
              {Math.round(score * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* 2. جسم المحتوى (Title, Description, Details) */}
      <div className="p-6 space-y-4">
        
        {/* العنوان والوصف */}
        <div>
          <h3 className="font-black text-2xl text-gray-900 dark:text-white mb-1 line-clamp-1">
            {giftName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[40px]">
            {giftDescription}
          </p>
        </div>

        {/* شبكة التفاصيل (السعر والعمر) في صف واحد - بتصميم حديث */}
        <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl shadow-inner">
          
          {/* نطاق السعر */}
          <div className="flex flex-col items-start gap-1 text-sm">
            <div className="flex items-center gap-1 font-semibold text-gray-500 dark:text-gray-400">
              <DollarSign className="w-4 h-4 text-primary" />
              <span>{t.priceRange}</span>
            </div>
            <span className="font-extrabold text-lg text-primary dark:text-primary-400">
              ${gift.min_budget} - ${gift.max_budget}
            </span>
          </div>

          {/* العمر المناسب */}
          <div className="flex flex-col items-start gap-1 text-sm">
            <div className="flex items-center gap-1 font-semibold text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{t.suitableAge}</span>
            </div>
            <span className="font-extrabold text-lg text-gray-800 dark:text-gray-200">
              {gift.min_age} - {gift.max_age} {t.years}
            </span>
          </div>
        </div>

        {/* معلومات المتجر والزر */}
        {gift.store && (
          <div className="pt-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  <ShoppingBag className="w-3 h-3 inline ml-1 align-sub text-primary" />
                  {t.store}
                </p>
                <p className="font-bold text-base text-gray-800 dark:text-gray-100 line-clamp-1">
                  {gift.store.name_ar}
                </p>
              </div>
              <a
                href={gift.store.location_url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${t.goToWebsite} ${gift.store.name_ar}`}
                className="flex-shrink-0 bg-indigo-500 text-white hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
        )}

        {/* تسمية درجة المطابقة في الأسفل كشريط بارز مع تأثير تحليق */}
        {score !== undefined && (
          <div className={`text-center py-3 rounded-xl border-2 ${scoreClass.split(' ')[3]} ${scoreClass.split(' ')[2]} mt-4 transition-all duration-300 group-hover:shadow-lg ${scoreClass.split(' ').slice(4).join(' ')}`}>
            <span className={`text-lg font-black transition-colors duration-300 ${scoreClass.split(' ')[0]}`}>
              {getScoreLabel(score, lang)}
            </span>
          </div>
        )}

        {/* زر تبديل اللغة */}
        <button 
          onClick={toggleLanguage}
          className="w-full flex items-center justify-center gap-2 py-2 text-indigo-500 dark:text-indigo-400 text-sm font-bold hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Globe className="w-4 h-4" />
          {t.toggleLang}
        </button>
      </div>

      {/* CSS مخصص للأنميشن والظلال */}
      <style jsx="true">{`
        /* الظل العميق عند التحليق */
        .hover\\:shadow-4xl:hover {
          box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.4), 0 10px 10px -5px rgba(99, 102, 241, 0.1); /* ظل أزرق بنفسجي عند التحليق */
        }
        
        /* أنميشن النبض البطيء لدرجة المطابقة */
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* تحول خفيف على محور Z عند التحليق */
        .hover\\:rotate-z-1:hover {
            transform: translateY(-4px) rotateZ(0.5deg);
        }

        /* لضمان تناسق أبعاد الصورة */
        img {
            aspect-ratio: 4/3;
        }
      `}</style>
    </div>
  );
}