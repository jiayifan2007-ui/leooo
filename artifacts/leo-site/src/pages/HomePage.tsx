import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
            {t('home.hero.badge')}
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
          {t('home.hero.headline1')}
          <br />
          <span style={{ color: '#0C0A09' }}>{t('home.hero.headline2')}</span>
          <br />
          {t('home.hero.headline3')}
        </h1>

        <p
          className="text-xl md:text-2xl font-medium max-w-xl mb-12 leading-relaxed"
          style={{ color: '#292524' }}
          data-testid="text-hero-sub"
        >
          {t('home.hero.sub')}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold transition-transform hover:scale-105"
            style={{ backgroundColor: '#0C0A09', color: '#FCD34D' }}
            data-testid="button-hero-cta"
          >
            {t('home.hero.cta')}
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-base font-semibold"
            style={{ color: '#0C0A09' }}
            data-testid="link-hero-demo"
          >
            {t('home.hero.demo')}
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex items-center gap-3" style={{ color: '#0C0A09' }}>
          <div className="w-12 h-px" style={{ backgroundColor: '#0C0A09' }} />
          <span className="text-xs font-bold tracking-widest uppercase opacity-60">
            {t('home.hero.scroll')}
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Stat Strip ───────────────────────────────────────────────────────────────

function StatStrip() {
  const { t } = useTranslation();
  const { ref, visible } = useReveal();
  const stats = [
    { value: '4,200+', label: t('home.stats.biz') },
    { value: '99.9%', label: t('home.stats.uptime') },
    { value: '€2M+', label: t('home.stats.processed') },
    { value: '3 min', label: t('home.stats.setup') },
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
  const { t } = useTranslation();
  const { ref, visible } = useReveal();
  const features = [
    { num: '01', title: t('home.features.f1title'), desc: t('home.features.f1desc') },
    { num: '02', title: t('home.features.f2title'), desc: t('home.features.f2desc') },
    { num: '03', title: t('home.features.f3title'), desc: t('home.features.f3desc') },
    { num: '04', title: t('home.features.f4title'), desc: t('home.features.f4desc') },
  ];

  return (
    <section style={{ backgroundColor: '#1C1917' }} className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="mb-20">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-4 transition-all duration-700"
            style={{ color: '#F59E0B', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)' }}
          >
            {t('home.features.eyebrow')}
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
            {t('home.features.headline1')}
            <br />
            <span style={{ color: '#F59E0B' }}>{t('home.features.headline2')}</span>
            <br />
            {t('home.features.headline3')}
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
  const { t } = useTranslation();
  const restaurantRow = t('home.industries.restaurant.items', { returnObjects: true }) as {
    label: string;
    desc: string;
  }[];
  const retailRow = t('home.industries.retail.items', { returnObjects: true }) as {
    label: string;
    desc: string;
  }[];
  const warehouseRow = t('home.industries.warehouse.items', { returnObjects: true }) as {
    label: string;
    desc: string;
  }[];

  const restaurantItems = [
    { icon: <UtensilsCrossed size={20} />, label: restaurantRow[0].label, desc: restaurantRow[0].desc },
    { icon: <CreditCard size={20} />, label: restaurantRow[1].label, desc: restaurantRow[1].desc },
    { icon: <BarChart3 size={20} />, label: restaurantRow[2].label, desc: restaurantRow[2].desc },
    { icon: <Users size={20} />, label: restaurantRow[3].label, desc: restaurantRow[3].desc },
  ];

  const retailItems = [
    { icon: <ShoppingCart size={20} />, label: retailRow[0].label, desc: retailRow[0].desc },
    { icon: <Package size={20} />, label: retailRow[1].label, desc: retailRow[1].desc },
    { icon: <MapPin size={20} />, label: retailRow[2].label, desc: retailRow[2].desc },
    { icon: <Star size={20} />, label: retailRow[3].label, desc: retailRow[3].desc },
  ];

  const warehouseItems = [
    { icon: <Package size={20} />, label: warehouseRow[0].label, desc: warehouseRow[0].desc },
    { icon: <BarChart3 size={20} />, label: warehouseRow[1].label, desc: warehouseRow[1].desc },
    { icon: <Zap size={20} />, label: warehouseRow[2].label, desc: warehouseRow[2].desc },
    { icon: <Users size={20} />, label: warehouseRow[3].label, desc: warehouseRow[3].desc },
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
                  {t('home.industries.restaurant.eyebrow')}
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
                {t('home.industries.restaurant.headline1')}
                <br />
                {t('home.industries.restaurant.headline2')}
                <br />
                <span style={{ color: '#F59E0B' }}>{t('home.industries.restaurant.headline3')}</span>
              </h2>
              <p
                className="text-lg leading-relaxed mb-10"
                style={{ color: '#78716C' }}
              >
                {t('home.industries.restaurant.desc')}
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
                  {t('home.industries.retail.eyebrow')}
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
                {t('home.industries.retail.headline1')}
                <br />
                {t('home.industries.retail.headline2')}
                <br />
                <span style={{ color: '#D97706' }}>{t('home.industries.retail.headline3')}</span>
              </h2>
              <p
                className="text-lg leading-relaxed mb-10"
                style={{ color: '#44403C' }}
              >
                {t('home.industries.retail.desc')}
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
                  {t('home.industries.warehouse.eyebrow')}
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
                {t('home.industries.warehouse.headline1')}
                <br />
                {t('home.industries.warehouse.headline2')}
                <br />
                <span style={{ color: '#F59E0B' }}>{t('home.industries.warehouse.headline3')}</span>
              </h2>
              <p
                className="text-lg leading-relaxed mb-10"
                style={{ color: '#78716C' }}
              >
                {t('home.industries.warehouse.desc')}
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
  const { t } = useTranslation();
  return (
    <section style={{ backgroundColor: '#1C1917' }} className="py-32">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p
          className="text-xs font-bold tracking-widest uppercase mb-4"
          style={{ color: '#F59E0B' }}
        >
          {t('home.demo.eyebrow')}
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
          {t('home.demo.headline')}
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
            aria-label={t('home.demo.play')}
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
            {t('home.demo.subtitle')}
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Preview ──────────────────────────────────────────────────────────

function PricingPreview() {
  const { t } = useTranslation();
  const plans = [
    {
      name: t('pricingPage.tiers.starterName'),
      price: '29',
      desc: t('home.pricing.starterDesc'),
      features: [
        t('home.pricing.starterF1'),
        t('home.pricing.starterF2'),
        t('home.pricing.starterF3'),
        t('home.pricing.starterF4'),
        t('home.pricing.starterF5'),
      ],
      cta: t('common.startFreeTrial'),
      highlighted: false,
      badge: null,
    },
    {
      name: t('pricingPage.tiers.proName'),
      price: '79',
      desc: t('home.pricing.proDesc'),
      features: [
        t('home.pricing.proF1'),
        t('home.pricing.proF2'),
        t('home.pricing.proF3'),
        t('home.pricing.proF4'),
        t('home.pricing.proF5'),
        t('home.pricing.proF6'),
      ],
      cta: t('common.startFreeTrial'),
      highlighted: true,
      badge: t('home.pricing.mostPopular'),
    },
    {
      name: t('pricingPage.tiers.enterpriseName'),
      price: 'Custom',
      desc: t('home.pricing.enterpriseDesc'),
      features: [
        t('home.pricing.entF1'),
        t('home.pricing.entF2'),
        t('home.pricing.entF3'),
        t('home.pricing.entF4'),
        t('home.pricing.entF5'),
        t('home.pricing.entF6'),
      ],
      cta: t('pricingPage.tiers.enterpriseCta'),
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
            {t('home.pricing.eyebrow')}
          </p>
          <h2
            className="font-black"
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              color: '#F5F5F4',
              letterSpacing: '-0.04em',
            }}
          >
            {t('home.pricing.headline')}
          </h2>
          <p className="text-lg mt-4" style={{ color: '#78716C' }}>
            {t('home.pricing.sub')}
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
                        data-testid={`text-price-${plan.name}`}
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
                        {t('home.pricing.perMonth')}
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
                      {t('home.pricing.custom')}
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
            {t('home.pricing.seeAll')}
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CTASection() {
  const { t } = useTranslation();
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
          {t('home.cta.headline')}
        </h2>
        <p
          className="text-xl md:text-2xl font-medium mb-12 max-w-lg mx-auto leading-relaxed"
          style={{ color: '#78716C' }}
        >
          {t('home.cta.sub')}
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-xl text-xl font-black transition-transform hover:scale-105"
          style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
          data-testid="button-cta-final"
        >
          {t('home.cta.button')}
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
