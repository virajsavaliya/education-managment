'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let ballX = 0;
    let ballY = 0;
    const speed = 0.15; // smooth interpolation speed

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ballX += (mouseX - ballX) * speed;
      ballY += (mouseY - ballY) * speed;

      if (cursor) {
        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate3d(-50%, -50%, 0)`;
      }
      requestAnimationFrame(animate);
    };
    const animId = requestAnimationFrame(animate);

    // Hover transitions
    const handleMouseEnter = () => {
      if (cursor) {
        cursor.style.borderColor = 'rgba(34, 34, 34, 0.05)';
        cursor.style.backgroundColor = 'rgba(34, 34, 34, 0.2)';
        cursor.style.opacity = '0.15';
        cursor.classList.add('cursor-hover'); // custom scale trigger or direct sizing
      }
    };

    const handleMouseLeave = () => {
      if (cursor) {
        cursor.style.borderColor = 'rgba(156, 156, 156, 0.5)';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.opacity = '1';
        cursor.classList.remove('cursor-hover');
      }
    };

    const attachListeners = () => {
      const targets = document.querySelectorAll('a, button, input[type=submit]');
      targets.forEach(target => {
        target.addEventListener('mouseenter', handleMouseEnter);
        target.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    attachListeners();

    // Rebind listeners when page content updates
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <div id="ed-mouse" style={{ pointerEvents: 'none' }}>
      <div 
        id="cursor-ball" 
        ref={cursorRef} 
        style={{ 
          pointerEvents: 'none', 
          position: 'fixed', 
          left: 0, 
          top: 0, 
          zIndex: 9999,
          transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s, opacity 0.3s' 
        }} 
      />
    </div>
  );
}
