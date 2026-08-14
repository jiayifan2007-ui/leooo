import { type ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Zap, ArrowRight } from 'lucide-react';

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
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
    { label: 'Product', href: '/product' },
    { label: 'Pricing', href: '/pricing' },
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
            <a
              href="#"
              className="text-sm font-medium transition-colors"
              style={{ color: '#78716C' }}
              data-testid="link-sign-in"
            >
              Sign in
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
              style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
              data-testid="link-cta-nav"
            >
              Start free trial
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: '#A8A29E' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
              Start free trial
              <ArrowRight size={14} />
            </Link>
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
                Point-of-sale built for the real world — restaurants, shops, and warehouses that demand more.
              </p>
            </div>

            {/* Link columns */}
            {[
              {
                heading: 'Product',
                links: [
                  { label: 'Features', href: '/product' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Changelog', href: '#' },
                  { label: 'Roadmap', href: '#' },
                ],
              },
              {
                heading: 'Industries',
                links: [
                  { label: 'Restaurants', href: '#' },
                  { label: 'Retail', href: '#' },
                  { label: 'Warehouses', href: '#' },
                  { label: 'Cafes', href: '#' },
                ],
              },
              {
                heading: 'Company',
                links: [
                  { label: 'About', href: '#' },
                  { label: 'Blog', href: '#' },
                  { label: 'Careers', href: '#' },
                  { label: 'Press', href: '#' },
                ],
              },
              {
                heading: 'Legal',
                links: [
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                  { label: 'Security', href: '#' },
                  { label: 'GDPR', href: '#' },
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
              &copy; {new Date().getFullYear()} Leo Software. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs hover:opacity-80 transition-opacity"
                  style={{ color: '#44403C' }}
                  data-testid={`link-legal-${item.toLowerCase()}`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
