import { useRef, useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Monitor,
  Package,
  Printer,
  ScanLine,
  ShoppingCart,
  Zap,
  Star,
  Tablet,
} from 'lucide-react';

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

function buildTiers(t: TFunction) {
  const tiersArr = [
    {
      id: 'starter' as const,
      name: t('pricingPage.tiers.starterName'),
      price: '€29',
      monthlyPrice: 29,
      isCustom: false,
      period: t('pricingPage.tiers.perMonth'),
      desc: t('pricingPage.tiers.starterDesc'),
      features: t('pricingPage.tiers.starterFeatures', { returnObjects: true }) as unknown as string[],
      cta: t('pricingPage.tiers.starterCta'),
      highlight: false,
      badge: null as string | null,
    },
    {
      id: 'pro' as const,
      name: t('pricingPage.tiers.proName'),
      price: '€79',
      monthlyPrice: 79,
      isCustom: false,
      period: t('pricingPage.tiers.perMonth'),
      desc: t('pricingPage.tiers.proDesc'),
      features: t('pricingPage.tiers.proFeatures', { returnObjects: true }) as unknown as string[],
      cta: t('pricingPage.tiers.proCta'),
      highlight: true,
      badge: t('pricingPage.tiers.mostPopular') as string | null,
    },
    {
      id: 'enterprise' as const,
      name: t('pricingPage.tiers.enterpriseName'),
      price: t('pricingPage.tiers.custom'),
      monthlyPrice: null,
      isCustom: true,
      period: '',
      desc: t('pricingPage.tiers.enterpriseDesc'),
      features: t('pricingPage.tiers.enterpriseFeatures', { returnObjects: true }) as unknown as string[],
      cta: t('pricingPage.tiers.enterpriseCta'),
      highlight: false,
      badge: null as string | null,
    },
  ];
  return tiersArr;
}

type TierId = 'starter' | 'pro' | 'enterprise';
type HardwareId = 'terminal' | 'tablet' | 'printer' | 'scanner' | 'display';

function buildHardware(t: TFunction) {
  return [
    {
      id: 'terminal' as HardwareId,
      name: t('pricingPage.hardware.terminal.name'),
      short: t('pricingPage.hardware.terminal.short'),
      desc: t('pricingPage.hardware.terminal.desc'),
      details: t('pricingPage.hardware.terminal.details', { returnObjects: true }) as unknown as string[],
      price: 399,
      icon: Monitor,
    },
    {
      id: 'tablet' as HardwareId,
      name: t('pricingPage.hardware.tablet.name'),
      short: t('pricingPage.hardware.tablet.short'),
      desc: t('pricingPage.hardware.tablet.desc'),
      details: t('pricingPage.hardware.tablet.details', { returnObjects: true }) as unknown as string[],
      price: 249,
      icon: Tablet,
    },
    {
      id: 'printer' as HardwareId,
      name: t('pricingPage.hardware.printer.name'),
      short: t('pricingPage.hardware.printer.short'),
      desc: t('pricingPage.hardware.printer.desc'),
      details: t('pricingPage.hardware.printer.details', { returnObjects: true }) as unknown as string[],
      price: 189,
      icon: Printer,
    },
    {
      id: 'scanner' as HardwareId,
      name: t('pricingPage.hardware.scanner.name'),
      short: t('pricingPage.hardware.scanner.short'),
      desc: t('pricingPage.hardware.scanner.desc'),
      details: t('pricingPage.hardware.scanner.details', { returnObjects: true }) as unknown as string[],
      price: 129,
      icon: ScanLine,
    },
    {
      id: 'display' as HardwareId,
      name: t('pricingPage.hardware.display.name'),
      short: t('pricingPage.hardware.display.short'),
      desc: t('pricingPage.hardware.display.desc'),
      details: t('pricingPage.hardware.display.details', { returnObjects: true }) as unknown as string[],
      price: 149,
      icon: ShoppingCart,
    },
  ];
}

function buildFaqs(t: TFunction) {
  return t('pricingPage.faq.items', { returnObjects: true }) as unknown as {
    q: string;
    a: string;
  }[];
}

