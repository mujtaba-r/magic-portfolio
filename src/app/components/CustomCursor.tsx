"use client";

import React, { useRef, useEffect, useState } from 'react';
import styles from './CustomCursor.module.scss';

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true); // Start with true to prevent flash on mobile
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!isMobile) {
      let cursorRingPosition = { x: 0, y: 0 };
      let cursorDotPosition = { x: 0, y: 0 };

      const moveCursor = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        cursorDotPosition = { x: clientX, y: clientY };

        if (cursorDotRef.current) {
          cursorDotRef.current.style.left = `${clientX}px`;
          cursorDotRef.current.style.top = `${clientY}px`;
        }
      };

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isHoverable = target.closest('a, button, [role="button"], .clickable, .control, [tabindex="0"], div[style*="cursor: pointer"]');
        setIsHovering(!!isHoverable);
      };

      const animateCursorRing = () => {
        const easingFactor = 8;
        
        cursorRingPosition.x += (cursorDotPosition.x - cursorRingPosition.x) / easingFactor;
        cursorRingPosition.y += (cursorDotPosition.y - cursorRingPosition.y) / easingFactor;
        
        if (cursorRingRef.current) {
          cursorRingRef.current.style.left = `${cursorRingPosition.x}px`;
          cursorRingRef.current.style.top = `${cursorRingPosition.y}px`;
        }

        requestAnimationFrame(animateCursorRing);
      };

      document.addEventListener('mousemove', moveCursor);
      document.addEventListener('mouseover', handleMouseOver);
      animateCursorRing();

      return () => {
        document.removeEventListener('mousemove', moveCursor);
        document.removeEventListener('mouseover', handleMouseOver);
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <div ref={cursorDotRef} className={`${styles.cursor} ${isHovering ? styles.hovering : ''}`} />
      <div ref={cursorRingRef} className={`${styles.cursorRing} ${isHovering ? styles.hovering : ''}`} />
    </>
  );
};

export default CustomCursor;