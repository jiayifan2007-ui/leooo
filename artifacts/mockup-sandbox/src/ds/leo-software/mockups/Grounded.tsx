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

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: '#0C0A09',
        borderColor: '#44403C',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded flex items-center justify-center"
            style={{ backgroundColor: '#F59E0B' }}
          >
            <Zap size={16} color="#0C0A09" strokeWidth={2.5} />
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: '#F59E0B' }}
          >
            Leo Software
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {['Product', 'Industries', 'Pricing', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium transition-colors"
              style={{ color: '#A8A29E' }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = '#F5F5F4')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = '#A8A29E')
              }
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
        >
          Get started
          <ArrowRight size={14} />
        </button>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const logos = [
    'Volta Bistro',
    'Cargotek',
    'Westfield Retail',
    'Nord Kitchen',
    'Basalt Brewing',
    'Ironclad WH',
  ];

  return (
    <section
      className="relative pt-32 pb-24 px-6"
      style={{ backgroundColor: '#1C1917' }}
      id="product"
    >
      {/* Subtle amber glow top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: '#F59E0B' }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase mb-8"
          style={{
            borderColor: '#D97706',
            color: '#FCD34D',
            backgroundColor: 'rgba(245,158,11,0.08)',
          }}
        >
          <Star size={10} fill="#FCD34D" color="#FCD34D" />
          The Operator's Choice
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">
          <span style={{ color: '#F5F5F4' }}>One system.</span>
          <br />
          <span style={{ color: '#FCD34D' }}>Every counter.</span>
          <br />
          <span style={{ color: '#F5F5F4' }}>Every floor.</span>
        </h1>

        {/* Supporting line */}
        <p
          className="text-lg md:text-xl font-medium max-w-2xl mb-10 leading-relaxed"
          style={{ color: '#A8A29E' }}
        >
          Leo Software is the only point-of-sale platform that adapts from a
          single restaurant table to a multi-site warehouse — without changing
          tools, training staff twice, or paying for features you don't use.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded text-sm font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
          >
            Start free trial
            <ArrowRight size={16} />
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded text-sm font-bold border transition-colors hover:border-[#F5F5F4]"
            style={{
              borderColor: '#44403C',
              color: '#F5F5F4',
              backgroundColor: 'transparent',
            }}
          >
            Book a demo
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Trusted by */}
        <div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#78716C' }}
          >
            Trusted by 4,200+ businesses across Europe
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 items-center">
            {logos.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold tracking-wide"
                style={{ color: '#78716C' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Feature Grid ─────────────────────────────────────────────────────────────

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Table & Order Management',
    desc: 'Open tabs, split bills, and manage table turns from one screen.',
  },
  {
    icon: Package,
    title: 'Real-Time Inventory',
    desc: 'Stock levels update on every sale, return, and receiving event.',
  },
  {
    icon: CreditCard,
    title: 'Unified Payments',
    desc: 'Card, cash, and mobile wallets processed through one terminal.',
  },
  {
    icon: MapPin,
    title: 'Multi-Location Control',
    desc: 'Manage every site from a single dashboard with per-location roles.',
  },
  {
    icon: Users,
    title: 'Employee & Access Control',
    desc: 'Time tracking, shift scheduling, and role-based permissions built in.',
  },
  {
    icon: BarChart3,
    title: 'Live Analytics Dashboard',
    desc: 'Revenue, top items, and hourly trends — updated every 30 seconds.',
  },
];

function FeatureGrid() {
  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: '#1C1917' }}
      id="features"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#F59E0B' }}
          >
            Platform capabilities
          </p>
          <h2
            className="text-4xl font-black tracking-tight"
            style={{ color: '#F5F5F4' }}
          >
            Built for the work that never stops.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border"
          style={{ borderColor: '#44403C' }}
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-8 flex flex-col gap-4 transition-colors"
              style={{ backgroundColor: '#292524' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  '#302C2A')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  '#292524')
              }
            >
              <div
                className="w-10 h-10 rounded flex items-center justify-center"
                style={{ backgroundColor: 'rgba(245,158,11,0.12)' }}
              >
                <Icon size={20} color="#F59E0B" />
              </div>
              <div>
                <h3
                  className="text-base font-bold mb-1"
                  style={{ color: '#F5F5F4' }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Industries ───────────────────────────────────────────────────────────────

function RestaurantIllustration() {
  return (
    <div className="relative w-full h-32 mb-6 overflow-hidden rounded">
      {/* Floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 rounded-b"
        style={{ backgroundColor: '#44403C' }}
      />
      {/* Table */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-3 rounded"
        style={{ backgroundColor: '#78716C' }}
      />
      {/* Table leg */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-2 h-6 rounded"
        style={{ backgroundColor: '#78716C' }}
      />
      {/* Chair left */}
      <div
        className="absolute bottom-8 left-[calc(50%-36px)] w-8 h-2 rounded"
        style={{ backgroundColor: '#44403C' }}
      />
      {/* Chair right */}
      <div
        className="absolute bottom-8 left-[calc(50%+28px)] w-8 h-2 rounded"
        style={{ backgroundColor: '#44403C' }}
      />
      {/* Plate */}
      <div
        className="absolute bottom-11 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2"
        style={{ borderColor: '#F59E0B', backgroundColor: '#292524' }}
      />
      {/* Amber accent dot */}
      <div
        className="absolute top-4 right-6 w-3 h-3 rounded-full"
        style={{ backgroundColor: '#F59E0B', opacity: 0.7 }}
      />
      <div
        className="absolute top-6 right-12 w-2 h-2 rounded-full"
        style={{ backgroundColor: '#FCD34D', opacity: 0.5 }}
      />
    </div>
  );
}

function RetailIllustration() {
  return (
    <div className="relative w-full h-32 mb-6 overflow-hidden rounded">
      {/* Shelf back */}
      <div
        className="absolute top-4 left-4 right-4 h-3 rounded"
        style={{ backgroundColor: '#44403C' }}
      />
      {/* Shelf lower */}
      <div
        className="absolute top-14 left-4 right-4 h-3 rounded"
        style={{ backgroundColor: '#44403C' }}
      />
      {/* Products on upper shelf */}
      {[8, 20, 32, 44, 56, 68].map((left) => (
        <div
          key={left}
          className="absolute top-1 rounded-sm"
          style={{
            left: `${left}px`,
            width: '8px',
            height: '16px',
            backgroundColor: left % 24 === 8 ? '#F59E0B' : '#78716C',
            opacity: 0.8,
          }}
        />
      ))}
      {/* Products on lower shelf */}
      {[14, 28, 42, 56, 70].map((left) => (
        <div
          key={left}
          className="absolute top-10 rounded-sm"
          style={{
            left: `${left}px`,
            width: '10px',
            height: '18px',
            backgroundColor: left % 28 === 14 ? '#FCD34D' : '#78716C',
            opacity: 0.7,
          }}
        />
      ))}
      {/* Counter */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 rounded-b"
        style={{ backgroundColor: '#292524', borderTop: '2px solid #44403C' }}
      />
      {/* POS terminal */}
      <div
        className="absolute bottom-3 right-8 w-12 h-6 rounded"
        style={{ backgroundColor: '#F59E0B', opacity: 0.85 }}
      />
    </div>
  );
}

function WarehouseIllustration() {
  return (
    <div className="relative w-full h-32 mb-6 overflow-hidden rounded">
      {/* Rack columns */}
      {[12, 60, 108, 156, 204].map((left) => (
        <div
          key={left}
          className="absolute top-2 bottom-4 w-2 rounded"
          style={{ left: `${left}px`, backgroundColor: '#44403C' }}
        />
      ))}
      {/* Rack rows */}
      {[24, 52, 80].map((top) => (
        <div
          key={top}
          className="absolute left-2 right-2 h-1.5 rounded"
          style={{ top: `${top}px`, backgroundColor: '#44403C' }}
        />
      ))}
      {/* Boxes */}
      {[
        { left: 14, top: 10, w: 42, h: 12, color: '#78716C' },
        { left: 62, top: 10, w: 42, h: 12, color: '#F59E0B' },
        { left: 110, top: 10, w: 42, h: 12, color: '#78716C' },
        { left: 14, top: 38, w: 42, h: 12, color: '#78716C' },
        { left: 62, top: 38, w: 42, h: 12, color: '#78716C' },
        { left: 110, top: 38, w: 20, h: 12, color: '#FCD34D' },
      ].map(({ left, top, w, h, color }, i) => (
        <div
          key={i}
          className="absolute rounded-sm"
          style={{ left, top, width: w, height: h, backgroundColor: color, opacity: 0.75 }}
        />
      ))}
      {/* Floor line */}
      <div
        className="absolute bottom-4 left-0 right-0 h-0.5"
        style={{ backgroundColor: '#44403C' }}
      />
      {/* Forklift hint */}
      <div
        className="absolute bottom-0 right-4 w-10 h-8 rounded-t-sm"
        style={{ backgroundColor: '#292524', border: '1px solid #44403C' }}
      />
      <div
        className="absolute bottom-0 right-4 w-1.5 h-12 rounded-t"
        style={{ backgroundColor: '#F59E0B', opacity: 0.6 }}
      />
    </div>
  );
}

const industries = [
  {
    Illustration: RestaurantIllustration,
    icon: UtensilsCrossed,
    title: 'Restaurant & Café',
    bullets: [
      'Table maps with live order status per cover',
      'Kitchen display integration and course pacing',
      'Split bills, service charges, and tip pooling',
    ],
  },
  {
    Illustration: RetailIllustration,
    icon: ShoppingCart,
    title: 'Retail & Shop',
    bullets: [
      'Barcode scanning and SKU-level stock tracking',
      'Customer accounts, loyalty points, and returns',
      'Integrated e-commerce sync for omnichannel selling',
    ],
  },
  {
    Illustration: WarehouseIllustration,
    icon: Package,
    title: 'Warehouse & Logistics',
    bullets: [
      'Receive, put-away, and pick with barcode or RFID',
      'Low-stock alerts and automated purchase orders',
      'Multi-warehouse transfers with full audit trail',
    ],
  },
];

function Industries() {
  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: '#1C1917' }}
      id="industries"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#F59E0B' }}
          >
            Industries
          </p>
          <h2
            className="text-4xl font-black tracking-tight"
            style={{ color: '#F5F5F4' }}
          >
            Same platform. Every business type.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map(({ Illustration, icon: Icon, title, bullets }) => (
            <div
              key={title}
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: '#292524',
                borderColor: '#44403C',
              }}
            >
              <Illustration />

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(245,158,11,0.12)' }}
                >
                  <Icon size={16} color="#F59E0B" />
                </div>
                <h3
                  className="text-base font-bold"
                  style={{ color: '#F5F5F4' }}
                >
                  {title}
                </h3>
              </div>

              <ul className="flex flex-col gap-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Check
                      size={14}
                      color="#F59E0B"
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span
                      className="text-sm leading-snug"
                      style={{ color: '#A8A29E' }}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const steps = [
  {
    num: '01',
    title: 'Set up in under an hour',
    desc: 'Configure your menu, products, or SKUs using our guided onboarding. Connect your printer, card terminal, and scanner — no IT team required. Most businesses are live the same day.',
  },
  {
    num: '02',
    title: 'Start selling immediately',
    desc: 'Take orders, process payments, and track stock from the first transaction. Your team learns in minutes: the interface is built for operators, not administrators.',
  },
  {
    num: '03',
    title: 'Grow with live data',
    desc: 'Revenue dashboards, employee performance, and inventory reports update in real time. Spot your busiest hours, your best sellers, and your highest margins — every day.',
  },
];

function HowItWorks() {
  return (
    <section
      className="py-24 px-6 border-t"
      style={{ backgroundColor: '#1C1917', borderColor: '#44403C' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#F59E0B' }}
          >
            How it works
          </p>
          <h2
            className="text-4xl font-black tracking-tight"
            style={{ color: '#F5F5F4' }}
          >
            From unboxing to first sale.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ num, title, desc }) => (
            <div key={num} className="relative">
              {/* Connector line (not on last) */}
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <span
                    className="text-6xl font-black leading-none"
                    style={{ color: '#F59E0B', opacity: 0.25 }}
                  >
                    {num}
                  </span>
                </div>
                <div className="pt-2">
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: '#F5F5F4' }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#78716C' }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const tiers = [
  {
    name: 'Starter',
    price: '€29',
    period: '/mo',
    desc: 'Everything a single-location business needs to go live today.',
    features: [
      'Up to 3 registers',
      'Inventory tracking (500 SKUs)',
      'Card & cash payments',
      'Daily revenue reports',
      'Email support',
    ],
    cta: 'Start free trial',
    highlight: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: '€79',
    period: '/mo',
    desc: 'The full platform for growing businesses that move fast.',
    features: [
      'Unlimited registers',
      'Unlimited inventory SKUs',
      'Multi-location (up to 5 sites)',
      'Employee time & access control',
      'Live analytics dashboard',
      'Priority support + onboarding call',
    ],
    cta: 'Start free trial',
    highlight: true,
    badge: 'Most popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Dedicated infrastructure and SLA for large-scale operations.',
    features: [
      'Unlimited locations',
      'Custom integrations & API access',
      'Dedicated account manager',
      'SLA 99.99% uptime guarantee',
      'On-site training & rollout',
    ],
    cta: 'Talk to sales',
    highlight: false,
    badge: null,
  },
];

function Pricing() {
  return (
    <section
      className="py-24 px-6 border-t"
      style={{ backgroundColor: '#1C1917', borderColor: '#44403C' }}
      id="pricing"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#F59E0B' }}
          >
            Pricing
          </p>
          <h2
            className="text-4xl font-black tracking-tight mb-3"
            style={{ color: '#F5F5F4' }}
          >
            Pay for what you use.
            <br />
            Nothing more.
          </h2>
          <p className="text-base" style={{ color: '#78716C' }}>
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map(({ name, price, period, desc, features, cta, highlight, badge }) => (
            <div
              key={name}
              className="rounded-lg p-8 flex flex-col"
              style={{
                backgroundColor: '#292524',
                border: highlight
                  ? '1px solid #F59E0B'
                  : '1px solid #44403C',
                boxShadow: highlight
                  ? '0 0 40px rgba(245,158,11,0.15)'
                  : 'none',
              }}
            >
              {/* Badge */}
              <div className="mb-6">
                {badge ? (
                  <span
                    className="inline-block px-2.5 py-1 rounded text-xs font-bold tracking-wide uppercase mb-4"
                    style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
                  >
                    {badge}
                  </span>
                ) : (
                  <div className="mb-4 h-6" />
                )}

                <div className="flex items-end gap-1 mb-2">
                  <span
                    className="text-4xl font-black"
                    style={{ color: '#F5F5F4' }}
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
                <p className="text-sm font-bold" style={{ color: '#A8A29E' }}>
                  {name}
                </p>
              </div>

              <p
                className="text-sm leading-relaxed mb-6 pb-6 border-b"
                style={{ color: '#78716C', borderColor: '#44403C' }}
              >
                {desc}
              </p>

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

              <button
                className="w-full py-3 rounded text-sm font-bold transition-opacity hover:opacity-90"
                style={
                  highlight
                    ? { backgroundColor: '#F59E0B', color: '#0C0A09' }
                    : {
                        backgroundColor: 'transparent',
                        color: '#F5F5F4',
                        border: '1px solid #44403C',
                      }
                }
              >
                {cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: '#F59E0B' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: '#92400E' }}
        >
          Ready to run a tighter operation?
        </p>
        <h2
          className="text-4xl md:text-5xl font-black tracking-tight mb-4"
          style={{ color: '#0C0A09' }}
        >
          Your next shift starts
          <br />
          with better software.
        </h2>
        <p
          className="text-base font-medium max-w-xl mx-auto mb-10"
          style={{ color: '#92400E' }}
        >
          Join 4,200+ businesses that replaced fragmented tools with one
          platform that actually keeps up with them.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded text-sm font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#0C0A09', color: '#F5F5F4' }}
          >
            Start free trial — 14 days
            <ArrowRight size={16} />
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded text-sm font-bold border-2 transition-colors hover:bg-[#D97706]"
            style={{
              borderColor: '#92400E',
              color: '#92400E',
              backgroundColor: 'transparent',
            }}
          >
            Talk to sales
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const footerLinks = {
  Product: ['POS Terminal', 'Inventory', 'Analytics', 'Payments', 'Integrations'],
  Industries: ['Restaurants', 'Retail', 'Warehouses', 'Cafés', 'Pop-ups'],
  Company: ['About', 'Careers', 'Blog', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Security', 'GDPR'],
};

function Footer() {
  return (
    <footer
      className="py-16 px-6 border-t"
      style={{ backgroundColor: '#0C0A09', borderColor: '#1C1917' }}
      id="contact"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Wordmark column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded flex items-center justify-center"
                style={{ backgroundColor: '#F59E0B' }}
              >
                <Zap size={16} color="#0C0A09" strokeWidth={2.5} />
              </div>
              <span
                className="text-base font-bold tracking-tight"
                style={{ color: '#F59E0B' }}
              >
                Leo Software
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#78716C' }}>
              Point-of-sale infrastructure
              <br />
              for serious operators.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: '#78716C' }}
              >
                {group}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors"
                      style={{ color: '#78716C' }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = '#A8A29E')
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = '#78716C')
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t gap-4"
          style={{ borderColor: '#1C1917' }}
        >
          <p className="text-xs" style={{ color: '#78716C' }}>
            2024 Leo Software BV. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#78716C' }}>
            Built for operators. Trusted by thousands.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Grounded() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#1C1917', fontFamily: 'system-ui, sans-serif' }}
    >
      <Navbar />
      <Hero />
      <FeatureGrid />
      <Industries />
      <HowItWorks />
      <Pricing />
      <CTABanner />
      <Footer />
    </div>
  );
}
