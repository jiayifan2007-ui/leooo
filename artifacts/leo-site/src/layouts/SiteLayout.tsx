import { type ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Menu, X, Zap, ArrowRight } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: t('nav.product'), href: '/product' },
    { label: t('nav.pricing'), href: '/pricing' },
    { label: t('nav.security'), href: '/security' },
  ];

  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: '#1C1917' }}>
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(12,10,9,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #292524' : '1px solid transparent',
        }}
        data-testid="nav-main"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" data-testid="link-logo">
            <div
              className="w-7 h-7 rounded flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: '#F59E0B' }}
            >
              <Zap size={16} color="#0C0A09" strokeWidth={2.5} />
            </div>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ color: '#F59E0B', letterSpacing: '-0.02em' }}
            >
              Leo Software
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:opacity-100"
                style={{ color: location === link.href ? '#F59E0B' : '#A8A29E' }}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="#"
              className="text-sm font-medium transition-colors"
              style={{ color: '#78716C' }}
              data-testid="link-sign-in"
            >
              {t('nav.signIn')}
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
              style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
              data-testid="link-cta-nav"
            >
              {t('nav.startTrial')}
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: '#A8A29E' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
            style={{ backgroundColor: '#0C0A09', borderColor: '#292524' }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium py-2 transition-colors"
                style={{ color: location === link.href ? '#F59E0B' : '#A8A29E' }}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold mt-2"
              style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
              data-testid="link-mobile-cta"
            >
              {t('nav.startTrial')}
              <ArrowRight size={14} />
            </Link>
            <div className="flex justify-end">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main>{children}</main>

      {/* Footer */}
      <footer
        className="py-16 px-6 border-t"
        style={{ backgroundColor: '#0C0A09', borderColor: '#1C1917' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-7 h-7 rounded flex items-center justify-center"
                  style={{ backgroundColor: '#F59E0B' }}
                >
                  <Zap size={14} color="#0C0A09" strokeWidth={2.5} />
                </div>
                <span
                  className="text-base font-bold tracking-tight"
                  style={{ color: '#F59E0B' }}
                >
                  Leo Software
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>
                {t('footer.tagline')}
              </p>
            </div>

            {/* Link columns */}
            {[
              {
                heading: t('footer.productHeading'),
                links: [
                  { label: t('footer.features'), href: '/product' },
                  { label: t('footer.pricing'), href: '/pricing' },
                  { label: t('footer.changelog'), href: '#' },
                  { label: t('footer.roadmap'), href: '#' },
                ],
              },
              {
                heading: t('footer.industriesHeading'),
                links: [
                  { label: t('footer.restaurants'), href: '#' },
                  { label: t('footer.retail'), href: '#' },
                  { label: t('footer.warehouses'), href: '#' },
                  { label: t('footer.cafes'), href: '#' },
                ],
              },
              {
                heading: t('footer.companyHeading'),
                links: [
                  { label: t('footer.about'), href: '#' },
                  { label: t('footer.blog'), href: '#' },
                  { label: t('footer.careers'), href: '#' },
                  { label: t('footer.press'), href: '#' },
                ],
              },
              {
                heading: t('footer.legalHeading'),
                links: [
                  { label: t('footer.privacyPolicy'), href: '/security#privacy' },
                  { label: t('footer.termsOfService'), href: '/security#legal' },
                  { label: t('footer.security'), href: '/security' },
                  { label: t('footer.gdpr'), href: '/security#privacy' },
                ],
              },
            ].map((col) => (
              <div key={col.heading} className="space-y-4">
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: '#44403C' }}
                >
                  {col.heading}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors hover:opacity-80"
                        style={{ color: '#78716C' }}
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t"
            style={{ borderColor: '#1C1917' }}
          >
            <p className="text-xs" style={{ color: '#44403C' }}>
              &copy; {new Date().getFullYear()} {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6">
              {[
                { key: t('footer.privacy'), id: 'privacy' },
                { key: t('footer.terms'), id: 'terms' },
                { key: t('footer.cookies'), id: 'cookies' },
              ].map((item) => (
                <Link
                  key={item.id}
                  href={`/security#${item.id}`}
                  className="text-xs hover:opacity-80 transition-opacity"
                  style={{ color: '#44403C' }}
                  data-testid={`link-legal-${item.id}`}
                >
                  {item.key}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
