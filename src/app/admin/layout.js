'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/admin',              label: 'Dashboard',    icon: 'fi fi-rr-chart-pie-alt' },
  { href: '/admin/courses',      label: 'Courses',      icon: 'fi fi-rr-book-open-reader' },
  { href: '/admin/live-classes', label: 'Live Classes', icon: 'fi fi-rr-video-camera' },
  { href: '/admin/students',     label: 'Students',     icon: 'fi fi-rr-users-alt' },
  { href: '/admin/coupons',      label: 'Coupons',      icon: 'fi fi-rr-ticket' },
  { href: '/admin/settings',     label: 'Settings',     icon: 'fi fi-rr-settings' },
];

const SIDEBAR_W = 248;
const TOPBAR_H  = 60;
const MOBILE_BP = 768;

export default function AdminLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BP);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close sidebar when navigating on mobile
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'var(--ed-font-family)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner-border" role="status"
            style={{ width: 36, height: 36, color: 'var(--ed-primary-color)', borderRightColor: 'transparent' }} />
          <p style={{ marginTop: 12, color: 'var(--ed-paragraph-color)', fontSize: 14 }}>Loading…</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') return null;

  const initials = user.name ? user.name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2) : 'AD';
  const showSidebar = !isMobile || sidebarOpen;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', fontFamily: 'var(--ed-font-family)',
      background: '#f5f5f5', overflow: 'hidden',
    }}>

      {/* ── Mobile overlay backdrop ── */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 199,
            background: 'rgba(0,0,0,.45)',
          }}
        />
      )}

      {/* ── Sidebar ── */}
      <aside style={{
        position: 'fixed', top: 0, left: 0,
        width: SIDEBAR_W, height: '100vh',
        background: 'var(--ed-secondary-color)',
        display: 'flex', flexDirection: 'column',
        zIndex: 200, overflowY: 'auto',
        transform: showSidebar ? 'translateX(0)' : `translateX(-${SIDEBAR_W}px)`,
        transition: 'transform .25s ease',
      }}>

        {/* Logo */}
        <div style={{
          height: TOPBAR_H, display: 'flex', alignItems: 'center',
          padding: '0 22px', borderBottom: '1px solid rgba(255,255,255,.08)',
          flexShrink: 0, justifyContent: 'space-between',
        }}>
          <Link href="/admin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--ed-primary-color)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: 16, flexShrink: 0,
            }}>E</div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 17, letterSpacing: .3 }}>Eduna Admin</span>
          </Link>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} style={{
              background: 'none', border: 'none', color: 'rgba(255,255,255,.6)',
              cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: 4,
            }}>✕</button>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          <p style={{ color: 'rgba(255,255,255,.35)', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', padding: '0 10px', marginBottom: 8 }}>
            MAIN MENU
          </p>
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 11,
                padding: '10px 12px', borderRadius: 7, marginBottom: 2,
                textDecoration: 'none',
                background: isActive ? 'var(--ed-primary-color)' : 'transparent',
                color: isActive ? '#fff' : 'rgba(255,255,255,.65)',
                fontWeight: isActive ? 600 : 400, fontSize: 14,
                borderLeft: isActive ? '3px solid var(--ed-tertiary-color)' : '3px solid transparent',
              }}>
                <i className={item.icon} style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,.08)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--ed-primary-color)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0,
            }}>{initials}</div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: 13, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</p>
              <p style={{ color: 'rgba(255,255,255,.45)', fontSize: 11, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
            </div>
          </div>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 7, marginBottom: 4, textDecoration: 'none', color: 'rgba(255,255,255,.55)', fontSize: 13 }}>
            <i className="fi fi-rr-home" style={{ fontSize: 14 }} />View Website
          </Link>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', borderRadius: 7, border: 'none', background: 'transparent', cursor: 'pointer', color: '#fc8181', fontSize: 13, textAlign: 'left' }}>
            <i className="fi fi-rr-sign-out-alt" style={{ fontSize: 14 }} />Log Out
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div style={{
        marginLeft: isMobile ? 0 : SIDEBAR_W,
        flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden',
        transition: 'margin-left .25s ease',
      }}>

        {/* Top bar */}
        <header style={{
          height: TOPBAR_H, background: '#fff',
          borderBottom: '1px solid var(--ed-border-color)',
          display: 'flex', alignItems: 'center',
          padding: '0 16px 0 20px',
          justifyContent: 'space-between', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Hamburger on mobile */}
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 4, display: 'flex', flexDirection: 'column', gap: 5,
              }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ display: 'block', width: 22, height: 2, background: 'var(--ed-secondary-color)', borderRadius: 2 }} />
                ))}
              </button>
            )}
            <h1 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ed-title-color)', margin: 0 }}>
              {NAV_ITEMS.find(n => n.href === pathname)?.label ?? 'Admin'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--ed-primary-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 12,
              }}>{initials}</div>
              {!isMobile && (
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--ed-title-color)', lineHeight: 1 }}>{user.name}</p>
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--ed-paragraph-color)' }}>Administrator</p>
                </div>
              )}
            </div>
            {!isMobile && <div style={{ width: 1, height: 32, background: 'var(--ed-border-color)' }} />}
            <button onClick={logout} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: isMobile ? '7px 10px' : '7px 14px', borderRadius: 6,
              border: '1px solid #fed7d7', background: '#fff5f5',
              color: '#c53030', fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}>
              <i className="fi fi-rr-sign-out-alt" style={{ fontSize: 13 }} />
              {!isMobile && 'Logout'}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: isMobile ? '16px' : '28px 28px 40px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
