import { useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Star,
  Zap,
} from 'lucide-react';

type TierId = 'starter' | 'pro' | 'enterprise';
type ProductId = 'restaurant' | 'store' | 'warehouse' | 'erp' | 'loyalty';
type HardwareId = 'terminal' | 'tablet' | 'printer' | 'scanner' | 'display';

function buildTiers(t: TFunction) {
  return [
    {
      id: 'starter' as TierId,
      name: t('pricingPage.tiers.starterName'),
      price: '€29',
      monthlyPrice: 29,
      period: t('pricingPage.tiers.perMonth'),
      desc: t('pricingPage.tiers.starterDesc'),
      features: t('pricingPage.tiers.starterFeatures', { returnObjects: true }) as unknown as string[],
      cta: t('pricingPage.tiers.starterCta'),
      headerTone: 'light',
    },
    {
      id: 'pro' as TierId,
      name: t('pricingPage.tiers.proName'),
      price: '€79',
      monthlyPrice: 79,
      period: t('pricingPage.tiers.perMonth'),
      desc: t('pricingPage.tiers.proDesc'),
      features: t('pricingPage.tiers.proFeatures', { returnObjects: true }) as unknown as string[],
      cta: t('pricingPage.tiers.proCta'),
      headerTone: 'amber',
    },
    {
      id: 'enterprise' as TierId,
      name: t('pricingPage.tiers.enterpriseName'),
      price: t('pricingPage.tiers.custom'),
      monthlyPrice: null,
      period: '',
      desc: t('pricingPage.tiers.enterpriseDesc'),
      features: t('pricingPage.tiers.enterpriseFeatures', { returnObjects: true }) as unknown as string[],
      cta: t('pricingPage.tiers.enterpriseCta'),
      headerTone: 'dark',
    },
  ];
}

function buildProducts(t: TFunction) {
  return [
    {
      id: 'restaurant' as ProductId,
      name: t('pricingPage.comparison.products.restaurant.name'),
      desc: t('pricingPage.comparison.products.restaurant.desc'),
      details: t('pricingPage.comparison.products.restaurant.details', { returnObjects: true }) as unknown as string[],
      plans: ['starter', 'pro', 'enterprise'] as TierId[],
    },
    {
      id: 'store' as ProductId,
      name: t('pricingPage.comparison.products.store.name'),
      desc: t('pricingPage.comparison.products.store.desc'),
      details: t('pricingPage.comparison.products.store.details', { returnObjects: true }) as unknown as string[],
      plans: ['starter', 'pro', 'enterprise'] as TierId[],
    },
    {
      id: 'warehouse' as ProductId,
      name: t('pricingPage.comparison.products.warehouse.name'),
      desc: t('pricingPage.comparison.products.warehouse.desc'),
      details: t('pricingPage.comparison.products.warehouse.details', { returnObjects: true }) as unknown as string[],
      plans: ['pro', 'enterprise'] as TierId[],
    },
    {
      id: 'erp' as ProductId,
      name: t('pricingPage.comparison.products.erp.name'),
      desc: t('pricingPage.comparison.products.erp.desc'),
      details: t('pricingPage.comparison.products.erp.details', { returnObjects: true }) as unknown as string[],
      plans: ['enterprise'] as TierId[],
    },
    {
      id: 'loyalty' as ProductId,
      name: t('pricingPage.comparison.products.loyalty.name'),
      desc: t('pricingPage.comparison.products.loyalty.desc'),
      details: t('pricingPage.comparison.products.loyalty.details', { returnObjects: true }) as unknown as string[],
      plans: ['pro', 'enterprise'] as TierId[],
    },
  ];
}

