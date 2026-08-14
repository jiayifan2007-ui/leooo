import { type ReactNode, useRef, useState, useEffect } from 'react';

interface RevealItemProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  'data-testid'?: string;
}

export default function RevealItem({
  children,
  delay = 0,
  className,
  style,
  threshold = 0.1,
  'data-testid': testId,
}: RevealItemProps) {
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

  return (
    <div
      ref={ref}
      className={className}
      data-testid={testId}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
