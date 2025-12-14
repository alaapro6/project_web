import { Link, useLocation } from 'react-router-dom';
import { Gift, Store, Globe, Sparkles } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export default function Header() {
  const { language, setLanguage, t } = useI18n();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-cyan-400 bg-white/10'
      : 'text-white/70 hover:text-white hover:bg-white/10';

  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-xl
        bg-black/40
        border-b border-white/10
      "
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">

          {/* ===== Logo ===== */}
          <Link to="/" className="relative flex items-center gap-3 group">
            {/* Glow */}
            <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400/30 to-pink-400/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition" />

            <div className="relative flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 shadow-lg">
                <Gift className="w-6 h-6 text-black group-hover:rotate-12 transition-transform" />
              </div>

              <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                Gift Finder
              </span>
            </div>
          </Link>

          {/* ===== Navigation ===== */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" active={isActive('/')}>
              {t('nav.home')}
            </NavLink>

            <NavLink to="/finder" active={isActive('/finder')}>
              <Sparkles className="w-4 h-4" />
              {t('common.search')}
            </NavLink>

            <NavLink to="/stores" active={isActive('/stores')}>
              <Store className="w-4 h-4" />
              {t('nav.stores')}
            </NavLink>
          </div>

          {/* ===== Actions ===== */}
          <div className="flex items-center gap-3">
            {/* Language */}
            <button
              onClick={toggleLanguage}
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-full
                bg-white/10
                text-white
                border border-white/20
                hover:bg-white/20
                transition-all
                hover:scale-105
              "
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="font-bold">
                {language === 'ar' ? 'EN' : 'ع'}
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ================= NavLink ================= */

function NavLink({
  to,
  children,
  active,
}: {
  to: string;
  children: React.ReactNode;
  active: string;
}) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-2
        px-4 py-2
        rounded-full
        text-sm
        font-semibold
        transition-all
        ${active}
      `}
    >
      {children}
    </Link>
  );
}
