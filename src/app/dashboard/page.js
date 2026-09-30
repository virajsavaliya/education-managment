'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [activeCourses, setActiveCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/student/dashboard');
      const data = await res.json();
      if (res.ok) {
        setStats(data.stats);
        setActiveCourses(data.activeCourses || []);
      } else {
        setError(data.error || 'Failed to load dashboard metrics');
      }
    } catch (err) {
      setError('Connection failure');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const STAT_CARDS = stats ? [
    { label: 'Enrolled Courses',   value: stats.enrolledCount, icon: 'fi fi-rr-book-open-reader', color: '#543ee8', bg: '#ede9fe' },
    { label: 'Completed Courses',  value: stats.completedCount, icon: 'fi fi-rr-checkbox',          color: '#16a34a', bg: '#dcfce7' },
    { label: 'Live Classes Today', value: stats.liveClassesCount, icon: 'fi fi-rr-video-camera',      color: '#0891b2', bg: '#e0f2fe' },
    { label: 'Certificates Won',   value: stats.certificatesCount, icon: 'fi fi-rr-award',             color: '#d97706', bg: '#fef3c7' },
  ] : [];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>

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
            Ready to continue? Explore scheduled virtual live classes or jump back into lessons.
          </p>
        </div>
        <Link href="/courses" style={{
          background: 'var(--ed-primary-color)', color: '#fff',
          padding: '9px 18px', borderRadius: 7,
          textDecoration: 'none', fontWeight: 600, fontSize: 13,
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          Explore Courses
        </Link>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px 16px', borderRadius: 8, marginBottom: 24, fontSize: 14 }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <div className="spinner-border" style={{ color: 'var(--ed-primary-color)' }} role="status" />
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="row g-3" style={{ marginBottom: 24 }}>
            {STAT_CARDS.map((c, i) => (
              <div className="col-md-3 col-6" key={i}>
                <div style={{
                  background: '#fff', borderRadius: 10,
                  border: '1px solid var(--ed-border-color)',
                  padding: 20, display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: c.bg, color: c.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, flexShrink: 0,
                  }}>
                    <i className={c.icon} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ed-title-color)', margin: 0 }}>
                      {c.value}
                    </h4>
                    <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 12, margin: 0, whiteSpace: 'nowrap' }}>
                      {c.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-4">
            {/* Left Col: Active Courses */}
            <div className="col-lg-8 col-12">
              <div style={{
                background: '#fff', borderRadius: 10,
                border: '1px solid var(--ed-border-color)',
                padding: 24, minHeight: 300,
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 20px' }}>
                  My Enrolled Courses
                </h3>

                {activeCourses.length === 0 ? (
                  <div style={{ padding: '40px 0', textAlign: 'center' }}>
                    <i className="fi fi-rr-book-open-reader" style={{ fontSize: 32, color: '#cbd5e1', display: 'block', marginBottom: 10 }} />
                    <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 13, margin: '0 0 16px' }}>You are not enrolled in any courses yet.</p>
                    <Link href="/courses" style={{
                      display: 'inline-block',
                      background: 'var(--ed-primary-color)', color: '#fff',
                      padding: '9px 20px', borderRadius: 6,
                      textDecoration: 'none', fontWeight: 600, fontSize: 13,
                      marginTop: 12,
                    }}>
                      Enroll Now
                    </Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {activeCourses.map((c, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        padding: 16, borderRadius: 8, border: '1px solid var(--ed-border-color)',
                        flexWrap: 'wrap',
                      }}>
                        <img src={c.thumbnail || "/assets/images/course/course-1/1.png"} alt={c.title}
                          style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <span style={{ fontSize: 11, color: 'var(--ed-primary-color)', fontWeight: 600, textTransform: 'uppercase' }}>
                            {c.category}
                          </span>
                          <h4 style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--ed-title-color)', margin: '2px 0 6px' }}>
                            {c.title}
                          </h4>
                          
                          {/* Progress bar */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                              <div style={{
                                width: `${c.progress}%`,
                                height: '100%', background: 'var(--ed-primary-color)',
                                borderRadius: 3, transition: 'width .3s',
                              }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ed-title-color)', minWidth: 32 }}>
                              {c.progress}%
                            </span>
                          </div>
                        </div>

                        <Link href={`/dashboard/my-courses/${c.id}`} style={{
                          background: 'var(--ed-primary-color)', color: '#fff',
                          border: 'none', borderRadius: 6, padding: '8px 16px',
                          textDecoration: 'none', fontWeight: 600, fontSize: 12.5,
                          whiteSpace: 'nowrap',
                        }}>
                          {c.progress === 0 ? 'Start Study' : c.progress === 100 ? 'Review Syllabus' : 'Resume'}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Quick Links */}
            <div className="col-lg-4 col-12">
              <div style={{
                background: '#fff', borderRadius: 10,
                border: '1px solid var(--ed-border-color)',
                padding: 24,
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 20px' }}>
                  Quick Navigation
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <QuickLink href="/dashboard/my-courses" label="My Courses" icon="fi fi-rr-book-open-reader" desc="Continue your lessons" />
                  <QuickLink href="/dashboard/live-classes" label="Live Classes" icon="fi fi-rr-video-camera" desc="Join virtual sessions" />
                  <QuickLink href="/dashboard/purchase-history" label="Receipts & Purchases" icon="fi fi-rr-receipt" desc="Check transactions" />
                  <QuickLink href="/dashboard/profile" label="My Profile" icon="fi fi-rr-user" desc="Manage account settings" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function QuickLink({ href, label, icon, desc }) {
  return (
    <Link href={href} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: 12, borderRadius: 8, border: '1px solid var(--ed-border-color)',
      textDecoration: 'none', transition: 'background .2s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 6,
        background: '#ede9fe', color: 'var(--ed-primary-color)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, flexShrink: 0,
      }}>
        <i className={icon} />
      </div>
      <div>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--ed-title-color)', margin: 0 }}>
          {label}
        </h4>
        <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 11, margin: 0 }}>
          {desc}
        </p>
      </div>
    </Link>
  );
}
