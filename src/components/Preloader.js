'use client';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 600); // smooth fade out transition delay

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div id="preloader">
      <div id="ed-preloader" className="ed-preloader">
        <div className="animation-preloader">
          <div className="spinner"></div>
        </div>
      </div>
    </div>
  );
}
