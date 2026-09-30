'use client';

import { useUI } from '@/context/UIContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function SidebarCart() {
  const { isCartOpen, setIsCartOpen } = useUI();
  const { cart, removeFromCart, totalPrice } = useCart();

  const handleClose = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <div 
        className={`offcanvas offcanvas-end ed-sidebar ed-sidebar-cart ${isCartOpen ? 'show' : ''}`} 
        tabIndex="-1" 
        style={{ 
          visibility: isCartOpen ? 'visible' : 'hidden', 
          display: 'block',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <div className="ed-sidebar-header">
          <h3 className="ed-sidebar-header-title">Add to cart</h3>
          <button type="button" className="text-reset" onClick={handleClose}>
            <i className="fi fi-rr-cross"></i>
          </button>
        </div>
        <div className="ed-sidebar-body" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 180px)' }}>
          {cart.length === 0 ? (
            <div className="text-center p-5">
              <i className="fi fi-rr-shopping-bag mb-3" style={{ fontSize: '48px', color: '#ccc', display: 'block' }}></i>
              <p className="text-muted">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="ed-sidebar-cart-item" key={item.id}>
                <div className="ed-sidebar-cart-main">
                  <div className="ed-sidebar-cart-img">
                    <img 
                      src={item.image || "/assets/images/product/cart-1.png"} 
                      alt={item.name} 
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </div>
                  <div className="ed-sidebar-cart-info">
                    <span>{item.quantity} x <strong>₹{item.price}</strong></span>
                    <Link href="/product-details" onClick={handleClose}>{item.name}</Link>
                  </div>
                </div>
                <div className="ed-sidebar-cart-remove">
                  <button type="button" onClick={() => removeFromCart(item.id)}>
                    <i className="fi fi-rr-cross"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="ed-sidebar-footer">
          <div className="ed-sidebar-cart-subtotal">
            <p>Subtotal:<span> ₹{totalPrice}</span></p>
            <Link 
              href="/checkout" 
              className="ed-sidebar-cart-btn w-100 text-center mt-3" 
              style={{ display: cart.length === 0 ? 'none' : 'block' }}
              onClick={handleClose}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>

      {isCartOpen && (
        <div className="offcanvas-backdrop fade show" onClick={handleClose} style={{ zIndex: 1040 }} />
      )}
    </>
  );
}
