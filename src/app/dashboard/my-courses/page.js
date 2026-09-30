'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MyCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/student/courses');
      const data = await res.json();
      if (res.ok) {
        setCourses(data.courses || []);
      } else {
        setError(data.error || 'Failed to load enrolled courses');
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
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 4px' }}>My Enrolled Courses</h2>
        <p style={{ color: 'var(--ed-paragraph-color)', margin: 0, fontSize: 14 }}>Track progress and resume studying your courses.</p>
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
      ) : courses.length === 0 ? (
        <div style={{
          background: '#fff', borderRadius: 10,
          border: '1px solid var(--ed-border-color)',
          padding: '64px 40px', textAlign: 'center',
        }}>
          <div style={{
            width: 70, height: 70, borderRadius: '50%',
            background: '#ede9fe',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 18px',
          }}>
            <i className="fi fi-rr-book-open-reader" style={{ fontSize: 30, color: 'var(--ed-primary-color)' }} />
          </div>
          <h2 style={{ color: 'var(--ed-title-color)', fontSize: 22, fontWeight: 700, margin: '0 0 10px' }}>
            No enrolled courses
          </h2>
          <p style={{
            color: 'var(--ed-paragraph-color)', fontSize: 15,
            maxWidth: 440, margin: '0 auto 26px', lineHeight: 1.65,
          }}>
            You have not enrolled in any educational programs yet. Start learning today!
          </p>
          <Link href="/courses" style={{
            display: 'inline-block',
            background: 'var(--ed-primary-color)', color: '#fff',
            padding: '10px 22px', borderRadius: 6,
            textDecoration: 'none', fontWeight: 600, fontSize: 13,
            marginTop: 12,
          }}>
            Browse Courses <i className="fi fi-rr-arrow-small-right ms-2" />
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {courses.map(c => (
            <div className="col-md-6 col-lg-4 col-12" key={c.id}>
              <div style={{
                background: '#fff', borderRadius: 10,
                border: '1px solid var(--ed-border-color)',
                overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%',
                boxShadow: '0 4px 12px rgba(0,0,0,.02)',
              }}>
                <img
                  src={c.thumbnail || "/assets/images/course/course-1/1.png"}
                  alt={c.title}
                  style={{ width: '100%', height: 160, objectFit: 'cover' }}
                />
                
                <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--ed-primary-color)', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                      {c.category}
                    </span>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 12px', lineHeight: 1.4 }}>
                      {c.title}
                    </h4>

                    {/* Progress tracking */}
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color: 'var(--ed-paragraph-color)' }}>
                          {c.completedLessons} of {c.totalLessons} lessons completed
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ed-title-color)' }}>
                          {c.progress}%
                        </span>
                      </div>
                      <div style={{ height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{
                          width: `${c.progress}%`, height: '100%',
                          background: 'var(--ed-primary-color)', transition: 'width .3s',
                        }} />
                      </div>
                    </div>
                  </div>

                  <Link href={`/dashboard/my-courses/${c.id}`} className="ed-btn w-100 text-center" style={{ justifyContent: 'center' }}>
                    {c.progress === 0 ? 'Start Study' : c.progress === 100 ? 'Review Syllabus' : 'Resume Study'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
