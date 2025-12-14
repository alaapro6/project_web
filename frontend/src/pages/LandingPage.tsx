import { Sparkles, Gift, TrendingUp, Store, Zap, Target, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';

export default function LandingPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] text-white overflow-hidden">
      {/* ===== Hero Section (Glass) ===== */}
      <section className="relative py-28">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-cyan-400/30 rounded-full blur-[120px] animate-pulse delay-100" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-pink-500/30 rounded-full blur-[120px] animate-pulse delay-200" />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
            <div className="flex justify-center items-center gap-4 mb-6 animate-fade-in">
              <Sparkles className="w-10 h-10 text-cyan-400" />
              <Gift className="w-16 h-16 text-pink-400 animate-pulse" />
              <Sparkles className="w-10 h-10 text-purple-400" />
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('landing.hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-10">
              {t('landing.hero.subtitle')}
            </p>

            <Link
              to="/finder"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-black hover:scale-110 transition-all shadow-[0_0_40px_rgba(168,85,247,0.6)]"
            >
              {t('landing.hero.cta')}
              <ChevronRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Features (Glass Cards) ===== */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            {t('landing.hero.features')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[ 
              { icon: Zap, title: 'landing.features.smart.title', desc: 'landing.features.smart.desc', color: 'from-cyan-400 to-purple-400' },
              { icon: Store, title: 'landing.features.stores.title', desc: 'landing.features.stores.desc', color: 'from-purple-400 to-pink-400' },
              { icon: Gift, title: 'landing.features.gifts.title', desc: 'landing.features.gifts.desc', color: 'from-pink-400 to-cyan-400' },
              { icon: Target, title: 'landing.features.accurate.title', desc: 'landing.features.accurate.desc', color: 'from-cyan-400 via-purple-400 to-pink-400' },
            ].map((f, i) => (
              <div
                key={i}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-3 hover:shadow-[0_0_50px_rgba(255,255,255,0.15)] transition-all"
              >
                <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                  <f.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t(f.title)}</h3>
                <p className="text-white/70">{t(f.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-14 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('landing.cta.title')}
            </h2>

            <Link
              to="/finder"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold bg-gradient-to-r from-cyan-400 to-pink-400 text-black hover:scale-110 transition-all shadow-[0_0_40px_rgba(34,211,238,0.6)]"
            >
              {t('landing.cta.button')}
              <TrendingUp className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
