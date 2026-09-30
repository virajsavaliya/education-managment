'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import CustomVideoPlayer from '@/components/CustomVideoPlayer';

function CourseDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('id');
  const { addToCart } = useCart();
  const { setIsCartOpen } = useUI();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedChapters, setExpandedChapters] = useState({});
  const [previewLesson, setPreviewLesson] = useState(null);

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const getEmbedUrl = (url) => {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes('youtube.com')) {
        const v = parsed.searchParams.get('v');
        if (v) return `https://www.youtube.com/embed/${v}?autoplay=1`;
      } else if (parsed.hostname.includes('youtu.be')) {
        const v = parsed.pathname.slice(1);
        if (v) return `https://www.youtube.com/embed/${v}?autoplay=1`;
      } else if (parsed.hostname.includes('vimeo.com')) {
        const v = parsed.pathname.split('/').pop();
        if (v) return `https://player.vimeo.com/video/${v}?autoplay=1`;
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  // Contact support details from settings
  const [supportPhone, setSupportPhone] = useState('+91 98765 43210');
  const [supportEmail, setSupportEmail] = useState('support@eduna.com');
  const [supportAddress, setSupportAddress] = useState('MG Road, Shivaji Nagar, Pune, India');

  useEffect(() => {
    // Load general support settings
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data.settings) {
          if (data.settings.contactPhone) setSupportPhone(data.settings.contactPhone);
          if (data.settings.contactEmail) setSupportEmail(data.settings.contactEmail);
          if (data.settings.contactAddress) setSupportAddress(data.settings.contactAddress);
        }
      } catch (e) {
        console.error('Settings load failed:', e);
      }
    }
    loadSettings();
  }, []);

  // Lock body scroll and prevent spacebar scrolling when preview modal is open
  useEffect(() => {
    if (previewLesson) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e) => {
        if (e.key === ' ' || e.code === 'Space') {
          const activeEl = document.activeElement;
          if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
            return;
          }
          e.preventDefault();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [previewLesson]);

  useEffect(() => {
    async function loadCourseDetails() {
      if (!courseId) {
        // Fallback: fetch the first published course if no id in URL
        try {
          const listRes = await fetch('/api/courses');
          const listData = await listRes.json();
          if (listData.courses && listData.courses.length > 0) {
            const firstId = listData.courses[0].id;
            fetchCourse(firstId);
          } else {
            setError('No courses available.');
            setLoading(false);
          }
        } catch (e) {
          setError('Failed to load courses.');
          setLoading(false);
        }
        return;
      }

      fetchCourse(courseId);
    }

    async function fetchCourse(id) {
      try {
        setLoading(true);
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();
        if (data.course) {
          setCourse(data.course);
          // Expand first chapter by default
          if (data.course.chapters && data.course.chapters.length > 0) {
            setExpandedChapters({ [data.course.chapters[0].id]: true });
          }
        } else {
          setError(data.error || 'Course not found');
        }
      } catch (err) {
        setError('Connection failure');
      } finally {
        setLoading(false);
      }
    }

    loadCourseDetails();
  }, [courseId]);

  const handleAddToCart = () => {
    if (!course) return;
    addToCart({
      id: course.id,
      name: course.title,
      price: course.price,
      image: course.thumbnail || '/assets/images/course/course-1/1.png',
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (!course) return;
    addToCart({
      id: course.id,
      name: course.title,
      price: course.price,
      image: course.thumbnail || '/assets/images/course/course-1/1.png',
    });
    router.push('/checkout');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Course Details...</span>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 40px', background: '#fff', margin: '40px auto', maxWidth: 600, borderRadius: 12, border: '1px solid var(--ed-border-color)' }}>
        <i className="fi fi-rr-exclamation" style={{ fontSize: 40, color: '#ef4444', display: 'block', marginBottom: 16 }} />
        <h4 style={{ color: 'var(--ed-title-color)', fontWeight: 700 }}>Error Loading Page</h4>
        <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 14 }}>{error || 'Course data is currently unavailable.'}</p>
        <Link href="/courses" className="btn btn-primary btn-sm mt-3" style={{ backgroundColor: 'var(--ed-primary-color)', borderColor: 'var(--ed-primary-color)' }}>
          Browse All Courses
        </Link>
      </div>
    );
  }

  // Count total lessons
  const totalLessons = (course.chapters || []).reduce((sum, ch) => sum + (ch.lessons?.length || 0), 0);

  return (
    <>
      <div className="section-bg">
        <Breadcrumbs title={course.title} menu={[{ label: 'Courses', url: '/courses' }, { label: 'Course Details' }]} />
      </div>

      <section className="ed-course__details py-5 bg-light">
        <div className="container ed-container">
          <div className="row g-4">
            
            {/* Left Side: Course Main Content */}
            <div className="col-lg-8 col-12">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border border-light">
                
                {/* Course Main Thumbnail */}
                <div style={{ width: '100%', height: 'auto', maxHeight: '420px', borderRadius: '12px', overflow: 'hidden', marginBottom: '28px' }}>
                  <img 
                    src={course.thumbnail || '/assets/images/course/course-details/details-img-1.png'} 
                    alt={course.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Category & Badge */}
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="badge rounded-2" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--ed-primary-color)', padding: '6px 12px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
                    {course.category || 'Programming'}
                  </span>
                  <span className="badge rounded-2 bg-success text-white" style={{ padding: '6px 12px', fontSize: '11px', fontWeight: '700' }}>
                    {course.level || 'BEGINNER'}
                  </span>
                </div>

                {/* Course Title */}
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--ed-title-color)', marginBottom: '16px', lineHeight: '36px', letterSpacing: '-0.4px' }}>
                  {course.title}
                </h2>

                {/* Description */}
                <h5 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--ed-title-color)', marginBottom: '10px' }}>Course Overview</h5>
                <p style={{ fontSize: '14.5px', color: 'var(--ed-paragraph-color)', lineHeight: '1.7', whiteSpace: 'pre-wrap', marginBottom: '32px' }}>
                  {course.description}
                </p>

                {/* Curriculum / Chapters Section */}
                <h5 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--ed-title-color)', marginBottom: '16px' }}>Course Syllabus</h5>
                
                {(!course.chapters || course.chapters.length === 0) ? (
                  <p className="text-muted italic" style={{ fontSize: '13.5px' }}>No chapters added to this syllabus yet.</p>
                ) : (
                  <div className="accordion d-flex flex-column gap-3" id="courseCurriculum">
                    {course.chapters.map((chapter, idx) => {
                      const isExpanded = !!expandedChapters[chapter.id];
                      return (
                        <div key={chapter.id} className="accordion-item" style={{ borderRadius: '10px', border: '1px solid var(--ed-border-color)', overflow: 'hidden', background: '#fafafa' }}>
                          <h2 className="accordion-header" id={`heading-${chapter.id}`}>
                            <button 
                              className={`accordion-button ${!isExpanded ? 'collapsed' : ''}`}
                              type="button" 
                              onClick={() => toggleChapter(chapter.id)}
                              style={{ 
                                padding: '16px 20px', 
                                fontSize: '14.5px', 
                                fontWeight: '700', 
                                color: 'var(--ed-title-color)', 
                                background: '#fafafa', 
                                boxShadow: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                border: 'none',
                                textAlign: 'left'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ color: 'var(--ed-primary-color)' }}>Ch {idx + 1}:</span>
                                <span>{chapter.title}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto', marginRight: '16px' }}>
                                <span className="badge bg-light text-muted" style={{ fontSize: '10px', fontWeight: '600' }}>
                                  {chapter.lessons?.length || 0} Lectures
                                </span>
                              </div>
                            </button>
                          </h2>
                          {isExpanded && (
                            <div className="accordion-collapse show" style={{ borderTop: '1px solid var(--ed-border-color)' }}>
                              <div className="accordion-body bg-white" style={{ padding: '16px 20px' }}>
                                {(!chapter.lessons || chapter.lessons.length === 0) ? (
                                  <p className="text-muted mb-0 italic" style={{ fontSize: '13px' }}>No lessons in this chapter.</p>
                                ) : (
                                  <div className="d-flex flex-column gap-2 py-1">
                                    {chapter.lessons.map((lesson, lIdx) => (
                                      <div 
                                        key={lesson.id} 
                                        className="d-flex align-items-center justify-content-between p-2 rounded-2" 
                                        style={{ 
                                          background: '#f8fafc', 
                                          fontSize: '13.5px',
                                          cursor: lesson.isFreePreview ? 'pointer' : 'default',
                                          transition: 'background 0.2s',
                                        }}
                                        onClick={() => {
                                          if (lesson.isFreePreview) {
                                            setPreviewLesson(lesson);
                                          }
                                        }}
                                        onMouseEnter={e => {
                                          if (lesson.isFreePreview) {
                                            e.currentTarget.style.background = '#f1f5f9';
                                          }
                                        }}
                                        onMouseLeave={e => {
                                          e.currentTarget.style.background = '#f8fafc';
                                        }}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                          {lesson.isFreePreview ? (
                                            <i className="fi fi-rr-play-alt text-primary" style={{ fontSize: '14px', marginRight: '6px' }} />
                                          ) : (
                                            <i className="fi fi-rr-lock text-muted" style={{ fontSize: '14px', marginRight: '6px' }} />
                                          )}
                                          <span className="fw-600 text-dark">{lIdx + 1}. {lesson.title}</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-3">
                                          {lesson.duration && (
                                            <span className="text-muted d-inline-flex align-items-center gap-1" style={{ fontSize: '11.5px' }}>
                                              <i className="fi fi-rr-clock text-muted" style={{ fontSize: '12px' }} />
                                              {lesson.duration}
                                            </span>
                                          )}
                                          {lesson.isFreePreview && (
                                            <span className="badge bg-warning-subtle text-warning border border-warning" style={{ fontSize: '9px', fontWeight: '700', padding: '2px 6px' }}>
                                              PREVIEW
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            </div>

            {/* Right Side: Sidebar Course Information */}
            <div className="col-lg-4 col-12">
              <div className="d-flex flex-column gap-4">
                
                {/* Course Info Widget */}
                <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--ed-title-color)', borderBottom: '1px solid var(--ed-border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
                    Course Summary:
                  </h4>
                  <ul className="list-unstyled d-flex flex-column gap-3 mb-4" style={{ fontSize: '13.5px' }}>
                    <li className="d-flex justify-content-between">
                      <span className="text-muted">Price:</span>
                      <strong className="text-primary" style={{ fontSize: '18px' }}>₹{course.price}</strong>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span className="text-muted">Total Chapters:</span>
                      <strong className="text-dark">{course._count?.chapters || 0}</strong>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span className="text-muted">Total Lectures:</span>
                      <strong className="text-dark">{totalLessons}</strong>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span className="text-muted">Category:</span>
                      <strong className="text-dark">{course.category || 'Programming'}</strong>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span className="text-muted">Bootcamp Duration:</span>
                      <strong className="text-dark">{course.duration || 'N/A'}</strong>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span className="text-muted">Certifications:</span>
                      <strong className="text-dark">Yes, Course Certificate</strong>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span className="text-muted">Support Language:</span>
                      <strong className="text-dark">Hinglish / English</strong>
                    </li>
                  </ul>

                  {/* Buy / Add Buttons */}
                  <div className="d-flex flex-column gap-2">
                    <button 
                      className="btn btn-outline-primary w-100"
                      style={{ height: '46px', fontWeight: '700', fontSize: '14px', borderRadius: '8px', borderColor: 'var(--ed-primary-color)', color: 'var(--ed-primary-color)' }}
                      onClick={handleAddToCart}
                    >
                      <i className="fi fi-rr-shopping-cart-add me-2" /> Add to Cart
                    </button>
                    <button 
                      className="btn btn-primary w-100"
                      style={{ height: '46px', fontWeight: '700', fontSize: '14px', borderRadius: '8px', backgroundColor: 'var(--ed-primary-color)', borderColor: 'var(--ed-primary-color)' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* Contact Widget */}
                <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--ed-title-color)', borderBottom: '1px solid var(--ed-border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
                    Need Help?
                  </h4>
                  <div className="d-flex flex-column gap-3" style={{ fontSize: '13.5px' }}>
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light p-2 rounded-3 text-primary">
                        <i className="fi fi-rr-phone-call" style={{ fontSize: '16px' }} />
                      </div>
                      <div>
                        <span className="text-muted d-block" style={{ fontSize: '11px' }}>Call Support</span>
                        <a href={`tel:${supportPhone}`} className="text-dark fw-bold" style={{ textDecoration: 'none' }}>{supportPhone}</a>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light p-2 rounded-3 text-primary">
                        <i className="fi fi-rr-envelope" style={{ fontSize: '16px' }} />
                      </div>
                      <div>
                        <span className="text-muted d-block" style={{ fontSize: '11px' }}>Support Email</span>
                        <a href={`mailto:${supportEmail}`} className="text-dark fw-bold" style={{ textDecoration: 'none' }}>{supportEmail}</a>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light p-2 rounded-3 text-primary">
                        <i className="fi fi-rr-marker" style={{ fontSize: '16px' }} />
                      </div>
                      <div>
                        <span className="text-muted d-block" style={{ fontSize: '11px' }}>Office Address</span>
                        <span className="text-dark fw-bold">{supportAddress}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action banner */}
      <section className="ed-call-action bg-white py-5">
        <div className="container ed-container">
          <div className="ed-call-action__inner p-4 p-md-5 rounded-4 text-white position-relative" style={{ backgroundColor: 'var(--ed-primary-color)', overflow: 'hidden' }}>
            <div className="ed-call-action__shapes">
              <img className="ed-call-action__shape-1 rotate-ani position-absolute" src="/assets/images/call-action/call-action-1/shape-1.svg" alt="shape-1" style={{ top: '10%', right: '10%' }} />
              <img className="ed-call-action__shape-2 position-absolute" src="/assets/images/call-action/call-action-1/shape-2.svg" alt="shape-2" style={{ bottom: '10%', left: '5%' }} />
              <img className="ed-call-action__shape-3 updown-ani position-absolute" src="/assets/images/call-action/call-action-1/shape-3.svg" alt="shape-3" style={{ top: '40%', right: '30%' }} />
            </div>
            <div className="row align-items-center">
              <div className="col-lg-6 col-12 d-none d-lg-block">
                <img src="/assets/images/call-action/call-action-1/call-action-img.png" alt="call-action" className="img-fluid" />
              </div>
              <div className="col-lg-6 col-12">
                <span className="text-uppercase fw-bold text-warning" style={{ fontSize: '12px', letterSpacing: '1px' }}>Get Started Now</span>
                <h3 className="my-2 text-white fw-800" style={{ fontSize: '28px' }}>
                  Affordable Online Courses & Professional Learning
                </h3>
                <p className="text-white-50 mb-4" style={{ fontSize: '14.5px' }}>
                  Start learning from industry-leading instructors today. Gain placement prep, practice problems, and study notes all in one portal.
                </p>
                <Link href="/courses" className="btn btn-light px-4 py-2" style={{ fontWeight: '700', borderRadius: '6px' }}>
                  Browse Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Preview Video Modal */}
      {previewLesson && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)', zIndex: 10000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 16, backdropFilter: 'blur(8px)'
        }} onClick={() => setPreviewLesson(null)}>
          <div style={{
            background: '#000', width: '100%', maxWidth: '800px',
            borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative'
          }} onClick={e => e.stopPropagation()}>
            
            {/* Header bar */}
            <div style={{
              background: '#1e293b', padding: '14px 20px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h5 style={{ color: '#fff', fontSize: '15px', fontWeight: '700', margin: 0 }}>
                Free Preview: {previewLesson.title}
              </h5>
              <button 
                onClick={() => setPreviewLesson(null)}
                style={{
                  background: 'none', border: 'none', color: '#94a3b8',
                  fontSize: '22px', cursor: 'pointer', padding: 0, lineHeight: 1,
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
              >
                ×
              </button>
            </div>

            {/* Video Player */}
            <div style={{ aspectRatio: '16/9', width: '100%', background: '#000' }}>
              {previewLesson.videoUrl ? (
                <CustomVideoPlayer key={previewLesson.id} videoUrl={previewLesson.videoUrl} thumbnail={course.thumbnail} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
                  <i className="fi fi-rr-video-camera-off" style={{ fontSize: '40px', marginBottom: 12 }} />
                  <span>No preview video linked for this lecture.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function CourseDetailsPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '120px 0' }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    }>
      <CourseDetailsContent />
    </Suspense>
  );
}
