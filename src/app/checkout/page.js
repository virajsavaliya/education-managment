'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useCart } from '@/context/CartContext';

const COUNTRIES = [
  'India', 'United States', 'Canada', 'United Kingdom', 'Australia',
  'Germany', 'France', 'Japan', 'Brazil', 'Netherlands',
];

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [step, setStep] = useState(1); // 1 = billing, 2 = payment confirmation
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock Sandbox State
  const [showMockGateway, setShowMockGateway] = useState(false);
  const [mockOrderDetails, setMockOrderDetails] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'India',
    address: '',
    city: '',
    zip: '',
    notes: '',
  });

  useEffect(() => {
    async function fetchStudentDetails() {
      try {
        const res = await fetch('/api/student/profile');
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            const nameParts = (data.user.name || '').trim().split(/\s+/);
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';
            setFormData(prev => ({
              ...prev,
              firstName: firstName,
              lastName: lastName,
              email: data.user.email || '',
              phone: data.user.phone || '',
            }));
          }
        }
      } catch (err) {
        console.error('Failed to pre-fill billing info:', err);
      }
    }
    fetchStudentDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) return;
    if (coupon.toLowerCase() === 'edu10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      return;
    }
    try {
      const res = await fetch(`/api/coupon/verify?code=${encodeURIComponent(coupon)}`);
      const data = await res.json();
      if (res.ok && data.valid) {
        setDiscountPercent(data.discount);
        setCouponApplied(true);
      } else {
        alert(data.error || 'Invalid or expired coupon code. Try: EDU10');
      }
    } catch (err) {
      alert('Failed to verify coupon');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!formData.firstName || !formData.email || !formData.phone) {
      alert('Please fill out all required billing details (First Name, Email, Phone).');
      return;
    }

    setIsProcessing(true);
    const courseIds = cart.map(item => item.id);

    try {
      const orderRes = await fetch('/api/payment/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseIds,
          couponCode: couponApplied ? coupon : null
        })
      });

      if (!orderRes.ok) {
        throw new Error('Order creation failed');
      }

      const orderData = await orderRes.json();

      if (orderData.isMock) {
        // Open Sandbox simulator modal
        setMockOrderDetails(orderData);
        setShowMockGateway(true);
      } else {
        // Real Razorpay flow
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          alert('Razorpay SDK failed to load. Please check your internet connection.');
          setIsProcessing(false);
          return;
        }

        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Eduna Academy',
          description: 'Course Subscription Payment',
          order_id: orderData.orderId,
          handler: async function (response) {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                courseIds,
                isMock: false
              })
            });
            if (verifyRes.ok) {
              setIsOrdered(true);
              clearCart();
            } else {
              alert('Payment signature verification failed.');
            }
          },
          prefill: {
            name: formData.firstName + ' ' + (formData.lastName || ''),
            email: formData.email,
            contact: formData.phone
          },
          theme: {
            color: '#543ee8'
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      alert(err.message || 'Payment initiation failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMockPaymentSuccess = async () => {
    if (!mockOrderDetails) return;
    setShowMockGateway(false);
    setIsProcessing(true);

    const courseIds = cart.map(item => item.id);

    try {
      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_payment_id: 'pay_mock_' + Math.random().toString(36).substring(3, 10),
          razorpay_order_id: mockOrderDetails.orderId,
          courseIds,
          isMock: true
        })
      });

      if (verifyRes.ok) {
        setIsOrdered(true);
        clearCart();
      } else {
        alert('Sandbox payment verification failed.');
      }
    } catch (err) {
      alert('Sandbox connection error');
    } finally {
      setIsProcessing(false);
      setMockOrderDetails(null);
    }
  };

  const discount = couponApplied ? (totalPrice * (discountPercent / 100)).toFixed(2) : 0;
  const finalTotal = couponApplied
    ? (totalPrice - discount).toFixed(2)
    : parseFloat(totalPrice).toFixed(2);

  // ─── Success Screen ────────────────────────────────────────────────────────
  if (isOrdered) {
    return (
      <>
        <div className="section-bg">
          <Breadcrumbs title="Order Confirmed" menu={[{ label: 'Order Confirmed' }]} />
        </div>
        <section style={{ background: 'linear-gradient(135deg,#f8faff 0%,#eef2ff 100%)', padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: 620, textAlign: 'center' }}>
            <div style={{
              background: '#fff',
              borderRadius: 24,
              padding: '60px 48px',
              boxShadow: '0 20px 60px rgba(99,102,241,.12)',
              border: '1px solid #e0e7ff',
            }}>
              <div style={{
                width: 96, height: 96,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 28px',
                boxShadow: '0 12px 32px rgba(99,102,241,.4)',
                fontSize: 44,
                color: '#fff',
                fontWeight: 'bold'
              }}>✓</div>

              <h2 style={{ fontSize: 30, fontWeight: 800, color: '#1e1b4b', marginBottom: 12 }}>
                Order Confirmed! 🎉
              </h2>
              <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.6, marginBottom: 36 }}>
                Thank you for your enrollment. The courses have been unlocked in your dashboard, and you can start studying immediately.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Link href="/dashboard/my-courses" className="btn btn-primary" style={{
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  border: 'none', borderRadius: 12, padding: '14px 28px',
                  fontWeight: 700, fontSize: 15, transition: 'all .2s',
                  boxShadow: '0 8px 24px rgba(99,102,241,.3)',
                }}>
                  Go to My Classroom
                </Link>
                <Link href="/courses" className="btn btn-link" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none' }}>
                  Continue Browsing Catalog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="section-bg">
        <Breadcrumbs title="Checkout" menu={[{ label: 'Checkout' }]} />
      </div>

      <section className="ed-checkout py-5 bg-light">
        <div className="container ed-container">
          {cart.length === 0 ? (
            <div className="bg-white p-5 rounded-4 border text-center">
              <i className="fi fi-rr-shopping-cart" style={{ fontSize: 48, color: '#cbd5e1', display: 'block', marginBottom: 16 }} />
              <h4 style={{ color: 'var(--ed-title-color)', fontWeight: 700 }}>Your cart is empty</h4>
              <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 14 }}>Please add courses to your cart before checking out.</p>
              <Link href="/courses" className="btn btn-primary btn-sm mt-3" style={{ backgroundColor: 'var(--ed-primary-color)', borderColor: 'var(--ed-primary-color)' }}>
                View Courses
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              {/* Left Column: Checkout steps */}
              <div className="col-lg-7 col-12">
                <form onSubmit={handleSubmit} className="bg-white p-4 p-md-5 rounded-4 shadow-sm border border-light">
                  {step === 1 ? (
                    <div>
                      <h3 style={sectionTitleStyle}>1. Billing Information</h3>
                      <div className="row g-3">
                        <div className="col-md-6 col-12">
                          <label style={labelStyle}>First Name *</label>
                          <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} style={inputStyle} placeholder="John" />
                        </div>
                        <div className="col-md-6 col-12">
                          <label style={labelStyle}>Last Name</label>
                          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={inputStyle} placeholder="Doe" />
                        </div>
                        <div className="col-12">
                          <label style={labelStyle}>Email Address *</label>
                          <input type="email" name="email" required value={formData.email} onChange={handleChange} style={inputStyle} placeholder="john@example.com" />
                        </div>
                        <div className="col-12">
                          <label style={labelStyle}>Phone Number (+91) *</label>
                          <input type="text" name="phone" required value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="+91 98765 43210" />
                        </div>
                        <div className="col-12">
                          <label style={labelStyle}>Country</label>
                          <select name="country" value={formData.country} onChange={handleChange} style={inputStyle}>
                            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="col-12">
                          <label style={labelStyle}>Street Address</label>
                          <input type="text" name="address" value={formData.address} onChange={handleChange} style={inputStyle} placeholder="House no, Street name" />
                        </div>
                        <div className="col-md-6 col-12">
                          <label style={labelStyle}>Town / City</label>
                          <input type="text" name="city" value={formData.city} onChange={handleChange} style={inputStyle} placeholder="Pune" />
                        </div>
                        <div className="col-md-6 col-12">
                          <label style={labelStyle}>Postcode / ZIP</label>
                          <input type="text" name="zip" value={formData.zip} onChange={handleChange} style={inputStyle} placeholder="411001" />
                        </div>
                        <div className="col-12">
                          <label style={labelStyle}>Order Notes (Optional)</label>
                          <textarea name="notes" value={formData.notes} onChange={handleChange} style={{ ...inputStyle, height: 100 }} placeholder="Special instructions for support." />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (formData.firstName && formData.email && formData.phone) {
                            setStep(2);
                          } else {
                            alert('Please fill out all required fields.');
                          }
                        }}
                        className="btn btn-primary w-100 mt-4"
                        style={{ height: 48, fontWeight: 700, borderRadius: 8, backgroundColor: 'var(--ed-primary-color)', borderColor: 'var(--ed-primary-color)' }}
                      >
                        Continue to Payment
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3 style={sectionTitleStyle}>2. Payment Confirmation</h3>
                      <div className="p-3 mb-4 rounded-3" style={{ border: '1px solid var(--ed-border-color)', background: '#fafafa' }}>
                        <h5 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--ed-title-color)', margin: '0 0 8px' }}>Billing Summary</h5>
                        <p style={{ fontSize: '13px', color: 'var(--ed-paragraph-color)', margin: '0 0 4px' }}>
                          <strong>Name:</strong> {formData.firstName} {formData.lastName}
                        </p>
                        <p style={{ fontSize: '13px', color: 'var(--ed-paragraph-color)', margin: '0 0 4px' }}>
                          <strong>Email:</strong> {formData.email}
                        </p>
                        <p style={{ fontSize: '13px', color: 'var(--ed-paragraph-color)', margin: '0 0 4px' }}>
                          <strong>Phone:</strong> {formData.phone}
                        </p>
                      </div>

                      <div className="p-3 rounded-3 mb-4" style={{ border: '1.5px solid var(--ed-primary-color)', background: '#f5f3ff' }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ fontSize: '20px' }}>💳</span>
                          <strong style={{ fontSize: '14.5px', color: 'var(--ed-title-color)' }}>Razorpay Secure Payments</strong>
                        </div>
                        <p style={{ fontSize: '12.5px', color: 'var(--ed-paragraph-color)', margin: 0, lineHeight: 1.5 }}>
                          Pay securely via UPI, Card, Netbanking, or Wallet. Payment processing is managed and verified by Razorpay.
                        </p>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="btn btn-light"
                          style={{ height: 48, fontWeight: 700, borderRadius: 8, flex: 1 }}
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="btn btn-primary"
                          style={{ height: 48, fontWeight: 700, borderRadius: 8, backgroundColor: 'var(--ed-primary-color)', borderColor: 'var(--ed-primary-color)', flex: 2 }}
                        >
                          {isProcessing ? 'Processing...' : 'Pay ₹' + finalTotal}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Right Column: Order summary */}
              <div className="col-lg-5 col-12">
                <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border border-light">
                  <h3 style={sectionTitleStyle}>Order Review</h3>
                  
                  {/* Cart Items list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                    {cart.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'center', overflow: 'hidden' }}>
                        <img src={item.image} alt={item.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--ed-border-color)' }} />
                        <div style={{ overflow: 'hidden', flex: 1 }}>
                          <h6 style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.name}
                          </h6>
                          <span style={{ fontSize: 12.5, color: 'var(--ed-primary-color)', fontWeight: '700' }}>₹{item.price}.00</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input
                        style={{ ...inputStyle, flex: 1, padding: '10px 14px', height: 44 }}
                        type="text"
                        placeholder="Coupon code"
                        value={coupon}
                        onChange={e => setCoupon(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        style={{
                          padding: '10px 18px', borderRadius: 10,
                          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                          color: '#fff', border: 'none', cursor: 'pointer',
                          fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap',
                        }}
                      >
                        Apply
                      </button>
                    </div>
                    {couponApplied && (
                      <div style={{
                        background: '#f0fdf4', border: '1px solid #bbf7d0',
                        borderRadius: 8, padding: '8px 12px', marginTop: 8,
                        color: '#166534', fontSize: 13, display: 'flex', gap: 8,
                      }}>
                        ✅ Coupon applied! {discountPercent}% discount
                      </div>
                    )}
                  </div>

                  {/* Totals */}
                  <div style={{ borderTop: '2px dashed #e0e7ff', paddingTop: 20 }}>
                    <div style={totalRowStyle}>
                      <span style={{ color: '#6b7280', fontSize: 14 }}>Subtotal</span>
                      <span style={{ color: '#374151', fontWeight: 600 }}>₹{parseFloat(totalPrice).toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div style={totalRowStyle}>
                        <span style={{ color: '#16a34a', fontSize: 14 }}>Discount ({discountPercent}%)</span>
                        <span style={{ color: '#16a34a', fontWeight: 600 }}>−₹{discount}</span>
                      </div>
                    )}
                    <div style={totalRowStyle}>
                      <span style={{ color: '#6b7280', fontSize: 14 }}>Tax / Service fee</span>
                      <span style={{ background: '#f0fdf4', color: '#16a34a', borderRadius: 4, padding: '2px 6px', fontSize: 11, fontWeight: '700' }}>
                        FREE
                      </span>
                    </div>
                    <div style={{ ...totalRowStyle, marginTop: 12, borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                      <span style={{ color: 'var(--ed-title-color)', fontWeight: 800, fontSize: 16 }}>Total</span>
                      <span style={{ color: 'var(--ed-primary-color)', fontWeight: 800, fontSize: 18 }}>₹{finalTotal}</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Razorpay Sandbox Payment Gateway Mock Modal Simulator */}
      {showMockGateway && mockOrderDetails && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)', zIndex: 10000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 16, backdropFilter: 'blur(6px)'
        }}>
          <div style={{
            background: '#fff', width: '100%', maxWidth: '440px',
            borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)', border: '1px solid #e2e8f0'
          }}>
            {/* Header */}
            <div style={{
              background: '#0b0c10', color: '#fff', padding: '18px 24px',
              display: 'flex', alignItems: 'center', gap: 10
            }}>
              <span style={{ fontSize: '22px' }}>💳</span>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: '#fff' }}>Razorpay Secure Sandbox</h4>
                <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Test Payment Environment</span>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: 24 }}>
              <div style={{ background: '#f8fafc', padding: 16, borderRadius: 10, marginBottom: 20, border: '1px dashed #cbd5e1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '13px' }}>
                  <span className="text-muted">Order ID:</span>
                  <span className="fw-bold text-dark">{mockOrderDetails.orderId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span className="text-muted">Amount Payable:</span>
                  <strong className="text-primary">₹{(mockOrderDetails.amount / 100).toFixed(2)}</strong>
                </div>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: 12, borderRadius: 8, color: '#166534', fontSize: '12.5px', marginBottom: 24, lineHeight: 1.5 }}>
                ℹ️ This is a sandboxed payment simulator. Clicking "Approve Payment" will simulate a successful Razorpay gateway callback and unlock courses in the student database.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  type="button"
                  onClick={handleMockPaymentSuccess}
                  className="btn btn-primary"
                  style={{
                    height: '46px', fontWeight: '700', borderRadius: 8,
                    backgroundColor: '#16a34a', borderColor: '#16a34a', color: '#fff'
                  }}
                >
                  ✓ Approve Payment (Simulate Success)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMockGateway(false);
                    setMockOrderDetails(null);
                  }}
                  className="btn btn-light"
                  style={{ height: '46px', fontWeight: '700', borderRadius: 8 }}
                >
                  Cancel / Decline Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const sectionTitleStyle = {
  fontSize: 16, fontWeight: 800, color: 'var(--ed-title-color)',
  borderBottom: '1px solid var(--ed-border-color)', paddingBottom: 12, marginBottom: 24,
};
const labelStyle = { display: 'block', fontSize: 11.5, fontWeight: 700, color: 'var(--ed-title-color)', marginBottom: 6 };
const inputStyle = {
  width: '100%', padding: '10px 14px', border: '1px solid var(--ed-border-color)',
  borderRadius: 8, fontSize: 13.5, outline: 'none', fontFamily: 'var(--ed-font-family)',
};
const totalRowStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10,
};