function buildHardware(t: TFunction) {
  return [
    {
      id: 'terminal' as HardwareId,
      name: t('pricingPage.hardware.terminal.name'),
      desc: t('pricingPage.hardware.terminal.desc'),
      price: 399,
    },
    {
      id: 'tablet' as HardwareId,
      name: t('pricingPage.hardware.tablet.name'),
      desc: t('pricingPage.hardware.tablet.desc'),
      price: 249,
    },
    {
      id: 'printer' as HardwareId,
      name: t('pricingPage.hardware.printer.name'),
      desc: t('pricingPage.hardware.printer.desc'),
      price: 189,
    },
    {
      id: 'scanner' as HardwareId,
      name: t('pricingPage.hardware.scanner.name'),
      desc: t('pricingPage.hardware.scanner.desc'),
      price: 129,
    },
    {
      id: 'display' as HardwareId,
      name: t('pricingPage.hardware.display.name'),
      desc: t('pricingPage.hardware.display.desc'),
      price: 149,
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
  const products = buildProducts(t);
  const hardware = buildHardware(t);
  const faqs = buildFaqs(t);
  const [selectedTier, setSelectedTier] = useState<TierId>('pro');
  const [selectedHardware, setSelectedHardware] = useState<HardwareId[]>([]);
  const [expandedProduct, setExpandedProduct] = useState<ProductId | null>('restaurant');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const selectedTierData = tiers.find((tier) => tier.id === selectedTier) ?? tiers[1];
  const selectedHardwareData = hardware.filter((item) => selectedHardware.includes(item.id));
  const hardwareTotal = selectedHardwareData.reduce((total, item) => total + item.price, 0);
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
      <section className="relative overflow-hidden px-6 pb-20 pt-32" style={{ backgroundColor: '#1C1917' }}>
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: '#F59E0B', opacity: 0.1 }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#F59E0B' }}>
            {t('pricingPage.hero.badge')}
          </p>
          <h1
            className="max-w-4xl font-black leading-[0.95]"
            style={{ color: '#F5F5F4', fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '-0.055em' }}
            data-testid="text-pricing-headline"
          >
            {t('pricingPage.hero.headline1')}
            <br />
            <span style={{ color: '#F59E0B' }}>{t('pricingPage.hero.headline2')}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed" style={{ color: '#A8A29E' }}>
            {t('pricingPage.hero.sub')}
          </p>
          <button
            type="button"
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-all hover:bg-amber-400 hover:text-stone-950"
            style={{ borderColor: '#F59E0B', color: '#F59E0B' }}
            onClick={() => document.getElementById('plan-table')?.scrollIntoView({ behavior: 'smooth' })}
            data-testid="button-pricing-start"
          >
            {t('pricingPage.comparison.start')}
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <section id="plan-table" className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[24px] bg-[#F5F5F4] p-3 shadow-2xl sm:p-6 lg:p-10">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: '#B45309' }}>
                {t('pricingPage.comparison.eyebrow')}
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-stone-950 sm:text-4xl">
                {t('pricingPage.comparison.headline')}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-stone-500">
              {t('pricingPage.comparison.desc')}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-300">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead>
                <tr>
                  <th scope="col" className="w-[25%] align-top bg-[#F5F5F4] p-6 text-2xl font-black text-stone-950">
                    {t('pricingPage.comparison.productsLabel')}
                  </th>
                  {tiers.map((tier) => {
                    const isSelected = selectedTier === tier.id;
                    const tone = tier.headerTone === 'light'
                      ? { backgroundColor: '#E7E5E4', color: '#1C1917' }
                      : tier.headerTone === 'amber'
                        ? { backgroundColor: '#F59E0B', color: '#0C0A09' }
                        : { backgroundColor: '#292524', color: '#F5F5F4' };
                    return (
                      <th
                        key={tier.id}
                        scope="col"
                        className={`align-top p-6 transition-all duration-300 ${isSelected ? 'ring-4 ring-inset ring-amber-300' : 'hover:brightness-105'}`}
                        style={tone}
                      >
                        <button
                          type="button"
                          className="block w-full text-left"
                          onClick={() => setSelectedTier(tier.id)}
                          aria-pressed={isSelected}
                          data-testid={`button-plan-${tier.id}`}
                        >
                          {isSelected && (
                            <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-stone-950/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide">
                              <Check size={11} />
                              {t('pricingPage.comparison.selected')}
                            </span>
                          )}
                          <span className="block text-2xl font-black tracking-[-0.03em]">{tier.name}</span>
                          <span className="mt-4 block text-4xl font-black tracking-[-0.05em]">
                            {tier.price}
                            {tier.period && <small className="ml-1 text-sm font-bold opacity-70">{tier.period}</small>}
                          </span>
                          <span className="mt-3 block min-h-12 text-sm font-medium leading-relaxed opacity-80">{tier.desc}</span>
                          <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-stone-950 transition-transform group-hover:scale-105">
                            {tier.cta}
                            <ArrowRight size={14} />
                          </span>
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const expanded = expandedProduct === product.id;
                  return (
                    <>
                      <tr key={product.id} className="border-t border-stone-300 bg-[#F5F5F4] transition-colors hover:bg-white">
                        <th scope="row" className="p-0 align-top">
                          <button
                            type="button"
                            className="flex w-full items-start gap-3 p-5 text-left"
                            onClick={() => setExpandedProduct(expanded ? null : product.id)}
                            aria-expanded={expanded}
                            data-testid={`button-product-${product.id}`}
                          >
                            <ChevronRight
                              size={19}
                              className="mt-0.5 shrink-0 text-amber-600 transition-transform duration-200"
                              style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                            />
                            <span>
                              <span className="block text-lg font-bold text-stone-950">{product.name}</span>
                              <span className="mt-1 block max-w-xs text-sm font-normal leading-relaxed text-stone-500">{product.desc}</span>
                            </span>
                          </button>
                        </th>
                        {tiers.map((tier) => {
                          const included = product.plans.includes(tier.id);
                          return (
                            <td key={tier.id} className="border-l border-stone-300 p-5 align-middle text-center">
                              {included ? (
                                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-950">
                                  <Check size={16} className="text-amber-600" />
                                  {tier.id === 'enterprise' && product.id === 'erp'
                                    ? t('pricingPage.comparison.custom')
                                    : t('pricingPage.comparison.included')}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 text-sm text-stone-400">
                                  <Minus size={16} />
                                  {t('pricingPage.comparison.notIncluded')}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                      {expanded && (
                        <tr key={`${product.id}-details`} className="border-t border-stone-200 bg-white">
                          <td colSpan={4} className="px-8 py-6">
                            <div className="grid gap-5 md:grid-cols-[0.7fr_1.3fr] md:items-start">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                                  {t('pricingPage.comparison.detailsLabel')}
                                </p>
                                <p className="mt-2 text-lg font-bold text-stone-950">{product.name}</p>
                              </div>
                              <ul className="grid gap-3 sm:grid-cols-2">
                                {product.details.map((detail) => (
                                  <li key={detail} className="flex items-start gap-2 text-sm leading-relaxed text-stone-600">
                                    <Check size={15} className="mt-0.5 shrink-0 text-amber-600" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-12 border-t border-stone-300 pt-10">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                {t('pricingPage.comparison.hardwareEyebrow')}
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-stone-950">
                {t('pricingPage.comparison.hardwareHeadline')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">
                {t('pricingPage.comparison.hardwareDesc')}
              </p>
            </div>

            <div className="mt-7 overflow-x-auto rounded-2xl border border-stone-300">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead className="bg-stone-200/70 text-xs font-bold uppercase tracking-wide text-stone-500">
                  <tr>
                    <th className="p-4">{t('pricingPage.comparison.hardwareProduct')}</th>
                    <th className="p-4">{t('pricingPage.comparison.hardwarePrice')}</th>
                    <th className="p-4">{t('pricingPage.comparison.hardwareType')}</th>
                    <th className="p-4 text-right">{t('pricingPage.comparison.hardwareAction')}</th>
                  </tr>
                </thead>
                <tbody>
                  {hardware.map((item) => {
                    const selected = selectedHardware.includes(item.id);
                    return (
                      <tr key={item.id} className="border-t border-stone-300 bg-[#F5F5F4] transition-colors hover:bg-white">
                        <td className="p-4">
                          <p className="font-bold text-stone-950">{item.name}</p>
                          <p className="mt-1 text-sm text-stone-500">{item.desc}</p>
                        </td>
                        <td className="p-4 font-black text-stone-950">{formatEuro(item.price)}</td>
                        <td className="p-4 text-sm text-stone-500">{t('pricingPage.comparison.oneTime')}</td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-bold transition-all hover:scale-[1.03]"
                            style={{
                              borderColor: selected ? '#B45309' : '#A8A29E',
                              backgroundColor: selected ? '#F59E0B' : 'transparent',
                              color: '#1C1917',
                            }}
                            onClick={() => toggleHardware(item.id)}
                            aria-pressed={selected}
                            data-testid={`button-hardware-${item.id}`}
                          >
                            {selected ? <Check size={14} /> : <Plus size={14} />}
                            {selected ? t('pricingPage.comparison.remove') : t('pricingPage.comparison.add')}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 rounded-2xl p-6 sm:p-8" style={{ backgroundColor: '#292524', color: '#F5F5F4' }} data-testid="panel-price-summary">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto_auto] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: '#F59E0B' }}>
                  {t('pricingPage.comparison.summaryEyebrow')}
                </p>
                <h3 className="mt-2 text-2xl font-black">{t('pricingPage.comparison.summaryHeadline')}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: '#A8A29E' }}>
                  <strong style={{ color: '#F5F5F4' }}>{selectedTierData.name}</strong>
                  {' · '}
                  {selectedHardwareData.length > 0
                    ? selectedHardwareData.map((item) => item.name).join(', ')
                    : t('pricingPage.comparison.noneSelected')}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#78716C' }}>
                  {t('pricingPage.comparison.firstMonth')}
                </p>
                <p className="mt-2 text-4xl font-black tracking-[-0.05em]" style={{ color: '#F59E0B' }}>
                  {firstMonthTotal === null ? t('pricingPage.tiers.custom') : formatEuro(firstMonthTotal)}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#78716C' }}>
                  {t('pricingPage.comparison.recurring')}
                </p>
                <p className="mt-2 text-xl font-bold">
                  {selectedTierData.monthlyPrice === null
                    ? t('pricingPage.tiers.custom')
                    : `${formatEuro(selectedTierData.monthlyPrice)} ${t('pricingPage.tiers.perMonth')}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t px-6 py-20" style={{ borderColor: '#292524' }}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-widest" style={{ color: '#F59E0B' }}>
            {t('pricingPage.includes.eyebrow')}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {(t('pricingPage.includes.items', { returnObjects: true }) as string[]).map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg p-4 text-left" style={{ backgroundColor: '#292524' }}>
                <Zap size={14} style={{ color: '#F59E0B' }} />
                <span className="text-sm font-medium" style={{ color: '#A8A29E' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t px-6 py-24" style={{ borderColor: '#292524' }}>
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: '#F59E0B' }}>
              {t('pricingPage.faq.eyebrow')}
            </p>
            <h2 className="font-black tracking-[-0.04em]" style={{ color: '#F5F5F4', fontSize: 'clamp(32px, 5vw, 52px)' }}>
              {t('pricingPage.faq.headline')}
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="overflow-hidden rounded-xl border transition-colors" style={{ backgroundColor: '#292524', borderColor: open ? '#F59E0B' : '#44403C' }}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    data-testid={`button-faq-${i}`}
                  >
                    <span className="text-base font-semibold" style={{ color: '#F5F5F4' }}>{faq.q}</span>
                    <ChevronRight size={18} style={{ color: '#78716C', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
                  </button>
                  {open && (
                    <div className="px-6 pb-5" style={{ color: '#A8A29E' }} data-testid={`text-faq-answer-${i}`}>
                      <p className="text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-24" style={{ backgroundColor: '#F59E0B' }}>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: '#92400E' }}>
            {t('pricingPage.cta.eyebrow')}
          </p>
          <h2 className="font-black leading-tight tracking-[-0.04em]" style={{ color: '#0C0A09', fontSize: 'clamp(32px, 6vw, 64px)' }}>
            {t('pricingPage.cta.headline1')}
            <br />
            {t('pricingPage.cta.headline2')}
          </h2>
          <p className="mx-auto mb-10 mt-4 max-w-xl text-base font-medium" style={{ color: '#92400E' }}>
            {t('pricingPage.cta.desc')}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#plan-table"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-sm font-bold transition-all hover:scale-105"
              style={{ backgroundColor: '#0C0A09', color: '#F5F5F4' }}
              data-testid="button-pricing-cta-trial"
            >
              {t('pricingPage.cta.button')}
              <ArrowRight size={16} />
            </a>
            <Link
              href="/product"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 px-8 py-4 text-sm font-bold transition-colors"
              style={{ borderColor: '#92400E', color: '#92400E' }}
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