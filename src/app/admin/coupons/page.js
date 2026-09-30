'use client';

import { useEffect, useState } from 'react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  // Form fields
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [maxUses, setMaxUses] = useState('100');
  const [expiresAt, setExpiresAt] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Delete confirm state
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/admin/coupons');
      const data = await res.json();
      if (data.coupons) {
        setCoupons(data.coupons);
      } else {
        setError(data.error || 'Failed to load coupons');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const openCreateDrawer = () => {
    setEditingCoupon(null);
    setCode('');
    setDiscount('');
    setMaxUses('100');
    setExpiresAt('');
    setIsActive(true);
    setDrawerOpen(true);
  };

  const openEditDrawer = (coupon) => {
    setEditingCoupon(coupon);
    setCode(coupon.code);
    setDiscount(String(coupon.discount));
    setMaxUses(String(coupon.maxUses));
    
    // Format to YYYY-MM-DD
    if (coupon.expiresAt) {
      setExpiresAt(new Date(coupon.expiresAt).toISOString().split('T')[0]);
    } else {
      setExpiresAt('');
    }
    
    setIsActive(coupon.isActive);
    setDrawerOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const payload = {
      code,
      discount: parseFloat(discount) || 0,
      maxUses: parseInt(maxUses) || 100,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      isActive,
    };

    const url = editingCoupon ? `/api/admin/coupons/${editingCoupon.id}` : '/api/admin/coupons';
    const method = editingCoupon ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setDrawerOpen(false);
        fetchCoupons();
      } else {
        setError(data.error || 'Save failed');
      }
    } catch (err) {
      setError('Save failed due to network error');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (coupon) => {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });
      if (res.ok) {
        setCoupons(coupons.map(c => c.id === coupon.id ? { ...c, isActive: !c.isActive } : c));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setCoupons(coupons.filter(c => c.id !== id));
        setConfirmDeleteId(null);
      }
    } catch (err) {
      setError('Delete failed');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <p style={{ color: 'var(--ed-paragraph-color)', margin: 0, fontSize: 14 }}>Create and manage promotional discount coupons.</p>
        </div>
        <button
          onClick={openCreateDrawer}
          style={{
            background: 'var(--ed-primary-color)', color: '#fff',
            border: 'none', borderRadius: 6, padding: '10px 18px',
            fontWeight: 600, fontSize: 13, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <i className="fi fi-rr-plus-small" style={{ fontSize: 16 }} />
          Create Coupon
        </button>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontSize: 14 }}>
          {error}
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--ed-border-color)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <div className="spinner-border" style={{ color: 'var(--ed-primary-color)', width: 28, height: 28 }} role="status" />
          </div>
        ) : coupons.length === 0 ? (
          <div style={{ padding: '60px 40px', textAlign: 'center' }}>
            <i className="fi fi-rr-ticket" style={{ fontSize: 40, color: '#ccd0d0', display: 'block', marginBottom: 12 }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 4px' }}>No Coupons Found</h3>
            <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 13, margin: '0 0 16px' }}>Generate discount codes to drive sales.</p>
            <button
              onClick={openCreateDrawer}
              style={{
                background: 'var(--ed-primary-color)', color: '#fff',
                border: 'none', borderRadius: 6, padding: '8px 16px',
                fontWeight: 600, fontSize: 12, cursor: 'pointer',
              }}
            >
              Create Coupon
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ background: '#fafafa' }}>
                <tr>
                  <th style={thStyle}>Coupon Code</th>
                  <th style={thStyle}>Discount</th>
                  <th style={thStyle}>Limit / Usage</th>
                  <th style={thStyle}>Expiration</th>
                  <th style={thStyle}>Status</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map(coupon => {
                  const hasExpired = coupon.expiresAt && new Date(coupon.expiresAt) < new Date();
                  
                  return (
                    <tr key={coupon.id}>
                      <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--ed-title-color)', letterSpacing: .5 }}>
                        {coupon.code}
                      </td>
                      <td style={tdStyle}>
                        <span style={{ fontWeight: 600, color: '#16a34a' }}>{coupon.discount}% Off</span>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ fontWeight: 500 }}>{coupon.usedCount}</span>
                        <span style={{ color: 'var(--ed-paragraph-color)' }}> / {coupon.maxUses} uses</span>
                      </td>
                      <td style={tdStyle}>
                        {coupon.expiresAt ? (
                          <span style={{ color: hasExpired ? '#dc2626' : 'var(--ed-title-color)' }}>
                            {new Date(coupon.expiresAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            {hasExpired && <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#dc2626' }}>Expired</span>}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--ed-paragraph-color)' }}>Never Expires</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => toggleActive(coupon)}
                          style={{
                            border: 'none', background: 'none', cursor: 'pointer', padding: 0,
                            fontSize: 22, color: coupon.isActive && !hasExpired ? '#16a34a' : '#cbd5e1',
                            lineHeight: 1,
                          }}
                          disabled={hasExpired}
                        >
                          <i className={coupon.isActive && !hasExpired ? 'fi fi-rr-toggle-on' : 'fi fi-rr-toggle-off'} />
                        </button>
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: 6 }}>
                          <button
                            onClick={() => openEditDrawer(coupon)}
                            style={{
                              background: 'none', border: 'none', cursor: 'pointer', padding: 6,
                              color: 'var(--ed-primary-color)', fontSize: 14,
                            }}
                            title="Edit"
                          >
                            <i className="fi fi-rr-edit" />
                          </button>
                          {confirmDeleteId === coupon.id ? (
                            <div style={{ display: 'inline-flex', gap: 4 }}>
                              <button
                                onClick={() => handleDelete(coupon.id)}
                                style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                style={{ background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: 4, padding: '2px 8px', fontSize: 11 }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(coupon.id)}
                              style={{
                                background: 'none', border: 'none', cursor: 'pointer', padding: 6,
                                color: '#ef4444', fontSize: 14,
                              }}
                              title="Delete"
                            >
                              <i className="fi fi-rr-trash" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Slide-in Edit/Create Drawer Overlay ── */}
      {drawerOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,.4)', display: 'flex', justifyContent: 'flex-end',
        }}>
          <div style={{ flex: 1 }} onClick={() => setDrawerOpen(false)} />

          <aside style={{
            width: '100%', maxWidth: 460, background: '#fff', height: '100vh',
            display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,.15)',
          }}>
            <header style={{
              padding: '16px 24px', borderBottom: '1px solid var(--ed-border-color)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ed-title-color)', margin: 0 }}>
                {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
              </h3>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--ed-paragraph-color)' }}
              >
                ✕
              </button>
            </header>

            <form onSubmit={handleSave} style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Coupon Code *</label>
                <input
                  type="text" required value={code} onChange={e => setCode(e.target.value.toUpperCase())}
                  style={{ ...inputStyle, textTransform: 'uppercase' }} placeholder="e.g. SAVE20"
                />
              </div>

              <div className="row g-2">
                <div className="col-6" style={formGroupStyle}>
                  <label style={labelStyle}>Discount Percentage (%) *</label>
                  <input
                    type="number" required min="1" max="100" value={discount} onChange={e => setDiscount(e.target.value)}
                    style={inputStyle} placeholder="e.g. 20"
                  />
                </div>
                <div className="col-6" style={formGroupStyle}>
                  <label style={labelStyle}>Max Usage Limit</label>
                  <input
                    type="number" required min="1" value={maxUses} onChange={e => setMaxUses(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Expiration Date</label>
                <input
                  type="date" value={expiresAt} onChange={e => setExpiresAt(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ ...formGroupStyle, display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                <input
                  type="checkbox" id="isActive" checked={isActive} onChange={e => setIsActive(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: 'var(--ed-primary-color)' }}
                />
                <label htmlFor="isActive" style={{ ...labelStyle, margin: 0, cursor: 'pointer' }}>
                  Enable coupon code immediately
                </label>
              </div>

              <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
                <button
                  type="submit" disabled={submitting}
                  style={{
                    flex: 1, background: 'var(--ed-primary-color)', color: '#fff',
                    border: 'none', borderRadius: 6, padding: '10px 16px',
                    fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  }}
                >
                  {submitting ? 'Saving...' : 'Save Coupon'}
                </button>
                <button
                  type="button" onClick={() => setDrawerOpen(false)}
                  style={{
                    background: '#f1f5f9', color: '#475569',
                    border: 'none', borderRadius: 6, padding: '10px 16px',
                    fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: '12px 16px', fontWeight: 600, fontSize: 13, color: 'var(--ed-paragraph-color)', borderBottom: '1px solid var(--ed-border-color)' };
const tdStyle = { padding: '14px 16px', fontSize: 14, borderBottom: '1px solid var(--ed-border-color)' };

const formGroupStyle = { marginBottom: 16 };
const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ed-title-color)', marginBottom: 6 };
const inputStyle = {
  width: '100%', padding: '8px 12px', border: '1px solid var(--ed-border-color)',
  borderRadius: 6, fontSize: 14, outline: 'none', fontFamily: 'var(--ed-font-family)',
};
