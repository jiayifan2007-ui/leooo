import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import RevealItem from '@/components/RevealItem';
import {
  ArrowRight,
  Check,
  Zap,
  ShoppingCart,
  UtensilsCrossed,
  Package,
  BarChart3,
  CreditCard,
  Users,
  MapPin,
  ChevronRight,
  Star,
} from 'lucide-react';
import POSMockup from '@/components/POSMockup';

type Industry = 'restaurant' | 'shop' | 'warehouse';

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  const { ref, visible } = useReveal(0.05);
  return (
    <section style={{ backgroundColor: '#FFFBEB' }}>
      <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 pt-28 lg:pt-36" ref={ref}>
        <div className="grid lg:grid-cols-[55fr_45fr] gap-16 items-center">
          {/* Left */}
          <div
            className="space-y-8 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{
                backgroundColor: '#FEF3C7',
                borderColor: 'rgba(245,158,11,0.3)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#F59E0B' }}
              />
              <span
                className="text-xs font-semibold tracking-wide uppercase"
                style={{ color: '#92400E' }}
              >
                One system. Any business.
              </span>
            </div>

            <h1
              className="font-bold leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(36px, 6vw, 64px)',
                color: '#0C0A09',
                letterSpacing: '-0.03em',
              }}
              data-testid="text-product-headline"
            >
              Clarity drives
              <br />
              <span style={{ color: '#F59E0B' }}>better business.</span>
            </h1>

            <p className="text-lg leading-relaxed max-w-lg" style={{ color: '#78716C' }}>
              Leo Software brings orders, inventory, payments, and staff into one
              clean system — so you can focus on what matters, not the tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-bold transition-all hover:scale-105"
                style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
                data-testid="button-product-trial"
              >
                Start for free
                <ArrowRight size={16} />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 text-base font-semibold transition-colors hover:border-amber-500"
                style={{ borderColor: '#44403C', color: '#1C1917' }}
                data-testid="link-product-features"
              >
                See how it works
                <ChevronRight size={16} />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              {['No credit card required', 'Setup in under 5 minutes', 'Cancel anytime'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <Check
                      size={14}
                      style={{ color: '#F59E0B' }}
                      className="flex-shrink-0"
                    />
                    <span className="text-xs" style={{ color: '#78716C' }}>
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right — POS mockup */}
          <div
            className="relative transition-all duration-700 delay-200"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            <POSMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof Bar ────────────────────────────────────────────────────────

function SocialProofBar() {
  const categories = [
    { icon: UtensilsCrossed, label: 'Restaurants' },
    { icon: ShoppingCart, label: 'Retail Shops' },
    { icon: Package, label: 'Warehouses' },
    { icon: Zap, label: 'Food Trucks' },
  ];

  return (
    <section
      className="py-6 border-y"
      style={{ backgroundColor: '#1C1917', borderColor: '#44403C' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
          <span
            className="text-sm font-semibold whitespace-nowrap"
            style={{ color: '#A8A29E' }}
            data-testid="text-social-proof"
          >
            4,200+ businesses trust Leo Software
          </span>

          <div className="h-px w-full sm:w-px sm:h-5" style={{ backgroundColor: '#44403C' }} />

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium"
                style={{
                  backgroundColor: '#292524',
                  borderColor: '#44403C',
                  color: '#A8A29E',
                }}
              >
                <Icon size={12} style={{ color: '#F59E0B' }} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────

function Features() {
  const features = [
    {
      icon: BarChart3,
      title: 'Live analytics, always on.',
      description:
        'Your dashboard updates in real time — sales by hour, top items, staff performance, and daily revenue. No end-of-day report needed. The picture is always current.',
      link: 'Explore the dashboard',
    },
    {
      icon: CreditCard,
      title: 'Payments without the friction.',
      description:
        'Accept card, cash, and mobile payments in one flow. Split bills, process refunds, and reconcile automatically. Leo handles the transaction so your team handles the guest.',
      link: 'See payment features',
    },
    {
      icon: MapPin,
      title: 'Multiple locations, one view.',
      description:
        'Managing two venues or twenty, Leo gives you a single control panel. Compare performance across sites, push menu updates everywhere at once, and set location-specific rules.',
      link: 'Learn about multi-location',
    },
  ];

  return (
    <section id="features" style={{ backgroundColor: '#FFFBEB' }} className="py-24">
      <div className="max-w-5xl mx-auto px-6 space-y-24">
        {/* Section header */}
        <div className="text-center space-y-3">
          <p
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: '#F59E0B' }}
          >
            What Leo does
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: '#0C0A09' }}
            data-testid="text-features-headline"
          >
            Everything in one place. Nothing in the way.
          </h2>
        </div>

        {features.map((feature, i) => {
          const Icon = feature.icon;
          const isEven = i % 2 === 0;

          return (
            <RevealItem
              key={feature.title}
              delay={0}
              className={`grid md:grid-cols-2 gap-16 items-center ${
                isEven ? '' : 'md:[&>*:first-child]:order-last'
              }`}
            >
              {/* Icon tile */}
              <div className="flex justify-center">
                <div
                  className="w-56 h-56 rounded-3xl flex items-center justify-center shadow-xl border"
                  style={{ backgroundColor: '#1C1917', borderColor: '#44403C' }}
                >
                  <Icon size={80} style={{ color: '#F59E0B' }} strokeWidth={1.2} />
                </div>
              </div>

              {/* Text */}
              <div className="space-y-5">
                <h3
                  className="text-3xl font-bold leading-tight tracking-tight"
                  style={{ color: '#0C0A09' }}
                >
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#78716C' }}>
                  {feature.description}
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                  style={{ color: '#F59E0B' }}
                  data-testid={`link-feature-${i}`}
                >
                  {feature.link}
                  <ChevronRight size={16} />
                </Link>
              </div>
            </RevealItem>
          );
        })}
      </div>
    </section>
  );
}

// ─── Industry Tabs ───────────────────────────────────────────────────────────

const industryContent: Record<
  Industry,
  { headline: string; features: string[]; note: string }
> = {
  restaurant: {
    headline: 'Built for kitchens that never stop.',
    features: [
      'Table and floor-plan management',
      'Course-by-course ticket routing to kitchen display',
      'Split bills and custom modifiers',
      'Staff shift tracking and tipping reports',
      'Real-time allergen and menu updates',
    ],
    note: 'Used by sit-down restaurants, cafes, and bar and grill operations.',
  },
  shop: {
    headline: 'Retail-ready from day one.',
    features: [
      'Barcode scan and fast cart checkout',
      'Inventory reorder alerts and supplier sync',
      'Customer loyalty and discount programs',
      'Multi-variant product management (size, color)',
      'End-of-day sales reconciliation',
    ],
    note: 'Ideal for boutiques, convenience stores, and specialty retailers.',
  },
  warehouse: {
    headline: 'Stock under control, always.',
    features: [
      'Inbound goods receiving and batch scanning',
      'Location-based bin and shelf tracking',
      'Low-stock and expiry date alerts',
      'Purchase order management',
      'Full audit trail for every movement',
    ],
    note: 'Designed for fulfilment centres, food distributors, and stockrooms.',
  },
};

function IndustryTabs() {
  const [active, setActive] = useState<Industry>('restaurant');
  const { ref, visible } = useReveal(0.1);

  const tabs: { id: Industry; icon: typeof UtensilsCrossed; label: string }[] = [
    { id: 'restaurant', icon: UtensilsCrossed, label: 'Restaurant' },
    { id: 'shop', icon: ShoppingCart, label: 'Shop' },
    { id: 'warehouse', icon: Package, label: 'Warehouse' },
  ];

  const content = industryContent[active];

  return (
    <section
      id="industries"
      className="py-24"
      style={{ backgroundColor: 'rgba(245, 245, 244, 0.3)' }}
    >
      <div ref={ref} className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div
          className="text-center space-y-3 mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <p
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: '#F59E0B' }}
          >
            Built for your industry
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: '#0C0A09' }}
            data-testid="text-industries-headline"
          >
            One platform. Every operation.
          </h2>
        </div>

        {/* Tab bar */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex rounded-xl p-1 gap-1"
            style={{ backgroundColor: '#1C1917' }}
          >
            {tabs.map(({ id, icon: Icon, label }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={
                    isActive
                      ? { backgroundColor: '#F59E0B', color: '#0C0A09' }
                      : { color: '#A8A29E', backgroundColor: 'transparent' }
                  }
                  data-testid={`button-industry-tab-${id}`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content panel */}
        <div
          className="rounded-2xl p-10 md:p-14 border"
          style={{ backgroundColor: '#FFFBEB', borderColor: 'rgba(245,158,11,0.2)' }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              <h3
                className="text-2xl font-bold leading-snug"
                style={{ color: '#0C0A09' }}
                data-testid="text-industry-content-headline"
              >
                {content.headline}
              </h3>
              <p className="text-sm" style={{ color: '#78716C' }}>
                {content.note}
              </p>
            </div>
            <ul className="space-y-3">
              {content.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center"
                    style={{
                      backgroundColor: '#FEF3C7',
                      borderColor: 'rgba(245,158,11,0.4)',
                    }}
                  >
                    <Check size={12} style={{ color: '#F59E0B' }} />
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: '#44403C' }}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonial ─────────────────────────────────────────────────────────────

function Testimonial() {
  const { ref, visible } = useReveal(0.1);
  return (
    <section style={{ backgroundColor: '#FFFBEB' }} className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div
          ref={ref}
          className="relative rounded-3xl px-10 py-14 md:px-16 md:py-20 overflow-hidden transition-all duration-700"
          style={{
            backgroundColor: '#1C1917',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          {/* Amber accent bar */}
          <div
            className="absolute top-0 left-0 w-1 h-full rounded-l-3xl"
            style={{ backgroundColor: '#F59E0B' }}
          />
          {/* Decorative circle */}
          <div
            className="absolute -top-10 -right-10 w-48 h-48 rounded-full"
            style={{ backgroundColor: 'rgba(245,158,11,0.05)' }}
          />

          {/* Stars */}
          <div className="flex gap-1 mb-8">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={16} fill="#F59E0B" style={{ color: '#F59E0B' }} />
            ))}
          </div>

          {/* Quote */}
          <blockquote
            className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 tracking-tight"
            style={{ color: '#F5F5F4' }}
            data-testid="text-testimonial-quote"
          >
            "Before Leo, we were managing our kitchen, inventory, and payments
            across three different tools. Now it's one screen. Our close-out time
            dropped from forty minutes to under ten."
          </blockquote>

          {/* Attribution */}
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full border flex items-center justify-center"
              style={{ backgroundColor: '#292524', borderColor: '#44403C' }}
            >
              <span className="text-lg font-bold" style={{ color: '#F59E0B' }}>
                M
              </span>
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#F5F5F4' }}>
                Maria Haugen
              </p>
              <p className="text-sm" style={{ color: '#78716C' }}>
                Owner, Brygga Kitchen — Oslo, Norway
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ──────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section style={{ backgroundColor: '#1C1917' }} className="py-24">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
          style={{ backgroundColor: '#292524', borderColor: '#44403C' }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: '#F59E0B' }}
          />
          <span
            className="text-xs font-semibold tracking-wide uppercase"
            style={{ color: '#A8A29E' }}
          >
            Get started today
          </span>
        </div>

        <h2
          className="font-bold leading-tight tracking-tight"
          style={{ fontSize: 'clamp(32px, 6vw, 56px)', color: '#F5F5F4' }}
          data-testid="text-product-cta-headline"
        >
          Less complexity.
          <br />
          <span style={{ color: '#FCD34D' }}>More business.</span>
        </h2>

        <p className="text-lg leading-relaxed" style={{ color: '#A8A29E' }}>
          Join 4,200+ businesses that replaced spreadsheets and separate tools
          with one focused system. Free for 14 days.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all hover:scale-105"
            style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
            data-testid="button-product-final-cta"
          >
            Start your free trial
            <ArrowRight size={16} />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border text-base font-semibold transition-colors"
            style={{ borderColor: '#44403C', color: '#A8A29E' }}
            data-testid="link-product-read-more"
          >
            Read the docs
          </a>
        </div>

        <p className="text-xs" style={{ color: '#78716C' }}>
          No credit card required. Cancel anytime. GDPR compliant.
        </p>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductPage() {
  return (
    <>
      <Hero />
      <SocialProofBar />
      <Features />
      <IndustryTabs />
      <Testimonial />
      <CTABanner />
    </>
  );
}
