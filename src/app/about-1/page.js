'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Page() {
  return (
    <>
      
                    <div className="section-bg">
                        <Breadcrumbs title="About Us" menu={[{ label: 'ABOUT US' }]} />
                    </div>

                    
                    <section className="ed-about ed-about__page section-gap position-relative">
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
                                <div className="col-lg-6 col-12">
                                    
                                    <div className="ed-about__content">
                                        <div className="ed-section-head">
                                            <span className="ed-section-head__sm-title">WELCOME TO EDUNA</span>
                                            <h3 className="ed-section-head__title ed-split-text right">
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
                    

                    
                    <section className="ed-category ed-category--style2 section-gap overflow-hidden">
                        <div className="container ed-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="ed-section-head text-center">
                                        <span className="ed-section-head__sm-title">COURSE CATEGORIES</span>
                                        <h3 className="ed-section-head__title m-0 ed-split-text left">
                                            Top Categories You Want to Learn
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="swiper ed-category__slider">
                                    <div className="swiper-wrapper">
                                        
                                        <div className="swiper-slide">
                                            <div className="ed-category__card ed-category__card--style2">
                                                <div className="ed-category__img">
                                                    <img src="/assets/images/category/category-2/img-1.png" alt="category-img" />
                                                </div>
                                                <a href="/courses" className="ed-category__content">
                                                    <div className="ed-category__icon">
                                                        <img src="/assets/images/category/category-1/1.svg" alt="icon" />
                                                    </div>
                                                    <div className="ed-category__info">
                                                        <h4>Business</h4>
                                                        <p>04 Courses</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        
                                        <div className="swiper-slide">
                                            <div className="ed-category__card ed-category__card--style2">
                                                <div className="ed-category__img">
                                                    <img src="/assets/images/category/category-2/img-2.png" alt="category-img" />
                                                </div>
                                                <a href="/courses" className="ed-category__content">
                                                    <div className="ed-category__icon">
                                                        <img src="/assets/images/category/category-1/2.svg" alt="icon" />
                                                    </div>
                                                    <div className="ed-category__info">
                                                        <h4>Marketing</h4>
                                                        <p>88 Courses</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        
                                        <div className="swiper-slide">
                                            <div className="ed-category__card ed-category__card--style2">
                                                <div className="ed-category__img">
                                                    <img src="/assets/images/category/category-2/img-3.png" alt="category-img" />
                                                </div>
                                                <a href="/courses" className="ed-category__content">
                                                    <div className="ed-category__icon">
                                                        <img src="/assets/images/category/category-1/3.svg" alt="icon" />
                                                    </div>
                                                    <div className="ed-category__info">
                                                        <h4>Design</h4>
                                                        <p>23 Courses</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        
                                        <div className="swiper-slide">
                                            <div className="ed-category__card ed-category__card--style2">
                                                <div className="ed-category__img">
                                                    <img src="/assets/images/category/category-2/img-4.png" alt="category-img" />
                                                </div>
                                                <a href="/courses" className="ed-category__content">
                                                    <div className="ed-category__icon">
                                                        <img src="/assets/images/category/category-1/4.svg" alt="icon" />
                                                    </div>
                                                    <div className="ed-category__info">
                                                        <h4>Finance</h4>
                                                        <p>02 Courses</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        
                                        <div className="swiper-slide">
                                            <div className="ed-category__card ed-category__card--style2">
                                                <div className="ed-category__img">
                                                    <img src="/assets/images/category/category-2/img-5.png" alt="category-img" />
                                                </div>
                                                <a href="/courses" className="ed-category__content">
                                                    <div className="ed-category__icon">
                                                        <img src="/assets/images/category/category-1/5.svg" alt="icon" />
                                                    </div>
                                                    <div className="ed-category__info">
                                                        <h4>Lifestyle</h4>
                                                        <p>29 Courses</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        
                                        <div className="swiper-slide">
                                            <div className="ed-category__card ed-category__card--style2">
                                                <div className="ed-category__img">
                                                    <img src="/assets/images/category/category-2/img-6.jpg" alt="category-img" />
                                                </div>
                                                <a href="/courses" className="ed-category__content">
                                                    <div className="ed-category__icon">
                                                        <img src="/assets/images/category/category-1/6.svg" alt="icon" />
                                                    </div>
                                                    <div className="ed-category__info">
                                                        <h4>Cyber</h4>
                                                        <p>45 Courses</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        
                                        <div className="swiper-slide">
                                            <div className="ed-category__card ed-category__card--style2">
                                                <div className="ed-category__img">
                                                    <img src="/assets/images/category/category-2/img-5.png" alt="category-img" />
                                                </div>
                                                <a href="/courses" className="ed-category__content">
                                                    <div className="ed-category__icon">
                                                        <img src="/assets/images/category/category-1/7.svg" alt="icon" />
                                                    </div>
                                                    <div className="ed-category__info">
                                                        <h4>Development</h4>
                                                        <p>28 Courses</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        
                                        <div className="swiper-slide">
                                            <div className="ed-category__card ed-category__card--style2">
                                                <div className="ed-category__img">
                                                    <img src="/assets/images/category/category-2/img-8.png" alt="category-img" />
                                                </div>
                                                <a href="/courses" className="ed-category__content">
                                                    <div className="ed-category__icon">
                                                        <img src="/assets/images/category/category-1/8.svg" alt="icon" />
                                                    </div>
                                                    <div className="ed-category__info">
                                                        <h4>Photography</h4>
                                                        <p>03 Courses</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        
                                        <div className="swiper-slide">
                                            <div className="ed-category__card ed-category__card--style2">
                                                <div className="ed-category__img">
                                                    <img src="/assets/images/category/category-2/img-4.png" alt="category-img" />
                                                </div>
                                                <a href="/courses" className="ed-category__content">
                                                    <div className="ed-category__icon">
                                                        <img src="/assets/images/category/category-1/4.svg" alt="icon" />
                                                    </div>
                                                    <div className="ed-category__info">
                                                        <h4>Finance</h4>
                                                        <p>02 Courses</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        
                                        <div className="swiper-slide">
                                            <div className="ed-category__card ed-category__card--style2">
                                                <div className="ed-category__img">
                                                    <img src="/assets/images/category/category-2/img-5.png" alt="category-img" />
                                                </div>
                                                <a href="/courses" className="ed-category__content">
                                                    <div className="ed-category__icon">
                                                        <img src="/assets/images/category/category-1/5.svg" alt="icon" />
                                                    </div>
                                                    <div className="ed-category__info">
                                                        <h4>Lifestyle</h4>
                                                        <p>29 Courses</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-pagination"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    

                    
                    <section className="ed-partner ed-partner--style2 section-gap pt-0">
                        <div className="container ed-container">
                            <div className="row align-items-center">
                                <div className="col-lg-5 col-12">
                                    <div className="ed-section-head">
                                        <span className="ed-section-head__sm-title">OUR SPONSOR</span>
                                        <h3 className="ed-section-head__title m-0">
                                            Get in touch with the <br />
                                            <span> 250+ </span> companies who Collaboration us
                                        </h3>
                                    </div>
                                </div>

                                <div className="col-lg-7 col-12">
                                    <div className="ed-partner__slider--style2">
                                        <div className="swiper ed-partner__slider-2">
                                            <div className="swiper-wrapper ease-linear">
                                                
                                                <div className="swiper-slide">
                                                    <a href="#" target="_blank" className="ed-parnet__brand-logo">
                                                        <img src="/assets/images/partner/partner-1/1.svg" alt="brand-logo" />
                                                    </a>
                                                </div>

                                                
                                                <div className="swiper-slide">
                                                    <a href="#" target="_blank" className="ed-parnet__brand-logo">
                                                        <img src="/assets/images/partner/partner-1/2.svg" alt="brand-logo" />
                                                    </a>
                                                </div>

                                                
                                                <div className="swiper-slide">
                                                    <a href="#" target="_blank" className="ed-parnet__brand-logo">
                                                        <img src="/assets/images/partner/partner-1/3.svg" alt="brand-logo" />
                                                    </a>
                                                </div>
                                                
                                                <div className="swiper-slide">
                                                    <a href="#" target="_blank" className="ed-parnet__brand-logo">
                                                        <img src="/assets/images/partner/partner-1/4.svg" alt="brand-logo" />
                                                    </a>
                                                </div>
                                                
                                                <div className="swiper-slide">
                                                    <a href="#" target="_blank" className="ed-parnet__brand-logo">
                                                        <img src="/assets/images/partner/partner-1/5.svg" alt="brand-logo" />
                                                    </a>
                                                </div>
                                                
                                                <div className="swiper-slide">
                                                    <a href="#" target="_blank" className="ed-parnet__brand-logo">
                                                        <img src="/assets/images/partner/partner-1/6.svg" alt="brand-logo" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="swiper ed-partner__slider-2-reverse">
                                            <div className="swiper-wrapper ease-linear">
                                                
                                                <div className="swiper-slide">
                                                    <a href="#" target="_blank" className="ed-parnet__brand-logo">
                                                        <img src="/assets/images/partner/partner-1/1.svg" alt="brand-logo" />
                                                    </a>
                                                </div>

                                                
                                                <div className="swiper-slide">
                                                    <a href="#" target="_blank" className="ed-parnet__brand-logo">
                                                        <img src="/assets/images/partner/partner-1/2.svg" alt="brand-logo" />
                                                    </a>
                                                </div>

                                                
                                                <div className="swiper-slide">
                                                    <a href="#" target="_blank" className="ed-parnet__brand-logo">
                                                        <img src="/assets/images/partner/partner-1/3.svg" alt="brand-logo" />
                                                    </a>
                                                </div>
                                                
                                                <div className="swiper-slide">
                                                    <a href="#" target="_blank" className="ed-parnet__brand-logo">
                                                        <img src="/assets/images/partner/partner-1/4.svg" alt="brand-logo" />
                                                    </a>
                                                </div>
                                                
                                                <div className="swiper-slide">
                                                    <a href="#" target="_blank" className="ed-parnet__brand-logo">
                                                        <img src="/assets/images/partner/partner-1/5.svg" alt="brand-logo" />
                                                    </a>
                                                </div>
                                                
                                                <div className="swiper-slide">
                                                    <a href="#" target="_blank" className="ed-parnet__brand-logo">
                                                        <img src="/assets/images/partner/partner-1/6.svg" alt="brand-logo" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    

                    
                    <section className="ed-course ed-course--style2 section-gap position-relative background-image" style={{backgroundImage: "url(\'/assets/images/section-bg-7.png\')"}}>
                        <div className="container ed-container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-md-8 col-12">
                                    <div className="ed-section-head text-center">
                                        <span className="ed-section-head__sm-title">BEST SELLER</span>
                                        <h3 className="ed-section-head__title">
                                            Our Best Selling Courses
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                
                                <div className="col-lg-6 col-xl-6 col-md-6 col-12">
                                    <div className="ed-course__card ed-course__card--style2 wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                                        <div className="ed-course__head position-relative">
                                            <a href="/course-details" className="ed-course__img">
                                                <img src="/assets/images/course/course-2/1.png" alt="course-img" />
                                            </a>
                                            <a href="/courses" className="ed-course__tag">Marketing</a>
                                            <a href="#" className="ed-course__bookmarked"><i className="fi fi-rr-bookmark"></i></a>
                                        </div>
                                        <div className="ed-course__body">
                                            <div className="ed-course__lesson">
                                                <div className="ed-course__part">
                                                    <i className="fi-rr-book"></i>
                                                    <p>04 Lessons</p>
                                                </div>
                                                <div className="ed-course__teacher">
                                                    <i className="fi-rr-user"></i>
                                                    <p>Lucas Brooks</p>
                                                </div>
                                            </div>

                                            <a href="/course-details" className="ed-course__title">
                                                <h5>
                                                    Grow Personal Financial Security Thinking & Principles
                                                </h5>
                                            </a>

                                            <div className="ed-course__rattings">
                                                <ul>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><span>(67 Reviews)</span></li>
                                                </ul>
                                            </div>

                                            <div className="ed-course__bottom">
                                                <span className="ed-course__price">$383.00</span>
                                                <div className="ed-course__students">
                                                    <i className="fi fi-rr-graduation-cap"></i>
                                                    <p>356 Students</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-6 col-xl-6 col-md-6 col-12">
                                    <div className="ed-course__card ed-course__card--style2 wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                                        <div className="ed-course__head position-relative">
                                            <a href="/course-details" className="ed-course__img">
                                                <img src="/assets/images/course/course-2/2.png" alt="course-img" />
                                            </a>
                                            <a href="/courses" className="ed-course__tag">Development</a>
                                            <a href="#" className="ed-course__bookmarked"><i className="fi fi-rr-bookmark"></i></a>
                                        </div>
                                        <div className="ed-course__body">
                                            <div className="ed-course__lesson">
                                                <div className="ed-course__part">
                                                    <i className="fi-rr-book"></i>
                                                    <p>98 Lessons</p>
                                                </div>
                                                <div className="ed-course__teacher">
                                                    <i className="fi-rr-user"></i>
                                                    <p>John Smith</p>
                                                </div>
                                            </div>

                                            <a href="/course-details" className="ed-course__title">
                                                <h5>
                                                    Data Competitive Strategy law and Organization Course
                                                </h5>
                                            </a>

                                            <div className="ed-course__rattings">
                                                <ul>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><span>(09 Reviews)</span></li>
                                                </ul>
                                            </div>

                                            <div className="ed-course__bottom">
                                                <span className="ed-course__price">$383.00</span>
                                                <div className="ed-course__students">
                                                    <i className="fi fi-rr-graduation-cap"></i>
                                                    <p>553 Students</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    

                    
                    <section className="ed-contact section-gap position-relative pb-0">
                        <div className="ed-contact__bg">
                            <img src="/assets/images/contact/contact-bg.png" alt="contact-bg" />
                        </div>
                        <div className="ed-contact__shapes">
                            <img className="ed-contact__shape-1 rotate-ani" src="/assets/images/contact/shape-1.svg" alt="shape-1" />
                            <img className="ed-contact__shape-2" src="/assets/images/contact/shape-2.svg" alt="shape-1" />
                            <img className="ed-contact__shape-3" src="/assets/images/contact/shape-3.svg" alt="shape-1" />
                        </div>
                        <div className="container ed-container">
                            <div className="row align-items-end">
                                <div className="col-lg-3 col-12">
                                    <div className="ed-contact__info-wrapper">
                                        <h4 className="ed-contact__info-title">Contact</h4>

                                        
                                        <div className="ed-contact__info-item">
                                            <div className="ed-contact__info-icon">
                                                <img src="/assets/images/icons/icon-phone-blue.svg" alt="icon-phone-blue" />
                                            </div>
                                            <div className="ed-contact__info-content">
                                                <span>24/7 Support</span>
                                                <a href="tel:+532 321 33 33">+532 321 33 33</a>
                                            </div>
                                        </div>
                                        
                                        <div className="ed-contact__info-item">
                                            <div className="ed-contact__info-icon">
                                                <img src="/assets/images/icons/icon-envelope-blue.svg" alt="icon-envelope-blue" />
                                            </div>
                                            <div className="ed-contact__info-content">
                                                <span>Send Message</span>
                                                <a href="mailto:eduna@gmail.com">eduna@gmail.com3</a>
                                            </div>
                                        </div>

                                        
                                        <div className="ed-contact__info-item">
                                            <div className="ed-contact__info-icon">
                                                <img src="/assets/images/icons/icon-location-blue.svg" alt="icon-location-blue" />
                                            </div>
                                            <div className="ed-contact__info-content">
                                                <span>Our Locati0n</span>
                                                <a href="#">32/Jenin, London</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-8 offset-lg-1 col-12 order-class">
                                    
                                    <div className="ed-contact__form wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                                        <div className="ed-contact__form-head">
                                            <span className="ed-contact__form-sm-title">GET IN TOUCH</span>
                                            <h3 className="ed-contact__form-big-title">
                                                Have Any Questions About Eduna? Contact With Us Today
                                            </h3>
                                        </div>
                                        <form action="#" method="post" className="ed-contact__form-main">
                                            <div className="row">
                                                <div className="col-lg-6 col-12">
                                                    <div className="form-group">
                                                        <input type="text" id="name" name="name" placeholder="Full name" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-12">
                                                    <div className="form-group">
                                                        <input type="tel" id="number" name="number" placeholder="Your phone" required />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <input type="text" id="website" name="website" placeholder="Your website" required />
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <input type="email" id="email" name="email" placeholder="Enter your email" required />
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <textarea id="message" name="message" placeholder="How can we help you? Feel free to get in touch!" required></textarea>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="flexCheckDefault"> <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />I agree to the Privacy Policy. </label>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="ed-contact__form-btn">
                                                        <button type="submit" className="ed-btn">Send Your Message<i className="fi fi-rr-arrow-small-right"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    

                    
                    <section className="ed-blog section-gap">
                        <div className="container ed-container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-md-8 col-12">
                                    <div className="ed-section-head text-center">
                                        <span className="ed-section-head__sm-title">OUR NEWS</span>
                                        <h3 className="ed-section-head__title ed-split-text">
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
                    
                
    </>
  );
}
