'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PurchaseHistoryPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await fetch('/api/student/courses');
      const data = await res.json();
      if (res.ok) {
        setPurchases(data.courses || []);
      } else {
        setError(data.error || 'Failed to load purchase history');
      }
    } catch (err) {
      setError('Connection failure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 4px' }}>Purchase History</h2>
        <p style={{ color: 'var(--ed-paragraph-color)', margin: 0, fontSize: 14 }}>Review your invoices, enrolled courses, and billing logs.</p>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px 16px', borderRadius: 8, marginBottom: 24, fontSize: 14 }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--ed-border-color)', padding: 60, textAlign: 'center' }}>
          <div className="spinner-border" style={{ color: 'var(--ed-primary-color)' }} role="status" />
        </div>
      ) : purchases.length === 0 ? (
        <div style={{
          background: '#fff', borderRadius: 10,
          border: '1px solid var(--ed-border-color)',
          padding: '64px 40px', textAlign: 'center',
        }}>
          <div style={{
            width: 70, height: 70, borderRadius: '50%',
            background: '#f8fafc',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 18px',
            border: '1px solid var(--ed-border-color)',
          }}>
            <i className="fi fi-rr-receipt" style={{ fontSize: 30, color: 'var(--ed-paragraph-color)' }} />
          </div>
          <h2 style={{ color: 'var(--ed-title-color)', fontSize: 22, fontWeight: 700, margin: '0 0 10px' }}>
            No transaction records
          </h2>
          <p style={{
            color: 'var(--ed-paragraph-color)', fontSize: 15,
            maxWidth: 440, margin: '0 auto 26px', lineHeight: 1.65,
          }}>
            You have not made any purchases or completed enrollment checkouts yet.
          </p>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--ed-border-color)', overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="table align-middle mb-0" style={{ minWidth: 600 }}>
              <thead style={{ background: '#fafafa' }}>
                <tr>
                  <th style={thStyle}>Transaction Date</th>
                  <th style={thStyle}>Invoice / Item Title</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Status</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map(p => {
                  const dateStr = new Date(p.enrolledAt).toLocaleDateString('en-IN', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  });

                  return (
                    <tr key={p.id}>
                      <td style={tdStyle}>{dateStr}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--ed-title-color)' }}>
                        {p.title}
                      </td>
                      <td style={tdStyle}>{p.category}</td>
                      <td style={tdStyle}>
                        <span style={{
                          fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                          background: '#dcfce7', color: '#16a34a',
                        }}>
                          SUCCESS
                        </span>
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, color: 'var(--ed-title-color)' }}>
                        {p.price === 0 ? 'Free' : `₹${p.price.toFixed(2)}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: '12px 20px', fontWeight: 600, fontSize: 13, color: 'var(--ed-paragraph-color)', borderBottom: '1px solid var(--ed-border-color)' };
const tdStyle = { padding: '16px 20px', fontSize: 13.5, borderBottom: '1px solid var(--ed-border-color)' };
