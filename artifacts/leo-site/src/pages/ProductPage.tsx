import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Check,
  ChefHat,
  CircleCheck,
  ClipboardList,
  Database,
  Gift,
  Globe2,
  Heart,
  Layers3,
  ListChecks,
  Package,
  Printer,
  QrCode,
  ReceiptText,
  Send,
  ShoppingBag,
  Smartphone,
  Store,
  Tablet,
  Truck,
  UsersRound,
  Warehouse,
  Workflow,
} from 'lucide-react';
import POSMockup from '@/components/POSMockup';

type TranslationRecord = Record<string, string>;

type ProductCard = {
  id: string;
  title: string;
  description: string;
  highlight: string;
};

type ProductId = 'restaurant' | 'store' | 'warehouse' | 'erp' | 'app';

type ProductSelectorItem = {
  id: ProductId;
  label: string;
  short: string;
};

type ProductIntro = {
  eyebrow: string;
  headline: string;
  desc: string;
  support: string;
  cta: string;
};

type DetailStat = {
  value: string;
  label: string;
};

type DetailItem = {
  title: string;
  desc: string;
};

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

function Eyebrow({ children }: { children: string }) {
  return <p className="text-xs font-bold tracking-[0.16em] uppercase text-primary">{children}</p>;
}

function ProductSelector({
  selectedProduct,
  onSelect,
}: {
  selectedProduct: ProductId;
  onSelect: (product: ProductId) => void;
}) {
  const { t } = useTranslation();
  const [hoveredProduct, setHoveredProduct] = useState<ProductId | null>(null);
  const items = t('product.selector.items', { returnObjects: true }) as unknown as ProductSelectorItem[];
  const icons = [ChefHat, Store, Warehouse, Database, Smartphone];

  return (
    <section id="products" className="border-y border-border bg-card pt-16" aria-label={t('product.selector.eyebrow')}>
      <div className="max-w-6xl mx-auto px-6 py-4 md:py-5">
        <div className="flex items-center justify-between gap-5">
          <div className="hidden shrink-0 lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{t('product.selector.eyebrow')}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t('product.selector.hint')}</p>
          </div>
          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1" role="tablist" aria-label={t('product.selector.title')}>
            {items.map((item, index) => {
              const Icon = icons[index];
              const isSelected = selectedProduct === item.id;
              const isHovered = hoveredProduct === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`product-intro-${item.id}`}
                  onClick={() => onSelect(item.id)}
                  onMouseEnter={() => setHoveredProduct(item.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onFocus={() => setHoveredProduct(item.id)}
                  onBlur={() => setHoveredProduct(null)}
                  className={`group relative min-w-[154px] shrink-0 overflow-hidden rounded-xl border px-4 py-3 text-left transition-all duration-300 ease-out ${
                    isSelected
                      ? 'border-primary-border bg-accent text-accent-foreground shadow-sm'
                      : isHovered
                        ? '-translate-y-1 border-primary-border bg-accent/70 text-foreground shadow-lg'
                        : 'border-border bg-background text-muted-foreground'
                  }`}
                  data-testid={`tab-product-${item.id}`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${
                      isSelected || isHovered
                        ? 'scale-110 rotate-3 bg-primary text-primary-foreground'
                        : 'bg-muted text-primary'
                    }`}>
                      <Icon size={16} strokeWidth={1.9} />
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.14em] text-primary">0{index + 1}</span>
                  </span>
                  <span className="mt-3 block text-sm font-bold tracking-tight">{item.label}</span>
                  <span className="mt-1 block truncate text-[11px] opacity-75">{item.short}</span>
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary transition-transform duration-300 ${
                    isSelected || isHovered ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero({ selectedProduct }: { selectedProduct: ProductId }) {
  const { t } = useTranslation();
  const { ref, visible } = useReveal(0.05);
  const points = t('product.hero.points', { returnObjects: true }) as unknown as string[];
  const intro = t(`product.intros.${selectedProduct}`, { returnObjects: true }) as unknown as ProductIntro;
  const productAnchors: Record<ProductId, string> = {
    restaurant: '#restaurant-pos',
    store: '#store-pos',
    warehouse: '#warehouse-pos',
    erp: '#custom-erp',
    app: '#loyalty-app',
  };
  const productAnchor = productAnchors[selectedProduct];

  return (
    <section className="bg-background">
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-18 lg:pt-36 lg:pb-24" ref={ref}>
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-16 items-center">
          <div
            className="space-y-7 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
            }}
          >
            <div key={selectedProduct} id={`product-intro-${selectedProduct}`} role="tabpanel" className="animate-in fade-in-0 slide-in-from-bottom-3 duration-500">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent px-3 py-1.5 text-accent-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs font-semibold tracking-wide uppercase">{intro.eyebrow}</span>
              </div>
              <h1
                className="mt-6 max-w-3xl text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-[-0.045em] text-foreground"
                data-testid="text-product-headline"
              >
                {intro.headline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{intro.desc}</p>
              <p className="mt-4 max-w-lg border-l-2 border-primary pl-4 text-sm font-semibold leading-relaxed text-foreground/80">{intro.support}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/pricing"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-primary-border bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
                data-testid="button-product-trial"
              >
                {t('product.hero.trial')}
                <ArrowRight size={16} />
              </Link>
              <a
                href={productAnchor}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                data-testid="link-product-restaurant"
              >
                {intro.cta}
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
              {points.map((point) => (
                <span key={point} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Check size={14} className="text-primary" />
                  {point}
                </span>
              ))}
            </div>
          </div>
          <div
            className="relative transition-all duration-700 delay-150"
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

function ProductSuite() {
  const { t } = useTranslation();
  const productCards = t('product.suite.cards', { returnObjects: true }) as unknown as ProductCard[];
  const icons = [ChefHat, Store, Warehouse, Database, Smartphone];

  return (
    <section id="products" className="border-y border-border bg-card py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <Eyebrow>{t('product.suite.eyebrow')}</Eyebrow>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-[-0.04em] text-foreground" data-testid="text-suite-headline">
            {t('product.suite.headline')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t('product.suite.desc')}</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
          {productCards.map((card, index) => {
            const Icon = icons[index];
            return (
              <a
                key={card.id}
                href={card.id === 'restaurant' ? '#restaurant-pos' : '#platforms'}
                className={`group rounded-xl border p-5 transition-transform hover:-translate-y-1 ${
                  card.id === 'restaurant'
                    ? 'border-primary-border bg-accent'
                    : 'border-border bg-background'
                }`}
                data-testid={`link-suite-${card.id}`}
              >
                <Icon size={24} className="text-primary" strokeWidth={1.8} />
                <h3 className="mt-8 text-lg font-bold tracking-tight text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                <p className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-primary">
                  {card.highlight}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RestaurantFlow() {
  const { t } = useTranslation();
  const flow = t('product.restaurant.flow', { returnObjects: true }) as unknown as TranslationRecord[];
  const channels = t('product.restaurant.channels', { returnObjects: true }) as unknown as string[];
  const capabilities = t('product.restaurant.capabilities', { returnObjects: true }) as unknown as string[];
  const steps = [
    { icon: ClipboardList, key: 'cashier' },
    { icon: ChefHat, key: 'kitchen' },
    { icon: Tablet, key: 'server' },
    { icon: Smartphone, key: 'customer' },
  ];

  return (
    <section id="restaurant-pos" className="bg-sidebar py-24 md:py-28" data-testid="section-restaurant-detail">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
          <div>
            <Eyebrow>{t('product.restaurant.eyebrow')}</Eyebrow>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight tracking-[-0.04em] text-sidebar-foreground" data-testid="text-restaurant-headline">
              {t('product.restaurant.headline')}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t('product.restaurant.desc')}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-sidebar-border bg-sidebar-accent p-4">
                <Printer size={20} className="text-primary" />
                <p className="mt-4 text-3xl font-bold text-sidebar-foreground">{t('product.restaurant.printersValue')}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t('product.restaurant.printersLabel')}</p>
              </div>
              <div className="rounded-xl border border-sidebar-border bg-sidebar-accent p-4">
                <Tablet size={20} className="text-primary" />
                <p className="mt-4 text-3xl font-bold text-sidebar-foreground">{t('product.restaurant.tabletsValue')}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t('product.restaurant.tabletsLabel')}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent p-5 md:p-7">
            <p className="text-sm font-bold text-sidebar-foreground">{t('product.restaurant.flowTitle')}</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {steps.map(({ icon: Icon, key }, index) => {
                const item = flow[index];
                return (
                  <div key={key} className="relative rounded-xl border border-sidebar-border bg-sidebar p-4">
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Icon size={18} />
                      </span>
                      <span className="text-xs font-bold text-primary">0{index + 1}</span>
                    </div>
                    <h3 className="mt-7 font-bold text-sidebar-foreground">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 border-t border-sidebar-border pt-5">
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-primary">{t('product.restaurant.channelsTitle')}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {channels.map((channel, index) => {
                  const Icon = [QrCode, Tablet, Smartphone][index];
                  return (
                    <span key={channel} className="inline-flex items-center gap-2 rounded-full border border-sidebar-border px-3 py-1.5 text-xs font-medium text-sidebar-foreground">
                      <Icon size={14} className="text-primary" />
                      {channel}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-3">
          {capabilities.map((capability, index) => {
            const Icon = [ReceiptText, Send, ShoppingBag][index];
            return (
              <div key={capability} className="flex gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent p-5">
                <Icon size={20} className="mt-0.5 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-sidebar-foreground">{capability}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StoreDetail() {
  const { t } = useTranslation();
  const detail = t('product.details.store', { returnObjects: true }) as unknown as {
    eyebrow: string;
    headline: string;
    desc: string;
    stats: DetailStat[];
    workflowTitle: string;
    workflow: DetailItem[];
    featuresTitle: string;
    features: string[];
    calloutTitle: string;
    calloutDesc: string;
  };

  return (
    <section id="store-pos" className="bg-background py-24 md:py-28" data-testid="section-store-detail">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 items-end">
          <div className="max-w-2xl">
            <Eyebrow>{detail.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight tracking-[-0.04em] text-foreground">
              {detail.headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{detail.desc}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {detail.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                <p className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 rounded-2xl border border-primary-border bg-accent p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Store size={20} />
            </span>
            <h3 className="text-lg font-bold text-accent-foreground">{detail.workflowTitle}</h3>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {detail.workflow.map((item, index) => (
              <div key={item.title} className="rounded-xl border border-accent-border bg-background p-5">
                <span className="text-xs font-bold tracking-[0.14em] text-primary">0{index + 1}</span>
                <h4 className="mt-8 font-bold text-foreground">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-[0.7fr_1.3fr] gap-5 items-stretch">
          <div className="rounded-2xl bg-sidebar p-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{detail.featuresTitle}</p>
            <p className="mt-4 text-xl font-bold leading-snug text-sidebar-foreground">{detail.calloutTitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{detail.calloutDesc}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {detail.features.map((feature) => (
              <div key={feature} className="flex gap-3 rounded-xl border border-border bg-card p-5">
                <CircleCheck size={18} className="mt-0.5 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WarehouseDetail() {
  const { t } = useTranslation();
  const detail = t('product.details.warehouse', { returnObjects: true }) as unknown as {
    eyebrow: string;
    headline: string;
    desc: string;
    stats: DetailStat[];
    workflowTitle: string;
    workflow: DetailItem[];
    featuresTitle: string;
    features: string[];
  };

  return (
    <section id="warehouse-pos" className="bg-sidebar py-24 md:py-28" data-testid="section-warehouse-detail">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
          <div>
            <Eyebrow>{detail.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight tracking-[-0.04em] text-sidebar-foreground">
              {detail.headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{detail.desc}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {detail.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-sidebar-border bg-sidebar-accent p-4">
                  <p className="text-3xl font-bold text-sidebar-foreground">{stat.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent p-5 md:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Warehouse size={20} />
              </span>
              <h3 className="font-bold text-sidebar-foreground">{detail.workflowTitle}</h3>
            </div>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {detail.workflow.map((item, index) => (
                <div key={item.title} className="rounded-xl border border-sidebar-border bg-sidebar p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary">0{index + 1}</span>
                    <Boxes size={17} className="text-primary" />
                  </div>
                  <h4 className="mt-7 font-bold text-sidebar-foreground">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{detail.featuresTitle}</p>
          <div className="mt-4 grid md:grid-cols-3 gap-3">
            {detail.features.map((feature) => (
              <div key={feature} className="flex gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent p-5">
                <BarChart3 size={19} className="mt-0.5 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-sidebar-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ErpDetail() {
  const { t } = useTranslation();
  const detail = t('product.details.erp', { returnObjects: true }) as unknown as {
    eyebrow: string;
    headline: string;
    desc: string;
    modulesTitle: string;
    modules: DetailItem[];
    featuresTitle: string;
    features: string[];
    calloutTitle: string;
    calloutDesc: string;
  };

  return (
    <section id="custom-erp" className="bg-card py-24 md:py-28" data-testid="section-erp-detail">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <Eyebrow>{detail.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight tracking-[-0.04em] text-foreground">
            {detail.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{detail.desc}</p>
        </div>
        <div className="mt-12 grid lg:grid-cols-[0.65fr_1.35fr] gap-5">
          <div className="rounded-2xl bg-sidebar p-7">
            <Layers3 size={28} className="text-primary" />
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-primary">{detail.modulesTitle}</p>
            <p className="mt-4 text-2xl font-bold leading-tight text-sidebar-foreground">{detail.calloutTitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{detail.calloutDesc}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {detail.modules.map((module, index) => (
              <div key={module.title} className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Workflow size={17} />
                  </span>
                  <span className="text-xs font-bold tracking-[0.14em] text-primary">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-lg font-bold text-foreground">{module.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-3">
          {detail.features.map((feature) => (
            <div key={feature} className="flex gap-3 rounded-xl border border-border bg-background p-5">
              <ListChecks size={19} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-foreground">{feature}</p>
            </div>
          ))}
        </div>
        </div>
    </section>
  );
}

function LoyaltyDetail() {
  const { t } = useTranslation();
  const detail = t('product.details.app', { returnObjects: true }) as unknown as {
    eyebrow: string;
    headline: string;
    desc: string;
    journeyTitle: string;
    journey: DetailItem[];
    benefitsTitle: string;
    benefits: string[];
    calloutTitle: string;
    calloutDesc: string;
  };

  return (
    <section id="loyalty-app" className="bg-background py-24 md:py-28" data-testid="section-app-detail">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-12 items-end">
          <div className="max-w-2xl">
            <Eyebrow>{detail.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight tracking-[-0.04em] text-foreground">
              {detail.headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{detail.desc}</p>
          </div>
          <div className="rounded-2xl border border-primary-border bg-accent p-7">
            <Heart size={28} className="text-primary" />
            <p className="mt-7 text-xl font-bold text-accent-foreground">{detail.calloutTitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-accent-foreground">{detail.calloutDesc}</p>
          </div>
        </div>
        <div className="mt-14 rounded-2xl bg-sidebar p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Gift size={20} />
            </span>
            <h3 className="font-bold text-sidebar-foreground">{detail.journeyTitle}</h3>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {detail.journey.map((item, index) => (
              <div key={item.title} className="rounded-xl border border-sidebar-border bg-sidebar-accent p-5">
                <span className="text-xs font-bold tracking-[0.14em] text-primary">0{index + 1}</span>
                <h4 className="mt-8 font-bold text-sidebar-foreground">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{detail.benefitsTitle}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {detail.benefits.map((benefit) => (
              <span key={benefit} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground">
                <Smartphone size={15} className="text-primary" />
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductDetails({ selectedProduct }: { selectedProduct: ProductId }) {
  switch (selectedProduct) {
    case 'restaurant':
      return <RestaurantFlow />;
    case 'store':
      return <StoreDetail />;
    case 'warehouse':
      return <WarehouseDetail />;
    case 'erp':
      return <ErpDetail />;
    case 'app':
      return <LoyaltyDetail />;
  }
}

function PlatformCards() {
  const { t } = useTranslation();
  const cards = t('product.platforms.cards', { returnObjects: true }) as unknown as ProductCard[];
  const icons = [Store, Warehouse, Truck, UsersRound];

  return (
    <section id="platforms" className="bg-background py-24 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <Eyebrow>{t('product.platforms.eyebrow')}</Eyebrow>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-[-0.04em] text-foreground" data-testid="text-platforms-headline">
            {t('product.platforms.headline')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t('product.platforms.desc')}</p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <article key={card.id} className="rounded-2xl border border-border bg-card p-7 md:p-8" data-testid={`card-platform-${card.id}`}>
                <div className="flex items-start justify-between gap-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon size={22} />
                  </span>
                  <span className="text-xs font-bold tracking-[0.14em] text-primary">0{index + 2}</span>
                </div>
                <h3 className="mt-10 text-2xl font-bold tracking-tight text-foreground">{card.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{card.description}</p>
                <div className="mt-6 flex items-center gap-2 border-t border-border pt-5 text-sm font-semibold text-foreground">
                  <Check size={16} className="text-primary" />
                  {card.highlight}
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-5 rounded-2xl border border-primary-border bg-accent p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Globe2 size={24} />
          </span>
          <div>
            <p className="font-bold text-accent-foreground">{t('product.platforms.appCalloutTitle')}</p>
            <p className="mt-1 text-sm leading-relaxed text-accent-foreground">{t('product.platforms.appCalloutDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  const { t } = useTranslation();
  return (
    <section className="bg-sidebar py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Eyebrow>{t('product.cta.eyebrow')}</Eyebrow>
        <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-[-0.04em] text-sidebar-foreground" data-testid="text-product-cta-headline">
          {t('product.cta.headline1')}
          <br />
          <span className="text-primary">{t('product.cta.headline2')}</span>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t('product.cta.desc')}</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-primary-border bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
            data-testid="button-product-final-cta"
          >
            {t('product.cta.button')}
            <ArrowRight size={16} />
          </Link>
          <a
            href="#products"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-sidebar-border px-6 py-3 text-sm font-semibold text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
            data-testid="link-product-suite"
          >
            {t('product.cta.explore')}
          </a>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">{t('product.cta.fineprint')}</p>
      </div>
    </section>
  );
}

export default function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductId>('restaurant');

  return (
    <>
      <ProductSelector selectedProduct={selectedProduct} onSelect={setSelectedProduct} />
      <Hero selectedProduct={selectedProduct} />
      <div key={selectedProduct} className="animate-in fade-in-0 duration-500">
        <ProductDetails selectedProduct={selectedProduct} />
      </div>
      <ClosingCTA />
    </>
  );
}