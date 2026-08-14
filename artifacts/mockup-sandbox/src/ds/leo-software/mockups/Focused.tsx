import { useState } from 'react';
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

// ─── Types ──────────────────────────────────────────────────────────────────

type Industry = 'restaurant' | 'shop' | 'warehouse';

// ─── POS Mockup ─────────────────────────────────────────────────────────────

function POSMockup() {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[520px]">
      {/* outer glow */}
      <div className="absolute inset-0 rounded-3xl bg-[#F59E0B] opacity-10 blur-3xl" />

      {/* POS terminal */}
      <div
        className="relative w-80 rounded-2xl overflow-hidden shadow-2xl border border-[#44403C]"
        style={{ background: '#1C1917' }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#44403C]">
          <span className="text-xs font-semibold text-[#A8A29E] tracking-widest uppercase">Leo POS</span>
          <span className="text-xs text-[#F59E0B] font-medium">Table 4</span>
        </div>

        {/* Order list */}
        <div className="px-5 pt-4 pb-2 space-y-2">
          {[
            { name: 'Grilled Salmon', qty: 2, price: '€38.00' },
            { name: 'Caesar Salad', qty: 1, price: '€12.50' },
            { name: 'Sparkling Water', qty: 3, price: '€9.00' },
            { name: 'Tiramisu', qty: 2, price: '€16.00' },
            { name: 'House Red Wine', qty: 1, price: '€22.00' },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between py-1.5 border-b border-[#292524]"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#292524] text-[#F59E0B] text-xs flex items-center justify-center font-bold">
                  {item.qty}
                </span>
                <span className="text-sm text-[#F5F5F4]">{item.name}</span>
              </div>
              <span className="text-sm text-[#A8A29E]">{item.price}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-5 my-3 border-t border-dashed border-[#44403C]" />

        {/* Total */}
        <div className="px-5 pb-4 flex items-center justify-between">
          <span className="text-base font-semibold text-[#F5F5F4]">Total</span>
          <span className="text-2xl font-bold text-[#FCD34D]">€142.50</span>
        </div>

        {/* Action buttons */}
        <div className="px-5 pb-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="py-2.5 rounded-lg text-sm font-semibold bg-[#292524] text-[#A8A29E] border border-[#44403C]"
          >
            Split Bill
          </button>
          <button
            type="button"
            className="py-2.5 rounded-lg text-sm font-bold bg-[#F59E0B] text-[#0C0A09]"
          >
            Charge
          </button>
        </div>

        {/* Payment methods */}
        <div className="px-5 pb-5 flex items-center gap-2">
          {['Card', 'Cash', 'Mobile'].map((method) => (
            <span
              key={method}
              className="flex-1 text-center text-xs py-1.5 rounded-md bg-[#292524] text-[#78716C] border border-[#44403C]"
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#FFFBEB] border-b border-[#F59E0B]/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <span className="text-xl font-bold text-[#0C0A09] tracking-tight">
          Leo Software
        </span>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Industries', 'Pricing', 'About'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-[#44403C] hover:text-[#0C0A09] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            className="hidden md:block text-sm font-medium text-[#44403C] hover:text-[#0C0A09] transition-colors"
          >
            Sign in
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F59E0B] text-[#0C0A09] text-sm font-bold hover:bg-[#D97706] transition-colors"
          >
            Try free
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-[#FFFBEB]">
      <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[55fr_45fr] gap-16 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              <span className="text-xs font-semibold text-[#92400E] tracking-wide uppercase">
                One system. Any business.
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-[#0C0A09] leading-[1.1] tracking-tight">
              Clarity drives
              <br />
              <span className="text-[#F59E0B]">better business.</span>
            </h1>

            <p className="text-lg text-[#78716C] leading-relaxed max-w-lg">
              Leo Software brings orders, inventory, payments, and staff into one
              clean system — so you can focus on what matters, not the tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F59E0B] text-[#0C0A09] text-base font-bold hover:bg-[#D97706] transition-colors"
              >
                Start for free
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#44403C] text-[#1C1917] text-base font-semibold hover:border-[#F59E0B] hover:text-[#F59E0B] transition-colors"
              >
                See how it works
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-6 pt-2">
              {['No credit card required', 'Setup in under 5 minutes', 'Cancel anytime'].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0" />
                  <span className="text-xs text-[#78716C]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — POS mockup */}
          <div className="relative">
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
    <section className="bg-[#1C1917] py-6 border-y border-[#44403C]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
          <span className="text-sm font-semibold text-[#A8A29E] whitespace-nowrap">
            500+ businesses trust Leo Software
          </span>

          <div className="h-px w-full sm:w-px sm:h-5 bg-[#44403C]" />

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#292524] border border-[#44403C] text-xs font-medium text-[#A8A29E]"
              >
                <Icon className="w-3 h-3 text-[#F59E0B]" />
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
    <section id="features" className="bg-[#FFFBEB] py-24">
      <div className="max-w-5xl mx-auto px-6 space-y-24">
        {/* Section header */}
        <div className="text-center space-y-3">
          <p className="text-xs font-bold text-[#F59E0B] tracking-widest uppercase">
            What Leo does
          </p>
          <h2 className="text-4xl font-bold text-[#0C0A09] tracking-tight">
            Everything in one place. Nothing in the way.
          </h2>
        </div>

        {features.map((feature, i) => {
          const Icon = feature.icon;
          const isEven = i % 2 === 0;

          return (
            <div
              key={feature.title}
              className={`grid md:grid-cols-2 gap-16 items-center ${isEven ? '' : 'md:[&>*:first-child]:order-last'}`}
            >
              {/* Icon side */}
              <div className="flex justify-center">
                <div className="w-56 h-56 rounded-3xl bg-[#1C1917] flex items-center justify-center shadow-xl border border-[#44403C]">
                  <Icon className="w-20 h-20 text-[#F59E0B]" strokeWidth={1.2} />
                </div>
              </div>

              {/* Text side */}
              <div className="space-y-5">
                <h3 className="text-3xl font-bold text-[#0C0A09] leading-tight tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-base text-[#78716C] leading-relaxed">
                  {feature.description}
                </p>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F59E0B] hover:text-[#D97706] transition-colors"
                >
                  {feature.link}
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
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
    note: 'Used by sit-down restaurants, cafes, and bar & grill operations.',
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

  const tabs: { id: Industry; icon: typeof UtensilsCrossed; label: string }[] = [
    { id: 'restaurant', icon: UtensilsCrossed, label: 'Restaurant' },
    { id: 'shop', icon: ShoppingCart, label: 'Shop' },
    { id: 'warehouse', icon: Package, label: 'Warehouse' },
  ];

  const content = industryContent[active];

  return (
    <section id="industries" className="bg-[#F5F5F4]/30 py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-14">
          <p className="text-xs font-bold text-[#F59E0B] tracking-widest uppercase">
            Built for your industry
          </p>
          <h2 className="text-4xl font-bold text-[#0C0A09] tracking-tight">
            One platform. Every operation.
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-[#1C1917] p-1 gap-1">
            {tabs.map(({ id, icon: Icon, label }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  className={`
                    inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all
                    ${isActive
                      ? 'bg-[#F59E0B] text-[#0C0A09]'
                      : 'text-[#A8A29E] hover:text-[#F5F5F4]'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content panel */}
        <div className="bg-[#FFFBEB] border border-[#F59E0B]/20 rounded-2xl p-10 md:p-14">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#0C0A09] leading-snug">
                {content.headline}
              </h3>
              <p className="text-sm text-[#78716C]">{content.note}</p>
            </div>
            <ul className="space-y-3">
              {content.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/40 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#F59E0B]" />
                  </span>
                  <span className="text-sm text-[#44403C] leading-relaxed">{f}</span>
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
  return (
    <section className="bg-[#FFFBEB] py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative bg-[#1C1917] rounded-3xl px-10 py-14 md:px-16 md:py-20 overflow-hidden">
          {/* Amber accent */}
          <div className="absolute top-0 left-0 w-1 h-full bg-[#F59E0B] rounded-l-3xl" />
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#F59E0B] opacity-5" />

          {/* Stars */}
          <div className="flex gap-1 mb-8">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-2xl md:text-3xl font-medium text-[#F5F5F4] leading-relaxed mb-10 tracking-tight">
            "Before Leo, we were managing our kitchen, inventory, and payments
            across three different tools. Now it's one screen. Our close-out time
            dropped from forty minutes to under ten."
          </blockquote>

          {/* Attribution */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#292524] border border-[#44403C] flex items-center justify-center">
              <span className="text-lg font-bold text-[#F59E0B]">M</span>
            </div>
            <div>
              <p className="font-semibold text-[#F5F5F4]">Maria Haugen</p>
              <p className="text-sm text-[#78716C]">
                Owner, Brygga Kitchen — Oslo, Norway
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

function Pricing() {
  const tiers = [
    {
      name: 'Starter',
      price: '€29',
      period: '/mo',
      description: 'Everything you need to get started and stay organised.',
      features: [
        'Single location',
        'Up to 3 staff accounts',
        'Order and payment processing',
        'Basic inventory tracking',
        'Daily sales summary',
        'Email support',
      ],
      cta: 'Get started',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '€79',
      period: '/mo',
      description: 'For growing businesses that need full control.',
      features: [
        'Up to 5 locations',
        'Unlimited staff accounts',
        'Real-time analytics dashboard',
        'Full inventory and supplier sync',
        'Employee time and access control',
        'Priority chat and phone support',
      ],
      cta: 'Start Pro trial',
      highlight: true,
    },
  ];

  return (
    <section id="pricing" className="bg-[#1C1917] py-24 border-t border-[#44403C]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-14">
          <p className="text-xs font-bold text-[#F59E0B] tracking-widest uppercase">
            Transparent pricing
          </p>
          <h2 className="text-4xl font-bold text-[#F5F5F4] tracking-tight">
            Pay for what you use. Nothing more.
          </h2>
          <p className="text-base text-[#78716C]">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`
                relative rounded-2xl p-8 md:p-10 border-2 transition-all
                ${tier.highlight
                  ? 'bg-[#292524] border-[#F59E0B] shadow-[0_0_40px_rgba(245,158,11,0.15)]'
                  : 'bg-[#292524] border-[#44403C] hover:border-[#F59E0B]/40'
                }
              `}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-[#F59E0B] text-[#0C0A09] text-xs font-bold uppercase tracking-widest">
                    Most popular
                  </span>
                </div>
              )}

              {/* Tier header */}
              <div className="mb-6">
                <p
                  className={`text-sm font-semibold uppercase tracking-widest mb-2 ${
                    tier.highlight ? 'text-[#F59E0B]' : 'text-[#44403C]'
                  }`}
                >
                  {tier.name}
                </p>
                <div className="flex items-end gap-1 mb-2">
                  <span
                    className={`text-5xl font-bold tracking-tight ${
                      'text-[#F5F5F4]'
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={`text-base pb-1.5 ${
                      'text-[#78716C]'
                    }`}
                  >
                    {tier.period}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    'text-[#78716C]'
                  }`}
                >
                  {tier.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        tier.highlight ? 'text-[#F59E0B]' : 'text-[#F59E0B]'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        'text-[#A8A29E]'
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#cta"
                className={`
                  flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-colors
                  ${tier.highlight
                    ? 'bg-[#F59E0B] text-[#0C0A09] hover:bg-[#D97706]'
                    : 'bg-transparent text-[#F5F5F4] border border-[#44403C] hover:border-[#F59E0B] hover:text-[#F59E0B]'
                  }
                `}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Enterprise */}
        <div className="text-center py-8 px-6 rounded-2xl bg-[#FEF3C7] border border-[#F59E0B]/30">
          <p className="text-base font-semibold text-[#92400E] mb-1">
            Enterprise — custom pricing
          </p>
          <p className="text-sm text-[#78716C] mb-4">
            20+ locations, custom integrations, dedicated support, and SLA. Let's
            talk about what you need.
          </p>
          <a
            href="mailto:enterprise@leosoftware.com"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#D97706] hover:text-[#92400E] transition-colors"
          >
            Contact our team
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ──────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section id="cta" className="bg-[#1C1917] py-24">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#292524] border border-[#44403C]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
          <span className="text-xs font-semibold text-[#A8A29E] tracking-wide uppercase">
            Get started today
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-[#F5F5F4] leading-tight tracking-tight">
          Less complexity.
          <br />
          <span className="text-[#FCD34D]">More business.</span>
        </h2>

        <p className="text-lg text-[#A8A29E] leading-relaxed">
          Join 500+ businesses that replaced spreadsheets and separate tools with
          one focused system. Free for 14 days.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#F59E0B] text-[#0C0A09] text-base font-bold hover:bg-[#D97706] transition-colors"
          >
            Start your free trial
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#44403C] text-[#A8A29E] text-base font-semibold hover:border-[#F59E0B] hover:text-[#F5F5F4] transition-colors"
          >
            Read the docs
          </a>
        </div>

        <p className="text-xs text-[#78716C]">
          No credit card required. Cancel anytime. GDPR compliant.
        </p>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  const columns = [
    {
      heading: 'Product',
      links: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'Status'],
    },
    {
      heading: 'Industries',
      links: ['Restaurants', 'Retail', 'Warehouses', 'Food Trucks', 'Healthcare'],
    },
    {
      heading: 'Company',
      links: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
    },
    {
      heading: 'Support',
      links: ['Help Centre', 'Contact', 'Community', 'Security', 'GDPR'],
    },
  ];

  return (
    <footer className="bg-[#0C0A09] border-t border-[#292524]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <span className="text-xl font-bold text-[#F59E0B] tracking-tight">
              Leo Software
            </span>
            <p className="text-sm text-[#78716C] leading-relaxed">
              Point-of-sale built for the real world — restaurants, shops, and
              warehouses that demand more.
            </p>
          </div>

          {/* Links */}
          {columns.map((col) => (
            <div key={col.heading} className="space-y-4">
              <p className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#78716C] hover:text-[#F5F5F4] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#78716C]">
            &copy; {new Date().getFullYear()} Leo Software. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-[#78716C] hover:text-[#A8A29E] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Focused() {
  return (
    <div className="min-h-screen font-sans" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />
      <Hero />
      <SocialProofBar />
      <Features />
      <IndustryTabs />
      <Testimonial />
      <Pricing />
      <CTABanner />
      <Footer />
    </div>
  );
}
