'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/dashboard',                   label: 'Overview',         icon: 'fi fi-rr-chart-pie-alt' },
  { href: '/dashboard/my-courses',        label: 'My Courses',       icon: 'fi fi-rr-book-open-reader' },
  { href: '/dashboard/live-classes',      label: 'Live Classes',     icon: 'fi fi-rr-video-camera' },
  { href: '/dashboard/purchase-history',  label: 'Purchase History', icon: 'fi fi-rr-receipt' },
  { href: '/dashboard/profile',           label: 'Profile',          icon: 'fi fi-rr-user' },
];

const TOPBAR_H  = 62;
const MOBILE_BP = 900; // collapse nav earlier since 5 items

export default function StudentLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();

  const [dropdownOpen, setDropdownOpen]   = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isMobile, setIsMobile]           = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BP);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileNavOpen(false);
  }, [pathname]);

  // Close user dropdown on outside click
  useEffect(() => {
    const h = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  if (loading) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#f5f5f5', fontFamily: 'var(--ed-font-family)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner-border" role="status"
            style={{ width: 36, height: 36, color: 'var(--ed-primary-color)', borderRightColor: 'transparent' }} />
          <p style={{ marginTop: 12, color: 'var(--ed-paragraph-color)', fontSize: 14 }}>Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const initials = user.name
    ? user.name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2)
    : 'ST';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--ed-font-family)',
      background: '#f5f5f5', overflow: 'hidden',
    }}>

      {/* ── Top navigation bar ── */}
      <header style={{
        height: TOPBAR_H,
        background: 'var(--ed-secondary-color)',
        display: 'flex', alignItems: 'center',
        padding: '0 16px 0 20px',
        flexShrink: 0,
        borderBottom: '1px solid rgba(255,255,255,.08)',
        position: 'relative',
        zIndex: 110,
      }}>

        {/* Brand */}
        <Link href="/dashboard" style={{
          textDecoration: 'none', display: 'flex', alignItems: 'center',
          gap: 9, marginRight: isMobile ? 'auto' : 32, flexShrink: 0,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 7,
            background: 'var(--ed-primary-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 15,
          }}>E</div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>Eduna</span>
        </Link>

        {/* Desktop Nav links */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, overflow: 'hidden' }}>
            {NAV_ITEMS.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '20px 13px', whiteSpace: 'nowrap',
                  textDecoration: 'none', fontSize: 13.5,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#fff' : 'rgba(255,255,255,.60)',
                  borderBottom: isActive ? '2px solid var(--ed-tertiary-color)' : '2px solid transparent',
                }}>
                  <i className={item.icon} style={{ fontSize: 14, flexShrink: 0 }} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, marginLeft: isMobile ? 0 : 0 }}>

          {/* Desktop: Website link */}
          {!isMobile && (
            <>
              <Link href="/" style={{
                color: 'rgba(255,255,255,.50)', textDecoration: 'none',
                fontSize: 13, display: 'flex', alignItems: 'center', gap: 5,
              }}>
                <i className="fi fi-rr-home" style={{ fontSize: 14 }} />
                Website
              </Link>
              <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,.12)' }} />
            </>
          )}

          {/* ── User dropdown trigger ── */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setDropdownOpen(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,.07)',
                border: '1px solid rgba(255,255,255,.12)',
                borderRadius: 8, padding: '5px 10px 5px 6px',
                cursor: 'pointer', outline: 'none',
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--ed-primary-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: 12, flexShrink: 0,
              }}>{initials}</div>

              {!isMobile && (
                <div style={{ textAlign: 'left', lineHeight: 1 }}>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: 13, margin: '0 0 2px', maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,.40)', fontSize: 11, margin: 0, lineHeight: 1 }}>Student</p>
                </div>
              )}

              <i
                className={dropdownOpen ? 'fi fi-rr-angle-up' : 'fi fi-rr-angle-down'}
                style={{ fontSize: 11, color: 'rgba(255,255,255,.5)' }}
              />
            </button>

            {/* ── User dropdown panel ── */}
            {dropdownOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                minWidth: 210, background: '#fff',
                border: '1px solid var(--ed-border-color)',
                borderRadius: 10, boxShadow: '0 8px 28px rgba(0,0,0,.13)',
                zIndex: 200, overflow: 'hidden',
              }}>
                {/* Header */}
                <div style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--ed-border-color)',
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: '#fafafa',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'var(--ed-primary-color)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, fontSize: 14, flexShrink: 0,
                  }}>{initials}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--ed-title-color)', fontSize: 14, margin: 0 }}>{user.name}</p>
                    <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 12, margin: 0 }}>{user.email}</p>
                  </div>
                </div>

                {/* Items */}
                <div style={{ padding: '6px 0' }}>
                  <DropItem href="/dashboard/profile" icon="fi fi-rr-user" label="My Profile" />
                  <DropItem href="/dashboard" icon="fi fi-rr-chart-pie-alt" label="Dashboard" />
                  {isMobile && (
                    <>
                      <div style={{ height: 1, background: 'var(--ed-border-color)', margin: '4px 0' }} />
                      <p style={{ padding: '4px 16px', fontSize: 10, fontWeight: 700, color: 'var(--ed-paragraph-color)', textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>Navigation</p>
                      {NAV_ITEMS.map(item => <DropItem key={item.href} href={item.href} icon={item.icon} label={item.label} />)}
                    </>
                  )}
                  <div style={{ height: 1, background: 'var(--ed-border-color)', margin: '4px 0' }} />
                  {!isMobile && (
                    <DropItem href="/" icon="fi fi-rr-home" label="View Website" />
                  )}
                  <button
                    onClick={() => { setDropdownOpen(false); logout(); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      width: '100%', padding: '10px 16px',
                      border: 'none', background: 'transparent', cursor: 'pointer',
                      color: '#dc2626', fontSize: 14, textAlign: 'left',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fff5f5'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <i className="fi fi-rr-sign-out-alt" style={{ fontSize: 15 }} />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile bottom nav bar ── */}
      {isMobile && (
        <nav style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          height: 60, background: 'var(--ed-secondary-color)',
          display: 'flex', alignItems: 'center',
          borderTop: '1px solid rgba(255,255,255,.08)',
          zIndex: 105, overflowX: 'auto',
        }}>
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 4, textDecoration: 'none', padding: '8px 4px',
                color: isActive ? 'var(--ed-tertiary-color)' : 'rgba(255,255,255,.50)',
                borderTop: isActive ? '2px solid var(--ed-tertiary-color)' : '2px solid transparent',
                minWidth: 56,
              }}>
                <i className={item.icon} style={{ fontSize: 18 }} />
                <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 400, whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      )}

      {/* ── Page content ── */}
      <main style={{
        flex: 1, overflowY: 'auto',
        padding: isMobile ? '16px 12px 80px' : '28px 28px 40px',
      }}>
        {children}
      </main>
    </div>
  );
}

// Shared dropdown item
function DropItem({ href, icon, label }) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 16px', textDecoration: 'none',
        color: 'var(--ed-title-color)', fontSize: 14,
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <i className={icon} style={{ fontSize: 15, color: 'var(--ed-primary-color)' }} />
      {label}
    </Link>
  );
}
