"use client";

import React, { useRef, useEffect, useState } from 'react';
import styles from './CustomCursor.module.scss';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (!isTouchDevice) {
      const moveCursor = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        if (cursorRef.current && cursorRingRef.current) {
          cursorRef.current.style.left = `${clientX}px`;
          cursorRef.current.style.top = `${clientY}px`;
          cursorRingRef.current.style.left = `${clientX}px`;
          cursorRingRef.current.style.top = `${clientY}px`;
        }
      };

      document.addEventListener('mousemove', moveCursor);

      return () => {
        document.removeEventListener('mousemove', moveCursor);
      };
    }
  }, [isTouchDevice]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={cursorRingRef} className={styles.cursorRing} />
    </>
  );
};

export default CustomCursor;