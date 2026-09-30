'use client';

import { useUI } from '@/context/UIContext';
import Link from 'next/link';
import { useState } from 'react';

export default function MobileMenuOffcanvas() {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useUI();
  const [openSubMenus, setOpenSubMenus] = useState({});

  const handleClose = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSubMenu = (menu) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <>
      <div 
        className={`modal mobile-menu-modal offcanvas-modal fade ${isMobileMenuOpen ? 'show' : ''}`} 
        id="offcanvas-modal"
        style={{
          display: isMobileMenuOpen ? 'block' : 'none',
          backgroundColor: isMobileMenuOpen ? 'rgba(0,0,0,0.5)' : 'transparent',
          zIndex: 1050,
          overflowY: 'auto'
        }}
      >
        <div className="modal-dialog offcanvas-dialog">
          <div className="modal-content">
            <div className="modal-header offcanvas-header">
              <div className="offcanvas-logo">
                <Link href="/" onClick={handleClose}>
                  <img src="/assets/images/logo.svg" alt="logo" />
                </Link>
              </div>
              <button type="button" className="btn-close" onClick={handleClose}>
                <i className="fi fi-ss-cross"></i>
              </button>
            </div>
            <div className="mobile-menu-modal-main-body">
              <nav className="offcanvas__menu">
                <ul className="offcanvas__menu_ul">
                  <li className="offcanvas__menu_li">
                    <Link href="/" className="offcanvas__menu_item" onClick={handleClose}>Home</Link>
                  </li>
                  <li className="offcanvas__menu_li">
                    <Link href="/courses" className="offcanvas__menu_item" onClick={handleClose}>Courses</Link>
                  </li>
                  <li className="offcanvas__menu_li">
                    <Link href="/blog" className="offcanvas__menu_item" onClick={handleClose}>Blog</Link>
                  </li>
                  <li className="offcanvas__menu_li">
                    <Link href="/about-1" className="offcanvas__menu_item" onClick={handleClose}>About</Link>
                  </li>
                  <li className="offcanvas__menu_li">
                    <Link href="/faq" className="offcanvas__menu_item" onClick={handleClose}>Faq</Link>
                  </li>
                  <li className="offcanvas__menu_li">
                    <Link href="/contact" className="offcanvas__menu_item" onClick={handleClose}>Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="modal-backdrop fade show" onClick={handleClose} style={{ zIndex: 1040 }} />
      )}
    </>
  );
}
