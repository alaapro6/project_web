import { Gift, Heart } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export default function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        relative
        bg-gradient-to-b from-[#020617] via-[#020617] to-black
        text-white
        border-t border-white/10
        mt-auto
        overflow-hidden
      "
    >
      {/* ===== Background Glow ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[400px] h-[400px] bg-purple-500/20 blur-[140px]" />
        <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-cyan-400/20 blur-[140px]" />
      </div>

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

          {/* ===== About ===== */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-400 to-pink-400 shadow-lg">
                <Gift className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                Gift Finder
              </span>
            </div>

            <p className="text-white/60 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* ===== Links ===== */}
          <div>
            <h3 className="font-bold mb-4 text-lg">
              {t('nav.about')}
            </h3>
            <ul className="space-y-3 text-white/60">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  {t('footer.links.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  {t('footer.links.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  {t('footer.links.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* ===== Connect ===== */}
        
        </div>

        {/* ===== Bottom Bar ===== */}
        <div className="mt-14 pt-6 border-t border-white/10 text-center text-white/40 text-sm">
          © {currentYear} Gift Finder. {t('footer.rights')}.
        </div>
      </div>
    </footer>
  );
}
