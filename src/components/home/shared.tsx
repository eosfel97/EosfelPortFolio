// Shared animation primitives for the Yamikage sections.

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/** Observe whether an element has been in the viewport at least once.
 *  Play-once semantics: once seen, the flag stays true (no flash on scroll-up). */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.12 },
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, options);
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

interface RevealProps {
  children: ReactNode;
  kind?: '' | 'l' | 'r';
  delay?: number;
  style?: CSSProperties;
  className?: string;
}

/** Fade/slide content in when it scrolls into view. */
export function Reveal({ children, kind = '', delay = 0, style, className = '' }: RevealProps) {
  const [ref, seen] = useInView();
  const cls = ['yk2-rv', kind ? 'yk2-rv-' + kind : '', seen ? 'in' : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <div ref={ref} className={cls} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  showCursor?: boolean;
  style?: CSSProperties;
  className?: string;
}

/** Reveal text character-by-character once it enters the viewport. */
export function Typewriter({
  text,
  speed = 18,
  startDelay = 200,
  showCursor = true,
  style,
  className = '',
}: TypewriterProps) {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const [shown, setShown] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    startedRef.current = false;
    setShown(0);
  }, [text]);

  useEffect(() => {
    if (!seen || startedRef.current) return;
    startedRef.current = true;
    let i = 0;
    const tStart = window.setTimeout(() => {
      const id = window.setInterval(() => {
        i++;
        setShown(i);
        if (i >= text.length) window.clearInterval(id);
      }, speed);
    }, startDelay);
    return () => window.clearTimeout(tStart);
  }, [seen, text, speed, startDelay]);

  return (
    <span ref={ref} className={className} style={style}>
      {text.slice(0, shown)}
      {showCursor && seen && shown < text.length ? <span className="yk2-cursor" /> : null}
    </span>
  );
}

interface CounterProps {
  value: number | string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

/** Count from 0 up to the target value when scrolled into view. */
export function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 1400,
  className,
  style,
}: CounterProps) {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  const target = parseFloat(String(value));

  useEffect(() => {
    if (!seen) return;
    const startedAt = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, target, duration]);

  const formatted = Number.isInteger(target) ? Math.round(n).toLocaleString('fr-FR') : n.toFixed(2);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

interface LetterRevealProps {
  text: string;
  delay?: number;
  stagger?: number;
  style?: CSSProperties;
  className?: string;
  accent?: boolean;
}

/** Reveal a string letter-by-letter; re-triggers on scroll in/out. */
export function LetterReveal({
  text,
  delay = 0,
  stagger = 28,
  style,
  className = '',
  accent,
}: LetterRevealProps) {
  const [ref, seen] = useInView<HTMLSpanElement>({ threshold: 0.2 });
  return (
    <span ref={ref} className={className} style={style}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className={'yk2-letter' + (seen ? ' in' : '')}
          style={{
            transitionDelay: delay + i * stagger + 'ms',
            color: accent ? 'var(--yk-seal)' : undefined,
            fontStyle: accent ? 'italic' : undefined,
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}

/** Mouse-driven parallax wrapper. */
export function ParallaxKanji({
  children,
  strength = 12,
  style,
}: {
  children: ReactNode;
  strength?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const node = ref.current;
      if (!node) return;
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      node.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [strength]);
  return (
    <div ref={ref} className="yk2-px" style={style}>
      {children}
    </div>
  );
}

/** Decorative hand-drawn brush underline. */
export function BrushStroke({ color = 'var(--yk-seal)' }: { color?: string }) {
  return (
    <svg className="brush" viewBox="0 0 100 8" preserveAspectRatio="none">
      <path
        className="yk2-draw"
        d="M0,4 C20,2 40,6 60,3 C80,1 90,5 100,4"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
