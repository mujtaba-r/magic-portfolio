"use client";

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');

    const moveCursor = (e: MouseEvent) => {
      if (cursor && follower) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        follower.style.left = `${e.clientX}px`;
        follower.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <div 
        id="custom-cursor"
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--brand-on-background-strong)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div 
        id="custom-cursor-follower"
        style={{
          position: 'fixed',
          width: '24px',
          height: '24px',
          border: '2px solid var(--brand-on-background-medium)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: '0.1s',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}