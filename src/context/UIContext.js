'use client';

import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export function UIProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleContact = () => setIsContactOpen(!isContactOpen);
  
  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsRegisterOpen(false);
  };
  
  const toggleRegister = () => {
    setIsRegisterOpen(!isRegisterOpen);
    setIsLoginOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <UIContext.Provider value={{
      isCartOpen, setIsCartOpen, toggleCart,
      isContactOpen, setIsContactOpen, toggleContact,
      isLoginOpen, setIsLoginOpen, toggleLogin,
      isRegisterOpen, setIsRegisterOpen, toggleRegister,
      isMobileMenuOpen, setIsMobileMenuOpen, toggleMobileMenu
    }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