export default function PricingPage() {
  const { t } = useTranslation();
  const tiers = buildTiers(t);
  const hardware = buildHardware(t);
  const faqs = buildFaqs(t);
  const { ref: headerRef, visible: headerVisible } = useReveal(0.1);
  const { ref: tiersRef, visible: tiersVisible } = useReveal(0.1);
  const { ref: faqRef, visible: faqVisible } = useReveal(0.1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<TierId>('pro');
  const [selectedHardware, setSelectedHardware] = useState<HardwareId[]>([]);
  const [activeHardware, setActiveHardware] = useState<HardwareId>('terminal');
  const selectedTierData = tiers.find((tier) => tier.id === selectedTier) ?? tiers[1];
  const selectedHardwareData = hardware.find((item) => item.id === activeHardware) ?? hardware[0];
  const hardwareTotal = hardware
    .filter((item) => selectedHardware.includes(item.id))
    .reduce((total, item) => total + item.price, 0);
  const firstMonthTotal = selectedTierData.monthlyPrice === null
    ? null
    : selectedTierData.monthlyPrice + hardwareTotal;
  const formatEuro = (amount: number) => `€${amount.toLocaleString('en-US')}`;

  const toggleHardware = (id: HardwareId) => {
    setSelectedHardware((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <div style={{ backgroundColor: '#1C1917' }}>
      {/* Hero / header */}
      <section
        className="relative pt-32 pb-20 px-6 overflow-hidden"
        style={{ backgroundColor: '#1C1917' }}
      >
        {/* Subtle amber glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ backgroundColor: '#F59E0B' }}
          aria-hidden="true"
        />
        <div
          ref={headerRef}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase mb-8 transition-all duration-700"
            style={{
              borderColor: '#D97706',
              color: '#FCD34D',
              backgroundColor: 'rgba(245,158,11,0.08)',
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <Star size={10} fill="#FCD34D" color="#FCD34D" />
            {t('pricingPage.hero.badge')}
          </div>
          <h1
            className="font-black leading-none mb-6 transition-all duration-700 delay-100"
            style={{
              fontSize: 'clamp(48px, 8vw, 96px)',
              color: '#F5F5F4',
              letterSpacing: '-0.04em',
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            }}
            data-testid="text-pricing-headline"
          >
            {t('pricingPage.hero.headline1')}
            <br />
            <span style={{ color: '#F59E0B' }}>{t('pricingPage.hero.headline2')}</span>
          </h1>
          <p
            className="text-xl font-medium max-w-xl mx-auto leading-relaxed transition-all duration-700 delay-200"
            style={{
              color: '#A8A29E',
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            {t('pricingPage.hero.sub')}
          </p>
        </div>
      </section>

      {/* Pricing tiers — Grounded treatment */}
      <section className="py-16 px-6" style={{ borderTop: '1px solid #44403C' }}>
        <div ref={tiersRef} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map(({ id, name, price, isCustom, period, desc, features, cta, highlight, badge }, i) => (
              <div
                key={name}
                className={`relative rounded-xl p-8 flex flex-col transition-all duration-700 ${
                  selectedTier === id
                    ? 'ring-2 ring-amber-400/80'
                    : 'hover:-translate-y-1 hover:border-amber-500/70'
                }`}
                style={{
                  backgroundColor: '#292524',
                  border: highlight ? '1px solid #F59E0B' : '1px solid #44403C',
                  boxShadow: highlight ? '0 0 40px rgba(245,158,11,0.15)' : 'none',
                  opacity: tiersVisible ? 1 : 0,
                  transform: tiersVisible ? 'translateY(0)' : 'translateY(32px)',
                  transitionDelay: `${i * 100}ms`,
                }}
                onClick={() => setSelectedTier(id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedTier(id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={selectedTier === id}
                data-testid={`card-pricing-${name.toLowerCase()}`}
              >
                {selectedTier === id && (
                  <span
                    className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
                  >
                    <Check size={11} />
                    {t('pricingPage.builder.selected')}
                  </span>
                )}
                {/* Badge / spacer */}
                <div className="mb-6">
                  {badge ? (
                    <span
                      className="inline-block px-2.5 py-1 rounded text-xs font-bold tracking-wide uppercase mb-4"
                      style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
                      data-testid={`text-badge-${name.toLowerCase()}`}
                    >
                      {badge}
                    </span>
                  ) : (
                    <div className="mb-4 h-6" />
                  )}

                  {/* Price */}
                  <div className="flex items-end gap-1 mb-2">
                    <span
                      className="font-black"
                      style={{
                        fontSize: isCustom ? 'clamp(32px, 4vw, 48px)' : 'clamp(40px, 5vw, 64px)',
                        color: isCustom ? '#F59E0B' : '#F5F5F4',
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                      }}
                    >
                      {price}
                    </span>
                    {period && (
                      <span
                        className="text-base font-medium mb-1"
                        style={{ color: '#78716C' }}
                      >
                        {period}
                      </span>
                    )}
                  </div>

                  <p
                    className="text-sm font-bold mb-1"
                    style={{ color: highlight ? '#F59E0B' : '#A8A29E' }}
                  >
                    {name}
                  </p>
                </div>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-6 pb-6 border-b"
                  style={{ color: '#78716C', borderColor: '#44403C' }}
                >
                  {desc}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        color="#F59E0B"
                        className="mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm" style={{ color: '#A8A29E' }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-bold transition-all hover:scale-[1.02]"
                  style={
                    highlight
                      ? { backgroundColor: '#F59E0B', color: '#0C0A09' }
                      : {
                          backgroundColor: 'transparent',
                          color: '#F5F5F4',
                          border: '1px solid #44403C',
                        }
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedTier(id);
                    document.getElementById('hardware-builder')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-testid={`button-cta-${name.toLowerCase()}`}
                >
                  {cta}
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware configurator */}
      <section
        id="hardware-builder"
        className="border-t px-6 py-20"
        style={{ borderColor: '#44403C', backgroundColor: '#0C0A09' }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: '#F59E0B' }}>
              {t('pricingPage.builder.eyebrow')}
            </p>
            <h2
              className="font-black leading-tight"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: '#F5F5F4', letterSpacing: '-0.04em' }}
            >
              {t('pricingPage.builder.headline1')}
              <br />
              <span style={{ color: '#F59E0B' }}>{t('pricingPage.builder.headline2')}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: '#A8A29E' }}>
              {t('pricingPage.builder.desc')}
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
            <div>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold" style={{ color: '#F5F5F4' }}>
                    {t('pricingPage.builder.hardwareTitle')}
                  </p>
                  <p className="mt-1 text-sm" style={{ color: '#78716C' }}>
                    {t('pricingPage.builder.hardwareDesc')}
                  </p>
                </div>
                <Package size={22} style={{ color: '#F59E0B' }} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {hardware.map((item) => {
                  const Icon = item.icon;
                  const selected = selectedHardware.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className="group relative rounded-xl p-5 text-left transition-[transform,box-shadow,border-color] duration-300 hover:z-10 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_20px_45px_rgba(0,0,0,0.28)] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      style={{
                        backgroundColor: selected ? '#3B2A12' : '#292524',
                        border: selected ? '1px solid #F59E0B' : '1px solid #44403C',
                      }}
                      onClick={() => {
                        setActiveHardware(item.id);
                        toggleHardware(item.id);
                      }}
                      aria-pressed={selected}
                      data-testid={`card-hardware-${item.id}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className="flex h-11 w-11 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: selected ? '#F59E0B' : '#3B2A12', color: selected ? '#0C0A09' : '#F59E0B' }}
                        >
                          <Icon size={21} />
                        </span>
                        <span className="text-base font-black" style={{ color: '#F5F5F4' }}>
                          {formatEuro(item.price)}
                        </span>
                      </div>
                      <p className="mt-7 text-base font-bold" style={{ color: '#F5F5F4' }}>{item.name}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide" style={{ color: '#F59E0B' }}>{item.short}</p>
                      <p className="mt-3 text-sm leading-relaxed" style={{ color: '#A8A29E' }}>{item.desc}</p>
                      <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold" style={{ color: selected ? '#F59E0B' : '#D6D3D1' }}>
                        {selected ? <Check size={14} /> : <ChevronRight size={14} />}
                        {selected ? t('pricingPage.builder.added') : t('pricingPage.builder.add')}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                className="mt-5 rounded-xl border p-6 transition-all duration-300"
                style={{ borderColor: '#44403C', backgroundColor: '#1C1917' }}
                data-testid="panel-hardware-details"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F59E0B' }}>
                      {t('pricingPage.builder.detailsLabel')}
                    </p>
                    <h3 className="mt-2 text-2xl font-black" style={{ color: '#F5F5F4' }}>{selectedHardwareData.name}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: '#A8A29E' }}>{selectedHardwareData.desc}</p>
                  </div>
                  <span className="text-xl font-black" style={{ color: '#F59E0B' }}>{formatEuro(selectedHardwareData.price)}</span>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {selectedHardwareData.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm" style={{ color: '#D6D3D1' }}>
                      <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#F59E0B' }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside
              className="rounded-2xl border p-6 lg:sticky lg:top-24"
              style={{ borderColor: '#F59E0B', backgroundColor: '#292524', boxShadow: '0 0 40px rgba(245,158,11,0.12)' }}
              data-testid="panel-price-summary"
            >
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F59E0B' }}>
                {t('pricingPage.builder.summaryEyebrow')}
              </p>
              <h3 className="mt-3 text-2xl font-black" style={{ color: '#F5F5F4' }}>
                {t('pricingPage.builder.summaryHeadline')}
              </h3>

              <div className="mt-7 space-y-4 border-b pb-6" style={{ borderColor: '#44403C' }}>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span style={{ color: '#A8A29E' }}>{t('pricingPage.builder.basePlan')}</span>
                  <span className="font-bold text-right" style={{ color: '#F5F5F4' }}>{selectedTierData.name}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span style={{ color: '#A8A29E' }}>{t('pricingPage.builder.monthly')}</span>
                  <span className="font-bold" style={{ color: '#F5F5F4' }}>
                    {selectedTierData.monthlyPrice === null ? t('pricingPage.tiers.custom') : `${formatEuro(selectedTierData.monthlyPrice)} ${t('pricingPage.tiers.perMonth')}`}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span style={{ color: '#A8A29E' }}>{t('pricingPage.builder.hardwareSelected')}</span>
                  <span className="font-bold" style={{ color: '#F5F5F4' }}>{selectedHardware.length}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span style={{ color: '#A8A29E' }}>{t('pricingPage.builder.hardwareTotal')}</span>
                  <span className="font-bold" style={{ color: '#F5F5F4' }}>{formatEuro(hardwareTotal)}</span>
                </div>
              </div>

              <div className="pt-6">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#78716C' }}>
                  {t('pricingPage.builder.firstMonth')}
                </p>
                <p className="mt-2 text-4xl font-black" style={{ color: '#F59E0B', letterSpacing: '-0.04em' }}>
                  {firstMonthTotal === null ? t('pricingPage.tiers.custom') : formatEuro(firstMonthTotal)}
                </p>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: '#78716C' }}>
                  {firstMonthTotal === null
                    ? t('pricingPage.builder.customNote')
                    : t('pricingPage.builder.firstMonthNote')}
                </p>
              </div>

              <button
                type="button"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-bold transition-all hover:scale-[1.02]"
                style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
                onClick={() => document.getElementById('pricing-contact')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-builder-cta"
              >
                {t('pricingPage.builder.cta')}
                <ArrowRight size={15} />
              </button>
            </aside>
          </div>
        </div>
      </section>

      {/* Feature comparison strip */}
      <section className="py-20 px-6" style={{ borderTop: '1px solid #292524' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#F59E0B' }}>
            {t('pricingPage.includes.eyebrow')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(t('pricingPage.includes.items', { returnObjects: true }) as string[]).map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-4 rounded-lg"
                style={{ backgroundColor: '#292524', border: '1px solid #44403C' }}
              >
                <Zap size={14} style={{ color: '#F59E0B' }} />
                <span className="text-sm font-medium" style={{ color: '#A8A29E' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="pricing-contact"
        className="py-24 px-6"
        style={{ borderTop: '1px solid #292524' }}
        ref={faqRef}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="mb-14 transition-all duration-700"
            style={{
              opacity: faqVisible ? 1 : 0,
              transform: faqVisible ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: '#F59E0B' }}
            >
              {t('pricingPage.faq.eyebrow')}
            </p>
            <h2
              className="font-black"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#F5F5F4', letterSpacing: '-0.03em' }}
            >
              {t('pricingPage.faq.headline')}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border transition-all duration-700"
                style={{
                  backgroundColor: '#292524',
                  borderColor: openFaq === i ? '#F59E0B' : '#44403C',
                  opacity: faqVisible ? 1 : 0,
                  transform: faqVisible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  data-testid={`button-faq-${i}`}
                >
                  <span className="text-base font-semibold" style={{ color: '#F5F5F4' }}>
                    {faq.q}
                  </span>
                  <ChevronRight
                    size={18}
                    style={{
                      color: '#78716C',
                      transform: openFaq === i ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div
                    className="px-6 pb-5"
                    style={{ color: '#78716C' }}
                    data-testid={`text-faq-answer-${i}`}
                  >
                    <p className="text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner — amber */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: '#F59E0B' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#92400E' }}
          >
            {t('pricingPage.cta.eyebrow')}
          </p>
          <h2
            className="font-black leading-tight mb-4"
            style={{
              fontSize: 'clamp(32px, 6vw, 64px)',
              color: '#0C0A09',
              letterSpacing: '-0.04em',
            }}
            data-testid="text-pricing-cta-headline"
          >
            {t('pricingPage.cta.headline1')}
            <br />
            {t('pricingPage.cta.headline2')}
          </h2>
          <p
            className="text-base font-medium max-w-xl mx-auto mb-10"
            style={{ color: '#92400E' }}
          >
            {t('pricingPage.cta.desc')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-sm font-bold transition-all hover:scale-105"
              style={{ backgroundColor: '#0C0A09', color: '#F5F5F4' }}
              data-testid="button-pricing-cta-trial"
            >
              {t('pricingPage.cta.button')}
              <ArrowRight size={16} />
            </a>
            <Link
              href="/product"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-sm font-bold border-2 transition-colors"
              style={{
                borderColor: '#92400E',
                color: '#92400E',
                backgroundColor: 'transparent',
              }}
              data-testid="link-pricing-see-product"
            >
              {t('pricingPage.cta.seeProduct')}
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
