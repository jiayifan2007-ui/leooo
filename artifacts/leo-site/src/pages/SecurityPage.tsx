import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Check,
  EyeOff,
  FileCheck2,
  LockKeyhole,
  Scale,
  ShieldCheck,
} from 'lucide-react';

type CopyItem = {
  title: string;
  desc: string;
};

const officialSources = {
  rules: 'https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Negocios/Faturacao/Regras_de_faturacao/Paginas/default.aspx',
  rgIt118: 'https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/rgit/Pages/rgit118.aspx',
  dl2819: 'https://dre.pt/dre/detalhe/decreto-lei/28-2019-119622094',
};

function Eyebrow({ children }: { children: string }) {
  return <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{children}</p>;
}

export default function SecurityPage() {
  const { t } = useTranslation();
  const pillars = t('securityPage.pillars', { returnObjects: true }) as unknown as CopyItem[];
  const recordSteps = t('securityPage.record.steps', { returnObjects: true }) as unknown as CopyItem[];
  const privacyItems = t('securityPage.privacy.items', { returnObjects: true }) as unknown as string[];
  const cardPoints = t('securityPage.hero.cardPoints', { returnObjects: true }) as unknown as string[];

  const pillarIcons = [EyeOff, FileCheck2, ShieldCheck];
  const recordIcons = [FileCheck2, LockKeyhole, Scale];

  return (
    <>
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 lg:pb-28 lg:pt-40">
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.8fr]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent px-3 py-1.5 text-accent-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-wide">{t('securityPage.hero.eyebrow')}</span>
              </div>
              <h1 className="mt-7 text-5xl font-bold leading-[0.98] tracking-[-0.05em] text-foreground md:text-7xl">
                {t('securityPage.hero.headline1')}
                <br />
                <span className="text-primary">{t('securityPage.hero.headline2')}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t('securityPage.hero.desc')}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/product"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-primary-border bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
                  data-testid="link-security-product"
                >
                  {t('securityPage.hero.productCta')}
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="#legal"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  data-testid="link-security-legal"
                >
                  {t('securityPage.hero.legalCta')}
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <ShieldCheck size={32} className="text-primary" />
              <p className="mt-8 text-2xl font-bold leading-tight text-foreground">{t('securityPage.hero.cardTitle')}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('securityPage.hero.cardDesc')}</p>
              <div className="mt-6 space-y-3 border-t border-border pt-5">
                {cardPoints.map((point) => (
                  <p key={point} className="flex items-start gap-2 text-sm text-foreground">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    {point}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <Eyebrow>{t('securityPage.pillarsEyebrow')}</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-foreground md:text-5xl">{t('securityPage.pillarsHeadline')}</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillarIcons[index];
              return (
                <article key={pillar.title} className="rounded-2xl border border-border bg-background p-6 md:p-7" data-testid={`security-pillar-${index + 1}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <Icon size={22} />
                    </span>
                    <span className="text-xs font-bold tracking-[0.14em] text-primary">0{index + 1}</span>
                  </div>
                  <h3 className="mt-10 text-xl font-bold text-foreground">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="legal" className="bg-sidebar py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Eyebrow>{t('securityPage.record.eyebrow')}</Eyebrow>
              <h2 className="mt-3 text-4xl font-bold leading-tight tracking-[-0.04em] text-sidebar-foreground md:text-5xl">{t('securityPage.record.headline')}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t('securityPage.record.desc')}</p>
              <div className="mt-8 rounded-xl border border-primary-border bg-sidebar-accent p-5">
                <p className="text-sm font-bold text-sidebar-foreground">{t('securityPage.record.noteTitle')}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('securityPage.record.noteDesc')}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent p-5 md:p-7">
              <p className="text-sm font-bold text-sidebar-foreground">{t('securityPage.record.flowTitle')}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {recordSteps.map((step, index) => {
                  const Icon = recordIcons[index];
                  return (
                    <div key={step.title} className="rounded-xl border border-sidebar-border bg-sidebar p-4">
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                          <Icon size={18} />
                        </span>
                        <span className="text-xs font-bold text-primary">0{index + 1}</span>
                      </div>
                      <h3 className="mt-7 font-bold text-sidebar-foreground">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="privacy" className="bg-background py-24 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <Eyebrow>{t('securityPage.privacy.eyebrow')}</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-tight tracking-[-0.04em] text-foreground md:text-5xl">{t('securityPage.privacy.headline')}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t('securityPage.privacy.desc')}</p>
          </div>
          <div className="grid gap-3">
            {privacyItems.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-border bg-card p-5">
                <LockKeyhole size={19} className="mt-0.5 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <Eyebrow>{t('securityPage.fiscal.eyebrow')}</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-tight tracking-[-0.04em] text-foreground md:text-5xl">{t('securityPage.fiscal.headline')}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t('securityPage.fiscal.desc')}</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-primary-border bg-accent p-7 md:p-8">
              <Scale size={28} className="text-primary" />
              <h3 className="mt-7 text-2xl font-bold text-accent-foreground">{t('securityPage.fiscal.coimaTitle')}</h3>
              <p className="mt-3 text-sm leading-relaxed text-accent-foreground">{t('securityPage.fiscal.coimaDesc')}</p>
              <p className="mt-5 border-t border-accent-border pt-5 text-xs leading-relaxed text-accent-foreground">{t('securityPage.fiscal.disclaimer')}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-7 md:p-8">
              <FileCheck2 size={28} className="text-primary" />
              <h3 className="mt-7 text-xl font-bold text-foreground">{t('securityPage.fiscal.requirementTitle')}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('securityPage.fiscal.requirementDesc')}</p>
              <div className="mt-6 space-y-3 border-t border-border pt-5">
                <a className="block text-sm font-semibold text-primary hover:underline" href={officialSources.rules} target="_blank" rel="noreferrer">
                  {t('securityPage.sources.rules')} <ArrowRight className="ml-1 inline" size={14} />
                </a>
                <a className="block text-sm font-semibold text-primary hover:underline" href={officialSources.rgIt118} target="_blank" rel="noreferrer">
                  {t('securityPage.sources.rgit')} <ArrowRight className="ml-1 inline" size={14} />
                </a>
                <a className="block text-sm font-semibold text-primary hover:underline" href={officialSources.dl2819} target="_blank" rel="noreferrer">
                  {t('securityPage.sources.dl')} <ArrowRight className="ml-1 inline" size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cookies" className="bg-sidebar py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Eyebrow>{t('securityPage.cta.eyebrow')}</Eyebrow>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-sidebar-foreground md:text-5xl">{t('securityPage.cta.headline')}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t('securityPage.cta.desc')}</p>
          <Link
            href="/product"
            className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-primary-border bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
            data-testid="link-security-final-product"
          >
            {t('securityPage.cta.button')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}