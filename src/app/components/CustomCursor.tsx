"use client";

import React, { useState, useEffect } from 'react';
import styles from './CustomCursor.module.scss';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if it's a touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    if (!isTouch) {
      const moveCursor = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };

      const checkPointer = () => {
        const target = document.elementFromPoint(position.x, position.y);
        setIsPointer(window.getComputedStyle(target as Element).cursor === 'pointer');
      };

      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', checkPointer);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mouseover', checkPointer);
      };
    }
  }, [position.x, position.y]);

  if (isTouchDevice) {
    return null; // Don't render anything on touch devices
  }

  return (
    <>
      <div 
        className={`${styles.cursor} ${isPointer ? styles.pointer : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`${styles.cursorFollower} ${isPointer ? styles.pointer : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default CustomCursor;