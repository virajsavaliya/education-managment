'use client';

import { useUI } from '@/context/UIContext';
import Link from 'next/link';

export default function SidebarContact() {
  const { isContactOpen, setIsContactOpen } = useUI();

  const handleClose = () => {
    setIsContactOpen(false);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Subscribed successfully!');
  };

  return (
    <>
      <div 
        className={`offcanvas offcanvas-end ed-sidebar ${isContactOpen ? 'show' : ''}`} 
        tabIndex="-1" 
        style={{ 
          visibility: isContactOpen ? 'visible' : 'hidden', 
          display: 'block',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <div className="ed-sidebar-header">
          <Link href="/" className="ed-sidebar-logo" onClick={handleClose}>
            <img src="/assets/images/logo.svg" alt="logo" />
          </Link>
          <button type="button" className="text-reset" onClick={handleClose}>
            <i className="fi fi-rr-cross"></i>
          </button>
        </div>
        <div className="ed-sidebar-body m-0">
          {/* Single Widget */}
          <div className="ed-sidebar-widget">
            <h3 className="ed-sidebar-widget-title">Contacts Us:</h3>
            {/* Single Info */}
            <div className="ed-contact__info-item">
              <div className="ed-contact__info-icon">
                <img src="/assets/images/icons/icon-phone-blue.svg" alt="icon-phone-blue" />
              </div>
              <div className="ed-contact__info-content">
                <span>24/7 Support</span>
                <a href="tel:+532 321 33 33">+532 321 33 33</a>
              </div>
            </div>
            {/* Single Info */}
            <div className="ed-contact__info-item">
              <div className="ed-contact__info-icon">
                <img src="/assets/images/icons/icon-envelope-blue.svg" alt="icon-envelope-blue" />
              </div>
              <div className="ed-contact__info-content">
                <span>Send Message</span>
                <a href="mailto:eduna@gmail.com">eduna@gmail.com</a>
              </div>
            </div>

            {/* Single Info */}
            <div className="ed-contact__info-item">
              <div className="ed-contact__info-icon">
                <img src="/assets/images/icons/icon-location-blue.svg" alt="icon-location-blue" />
              </div>
              <div className="ed-contact__info-content">
                <span>Our Location</span>
                <a href="#">32/Jenin, London</a>
              </div>
            </div>
          </div>

          {/* Single Widget */}
          <div className="ed-sidebar-widget">
            <h3 className="ed-sidebar-widget-title">Follow Us:</h3>
            <ul className="ed-sidebar-social">
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
          </div>

          {/* Single Widget */}
          <div className="ed-sidebar-widget">
            <h3 className="ed-sidebar-widget-title">Subscribe Now:</h3>
            <form onSubmit={handleSubscribe} className="ed-sidebar-subscribe">
              <input type="email" name="email-address" placeholder="Enter email" required />
              <button type="submit" className="ed-btn">Subscribe<i className="fi fi-rr-arrow-small-right"></i></button>
            </form>
          </div>
        </div>
      </div>

      {isContactOpen && (
        <div className="offcanvas-backdrop fade show" onClick={handleClose} style={{ zIndex: 1040 }} />
      )}
    </>
  );
}
