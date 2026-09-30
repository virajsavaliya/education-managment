'use client';

import { useEffect, useState } from 'react';
import { useUI } from '@/context/UIContext';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { toggleCart, toggleContact, toggleLogin, toggleRegister, toggleMobileMenu } = useUI();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const router = useRouter();

  const [searchVal, setSearchVal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/courses/categories');
        if (res.ok) {
          const data = await res.json();
          if (data.categories) {
            setCategories(data.categories);
          }
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }
    fetchCategories();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchVal.trim()) queryParams.set('search', searchVal.trim());
    if (selectedCategory && selectedCategory !== 'All Categories') {
      queryParams.set('category', selectedCategory);
    }
    router.push(`/courses?${queryParams.toString()}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.ed-header');
      if (header) {
        if (window.scrollY < 100) {
          header.classList.remove('sticky');
        } else {
          header.classList.add('sticky');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Start Topbar Area */}
      <div className="ed-topbar">
        <div className="container ed-container-expand">
          <div className="ed-topbar__inner">
            {/* Logo */}
            <div className="ed-topbar__logo">
              <Link href="/">
                <img src="/assets/images/logo.svg" alt="logo" />
              </Link>
            </div>

            {/* Search Widget */}
            <div className="ed-topbar__search-widget">
              <div className="ed-topbar__category" style={{ display: 'flex', alignItems: 'center' }}>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    padding: '0 30px 0 15px',
                    height: '100%',
                    outline: 'none',
                    fontSize: '14px',
                    color: 'var(--ed-title-color)',
                    fontWeight: '500',
                    cursor: 'pointer',
                    minWidth: '140px',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none',
                  }}
                >
                  <option value="All Categories">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <i className="fi fi-rr-angle-small-down" style={{ pointerEvents: 'none', marginLeft: '-24px', marginRight: '10px', fontSize: '14px', color: '#64748b' }} />
              </div>
              <div className="ed-topbar__search">
                <form onSubmit={handleSearchSubmit}>
                  <input 
                    type="search" 
                    name="search" 
                    placeholder="Search your courses..." 
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                  />
                  <button type="submit">Search<i className="fi fi-rr-search"></i></button>
                </form>
              </div>
            </div>

            {/* Topbar Info */}
            <div className="ed-topbar__info">
              {/* Topbar Social */}
              <ul className="ed-topbar__info-social">
                <li>
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/icons/icon-dark-facebook.svg" alt="icon-dark-facebook" />
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/icons/icon-dark-twitter.svg" alt="icon-dark-twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://www.dribbble.com/" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/icons/icon-dark-dribbble.svg" alt="icon-dark-dribbble" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/icons/icon-dark-instagram.svg" alt="icon-dark-instagram" />
                  </a>
                </li>
              </ul>

              {/* Topbar Button */}
              <div className="ed-topbar__info-buttons">
                {user ? (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href={user.role === 'ADMIN' ? '/admin' : '/dashboard'} className="login-btn text-center" style={{ display: 'inline-block', lineHeight: '44px', padding: '0 15px', borderRadius: '4px' }}>
                      Dashboard
                    </Link>
                    <a 
                      href="#" 
                      className="register-btn text-center" 
                      onClick={(e) => { e.preventDefault(); logout(); }} 
                      style={{ display: 'inline-block', lineHeight: '44px', padding: '0 15px', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
                    >
                      Log Out
                    </a>
                  </div>
                ) : (
                  <>
                    <Link href="/register" className="register-btn text-center" style={{ display: 'inline-block', lineHeight: '44px', padding: '0 15px', borderRadius: '4px' }}>
                      Register
                    </Link>
                    <Link href="/login" className="login-btn text-center" style={{ display: 'inline-block', lineHeight: '44px', padding: '0 15px', borderRadius: '4px' }}>
                      Log In
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button type="button" className="mobile-menu-offcanvas-toggler" onClick={toggleMobileMenu}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Topbar Area */}

      {/* Start Header Area */}
      <header className="ed-header">
        <div className="container ed-container-expand">
          <div className="ed-header__inner">
            <div className="row align-items-center">
              <div className="col-lg-7 col-12">
                {/* Navigation Menu */}
                <nav className="ed-header__navigation">
                  <ul className="ed-header__menu">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/courses">Courses</Link>
                    </li>
                    <li>
                      <Link href="/blog">Blog</Link>
                    </li>
                    <li>
                      <Link href="/about-1">About</Link>
                    </li>
                    <li>
                      <Link href="/faq">Faq</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-lg-5 col-12">
                {/* Header Right */}
                <div className="ed-header__right">
                  <ul className="ed-header__contact">
                    <li><a href="tel:+532 321 33 33">+532 321 33 33</a></li>
                    <li>
                      <a href="mailto:helloeduna@gmail.com">helloeduna@gmail.com</a>
                    </li>
                  </ul>
                  <div className="ed-header__action">
                    <div className="ed-header__cart">
                      <button type="button" className="ed-topbar__action-icon" onClick={toggleCart}>
                        <img src="/assets/images/icons/icon-grey-bag.svg" alt="icon-grey-bag" />
                        <span>{totalItems}</span>
                      </button>
                    </div>
                    <div className="ed-header__menu">
                      <button type="button" onClick={toggleContact}>
                        <img src="/assets/images/icons/icon-grey-menu-3-line.svg" alt="icon-grey-menu-3-line" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* End Header Area */}
    </>
  );
}
