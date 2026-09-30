'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackToTop() {
  const pathRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.transition = path.style.WebkitTransition = 'none';
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = pathLength;
    path.getBoundingClientRect();
    path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength) / (height || 1);
      path.style.strokeDashoffset = progress;

      if (scroll > 50) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress);

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={`progress-wrap ${active ? 'active-progress' : ''}`}
      onClick={scrollToTop}
      style={{ cursor: 'pointer' }}
    >
      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path 
          ref={pathRef} 
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" 
          fill="none"
        />
      </svg>
    </div>
  );
}
