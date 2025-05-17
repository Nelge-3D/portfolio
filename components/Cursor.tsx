'use client';
import { useEffect, useRef, useState } from 'react';

export default function DiamondCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) rotate(45deg) ${hovered ? 'scale(1.3)' : 'scale(1)'}`;
      }
    };

    document.addEventListener('mousemove', move);

    const hoverElems = document.querySelectorAll('a, button, .cursor-hover');

    const onHover = () => setHovered(true);
    const onLeave = () => setHovered(false);

    hoverElems.forEach(el => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      hoverElems.forEach(el => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [hovered]);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] bg-transparent border-2 border-gray-600"
      style={{
        width: 16,
        height: 16,
        marginLeft: -8,
        marginTop: -8,
        transition: 'transform 0.15s ease',
      }}
    />
  );
}
