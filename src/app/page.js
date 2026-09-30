'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';



export default function Page() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());

    useEffect(() => {
        async function loadCourses() {
            try {
                const res = await fetch('/api/courses');
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
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadCourses();
    }, []);

    const router = useRouter();
    const { addToCart } = useCart();
    const { setIsCartOpen } = useUI();

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

            <div className="section-bg hero-bg background-image" style={{ backgroundImage: "url(\'/assets/images/hero/home-1/hero-bg.png\')" }}>

                <section className="ed-hero">
                    <div className="container ed-container-expand">

                        <div className="ed-hero__elements">
                            <img className="element-move ed-hero__shape-1" src="/assets/images/hero/home-1/shape-1.svg" alt="shape-1" />
                            <img className="element-move ed-hero__shape-2" src="/assets/images/hero/home-1/shape-2.svg" alt="shape-1" />
                            <img className="element-move ed-hero__shape-3" src="/assets/images/hero/home-1/shape-3.svg" alt="shape-1" />
                            <img className="element-move ed-hero__shape-4" src="/assets/images/hero/home-1/shape-4.svg" alt="shape-1" />
                            <img className="element-move ed-hero__shape-5" src="/assets/images/hero/home-1/shape-5.png" alt="shape-5" />
                        </div>
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-12">

                                <div className="ed-hero__content">
                                    <h1 className="ed-hero__content-title ed-split-text left">Best <span>Online</span> Platform to Learn Everything</h1>
                                    <p className="ed-hero__content-text">
                                        Excedteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.
                                    </p>
                                    <div className="ed-hero__btn">
                                        <a href="/courses" className="ed-btn">Find Courses<i className="fi fi-rr-arrow-small-right"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">

                                <div className="ed-hero__image">
                                    <img src="/assets/images/hero/home-1/hero-img.png" alt="hero-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            <div className="section-bg background-image" style={{ backgroundImage: "url(\'/assets/images/section-bg-1.png\')" }}>

                <section className="ed-about section-gap position-relative">
                    <div className="container ed-container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-12">

                                <div className="ed-about__images">
                                    <div className="ed-about__main-img">
                                        <img src="/assets/images/about/about-1/about-img.png" alt="about-img" />
                                    </div>
                                    <div className="counter-card updown-ani">
                                        <div className="counter-card__icon">
                                            <i className="fi fi-rr-graduation-cap"></i>
                                        </div>
                                        <div className="counter-card__info">
                                            <h4><span className="counter">9394</span>+</h4>
                                            <p>Enrolled Learners</p>
                                        </div>
                                    </div>

                                    <div className="ed-about__shapes">
                                        <img className="ed-about__shape-1" src="/assets/images/about/about-1/shape-1.svg" alt="shape-1" />
                                        <img className="ed-about__shape-2" src="/assets/images/about/about-1/shape-2.svg" alt="shape-2" />
                                        <img className="ed-about__shape-3 rotate-ani" src="/assets/images/about/about-1/shape-3.svg" alt="shape-3" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12 order-class">

                                <div className="ed-about__content">
                                    <div className="ed-section-head">
                                        <span className="ed-section-head__sm-title">WELCOME TO EDUNA</span>
                                        <h3 className="ed-section-head__title ed-split-text left">
                                            Digital Online Academy: Your <br />
                                            Path to Creative Excellence
                                        </h3>
                                        <p className="ed-section-head__text">
                                            Excedteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.
                                        </p>
                                    </div>
                                    <div className="ed-about__feature">
                                        <ul className="ed-about__features-list">
                                            <li><img src="/assets/images/icons/icon-check-blue.svg" alt="icon-check-blue" />Our Expert Trainers</li>
                                            <li><img src="/assets/images/icons/icon-check-blue.svg" alt="icon-check-blue" />Online Remote Learning</li>
                                            <li><img src="/assets/images/icons/icon-check-blue.svg" alt="icon-check-blue" />Easy to follow curriculum</li>
                                            <li><img src="/assets/images/icons/icon-check-blue.svg" alt="icon-check-blue" />Lifetime Access</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img className="ed-about__shape-4" src="/assets/images/abstracts/abstract-element-regular.svg" alt="shape-4" />
                </section>



                <section className="ed-category section-gap pt-0">
                    <div className="container ed-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="ed-section-head d-flex-between">
                                    <div className="ed-section-head__info">
                                        <span className="ed-section-head__sm-title">COURSE CATEGORIES</span>
                                        <h3 className="ed-section-head__title m-0 ed-split-text left">
                                            Top Categories You Want to Learn
                                        </h3>
                                    </div>
                                    <div className="ed-section-head__btn">
                                        <a href="/courses" className="ed-btn">Find Courses<i className="fi fi-rr-arrow-small-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="ed-category__wrapper">

                                    <a href="/courses" className="ed-category__card wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                                        <div className="ed-category__icon bg-1">
                                            <img src="/assets/images/category/category-1/1.svg" alt="icon" />
                                        </div>
                                        <div className="ed-category__info">
                                            <h4>Business</h4>
                                            <p>04 Courses</p>
                                        </div>
                                    </a>

                                    <a href="/courses" className="ed-category__card wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                                        <div className="ed-category__icon bg-2">
                                            <img src="/assets/images/category/category-1/2.svg" alt="icon" />
                                        </div>
                                        <div className="ed-category__info">
                                            <h4>Marketing</h4>
                                            <p>88 Courses</p>
                                        </div>
                                    </a>

                                    <a href="/courses" className="ed-category__card wow fadeInUp" data-wow-delay=".7s" data-wow-duration="1s">
                                        <div className="ed-category__icon bg-3">
                                            <img src="/assets/images/category/category-1/3.svg" alt="icon" />
                                        </div>
                                        <div className="ed-category__info">
                                            <h4>Design</h4>
                                            <p>23 Courses</p>
                                        </div>
                                    </a>

                                    <a href="/courses" className="ed-category__card wow fadeInUp" data-wow-delay=".9s" data-wow-duration="1s">
                                        <div className="ed-category__icon bg-4">
                                            <img src="/assets/images/category/category-1/4.svg" alt="icon" />
                                        </div>
                                        <div className="ed-category__info">
                                            <h4>Finance</h4>
                                            <p>02 Courses</p>
                                        </div>
                                    </a>

                                    <a href="/courses" className="ed-category__card wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                                        <div className="ed-category__icon bg-5">
                                            <img src="/assets/images/category/category-1/5.svg" alt="icon" />
                                        </div>
                                        <div className="ed-category__info">
                                            <h4>Lifestyle</h4>
                                            <p>29 Courses</p>
                                        </div>
                                    </a>

                                    <a href="/courses" className="ed-category__card wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                                        <div className="ed-category__icon bg-6">
                                            <img src="/assets/images/category/category-1/6.svg" alt="icon" />
                                        </div>
                                        <div className="ed-category__info">
                                            <h4>Cyber</h4>
                                            <p>45 Courses</p>
                                        </div>
                                    </a>

                                    <a href="/courses" className="ed-category__card wow fadeInUp" data-wow-delay=".7s" data-wow-duration="1s">
                                        <div className="ed-category__icon bg-7">
                                            <img src="/assets/images/category/category-1/7.svg" alt="icon" />
                                        </div>
                                        <div className="ed-category__info">
                                            <h4>Development</h4>
                                            <p>28 Courses</p>
                                        </div>
                                    </a>

                                    <a href="/courses" className="ed-category__card wow fadeInUp" data-wow-delay=".9s" data-wow-duration="1s">
                                        <div className="ed-category__icon bg-8">
                                            <img src="/assets/images/category/category-1/8.svg" alt="icon" />
                                        </div>
                                        <div className="ed-category__info">
                                            <h4>Photography</h4>
                                            <p>03 Courses</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            <section className="ed-features position-relative">
                <div className="ed-category__shapes">
                    <img className="ed-category__shape-1 updown-ani" src="/assets/images/features/features-1/shape-1.svg" alt="shape-1" />
                    <img className="ed-category__shape-2 rotate-ani" src="/assets/images/features/features-1/shape-2.svg" alt="shape-2" />
                </div>
                <div className="container ed-container">
                    <div className="row">

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="ed-features__card wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                                <div className="ed-features__icon icon-bg bg-1">
                                    <img src="/assets/images/features/features-1/1.svg" alt="icon" />
                                </div>
                                <div className="ed-features__info">
                                    <h4>Educator Support</h4>
                                    <p>
                                        Excedteur sint occaecat cupidatat non the proident sunt in culpa
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="ed-features__card wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                                <div className="ed-features__icon icon-bg bg-2">
                                    <img src="/assets/images/features/features-1/2.svg" alt="icon" />
                                </div>
                                <div className="ed-features__info">
                                    <h4>Top Instructor</h4>
                                    <p>
                                        Excedteur sint occaecat cupidatat non the proident sunt in culpa
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="ed-features__card wow fadeInUp" data-wow-delay=".7s" data-wow-duration="1s">
                                <div className="ed-features__icon icon-bg bg-3">
                                    <img src="/assets/images/features/features-1/3.svg" alt="icon" />
                                </div>
                                <div className="ed-features__info">
                                    <h4>Award Wining</h4>
                                    <p>
                                        Excedteur sint occaecat cupidatat non the proident sunt in culpa
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section className="ed-course section-gap section-bg-1 position-relative">
                <div className="ed-course__shapes">
                    <img className="ed-course__shape-1 rotate-ani" src="/assets/images/course/course-1/shape-1.svg" alt="shape-1" />
                    <img className="ed-course__shape-2 updown-ani" src="/assets/images/abstracts/abstract-element-regular.svg" alt="shape-2" />
                    <img className="ed-course__shape-3 updown-ani" src="/assets/images/course/course-1/shape-3.svg" alt="shape-3" />
                </div>
                <div className="container ed-container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8 col-12">
                            <div className="ed-section-head text-center">
                                <span className="ed-section-head__sm-title">ONLINE COURSES</span>
                                <h3 className="ed-section-head__title ed-split-text left">
                                    Get Your Course With Us
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {loading ? (
                            <div className="col-12 text-center py-5">
                                <div className="spinner-border text-primary" role="status" />
                            </div>
                        ) : courses.length === 0 ? (
                            <div className="col-12 text-center py-5">
                                <p className="text-muted">No courses available.</p>
                            </div>
                        ) : (
                            courses.slice(0, 3).map((course, idx) => {
                                const delays = ['.3s', '.5s', '.7s'];
                                const delay = delays[idx % 3];
                                const chaptersCount = course._count?.chapters || 0;
                                const isPurchased = enrolledCourseIds.has(course.id);
                                return (
                                    <div className="col-lg-6 col-xl-4 col-md-6 col-12 mb-4" key={course.id}>
                                        <div className="ed-course__card wow fadeInUp h-100 d-flex flex-column bg-white shadow-sm" data-wow-delay={delay} data-wow-duration="1s" style={{ borderRadius: '12px', border: '1px solid var(--ed-border-color)', overflow: 'hidden' }}>
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
                            })
                        )}
                    </div>
                </div>
            </section>



            <section className="ed-why-choose section-gap background-image position-relative" style={{ backgroundImage: "url(\'/assets/images/section-bg-2.png\')" }}>
                <img className="ed-w-choose__pattern-1" src="/assets/images/why-choose/why-choose-1/pattern-1.svg" alt="pattern-1" />
                <div className="container ed-container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-12">
                            <div className="ed-w-choose__content">
                                <div className="ed-section-head">
                                    <span className="ed-section-head__sm-title">WHY CHOOSE US</span>
                                    <h3 className="ed-section-head__title ed-split-text left">
                                        Transform Your Best Practice <br />
                                        with Our Online Course
                                    </h3>
                                    <p className="ed-section-head__text">
                                        Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit. Excepteur sint occaecat.
                                    </p>
                                </div>

                                <div className="ed-w-choose__info">

                                    <div className="ed-w-choose__info-single">
                                        <div className="ed-w-choose__info-head">
                                            <div className="ed-w-choose__info-icon bg-1">
                                                <img src="/assets/images/why-choose/why-choose-1/icon-1.svg" alt="icon" />
                                            </div>
                                            <h5>Face-to-face Teaching</h5>
                                        </div>
                                        <div className="ed-w-choose__info-bottom">
                                            <p>
                                                Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia for this is a for that an deserunt mollit.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="ed-w-choose__info-single">
                                        <div className="ed-w-choose__info-head">
                                            <div className="ed-w-choose__info-icon bg-2">
                                                <img src="/assets/images/why-choose/why-choose-1/icon-2.svg" alt="icon" />
                                            </div>
                                            <h5>24/7 Support Available</h5>
                                        </div>
                                        <div className="ed-w-choose__info-bottom">
                                            <p>
                                                Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia for this is a for that an deserunt mollit.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-12">
                            <div className="ed-w-choose__images position-relative">

                                <div className="ed-w-choose__main-img">
                                    <img src="/assets/images/why-choose/why-choose-1/why-choose-img.png" alt="why-choose-img" />
                                </div>

                                <div className="counter-card updown-ani">
                                    <div className="counter-card__icon">
                                        <i className="fi fi-rr-graduation-cap"></i>
                                    </div>
                                    <div className="counter-card__info">
                                        <h4><span className="counter">69</span>K+</h4>
                                        <p>Satisfied Students</p>
                                    </div>
                                </div>

                                <div className="ed-w-choose__shapes">
                                    <img className="ed-w-choose__shape-1 rotate-ani" src="/assets/images/why-choose/why-choose-1/shape-1.svg" alt="shape-1" />
                                    <img className="ed-w-choose__shape-2" src="/assets/images/why-choose/why-choose-1/pattern-2.svg" alt="pattern-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section className="ed-funfact">
                <div className="container ed-container position-relative overflow-hidden">
                    <div className="ed-funfact__shapes">
                        <img className="ed-funfact__shape-1 updown-ani" src="/assets/images/funfact/funfact-1/shape-1.svg" alt="shape-1" />
                        <img className="ed-funfact__shape-2 rotate-ani" src="/assets/images/funfact/funfact-1/shape-2.svg" alt="shape-1" />
                    </div>
                    <div className="ed-funfact__inner">
                        <div className="ed-funfact__img">
                            <img src="/assets/images/funfact/funfact-1/funfact-img.png" alt="funfact-img" />
                        </div>
                        <div className="ed-funfact__content">
                            <div className="row">

                                <div className="col-lg-6 col-md-6 col-6">
                                    <div className="ed-funfact__counter mg-btm-80">
                                        <h4><span className="counter">5923</span>+</h4>
                                        <p>Student enrolled</p>
                                    </div>
                                </div>


                                <div className="col-lg-6 col-md-6 col-6">
                                    <div className="ed-funfact__counter mg-btm-80">
                                        <h4><span className="counter">8497</span>+</h4>
                                        <p>Classes completed</p>
                                    </div>
                                </div>


                                <div className="col-lg-6 col-md-6 col-6">
                                    <div className="ed-funfact__counter">
                                        <h4><span className="counter">7554</span>+</h4>
                                        <p>Learners report</p>
                                    </div>
                                </div>


                                <div className="col-lg-6 col-md-6 col-6">
                                    <div className="ed-funfact__counter">
                                        <h4><span className="counter">2755</span>+</h4>
                                        <p>Top instructors</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ed-partner section-gap">
                <div className="container ed-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="ed-partner__section-head">
                                <h3 className="ed-partner__section-head-title">Get in touch with the <span>250+</span> companies who Collaboration us</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '30px 60px',
                                padding: '20px 0'
                            }}>
                                <a href="#" target="_blank" className="ed-parnet__brand-logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src="/assets/images/partner/partner-1/1.svg" alt="brand-logo" style={{ maxHeight: '35px', width: 'auto', opacity: 0.6, transition: 'opacity 0.2s' }} />
                                </a>
                                <a href="#" target="_blank" className="ed-parnet__brand-logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src="/assets/images/partner/partner-1/2.svg" alt="brand-logo" style={{ maxHeight: '35px', width: 'auto', opacity: 0.6, transition: 'opacity 0.2s' }} />
                                </a>
                                <a href="#" target="_blank" className="ed-parnet__brand-logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src="/assets/images/partner/partner-1/3.svg" alt="brand-logo" style={{ maxHeight: '35px', width: 'auto', opacity: 0.6, transition: 'opacity 0.2s' }} />
                                </a>
                                <a href="#" target="_blank" className="ed-parnet__brand-logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src="/assets/images/partner/partner-1/4.svg" alt="brand-logo" style={{ maxHeight: '35px', width: 'auto', opacity: 0.6, transition: 'opacity 0.2s' }} />
                                </a>
                                <a href="#" target="_blank" className="ed-parnet__brand-logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src="/assets/images/partner/partner-1/5.svg" alt="brand-logo" style={{ maxHeight: '35px', width: 'auto', opacity: 0.6, transition: 'opacity 0.2s' }} />
                                </a>
                                <a href="#" target="_blank" className="ed-parnet__brand-logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src="/assets/images/partner/partner-1/6.svg" alt="brand-logo" style={{ maxHeight: '35px', width: 'auto', opacity: 0.6, transition: 'opacity 0.2s' }} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ed-testimonial section-bg-color-1 section-gap">
                <div className="container ed-container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-12">

                            <div className="ed-testimonial__content">
                                <div className="ed-section-head">
                                    <span className="ed-section-head__sm-title">OUR TESTIMONIAL</span>
                                    <h3 className="ed-section-head__title ed-split-text left">
                                        What Student Say About Our Online Education Course
                                    </h3>
                                </div>

                                <div className="swiper ed-testimonial__slider">
                                    <div className="swiper-wrapper">

                                        <div className="swiper-slide">
                                            <div className="ed-testimonial__slider-item">
                                                <ul className="ed-testimonial__rattings">
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                </ul>
                                                <p className="ed-testimonial__text">
                                                    “ Attending EduVibe School of Business was one of the best decisions I've ever made. The curriculum was practical and industry-focused, and I was able to apply what I learned in the
                                                    classroom.”
                                                </p>
                                                <div className="ed-testimonial__author">
                                                    <div className="ed-testimonial__author-img">
                                                        <img src="/assets/images/testimonial/testimonial-1/author-1.png" alt="author-img" />
                                                    </div>
                                                    <div className="ed-testimonial__author-info">
                                                        <h5>John Smith</h5>
                                                        <p>Science Student</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="swiper-slide">
                                            <div className="ed-testimonial__slider-item">
                                                <ul className="ed-testimonial__rattings">
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                </ul>
                                                <p className="ed-testimonial__text">
                                                    “ Attending EduVibe School of Business was one of the best decisions I've ever made. The curriculum was practical and industry-focused, and I was able to apply what I learned in the
                                                    classroom.”
                                                </p>
                                                <div className="ed-testimonial__author">
                                                    <div className="ed-testimonial__author-img">
                                                        <img src="/assets/images/testimonial/testimonial-1/author-1.png" alt="author-img" />
                                                    </div>
                                                    <div className="ed-testimonial__author-info">
                                                        <h5>John Smith</h5>
                                                        <p>Science Student</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">

                            <div className="ed-testimonial__images position-relative">
                                <div className="ed-testimonial__main-img">
                                    <img src="/assets/images/testimonial/testimonial-1/testimonial-img.png" alt="testimonial-img" />
                                </div>


                                <div className="counter-card updown-ani">
                                    <div className="counter-card__icon">
                                        <i className="fi fi-rr-graduation-cap"></i>
                                    </div>
                                    <div className="counter-card__info">
                                        <h4><span className="counter">667</span>K+</h4>
                                        <p>Satisfied Students</p>
                                    </div>
                                </div>


                                <div className="ed-testimonial__shapes">
                                    <img className="ed-testimonial__shape-1" src="/assets/images/testimonial/testimonial-1/shape-1.svg" alt="shape-1" />
                                    <img className="ed-testimonial__shape-2" src="/assets/images/testimonial/testimonial-1/shape-2.svg" alt="shape-2" />
                                    <img className="ed-testimonial__shape-3 rotate-ani" src="/assets/images/testimonial/testimonial-1/shape-3.svg" alt="shape-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div className="section-bg background-image" style={{ backgroundImage: "url(\'/assets/images/section-bg-3.png\')" }}>

                <section className="ed-blog section-gap">
                    <div className="container ed-container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-8 col-12">
                                <div className="ed-section-head text-center">
                                    <span className="ed-section-head__sm-title">OUR NEWS</span>
                                    <h3 className="ed-section-head__title ed-split-text left">
                                        Our New Articles
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="ed-blog__card wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                                    <div className="ed-blog__head">
                                        <div className="ed-blog__img">
                                            <img src="/assets/images/blog/blog-1/1.png" alt="blog-img" />
                                        </div>
                                        <a href="/blog" className="ed-blog__category">Education</a>
                                    </div>
                                    <div className="ed-blog__content">
                                        <ul className="ed-blog__meta">
                                            <li><i className="fi fi-rr-calendar"></i>09 May, 2024</li>
                                            <li><i className="fi fi-rr-comment-alt-dots"></i>32 Comments</li>
                                        </ul>
                                        <a href="/blog-details" className="ed-blog__title">
                                            <h4>
                                                Solutions Your All Problem With Online Courses For Your Thinking
                                            </h4>
                                        </a>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="ed-blog__card wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                                    <div className="ed-blog__head">
                                        <div className="ed-blog__img">
                                            <img src="/assets/images/blog/blog-1/2.png" alt="blog-img" />
                                        </div>
                                        <a href="/blog" className="ed-blog__category">Business</a>
                                    </div>
                                    <div className="ed-blog__content">
                                        <ul className="ed-blog__meta">
                                            <li><i className="fi fi-rr-calendar"></i>09 January, 2024</li>
                                            <li><i className="fi fi-rr-comment-alt-dots"></i>98 Comments</li>
                                        </ul>
                                        <a href="/blog-details" className="ed-blog__title">
                                            <h4>
                                                Exploring Learning Landscapes in All Academic Calendar For Season
                                            </h4>
                                        </a>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="ed-blog__card wow fadeInUp" data-wow-delay=".7s" data-wow-duration="1s">
                                    <div className="ed-blog__head">
                                        <div className="ed-blog__img">
                                            <img src="/assets/images/blog/blog-1/3.png" alt="blog-img" />
                                        </div>
                                        <a href="/blog" className="ed-blog__category">Marketing</a>
                                    </div>
                                    <div className="ed-blog__content">
                                        <ul className="ed-blog__meta">
                                            <li><i className="fi fi-rr-calendar"></i>03 June, 2024</li>
                                            <li><i className="fi fi-rr-comment-alt-dots"></i>04 Comments</li>
                                        </ul>
                                        <a href="/blog-details" className="ed-blog__title">
                                            <h4>
                                                Voices from the Learning Education Hub For Your Children
                                            </h4>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <section className="ed-call-action position-relative">
                    <div className="container ed-container">
                        <div className="ed-call-action__inner position-relative">
                            <div className="ed-call-action__shapes">
                                <img className="ed-call-action__shape-1 rotate-ani" src="/assets/images/call-action/call-action-1/shape-1.svg" alt="shape-1" />
                                <img className="ed-call-action__shape-2" src="/assets/images/call-action/call-action-1/shape-2.svg" alt="shape-2" />
                                <img className="ed-call-action__shape-3 updown-ani" src="/assets/images/call-action/call-action-1/shape-3.svg" alt="shape-3" />
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <div className="ed-call-action__img">
                                        <img src="/assets/images/call-action/call-action-1/call-action-img.png" alt="call-action-img" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12 order-class">
                                    <div className="ed-call-action__content">
                                        <div className="ed-section-head">
                                            <span className="ed-section-head__sm-title">GET STARTED NOW</span>
                                            <h3 className="ed-section-head__title">
                                                Affordable Your Online Courses <br />
                                                & Learning Opportunities
                                            </h3>
                                            <p className="ed-section-head__text">
                                                Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit. Excepteur sint occaecat.
                                            </p>
                                        </div>
                                        <div className="ed-call-action__content-btn">
                                            <a href="/courses" className="ed-btn"> Start Learning Today<i className="fi fi-rr-arrow-small-right"></i> </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

        </>
    );
}
