'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StudentLiveClassesPage() {
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLiveClasses();
  }, []);

  const fetchLiveClasses = async () => {
    try {
      const res = await fetch('/api/student/live-classes');
      const data = await res.json();
      if (res.ok) {
        setLiveClasses(data.liveClasses || []);
      } else {
        setError(data.error || 'Failed to load live sessions');
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
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 4px' }}>Upcoming Live Classes</h2>
        <p style={{ color: 'var(--ed-paragraph-color)', margin: 0, fontSize: 14 }}>Join virtual class calls scheduled by the administrators.</p>
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
      ) : liveClasses.length === 0 ? (
        <div style={{
          background: '#fff', borderRadius: 10,
          border: '1px solid var(--ed-border-color)',
          padding: '64px 40px', textAlign: 'center',
        }}>
          <div style={{
            width: 70, height: 70, borderRadius: '50%',
            background: '#e0f2fe',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 18px',
          }}>
            <i className="fi fi-rr-video-camera" style={{ fontSize: 30, color: '#0891b2' }} />
          </div>
          <h2 style={{ color: 'var(--ed-title-color)', fontSize: 22, fontWeight: 700, margin: '0 0 10px' }}>
            No active live sessions
          </h2>
          <p style={{
            color: 'var(--ed-paragraph-color)', fontSize: 15,
            maxWidth: 440, margin: '0 auto 26px', lineHeight: 1.65,
          }}>
            There are no live meetings scheduled for your enrolled classes at this moment. Please check back later.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {liveClasses.map(lc => {
            const dateObj = new Date(lc.scheduledAt);
            const timeStr = dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
            const dateStr = dateObj.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

            return (
              <div className="col-md-6 col-12" key={lc.id}>
                <div style={{
                  background: '#fff', borderRadius: 10,
                  border: '1px solid var(--ed-border-color)',
                  padding: 20, display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between', height: '100%',
                  boxShadow: '0 2px 8px rgba(0,0,0,.02)',
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      {lc.courses && lc.courses.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {lc.courses.map(c => (
                            <span key={c.id} style={{
                              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                              background: '#e0f2fe', color: '#0369a1', textTransform: 'uppercase',
                            }}>
                              {c.title}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                          background: '#f1f5f9', color: '#475569', textTransform: 'uppercase',
                        }}>
                          General Session
                        </span>
                      )}
                      <span className="d-inline-flex align-items-center gap-1" style={{ fontSize: 12, fontWeight: 600, color: 'var(--ed-primary-color)' }}>
                        <i className="fi fi-rr-clock" /> {lc.duration} mins
                      </span>
                    </div>

                    <h4 style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 8px' }}>
                      {lc.title}
                    </h4>
                    <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 13, margin: '0 0 16px', lineHeight: 1.5 }}>
                      {lc.description || 'No description provided for this session.'}
                    </p>
                  </div>

                  <div style={{
                    borderTop: '1px solid var(--ed-border-color)', paddingTop: 16, marginTop: 'auto',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
                  }}>
                    <div>
                      <span style={{ display: 'block', fontSize: 11, color: 'var(--ed-paragraph-color)' }}>Scheduled For:</span>
                      <strong style={{ fontSize: 12.5, color: 'var(--ed-title-color)' }}>
                        {dateStr} at {timeStr}
                      </strong>
                    </div>

                    {lc.meetLink ? (
                      <a href={lc.meetLink} target="_blank" rel="noopener noreferrer" style={{
                        background: '#10b981', color: '#fff',
                        textDecoration: 'none', fontWeight: 600, fontSize: 12,
                        padding: '8px 16px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 6,
                      }}>
                        <i className="fi fi-rr-arrow-right-to-bracket" />
                        Join Call
                      </a>
                    ) : (
                      <span style={{ fontSize: 12, color: 'var(--ed-paragraph-color)', fontStyle: 'italic' }}>
                        Link not ready
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
