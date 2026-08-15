import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/i18n';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current =
    SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) ??
    SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const select = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('common.languageLabel') ?? 'Change language'}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:opacity-80"
        style={{
          color: '#A8A29E',
          backgroundColor: 'rgba(28,25,23,0.4)',
          border: '1px solid #44403C',
        }}
        data-testid="button-language-switcher"
      >
        <Globe size={14} />
        <span className="leading-none">{current.flagLabel}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-52 rounded-xl border p-1.5 shadow-2xl"
          style={{
            backgroundColor: '#292524',
            borderColor: '#44403C',
            zIndex: 60,
          }}
          data-testid="menu-language"
        >
          {SUPPORTED_LANGUAGES.map((lang) => {
            const selected = lang.code === i18n.language;
            return (
              <button
                key={lang.code}
                role="menuitemradio"
                aria-checked={selected}
                type="button"
                onClick={() => select(lang.code)}
                className="w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors hover:opacity-90"
                style={{
                  color: selected ? '#F59E0B' : '#E7E5E4',
                  backgroundColor: 'transparent',
                }}
                data-testid={`button-language-${lang.code}`}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold"
                    style={{ backgroundColor: '#1C1917', color: '#A8A29E', border: '1px solid #44403C' }}
                  >
                    {lang.flagLabel}
                  </span>
                  {lang.label}
                </span>
                {selected && <Check size={15} color="#F59E0B" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
