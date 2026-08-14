import { useRef, useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Zap,
  Star,
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

const tiers = [
  {
    name: 'Starter',
    price: '€29',
    period: '/mo',
    desc: 'Everything a single-location business needs to go live today.',
    features: [
      'Up to 3 registers',
      'Inventory tracking (500 SKUs)',
      'Card and cash payments',
      'Daily revenue reports',
      'Email support',
    ],
    cta: 'Start free trial',
    highlight: false,
    badge: null as string | null,
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
      'Employee time and access control',
      'Live analytics dashboard',
      'Priority support and onboarding call',
      'API access',
    ],
    cta: 'Start free trial',
    highlight: true,
    badge: 'Most popular' as string | null,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Dedicated infrastructure and SLA for large-scale operations.',
    features: [
      'Unlimited locations',
      'Custom integrations and API access',
      'Dedicated account manager',
      'SLA 99.99% uptime guarantee',
      'On-site training and rollout',
      'Custom reporting',
    ],
    cta: 'Talk to sales',
    highlight: false,
    badge: null as string | null,
  },
];

const faqs = [
  {
    q: 'Is there a free trial?',
    a: 'Yes — every plan starts with a 14-day free trial. No credit card required. You can cancel at any time before the trial ends.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Absolutely. Upgrade or downgrade at any time from your account settings. Changes take effect immediately.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards, as well as bank transfers for annual plans. All payments are processed securely.',
  },
  {
    q: 'Does Leo support multiple currencies?',
    a: 'Yes. Leo handles EUR, GBP, USD, and most major currencies. Currency is set per location.',
  },
  {
    q: 'What hardware does Leo work with?',
    a: 'Leo works with any modern tablet, POS terminal, receipt printer, and barcode scanner. We also sell certified hardware bundles.',
  },
  {
    q: 'Is my data secure?',
    a: 'All data is encrypted in transit and at rest. We are GDPR compliant and host on EU infrastructure. SOC 2 Type II certification is in progress.',
  },
];

export default function PricingPage() {
  const { ref: headerRef, visible: headerVisible } = useReveal(0.1);
  const { ref: tiersRef, visible: tiersVisible } = useReveal(0.1);
  const { ref: faqRef, visible: faqVisible } = useReveal(0.1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            Transparent pricing
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
            Pay for what you use.
            <br />
            <span style={{ color: '#F59E0B' }}>Nothing more.</span>
          </h1>
          <p
            className="text-xl font-medium max-w-xl mx-auto leading-relaxed transition-all duration-700 delay-200"
            style={{
              color: '#A8A29E',
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            All plans include a 14-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing tiers — Grounded treatment */}
      <section className="py-16 px-6" style={{ borderTop: '1px solid #44403C' }}>
        <div ref={tiersRef} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map(({ name, price, period, desc, features, cta, highlight, badge }, i) => (
              <div
                key={name}
                className="rounded-xl p-8 flex flex-col transition-all duration-700"
                style={{
                  backgroundColor: '#292524',
                  border: highlight ? '1px solid #F59E0B' : '1px solid #44403C',
                  boxShadow: highlight ? '0 0 40px rgba(245,158,11,0.15)' : 'none',
                  opacity: tiersVisible ? 1 : 0,
                  transform: tiersVisible ? 'translateY(0)' : 'translateY(32px)',
                  transitionDelay: `${i * 100}ms`,
                }}
                data-testid={`card-pricing-${name.toLowerCase()}`}
              >
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
                        fontSize: price === 'Custom' ? 'clamp(32px, 4vw, 48px)' : 'clamp(40px, 5vw, 64px)',
                        color: price === 'Custom' ? '#F59E0B' : '#F5F5F4',
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
                <a
                  href="#"
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
                  data-testid={`button-cta-${name.toLowerCase()}`}
                >
                  {cta}
                  <ArrowRight size={15} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature comparison strip */}
      <section className="py-20 px-6" style={{ borderTop: '1px solid #292524' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#F59E0B' }}>
            All plans include
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Free 14-day trial',
              'No credit card required',
              'Cancel anytime',
              'Unlimited transactions',
              'Automatic updates',
              'SSL and data encryption',
              'GDPR compliant hosting',
              'Onboarding guides',
            ].map((item) => (
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
              Questions
            </p>
            <h2
              className="font-black"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#F5F5F4', letterSpacing: '-0.03em' }}
            >
              Everything you need to know.
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
            Ready to run a tighter operation?
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
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-sm font-bold transition-all hover:scale-105"
              style={{ backgroundColor: '#0C0A09', color: '#F5F5F4' }}
              data-testid="button-pricing-cta-trial"
            >
              Start free trial — 14 days
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
              See the product
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
