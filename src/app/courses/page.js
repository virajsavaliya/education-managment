'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';

function CoursePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const { setIsCartOpen } = useUI();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());

  const searchVal = searchParams.get('search') || '';
  const categoryVal = searchParams.get('category') || '';

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (searchVal) queryParams.set('search', searchVal);
        if (categoryVal) queryParams.set('category', categoryVal);

        const res = await fetch(`/api/courses?${queryParams.toString()}`);
        const data = await res.json();
        if (data.courses) {
          setCourses(data.courses);
        }

        // Check if user has enrolled courses
        const enrollRes = await fetch('/api/student/courses');
        if (enrollRes.ok) {
          const enrollData = await enrollRes.json();
          if (enrollData.courses) {
            setEnrolledCourseIds(new Set(enrollData.courses.map(c => c.id)));
          }
        }
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, [searchVal, categoryVal]);

  const handleAddToCart = (course) => {
    addToCart({
      id: course.id,
      name: course.title,
      price: course.price,
      image: course.thumbnail || '/assets/images/course/course-1/1.png',
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (course) => {
    addToCart({
      id: course.id,
      name: course.title,
      price: course.price,
      image: course.thumbnail || '/assets/images/course/course-1/1.png',
    });
    router.push('/checkout');
  };

  return (
    <>
      <div className="section-bg">
        <Breadcrumbs title="Our Courses" menu={[{ label: 'Our Courses' }]} />
      </div>

      <section className="ed-course section-gap position-relative bg-light">
        <div className="container ed-container">
          <div className="row">
            <div className="col-12">
              <div className="ed-course__filter d-flex justify-content-between align-items-center mb-4">
                <span className="text-muted">
                  {loading ? 'Loading courses...' : `Showing 1-${courses.length} of ${courses.length} results`}
                </span>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : courses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 40px', background: '#fff', borderRadius: 12, border: '1px solid var(--ed-border-color)' }}>
              <i className="fi fi-rr-list-check" style={{ fontSize: 40, color: '#cbd5e1', display: 'block', marginBottom: 16 }} />
              <h4 style={{ color: 'var(--ed-title-color)', fontWeight: 700 }}>No Courses Available</h4>
              <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 14 }}>Please check back later or contact support.</p>
            </div>
          ) : (
            <div className="row">
              {courses.map((course, idx) => {
                const delays = ['.3s', '.5s', '.7s'];
                const delay = delays[idx % 3];
                const chaptersCount = course._count?.chapters || 0;
                const isPurchased = enrolledCourseIds.has(course.id);
                
                return (
                  <div className="col-lg-6 col-xl-4 col-md-6 col-12 mb-4" key={course.id}>
                    <div className="ed-course__card wow fadeInUp h-100 d-flex flex-column bg-white shadow-sm" data-wow-delay={delay} data-wow-duration="1s" style={{ borderRadius: '12px', border: '1px solid var(--ed-border-color)', overflow: 'hidden', transition: 'transform 0.2s' }}>
                      <Link href={`/course-details?id=${course.id}`} className="ed-course__img position-relative" style={{ display: 'block', height: '220px', overflow: 'hidden' }}>
                        <img 
                          src={course.thumbnail || `/assets/images/course/course-1/${(idx % 9) + 1}.png`} 
                          alt="course-img" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                        />
                      </Link>

                      <div className="ed-course__tag d-inline-block m-3" style={{ width: 'max-content', padding: '4px 12px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', borderRadius: '4px', backgroundColor: 'rgba(223, 67, 67, 0.1)', color: 'var(--ed-primary-color)' }}>
                        {course.category || 'Programming'}
                      </div>

                      <div className="ed-course__body p-4 d-flex flex-column flex-grow-1">
                        <div className="ed-course__lesson d-flex gap-3 mb-2" style={{ fontSize: '13px', color: 'var(--ed-paragraph-color)' }}>
                          <div className="ed-course__part d-flex align-items-center gap-1">
                            <i className="fi fi-rr-book"></i>
                            <p className="mb-0">{chaptersCount} Chapter{chaptersCount !== 1 ? 's' : ''}</p>
                          </div>
                          <div className="ed-course__teacher d-flex align-items-center gap-1">
                            <i className="fi fi-rr-clock"></i>
                            <p className="mb-0">{course.duration || 'N/A'}</p>
                          </div>
                        </div>

                        <Link href={`/course-details?id=${course.id}`} className="ed-course__title mb-3" style={{ textDecoration: 'none', display: 'block' }}>
                          <h5 style={{ fontSize: '17px', color: 'var(--ed-title-color)', lineHeight: '25px', fontWeight: '700', minHeight: '50px' }}>
                            {course.title}
                          </h5>
                        </Link>

                        <p style={{ fontSize: '13px', color: 'var(--ed-paragraph-color)', lineHeight: '1.5', minHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                          {course.description}
                        </p>

                        <div className="ed-course__rattings mb-3 mt-auto">
                          <ul className="d-flex gap-1 align-items-center p-0 m-0" style={{ listStyle: 'none' }}>
                            <li><i className="icofont-star text-warning"></i></li>
                            <li><i className="icofont-star text-warning"></i></li>
                            <li><i className="icofont-star text-warning"></i></li>
                            <li><i className="icofont-star text-warning"></i></li>
                            <li><i className="icofont-star text-warning"></i></li>
                            <li className="ms-1" style={{ fontSize: '13px', color: 'var(--ed-paragraph-color)' }}><span>(4.9 Rating)</span></li>
                          </ul>
                        </div>

                        {isPurchased ? (
                          <div className="ed-course__bottom d-flex justify-content-between align-items-center pt-3" style={{ borderTop: '1px solid var(--ed-border-color)' }}>
                            <span style={{ fontSize: '12px', color: '#16a34a', background: '#dcfce7', padding: '4px 10px', borderRadius: '4px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <i className="fi fi-rr-checkbox" /> Purchased
                            </span>
                            <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                              {course.level || 'BEGINNER'}
                            </span>
                          </div>
                        ) : (
                          <div className="ed-course__bottom d-flex justify-content-between align-items-center pt-3" style={{ borderTop: '1px solid var(--ed-border-color)' }}>
                            <span className="ed-course__price fw-bold" style={{ color: 'var(--ed-primary-color)', fontSize: '20px' }}>
                              ₹{course.price}.00
                            </span>
                            <span style={{ fontSize: '11px', color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                              {course.level || 'BEGINNER'}
                            </span>
                          </div>
                        )}

                        {/* Interactive Action Buttons */}
                        {isPurchased ? (
                          <div className="d-flex mt-4 pt-2">
                            <Link 
                              href={`/dashboard/my-courses/${course.id}`}
                              className="btn btn-success btn-sm w-100" 
                              style={{ 
                                backgroundColor: '#16a34a', 
                                borderColor: '#16a34a',
                                color: '#fff',
                                fontSize: '13px',
                                fontWeight: '600',
                                borderRadius: '6px',
                                height: '42px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.2s',
                                textDecoration: 'none'
                              }}
                            >
                              <i className="fi fi-rr-play-alt" /> Access Course
                            </Link>
                          </div>
                        ) : (
                          <div className="d-flex gap-2 mt-4 pt-2">
                            <button 
                              className="btn btn-outline-primary btn-sm flex-grow-1" 
                              style={{ 
                                borderColor: 'var(--ed-primary-color)', 
                                color: 'var(--ed-primary-color)',
                                fontSize: '13px',
                                fontWeight: '600',
                                borderRadius: '6px',
                                height: '42px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                transition: 'all 0.2s'
                              }}
                              onClick={() => handleAddToCart(course)}
                            >
                              <i className="fi fi-rr-shopping-cart-add"></i> Add to Cart
                            </button>
                            <button 
                              className="btn btn-primary btn-sm flex-grow-1" 
                              style={{ 
                                backgroundColor: 'var(--ed-primary-color)', 
                                borderColor: 'var(--ed-primary-color)',
                                color: '#fff',
                                fontSize: '13px',
                                fontWeight: '600',
                                borderRadius: '6px',
                                height: '42px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s'
                              }}
                              onClick={() => handleBuyNow(course)}
                            >
                              Buy Now
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="ed-call-action position-relative bg-white py-5">
        <div className="container ed-container">
          <div className="ed-call-action__inner position-relative p-5 rounded text-white" style={{ backgroundColor: 'var(--ed-primary-color)', overflow: 'hidden' }}>
            <div className="ed-call-action__shapes">
              <img className="ed-call-action__shape-1 rotate-ani position-absolute" src="/assets/images/call-action/call-action-1/shape-1.svg" alt="shape-1" style={{ top: '10%', right: '10%' }} />
              <img className="ed-call-action__shape-2 position-absolute" src="/assets/images/call-action/call-action-1/shape-2.svg" alt="shape-2" style={{ bottom: '10%', left: '5%' }} />
              <img className="ed-call-action__shape-3 updown-ani position-absolute" src="/assets/images/call-action/call-action-1/shape-3.svg" alt="shape-3" style={{ top: '40%', right: '30%' }} />
            </div>
            <div className="row align-items-center">
              <div className="col-lg-6 col-12">
                <div className="ed-call-action__img">
                  <img src="/assets/images/call-action/call-action-1/call-action-img.png" alt="call-action-img" className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-6 col-12 order-class">
                <div className="ed-call-action__content">
                  <div className="ed-section-head mb-4 text-white">
                    <span className="ed-section-head__sm-title text-uppercase" style={{ color: '#ffb606', fontWeight: '600' }}>GET STARTED NOW</span>
                    <h3 className="ed-section-head__title text-white mt-2" style={{ fontSize: '28px' }}>
                      Affordable Online Courses <br />
                      & Learning Opportunities
                    </h3>
                    <p className="ed-section-head__text text-white-50 mt-3">
                      Start learning at your own pace today. Expand your horizons with expert-led bootstrap tracks.
                    </p>
                  </div>
                  <div className="ed-call-action__content-btn">
                    <Link href="/courses" className="ed-btn bg-white text-dark" style={{ border: 'none', color: '#000 !important' }}> 
                      Start Learning Today<i className="fi fi-rr-arrow-small-right ms-2"></i> 
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CoursePage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '120px 0' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <CoursePageContent />
    </Suspense>
  );
}
