// Translation system for Arabic and English

export const translations = {
  ar: {
    // Navigation
    nav: {
      home: 'الرئيسية',
      stores: 'المتاجر',
      about: 'من نحن',
      language: 'اللغة'
    },
    
    // Landing Page
    landing: {
      hero: {
        title: 'اكتشف الهدية المثالية',
        subtitle: 'نساعدك في اختيار الهدية المناسبة بدقة من خلال الذكاء الاصطناعي',
        cta: 'ابدأ البحث الآن',
        features: 'ميزاتنا'
      },
      features: {
        smart: {
          title: 'بحث ذكي',
          desc: 'خوارزمية متقدمة تحلل احتياجاتك بدقة'
        },
        stores: {
          title: '7 متاجر',
          desc: 'أفضل المتاجر في مكان واحد'
        },
        gifts: {
          title: 'مئات الهدايا',
          desc: 'تشكيلة ضخمة لجميع المناسبات'
        },
        accurate: {
          title: 'دقة عالية',
          desc: 'نتائج مخصصة 100% لك'
        }
      },
      howItWorks: {
        title: 'كيف يعمل؟',
        step1: {
          title: 'أجب على الأسئلة',
          desc: 'حدد العمر، الميزانية، والاهتمامات'
        },
        step2: {
          title: 'احصل على اقتراحات',
          desc: 'خوارزمية ذكية تحلل إجاباتك'
        },
        step3: {
          title: 'اختر واشترِ',
          desc: 'زر المتجر واشترِ الهدية المثالية'
        }
      },
      cta: {
        title: 'جاهز لإيجاد الهدية المثالية؟',
        button: 'ابدأ الآن مجاناً'
      }
    },
    
    // Gift Finder Form
    form: {
      title: 'أخبرنا عن الشخص',
      age: {
        label: 'ما هو عمر الشخص؟',
        placeholder: 'مثال: 18'
      },
      budget: {
        label: 'ما هي ميزانيتك؟',
        placeholder: 'مثال: 100'
      },
      gender: {
        label: 'الجنس',
        male: 'ذكر',
        female: 'أنثى',
        unisex: 'للجنسين'
      },
      occasion: {
        label: 'ما هي المناسبة؟',
        birthday: 'عيد ميلاد',
        graduation: 'تخرج',
        wedding: 'زواج',
        anniversary: 'ذكرى سنوية',
        housewarming: 'انتقال لمنزل جديد',
        any: 'أي مناسبة'
      },
      personality: {
        label: 'ما هي شخصيته؟',
        gamer: 'ألعاب إلكترونية',
        athlete: 'رياضي',
        reader: 'قارئ',
        fashionista: 'موضة',
        techie: 'تقني',
        creative: 'مبدع',
        foodie: 'محب للطعام',
        traveler: 'مسافر'
      },
      relationship: {
        label: 'ما هي علاقتك به؟',
        friend: 'صديق',
        family: 'عائلة',
        colleague: 'زميل عمل',
        partner: 'شريك',
        other: 'أخرى'
      },
      interests: {
        label: 'ما هي اهتماماته؟',
        placeholder: 'اختر الاهتمامات'
      },
      submit: 'ابحث عن الهدايا',
      searching: 'جاري البحث...'
    },
    
    // Results
    results: {
      found: 'وجدنا {count} هدية مناسبة',
      sortedBy: 'مُرتبة حسب درجة التطابق',
      noResults: 'لم نعثر على هدايا مطابقة. جرّب تعديل معايير البحث.',
      matchScore: {
        excellent: 'تطابق ممتاز',
        good: 'تطابق جيد',
        average: 'تطابق متوسط',
        fair: 'تطابق ضعيف'
      }
    },
    
    // Gift Card
    gift: {
      price: 'السعر',
      age: 'العمر المناسب',
      years: 'سنة',
      store: 'المتجر',
      viewMap: 'عرض الموقع',
      details: 'التفاصيل'
    },
    
    // Stores Page
    stores: {
      title: 'المتاجر المتاحة',
      subtitle: 'اكتشف أفضل المتاجر للعثور على الهدايا المثالية',
      location: 'الموقع',
      viewOnMap: 'عرض على الخريطة'
    },
    
    // Common
    common: {
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      tryAgain: 'حاول مرة أخرى',
      close: 'إغلاق',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      add: 'إضافة',
      search: 'بحث'
    },
    
    // Footer
    footer: {
      about: 'حول Gift Finder',
      description: 'منصة ذكية تساعدك في اختيار الهدية المثالية باستخدام الذكاء الاصطناعي',
      rights: 'جميع الحقوق محفوظة',
      links: {
        privacy: 'سياسة الخصوصية',
        terms: 'الشروط والأحكام',
        contact: 'اتصل بنا'
      }
    }
  },
  
  en: {
    // Navigation
    nav: {
      home: 'Home',
      stores: 'Stores',
      about: 'About',
      language: 'Language'
    },
    
    // Landing Page
    landing: {
      hero: {
        title: 'Find the Perfect Gift',
        subtitle: 'AI-powered gift recommendations tailored to your needs',
        cta: 'Start Searching Now',
        features: 'Our Features'
      },
      features: {
        smart: {
          title: 'Smart Search',
          desc: 'Advanced algorithm analyzes your needs precisely'
        },
        stores: {
          title: '7 Stores',
          desc: 'Best stores in one place'
        },
        gifts: {
          title: 'Hundreds of Gifts',
          desc: 'Huge selection for all occasions'
        },
        accurate: {
          title: 'High Accuracy',
          desc: '100% personalized results'
        }
      },
      howItWorks: {
        title: 'How It Works?',
        step1: {
          title: 'Answer Questions',
          desc: 'Specify age, budget, and interests'
        },
        step2: {
          title: 'Get Suggestions',
          desc: 'Smart algorithm analyzes your answers'
        },
        step3: {
          title: 'Choose & Buy',
          desc: 'Visit the store and buy the perfect gift'
        }
      },
      cta: {
        title: 'Ready to Find the Perfect Gift?',
        button: 'Start Now for Free'
      }
    },
    
    // Gift Finder Form
    form: {
      title: 'Tell Us About the Person',
      age: {
        label: 'What is their age?',
        placeholder: 'e.g., 18'
      },
      budget: {
        label: 'What is your budget?',
        placeholder: 'e.g., 100'
      },
      gender: {
        label: 'Gender',
        male: 'Male',
        female: 'Female',
        unisex: 'Unisex'
      },
      occasion: {
        label: 'What is the occasion?',
        birthday: 'Birthday',
        graduation: 'Graduation',
        wedding: 'Wedding',
        anniversary: 'Anniversary',
        housewarming: 'Housewarming',
        any: 'Any Occasion'
      },
      personality: {
        label: 'What is their personality?',
        gamer: 'Gamer',
        athlete: 'Athlete',
        reader: 'Reader',
        fashionista: 'Fashionista',
        techie: 'Tech Savvy',
        creative: 'Creative',
        foodie: 'Foodie',
        traveler: 'Traveler'
      },
      relationship: {
        label: 'Your relationship?',
        friend: 'Friend',
        family: 'Family',
        colleague: 'Colleague',
        partner: 'Partner',
        other: 'Other'
      },
      interests: {
        label: 'What are their interests?',
        placeholder: 'Select interests'
      },
      submit: 'Find Gifts',
      searching: 'Searching...'
    },
    
    // Results
    results: {
      found: 'Found {count} suitable gifts',
      sortedBy: 'Sorted by match score',
      noResults: 'No matching gifts found. Try adjusting your search criteria.',
      matchScore: {
        excellent: 'Excellent Match',
        good: 'Good Match',
        average: 'Average Match',
        fair: 'Fair Match'
      }
    },
    
    // Gift Card
    gift: {
      price: 'Price',
      age: 'Suitable Age',
      years: 'years',
      store: 'Store',
      viewMap: 'View Location',
      details: 'Details'
    },
    
    // Stores Page
    stores: {
      title: 'Available Stores',
      subtitle: 'Discover the best stores to find perfect gifts',
      location: 'Location',
      viewOnMap: 'View on Map'
    },
    
    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      tryAgain: 'Try Again',
      close: 'Close',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search'
    },
    
    // Footer
    footer: {
      about: 'About Gift Finder',
      description: 'Smart platform helping you choose the perfect gift using AI',
      rights: 'All Rights Reserved',
      links: {
        privacy: 'Privacy Policy',
        terms: 'Terms & Conditions',
        contact: 'Contact Us'
      }
    }
  }
};

export type Language = 'ar' | 'en';
export type TranslationKey = typeof translations.ar;
