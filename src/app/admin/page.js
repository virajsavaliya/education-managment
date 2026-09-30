'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers]   = useState([]);
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');

  useEffect(() => {
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(d => { 
        setUsers(d.users || []); 
        setStats(d.stats || null);
      })
      .catch(() => setError('Could not load user list.'))
      .finally(() => setLoading(false));
  }, []);

  if (!user) return null;

  const STAT_CARDS = [
    { label: 'Total Students',  value: stats ? stats.studentsCount : 0, icon: 'fi fi-rr-users-alt',     color: '#543ee8', bg: '#ede9fe' },
    { label: 'Total Courses',   value: stats ? stats.coursesCount : 0,   icon: 'fi fi-rr-book-open-reader', color: '#0891b2', bg: '#e0f2fe' },
    { label: 'Live Classes',    value: stats ? stats.liveClassesCount : 0,    icon: 'fi fi-rr-video-camera',   color: '#16a34a', bg: '#dcfce7' },
    { label: 'Active Coupons',  value: stats ? stats.couponsCount : 0,    icon: 'fi fi-rr-ticket',          color: '#d97706', bg: '#fef3c7' },
  ];

  return (
    <div>
      {/* Welcome banner */}
      <div style={{
        background: 'var(--ed-secondary-color)',
        borderRadius: 10, padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 24, flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>
            Welcome back, {user.name} 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,.55)', margin: '4px 0 0', fontSize: 14 }}>
            Here's what's happening on your platform today.
          </p>
        </div>
        <div style={{
          background: 'var(--ed-primary-color)',
          color: '#fff', fontSize: 11, fontWeight: 700,
          padding: '5px 14px', borderRadius: 20, letterSpacing: 1,
          textTransform: 'uppercase',
        }}>
          ADMIN
        </div>
      </div>

      {/* Stat cards */}
      <div className="row g-3" style={{ marginBottom: 24 }}>
        {STAT_CARDS.map((c, i) => (
          <div className="col-lg-3 col-md-6 col-6" key={i}>
            <div style={{
              background: '#fff', borderRadius: 10,
              border: '1px solid var(--ed-border-color)',
              padding: '20px 20px 16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <i className={c.icon} style={{ fontSize: 20, color: c.color }} />
                </div>
              </div>
              <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--ed-title-color)', margin: 0, lineHeight: 1 }}>
                {c.value}
              </p>
              <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 13, margin: '4px 0 0' }}>{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links row */}
      <div className="row g-3" style={{ marginBottom: 24 }}>
        {[
          { href: '/admin/courses',      label: 'Manage Courses',    icon: 'fi fi-rr-book-open-reader', desc: 'Add, edit or remove courses' },
          { href: '/admin/students',     label: 'View Students',     icon: 'fi fi-rr-users-alt',       desc: 'Browse registered students' },
          { href: '/admin/live-classes', label: 'Live Classes',      icon: 'fi fi-rr-video-camera',    desc: 'Schedule & manage sessions' },
          { href: '/admin/coupons',      label: 'Coupons',           icon: 'fi fi-rr-ticket',           desc: 'Create discount codes' },
        ].map((l, i) => (
          <div className="col-lg-3 col-md-6 col-6" key={i}>
            <Link href={l.href} style={{
              display: 'block', textDecoration: 'none',
              background: '#fff', borderRadius: 10,
              border: '1px solid var(--ed-border-color)',
              padding: '18px 16px',
            }}>
              <i className={l.icon} style={{ fontSize: 22, color: 'var(--ed-primary-color)', display: 'block', marginBottom: 10 }} />
              <p style={{ fontWeight: 700, color: 'var(--ed-title-color)', fontSize: 14, margin: 0 }}>{l.label}</p>
              <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 12, margin: '2px 0 0' }}>{l.desc}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* User table */}
      <div style={{
        background: '#fff', borderRadius: 10,
        border: '1px solid var(--ed-border-color)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--ed-border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ed-title-color)', margin: 0 }}>
            Registered Users
          </h3>
          <span style={{
            background: '#ede9fe', color: 'var(--ed-primary-color)',
            fontSize: 12, fontWeight: 700,
            padding: '3px 10px', borderRadius: 20,
          }}>
            {users.length} total
          </span>
        </div>

        {loading ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <div className="spinner-border" style={{ color: 'var(--ed-primary-color)', width: 28, height: 28 }} role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
          </div>
        ) : error ? (
          <div style={{ padding: 24, color: '#dc2626', fontSize: 14 }}>{error}</div>
        ) : users.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--ed-paragraph-color)', fontSize: 14 }}>
            No users found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ background: '#fafafa' }}>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                          background: u.role === 'ADMIN' ? 'var(--ed-secondary-color)' : 'var(--ed-primary-color)',
                          color: '#fff', fontWeight: 700, fontSize: 12,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--ed-title-color)', fontSize: 14 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={tdStyle}>{u.email}</td>
                    <td style={tdStyle}>{u.phone || '—'}</td>
                    <td style={tdStyle}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                        background: u.role === 'ADMIN' ? '#fee2e2' : '#ede9fe',
                        color:      u.role === 'ADMIN' ? '#dc2626' : 'var(--ed-primary-color)',
                      }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: 'var(--ed-paragraph-color)', fontSize: 13 }}>
                      {new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const thStyle = { padding: '10px 16px', fontWeight: 600, fontSize: 13, color: 'var(--ed-paragraph-color)', borderBottom: '1px solid var(--ed-border-color)' };
const tdStyle = { padding: '12px 16px', fontSize: 14, borderBottom: '1px solid var(--ed-border-color)' };
