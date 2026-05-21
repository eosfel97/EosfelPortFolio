// Kunai cursor — replaces the native cursor with a kunai SVG that follows
// the mouse and rotates toward the movement direction. Hidden on touch.

import { useEffect, useRef, useState } from 'react';

export default function KunaiCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isDown, setDown] = useState(false);
  const [overInteractive, setOver] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse), (max-width: 720px)');
    const apply = () => setShow(!mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (!show) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let lastX = tx;
    let lastY = ty;
    let targetA = -135;
    let currentA = -135;
    let raf = 0;

    // Hide native cursor only once the kunai is ready, to avoid a flicker
    // where the user has no cursor at all during the first frames.
    document.body.classList.add('kunai-ready');

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const dx = tx - lastX;
      const dy = ty - lastY;
      if (Math.hypot(dx, dy) > 4) {
        targetA = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        lastX = tx;
        lastY = ty;
      }
      const el = document.elementFromPoint(tx, ty);
      setOver(!!el?.closest('a,button,[role=button],input,select,textarea,[data-cursor=hover]'));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => {
      if (wrapRef.current) wrapRef.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (wrapRef.current) wrapRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const tick = () => {
      cx += (tx - cx) * 0.32;
      cy += (ty - cy) * 0.32;
      let da = targetA - currentA;
      while (da > 180) da -= 360;
      while (da < -180) da += 360;
      currentA += da * 0.18;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `rotate(${currentA}deg)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) rotate(${currentA}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
      document.body.classList.remove('kunai-ready');
    };
  }, [show]);

  if (!show) {
    return null;
  }

  const scale = isDown ? 0.82 : overInteractive ? 1.25 : 1;
  const hueShift = overInteractive
    ? 'drop-shadow(0 0 6px rgba(255,80,80,.8))'
    : 'drop-shadow(0 2px 3px rgba(0,0,0,.6))';

  return (
    <>
      <div
        ref={trailRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: -22,
            top: -36,
            width: 44,
            height: 70,
            background: overInteractive
              ? 'radial-gradient(ellipse 40% 60% at 50% 30%, rgba(255,80,80,.45), transparent 70%)'
              : 'radial-gradient(ellipse 30% 50% at 50% 30%, rgba(200,56,56,.25), transparent 70%)',
            filter: 'blur(6px)',
            transition: 'background .25s ease-out',
          }}
        />
      </div>

      <div
        ref={wrapRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'opacity .2s ease-out',
        }}
      >
        <div ref={innerRef} style={{ width: 0, height: 0, transition: 'none', filter: hueShift }}>
          <svg
            width="44"
            height="68"
            viewBox="-22 -2 44 68"
            style={{
              position: 'absolute',
              left: -22,
              top: -2,
              transform: `scale(${scale})`,
              transformOrigin: '50% 3%',
              transition: 'transform .15s cubic-bezier(.2,.7,.3,1)',
              overflow: 'visible',
            }}
          >
            <defs>
              <linearGradient id="kn-blade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8a8378" />
                <stop offset="50%" stopColor="#d8d0c2" />
                <stop offset="100%" stopColor="#6e685e" />
              </linearGradient>
              <linearGradient id="kn-handle" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1a120a" />
                <stop offset="50%" stopColor="#3a2812" />
                <stop offset="100%" stopColor="#150e08" />
              </linearGradient>
            </defs>

            <path
              d="M0,0 L8,18 L0,28 L-8,18 Z"
              fill="url(#kn-blade)"
              stroke="#0d0a06"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            <line x1="0" y1="2" x2="0" y2="27" stroke="#0d0a06" strokeWidth=".7" opacity=".7" />
            <path d="M0,2 L-6,17 L0,26" fill="none" stroke="#fff" strokeWidth=".7" opacity=".55" />

            <rect
              x="-10"
              y="26"
              width="20"
              height="3.5"
              fill="#1a1612"
              stroke="#0d0a06"
              strokeWidth=".8"
            />
            <rect x="-10" y="26" width="20" height="1" fill="#5a5048" opacity=".5" />

            <rect
              x="-3.5"
              y="29.5"
              width="7"
              height="20"
              fill="url(#kn-handle)"
              stroke="#0d0a06"
              strokeWidth=".7"
            />
            {[31, 34, 37, 40, 43, 46].map((y) => (
              <rect key={y} x="-3.5" y={y} width="7" height="1.4" fill="#c83838" opacity=".95" />
            ))}
            {[32.5, 35.5, 38.5, 41.5, 44.5, 47.5].map((y) => (
              <rect key={y} x="-3.5" y={y} width="7" height=".4" fill="#000" opacity=".4" />
            ))}

            <circle cx="0" cy="54" r="4.5" fill="none" stroke="#0d0a06" strokeWidth="2" />
            <circle cx="0" cy="54" r="4.5" fill="none" stroke="#888" strokeWidth=".7" />
            <circle cx="0" cy="54" r="1.5" fill="#1a1612" />

            <rect
              x="-1.5"
              y="59"
              width="3"
              height="5"
              fill="#e8dcc0"
              opacity=".5"
              transform="rotate(8 0 60)"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
