'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <>
      <div className="section-bg">
        <Breadcrumbs title="Cart Page" menu={[{ label: 'Cart Page' }]} />
      </div>

      <section className="ed-cart section-gap bg-light">
        <div className="container ed-container">
          {cart.length === 0 ? (
            <div className="row justify-content-center">
              <div className="col-lg-6 col-12 text-center py-5 bg-white shadow-sm rounded" style={{ border: '1px solid var(--ed-border-color)' }}>
                <i className="fi fi-rr-shopping-cart mb-4" style={{ fontSize: '72px', color: 'var(--ed-primary-color)' }}></i>
                <h3 className="mb-3" style={{ color: 'var(--ed-title-color)' }}>Your Cart is Empty</h3>
                <p className="text-muted mb-4">It looks like you haven't added any courses or products to your cart yet.</p>
                <Link href="/courses" className="ed-btn">
                  Browse Courses <i className="fi fi-rr-arrow-small-right ms-2"></i>
                </Link>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                <div className="ed-cart__table-wrapper table-responsive bg-white p-4 shadow-sm rounded mb-4" style={{ border: '1px solid var(--ed-border-color)' }}>
                  <table className="ed-cart__table w-100">
                    <thead className="ed-cart__header" style={{ borderBottom: '2px solid var(--ed-border-color)' }}>
                      <tr className="ed-cart__header-row">
                        <th className="ed-cart__header-item text-start pb-3">Product</th>
                        <th className="ed-cart__header-item text-center pb-3">Price</th>
                        <th className="ed-cart__header-item text-center pb-3">Quantity</th>
                        <th className="ed-cart__header-item text-end pb-3">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="ed-cart__body">
                      {cart.map((item) => (
                        <tr className="ed-cart__item" key={item.id} style={{ borderBottom: '1px solid var(--ed-border-color)' }}>
                          <td className="ed-cart__product py-4 text-start d-flex align-items-center">
                            <button 
                              className="ed-cart__remove-button me-3 border-0 bg-transparent text-danger"
                              onClick={() => removeFromCart(item.id)}
                              style={{ cursor: 'pointer', fontSize: '18px' }}
                            >
                              <i className="fi fi-rr-cross-small"></i>
                            </button>
                            <img 
                              className="ed-cart__product-image rounded me-3" 
                              src={item.image || "/assets/images/product/cart-1.png"} 
                              alt={item.name}
                              style={{ width: 'clamp(48px, 10vw, 80px)', height: 'clamp(48px, 10vw, 80px)', objectFit: 'cover', flexShrink: 0 }}
                            />
                            <Link href="/product-details" className="ed-cart__product-name fw-semibold text-dark hover-primary">
                              {item.name}
                            </Link>
                          </td>
                          <td className="ed-cart__price text-center py-4 fw-medium">
                            ₹{item.price}
                          </td>
                          <td className="ed-cart__quantity text-center py-4">
                            <div className="ed-cart__quantity-selector d-inline-flex align-items-center border rounded">
                              <button 
                                className="ed-cart__quantity-decrease px-2 py-1 border-0 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <i className="fi fi-rr-minus-small"></i>
                              </button>
                              <input 
                                type="number" 
                                className="ed-cart__quantity-input text-center border-0 fw-semibold" 
                                value={item.quantity} 
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                min="1" 
                                style={{ width: '40px', outline: 'none' }}
                              />
                              <button 
                                className="ed-cart__quantity-increase px-2 py-1 border-0 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <i className="fi fi-rr-plus-small"></i>
                              </button>
                            </div>
                          </td>
                          <td className="ed-cart__subtotal text-end py-4 fw-semibold text-dark">
                            ₹{item.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="row justify-content-end mt-4">
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="bg-white p-4 shadow-sm rounded" style={{ border: '1px solid var(--ed-border-color)' }}>
                      <h4 className="mb-4 pb-2" style={{ borderBottom: '1px solid var(--ed-border-color)', color: 'var(--ed-title-color)' }}>Cart Totals</h4>
                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">Total Price</span>
                        <span className="fw-bold fs-5 text-dark">₹{totalPrice}</span>
                      </div>
                      <Link href="/checkout" className="ed-btn w-100 text-center mt-3" style={{ justifyContent: 'center', height: '52px' }}>
                        Proceed to Checkout <i className="fi fi-rr-arrow-small-right ms-2"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
