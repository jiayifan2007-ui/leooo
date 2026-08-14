import { useEffect, useRef, useState } from 'react';
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

// ─── Scroll reveal hook ───────────────────────────────────────────────────────

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

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-20"
      style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 60%, #B45309 100%)' }}
    >
      {/* Decorative watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-black opacity-[0.06]"
          style={{
            fontSize: 'clamp(200px, 40vw, 480px)',
            color: '#0C0A09',
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          LEO
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
          style={{ backgroundColor: 'rgba(12,10,9,0.12)' }}
        >
          <Zap size={14} style={{ color: '#0C0A09' }} />
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: '#0C0A09' }}
          >
            Point of Sale, Reinvented
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-black leading-none mb-8"
          style={{
            fontSize: 'clamp(56px, 10vw, 128px)',
            color: '#1C1917',
            letterSpacing: '-0.04em',
          }}
          data-testid="text-hero-headline"
        >
          Command
          <br />
          <span style={{ color: '#0C0A09' }}>Your</span>
          <br />
          Business.
        </h1>

        <p
          className="text-xl md:text-2xl font-medium max-w-xl mb-12 leading-relaxed"
          style={{ color: '#292524' }}
          data-testid="text-hero-sub"
        >
          One system for restaurants, retail, and warehouses. Real-time inventory,
          payments, and analytics — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold transition-transform hover:scale-105"
            style={{ backgroundColor: '#0C0A09', color: '#FCD34D' }}
            data-testid="button-hero-cta"
          >
            Get started free
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-base font-semibold"
            style={{ color: '#0C0A09' }}
            data-testid="link-hero-demo"
          >
            Watch demo
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex items-center gap-3" style={{ color: '#0C0A09' }}>
          <div className="w-12 h-px" style={{ backgroundColor: '#0C0A09' }} />
          <span className="text-xs font-bold tracking-widest uppercase opacity-60">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Stat Strip ───────────────────────────────────────────────────────────────

function StatStrip() {
  const { ref, visible } = useReveal();
  const stats = [
    { value: '4,200+', label: 'Businesses worldwide' },
    { value: '99.9%', label: 'Uptime guarantee' },
    { value: '€2M+', label: 'Processed daily' },
    { value: '3 min', label: 'Average setup time' },
  ];

  return (
    <section
      style={{ backgroundColor: '#1C1917', borderBottom: '1px solid #44403C' }}
      className="py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-12"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center md:text-left transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 100}ms`,
              }}
              data-testid={`text-stat-${i}`}
            >
              <div
                className="font-black leading-none mb-2"
                style={{
                  fontSize: 'clamp(40px, 6vw, 72px)',
                  color: '#F59E0B',
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm font-medium tracking-wide"
                style={{ color: '#78716C' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Feature Showcase ─────────────────────────────────────────────────────────

function FeatureShowcase() {
  const { ref, visible } = useReveal();
  const features = [
    {
      num: '01',
      title: 'Real-time inventory tracking',
      desc: 'Stock levels update the moment a sale is made. Get low-stock alerts, automatic reorder triggers, and full audit trails across every location.',
    },
    {
      num: '02',
      title: 'Unified payment processing',
      desc: 'Card, cash, mobile, and buy-now-pay-later — all routed through a single integration. Reconciliation happens automatically at end of day.',
    },
    {
      num: '03',
      title: 'Multi-location management',
      desc: 'One dashboard to rule them all. Transfer stock between branches, compare performance, and manage staff permissions site by site.',
    },
    {
      num: '04',
      title: 'Live analytics dashboard',
      desc: 'Revenue, margins, footfall, and basket size — updated in real time. Export to CSV or connect your BI tool via our open API.',
    },
  ];

  return (
    <section style={{ backgroundColor: '#1C1917' }} className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="mb-20">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-4 transition-all duration-700"
            style={{ color: '#F59E0B', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)' }}
          >
            Built for the real world
          </p>
          <h2
            className="font-black leading-none transition-all duration-700 delay-100"
            style={{
              fontSize: 'clamp(40px, 7vw, 88px)',
              color: '#F5F5F4',
              letterSpacing: '-0.04em',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            Every feature
            <br />
            <span style={{ color: '#F59E0B' }}>you actually</span>
            <br />
            need.
          </h2>
        </div>

        <div className="space-y-0">
          {features.map((f, i) => (
            <RevealItem
              key={i}
              delay={i * 80}
              className="flex flex-col md:flex-row gap-8 py-16 border-t"
              style={{ borderColor: '#44403C' }}
              data-testid={`text-feature-${i}`}
            >
              <div
                className="font-black shrink-0 w-24"
                style={{
                  fontSize: 'clamp(48px, 6vw, 80px)',
                  color: '#F59E0B',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                {f.num}
              </div>
              <div className="flex-1 pt-2">
                <h3
                  className="font-black mb-4 leading-tight"
                  style={{
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    color: '#F5F5F4',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {f.title}
                </h3>
                <p className="text-lg leading-relaxed max-w-xl" style={{ color: '#A8A29E' }}>
                  {f.desc}
                </p>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Industries ───────────────────────────────────────────────────────────────

function Industries() {
  const restaurantItems = [
    { icon: <UtensilsCrossed size={20} />, label: 'Table and order management', desc: 'Visual floor plan, covers, and real-time status.' },
    { icon: <CreditCard size={20} />, label: 'Split bills and tab handling', desc: 'By seat, by item, or custom split — settled in seconds.' },
    { icon: <BarChart3 size={20} />, label: 'Kitchen display system', desc: 'Orders fire directly to prep stations, no paper tickets.' },
    { icon: <Users size={20} />, label: 'Staff scheduling', desc: 'Shift management and tip pooling built in.' },
  ];

  const retailItems = [
    { icon: <ShoppingCart size={20} />, label: 'Cart and checkout', desc: 'Barcode scan, manual entry, or QR — every flow covered.' },
    { icon: <Package size={20} />, label: 'Smart inventory', desc: 'Auto-replenishment rules and supplier integrations.' },
    { icon: <MapPin size={20} />, label: 'Multi-location stock', desc: 'Transfer stock between stores with two taps.' },
    { icon: <Star size={20} />, label: 'Loyalty and discounts', desc: 'Points, vouchers, and membership tiers out of the box.' },
  ];

  const warehouseItems = [
    { icon: <Package size={20} />, label: 'Goods receipt and put-away', desc: 'PO matching, zone allocation, and batch tracking.' },
    { icon: <BarChart3 size={20} />, label: 'Real-time stock movements', desc: 'Every pick, transfer, and adjustment logged instantly.' },
    { icon: <Zap size={20} />, label: 'Barcode and RFID scanning', desc: 'Works with existing scanners and mobile devices.' },
    { icon: <Users size={20} />, label: 'Access control by role', desc: 'Supervisors, pickers, and managers — granular permissions.' },
  ];

  return (
    <section>
      {/* Restaurant — dark */}
      <div style={{ backgroundColor: '#0C0A09' }} className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <UtensilsCrossed size={18} style={{ color: '#F59E0B' }} />
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: '#F59E0B' }}
                >
                  Restaurants and Cafes
                </span>
              </div>
              <h2
                className="font-black leading-none mb-6"
                style={{
                  fontSize: 'clamp(36px, 6vw, 72px)',
                  color: '#F5F5F4',
                  letterSpacing: '-0.04em',
                }}
                data-testid="text-industry-restaurant"
              >
                Floor to
                <br />
                kitchen,
                <br />
                <span style={{ color: '#F59E0B' }}>in sync.</span>
              </h2>
              <p
                className="text-lg leading-relaxed mb-10"
                style={{ color: '#78716C' }}
              >
                Table management, split bills, kitchen display integration, and
                course-by-course ordering — built for how restaurants actually work.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {restaurantItems.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl"
                  style={{ backgroundColor: '#1C1917' }}
                >
                  <div style={{ color: '#F59E0B' }} className="mt-0.5 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold mb-1" style={{ color: '#F5F5F4' }}>
                      {item.label}
                    </div>
                    <div className="text-sm" style={{ color: '#78716C' }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Retail — amber tint */}
      <div style={{ backgroundColor: '#FEF3C7' }} className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-1 gap-4 order-2 md:order-1">
              {retailItems.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl"
                  style={{ backgroundColor: '#FFFBEB' }}
                >
                  <div style={{ color: '#D97706' }} className="mt-0.5 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold mb-1" style={{ color: '#1C1917' }}>
                      {item.label}
                    </div>
                    <div className="text-sm" style={{ color: '#78716C' }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 mb-6">
                <ShoppingCart size={18} style={{ color: '#D97706' }} />
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: '#D97706' }}
                >
                  Retail and Shop
                </span>
              </div>
              <h2
                className="font-black leading-none mb-6"
                style={{
                  fontSize: 'clamp(36px, 6vw, 72px)',
                  color: '#1C1917',
                  letterSpacing: '-0.04em',
                }}
                data-testid="text-industry-retail"
              >
                Sell more,
                <br />
                stock
                <br />
                <span style={{ color: '#D97706' }}>smarter.</span>
              </h2>
              <p
                className="text-lg leading-relaxed mb-10"
                style={{ color: '#44403C' }}
              >
                From boutique to multi-chain retail. Leo's checkout flow is
                frictionless, and the inventory engine never lets you oversell.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warehouse — dark */}
      <div style={{ backgroundColor: '#0C0A09' }} className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <Package size={18} style={{ color: '#F59E0B' }} />
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: '#F59E0B' }}
                >
                  Warehouse and Distribution
                </span>
              </div>
              <h2
                className="font-black leading-none mb-6"
                style={{
                  fontSize: 'clamp(36px, 6vw, 72px)',
                  color: '#F5F5F4',
                  letterSpacing: '-0.04em',
                }}
                data-testid="text-industry-warehouse"
              >
                Total
                <br />
                stock
                <br />
                <span style={{ color: '#F59E0B' }}>control.</span>
              </h2>
              <p
                className="text-lg leading-relaxed mb-10"
                style={{ color: '#78716C' }}
              >
                Goods receipt, pick-and-pack, and dispatch — all tracked. Barcode
                and RFID scanning supported.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {warehouseItems.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl"
                  style={{ backgroundColor: '#1C1917' }}
                >
                  <div style={{ color: '#F59E0B' }} className="mt-0.5 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold mb-1" style={{ color: '#F5F5F4' }}>
                      {item.label}
                    </div>
                    <div className="text-sm" style={{ color: '#78716C' }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Demo Section ─────────────────────────────────────────────────────────────

function DemoSection() {
  return (
    <section style={{ backgroundColor: '#1C1917' }} className="py-32">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p
          className="text-xs font-bold tracking-widest uppercase mb-4"
          style={{ color: '#F59E0B' }}
        >
          Product demo
        </p>
        <h2
          className="font-black mb-16"
          style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            color: '#F5F5F4',
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
          }}
        >
          See Leo in action.
        </h2>

        {/* 16:9 Video Placeholder */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            aspectRatio: '16 / 9',
            backgroundColor: '#0C0A09',
            boxShadow:
              '0 0 0 1px #44403C, 0 0 80px 0 rgba(245,158,11,0.25), 0 0 160px 0 rgba(245,158,11,0.10)',
          }}
        >
          {/* Amber glow ring behind button */}
          <div
            className="absolute rounded-full"
            style={{
              width: 140,
              height: 140,
              backgroundColor: 'rgba(245,158,11,0.15)',
              boxShadow:
                '0 0 0 24px rgba(245,158,11,0.08), 0 0 0 48px rgba(245,158,11,0.04)',
            }}
          />
          {/* Play button */}
          <button
            type="button"
            className="relative flex items-center justify-center rounded-full transition-transform hover:scale-110"
            style={{
              width: 88,
              height: 88,
              backgroundColor: '#F59E0B',
            }}
            aria-label="Play demo video"
            data-testid="button-play-demo"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#0C0A09"
              style={{ marginLeft: 4 }}
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </button>

          {/* Subtitle */}
          <span
            className="absolute bottom-8 left-0 right-0 text-center text-sm font-semibold tracking-wide"
            style={{ color: '#78716C' }}
          >
            3 minute product walkthrough
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Preview ──────────────────────────────────────────────────────────

function PricingPreview() {
  const plans = [
    {
      name: 'Starter',
      price: '29',
      desc: 'For single-location businesses getting started with POS.',
      features: [
        'Up to 3 registers',
        'Inventory tracking',
        'Card and cash payments',
        'Daily sales reports',
        'Email support',
      ],
      cta: 'Start free trial',
      highlighted: false,
      badge: null,
    },
    {
      name: 'Pro',
      price: '79',
      desc: 'For growing businesses that need more power and locations.',
      features: [
        'Unlimited terminals',
        'Multi-location (up to 5 sites)',
        'Real-time analytics dashboard',
        'Employee time and access control',
        'Priority phone and chat support',
        'API access',
      ],
      cta: 'Start free trial',
      highlighted: true,
      badge: 'Most popular',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'For large operations with specific integration and SLA needs.',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Dedicated account manager',
        'SLA and uptime guarantees',
        'On-site onboarding',
        'Custom reporting',
      ],
      cta: 'Talk to sales',
      highlighted: false,
      badge: null,
    },
  ];

  return (
    <section
      style={{ backgroundColor: '#1C1917', borderTop: '1px solid #44403C' }}
      className="py-32"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: '#F59E0B' }}
          >
            Pricing
          </p>
          <h2
            className="font-black"
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              color: '#F5F5F4',
              letterSpacing: '-0.04em',
            }}
          >
            Simple pricing.
          </h2>
          <p className="text-lg mt-4" style={{ color: '#78716C' }}>
            No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl p-8 flex flex-col"
              style={
                plan.highlighted
                  ? {
                      backgroundColor: '#292524',
                      border: '1px solid #F59E0B',
                      boxShadow: '0 0 40px rgba(245,158,11,0.15)',
                    }
                  : { backgroundColor: '#292524', border: '1px solid #44403C' }
              }
              data-testid={`card-plan-${plan.name.toLowerCase()}`}
            >
              <div className="mb-8">
                {plan.badge ? (
                  <span
                    className="inline-block px-2.5 py-1 rounded text-xs font-bold tracking-wide uppercase mb-4"
                    style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
                    data-testid="text-popular-badge"
                  >
                    {plan.badge}
                  </span>
                ) : (
                  <div className="mb-4 h-6" />
                )}
                <div
                  className="text-xs font-bold tracking-widest uppercase mb-4"
                  style={{ color: plan.highlighted ? '#F59E0B' : '#78716C' }}
                >
                  {plan.name}
                </div>
                <div className="flex items-end gap-1 mb-3">
                  {plan.price !== 'Custom' ? (
                    <>
                      <span
                        className="font-black leading-none"
                        style={{
                          fontSize: 'clamp(48px, 6vw, 72px)',
                          color: '#F5F5F4',
                          letterSpacing: '-0.04em',
                        }}
                      >
                        €{plan.price}
                      </span>
                      <span
                        className="text-sm font-medium mb-2"
                        style={{ color: '#78716C' }}
                      >
                        /mo
                      </span>
                    </>
                  ) : (
                    <span
                      className="font-black leading-none"
                      style={{
                        fontSize: 'clamp(36px, 4vw, 56px)',
                        color: '#F59E0B',
                        letterSpacing: '-0.04em',
                      }}
                    >
                      Custom
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      size={16}
                      className="shrink-0 mt-0.5"
                      style={{ color: '#F59E0B' }}
                    />
                    <span style={{ color: '#A8A29E' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/pricing"
                className="flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
                style={
                  plan.highlighted
                    ? { backgroundColor: '#F59E0B', color: '#0C0A09' }
                    : {
                        backgroundColor: 'transparent',
                        color: '#F5F5F4',
                        border: '1px solid #44403C',
                      }
                }
                data-testid={`button-plan-${plan.name.toLowerCase()}`}
              >
                {plan.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: '#F59E0B' }}
            data-testid="link-see-all-pricing"
          >
            See full pricing details
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-40 text-center" style={{ backgroundColor: '#0C0A09' }}>
      <div className="max-w-4xl mx-auto px-6">
        <h2
          className="font-black leading-none mb-6"
          style={{
            fontSize: 'clamp(80px, 18vw, 200px)',
            color: '#F59E0B',
            letterSpacing: '-0.05em',
          }}
          data-testid="text-cta-headline"
        >
          Ready?
        </h2>
        <p
          className="text-xl md:text-2xl font-medium mb-12 max-w-lg mx-auto leading-relaxed"
          style={{ color: '#78716C' }}
        >
          Start your free 14-day trial. No credit card required. Cancel anytime.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-xl text-xl font-black transition-transform hover:scale-105"
          style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
          data-testid="button-cta-final"
        >
          Start for free
          <ArrowRight size={24} />
        </Link>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatStrip />
      <FeatureShowcase />
      <Industries />
      <DemoSection />
      <PricingPreview />
      <CTASection />
    </>
  );
}
