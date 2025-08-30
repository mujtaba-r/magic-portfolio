"use client";

import React, { useRef, useEffect, useState } from 'react';
import styles from './CustomCursor.module.scss';

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState(false);

  // Check for touch devices once on mount and keep listener removal correct.
  useEffect(() => {
    const checkMobile = () => {
      const touchAvailable = typeof window !== 'undefined' && (('ontouchstart' in window) || navigator.maxTouchPoints > 0);
      setIsMobile(!!touchAvailable);
    };

    checkMobile();
    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Cursor logic runs only on non-touch devices.
  useEffect(() => {
    if (isMobile) return;

    let cursorRingPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let cursorDotPosition = { x: cursorRingPosition.x, y: cursorRingPosition.y };

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursorDotPosition.x = clientX;
      cursorDotPosition.y = clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${clientX}px`;
        cursorDotRef.current.style.top = `${clientY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isHoverable = target && !!target.closest('a, button, [role="button"], .clickable, .control, [tabindex="0"], [style*="cursor: pointer"]');
      setIsHovering(!!isHoverable);
    };

    const easingFactor = 8;
    const animateCursorRing = () => {
      cursorRingPosition.x += (cursorDotPosition.x - cursorRingPosition.x) / easingFactor;
      cursorRingPosition.y += (cursorDotPosition.y - cursorRingPosition.y) / easingFactor;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${cursorRingPosition.x}px`;
        cursorRingRef.current.style.top = `${cursorRingPosition.y}px`;
      }

      rafRef.current = requestAnimationFrame(animateCursorRing);
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    rafRef.current = requestAnimationFrame(animateCursorRing);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={cursorDotRef} className={`${styles.cursor} ${isHovering ? styles.hovering : ''}`} />
      <div ref={cursorRingRef} className={`${styles.cursorRing} ${isHovering ? styles.hovering : ''}`} />
    </>
  );
};

export default CustomCursor;
