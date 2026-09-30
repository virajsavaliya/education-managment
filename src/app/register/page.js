'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function RegisterPage() {
  const router = useRouter();
  const { register, login } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      // Create user record
      await register(name, email, phone, password);
      
      // Auto-authenticate user
      await login(email, password);

      // Redirect student to dashboard
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Registration failed. Please check inputs and try again.');
      setSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumbs title="Register" menu={[{ label: 'Register' }]} />

      <section className="ed-contact bg-light" style={{ paddingTop: '50px', paddingBottom: '80px' }}>
        <div className="container ed-container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12">
              <div 
                className="ed-contact__form bg-white p-5 shadow" 
                style={{ 
                  borderRadius: '12px', 
                  border: '1px solid var(--ed-border-color)' 
                }}
              >
                <div className="ed-contact__form-head text-center mb-4">
                  <span className="ed-contact__form-sm-title" style={{ color: 'var(--ed-secondary-color)', fontWeight: '600' }}>JOIN US</span>
                  <h3 className="ed-contact__form-big-title" style={{ fontSize: '28px', color: 'var(--ed-title-color)', marginTop: '5px' }}>
                    Create An Account
                  </h3>
                </div>

                {error && (
                  <div className="alert alert-danger text-center mb-4" role="alert" style={{ fontSize: '14px' }}>
                    {error}
                  </div>
                )}

                <form className="ed-contact__form-main" onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ed-title-color)', marginBottom: '5px', display: 'block' }}>Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                      className="w-100 px-3 py-2 border rounded"
                      style={{ 
                        outline: 'none', 
                        borderColor: 'var(--ed-border-color)', 
                        height: '50px',
                        fontSize: '15px'
                      }} 
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ed-title-color)', marginBottom: '5px', display: 'block' }}>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="username@domain.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      className="w-100 px-3 py-2 border rounded"
                      style={{ 
                        outline: 'none', 
                        borderColor: 'var(--ed-border-color)', 
                        height: '50px',
                        fontSize: '15px'
                      }} 
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ed-title-color)', marginBottom: '5px', display: 'block' }}>Phone Number (Optional)</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-100 px-3 py-2 border rounded"
                      style={{ 
                        outline: 'none', 
                        borderColor: 'var(--ed-border-color)', 
                        height: '50px',
                        fontSize: '15px'
                      }} 
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ed-title-color)', marginBottom: '5px', display: 'block' }}>Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                      className="w-100 px-3 py-2 border rounded"
                      style={{ 
                        outline: 'none', 
                        borderColor: 'var(--ed-border-color)', 
                        height: '50px',
                        fontSize: '15px'
                      }} 
                    />
                  </div>

                  <div className="ed-contact__form-btn">
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="ed-btn w-100 text-center"
                      style={{ 
                        height: '55px', 
                        justifyContent: 'center', 
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        opacity: submitting ? 0.8 : 1
                      }}
                    >
                      {submitting ? 'Registering...' : 'Register Now'} 
                      {!submitting && <i className="fi fi-rr-arrow-small-right ms-2"></i>}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="mb-0" style={{ fontSize: '14px', color: 'var(--ed-paragraph-color)' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: 'var(--ed-primary-color)', fontWeight: '600' }}>
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
