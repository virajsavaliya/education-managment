'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Page() {
  return (
    <>
      
                    <div className="section-bg">
                        <Breadcrumbs title="About Us 02" menu={[{ label: 'About Us 02' }]} />
                    </div>

                    
                    <section className="ed-why-choose ed-why-choose--style3 section-gap position-relative">
                        <div className="container ed-container">
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <div className="ed-w-choose__content">
                                        <div className="ed-section-head">
                                            <span className="ed-section-head__sm-title">WHO WE ARE</span>
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
                                    <div className="ed-w-choose__images ed-w-choose__images--style3 position-relative">
                                        
                                        <div className="ed-w-choose__main-img--style2 position-relative">
                                            <img className="why-choose-img-1" src="/assets/images/why-choose/why-choose-3/img-1.png" alt="why-choose-img-1" />
                                            <img className="why-choose-img-2" src="/assets/images/why-choose/why-choose-3/img-2.png" alt="why-choose-img-2" />
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
                                        
                                        <div className="ed-w-choose__shapes">
                                            <img className="ed-w-choose__shape-1 rotate-ani" src="/assets/images/why-choose/why-choose-3/shape-1.svg" alt="shape-1" />
                                            <img className="ed-w-choose__shape-2" src="/assets/images/why-choose/why-choose-3/shape-2.svg" alt="pattern-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    

                    <div className="section-bg background-image" style={{backgroundImage: "url(\'/assets/images/section-bg-8.png\')"}}>
                        
                        <section className="ed-category ed-category--style3 section-gap">
                            <div className="container ed-container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 col-12">
                                        <div className="ed-section-head text-center">
                                            <span className="ed-section-head__sm-title">COURSE CATEGORIES</span>
                                            <h3 className="ed-section-head__title m-0 ed-split-text left">
                                                Top Categories You Want to Learn
                                            </h3>
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

                    
                    <section className="ed-video ed-video--style2">
                        <div className="container ed-container">
                            <div className="ed-video__bg background-image ed-hobble position-relative" style={{backgroundImage: "url(\'/assets/images/video/video-2/bg-img.png\')"}}>
                                <div className="ed-video__shapes">
                                    <img className="ed-video__shape-1 rotate-ani" src="/assets/images/video/video-1/shape-1.svg" alt="shape-1" />
                                    <img className="ed-video__shape-2 updown-ani" src="/assets/images/video/video-1/shape-2.svg" alt="shape-2" />
                                </div>
                                <a href="https://www.youtube.com/watch?v=gyGsPlt06bo" className="ed-video__btn popup-video ed-hover-layer-2">
                                    <img src="/assets/images/icons/icon-play-yellow.svg" alt="play-icon" />
                                </a>
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
                    

                    
                    <section className="ed-call-action ed-call-action--style2 position-relative overflow-hidden">
                        <div className="container ed-container">
                            <div className="ed-call-action__inner ed-call-action__inner--style2">
                                <div className="ed-call-action__shapes">
                                    <img className="ed-call-action__shape-1" src="/assets/images/abstracts/abstract-element-regular.svg" alt="abstract-element-regular" />
                                    <img className="ed-call-action__shape-2" src="/assets/images/abstracts/abstract-dot-4.svg" alt="abstract-dot-4" />
                                    <img className="ed-call-action__shape-3" src="/assets/images/abstracts/abstract-element-regular.svg" alt="abstract-element-regular" />
                                    <img className="ed-call-action__shape-4" src="/assets/images/abstracts/abstract-orange-plus-1.svg" alt="abstract-orange-plus-1" />
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-12">
                                        <div className="ed-call-action__img">
                                            <img src="/assets/images/call-action/call-action-2/call-action-img.png" alt="call-action-img" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-12 order-class">
                                        <div className="ed-call-action__content">
                                            <div className="ed-section-head">
                                                <span className="ed-section-head__sm-title">ONLINE COURSES</span>
                                                <h3 className="ed-section-head__title ed-split-text right">
                                                    Find Your Right Learning Path <br />
                                                    For Your Future
                                                </h3>
                                                <p className="ed-section-head__text">
                                                    Excepteur sint occaecat cupidatat non proident sunt
                                                    <br />
                                                    in culpa qui officia deserunt mollit.
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
                    

                    
                    <section className="ed-about section-gap position-relative">
                        <div className="container ed-container">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-12">
                                    
                                    <div className="ed-about__content p-0">
                                        <div className="ed-section-head">
                                            <span className="ed-section-head__sm-title">WHY CHOOSE EDUNA</span>
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
                                <div className="col-lg-6 col-12">
                                    
                                    <div className="ed-about__images">
                                        <div className="ed-about__main-img">
                                            <img src="/assets/images/about/about-3/about-img.png" alt="about-img" />
                                        </div>
                                        <div className="counter-card updown-ani">
                                            <div className="counter-card__icon">
                                                <i className="fi fi-rr-graduation-cap"></i>
                                            </div>
                                            <div className="counter-card__info">
                                                <h4><span className="counter">3458</span>+</h4>
                                                <p>Satisfied Students</p>
                                            </div>
                                        </div>

                                        <div className="ed-about__shapes">
                                            <img className="ed-about__shape-1" src="/assets/images/about/about-1/shape-1.svg" alt="shape-1" />
                                            <img className="ed-about__shape-2" src="/assets/images/about/about-1/shape-2.svg" alt="shape-2" />
                                            <img className="ed-about__shape-3 rotate-ani" src="/assets/images/about/about-1/shape-3.svg" alt="shape-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    

                    
                    <section className="ed-testimonial ed-testimonial--style3 section-gap pt-0 overflow-hidden">
                        <div className="container ed-container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8 col-12">
                                    <div className="ed-section-head text-center">
                                        <span className="ed-section-head__sm-title">OUR TESTIMONIAL</span>
                                        <h3 className="ed-section-head__title ed-split-text left">
                                            Student Thinking About Us
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="swiper ed-testimonial__slider-2">
                                    <div className="swiper-wrapper">
                                        
                                        <div className="swiper-slide">
                                            <div className="ed-testimonial__slider-item bg-color-1">
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
                                            <div className="ed-testimonial__slider-item bg-color-2">
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
                                                        <img src="/assets/images/testimonial/testimonial-1/author-2.png" alt="author-img" />
                                                    </div>
                                                    <div className="ed-testimonial__author-info">
                                                        <h5>Franklin Chen</h5>
                                                        <p>Art Student</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        <div className="swiper-slide">
                                            <div className="ed-testimonial__slider-item bg-color-3">
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
                                                        <img src="/assets/images/testimonial/testimonial-1/author-3.png" alt="author-img" />
                                                    </div>
                                                    <div className="ed-testimonial__author-info">
                                                        <h5>James Parker</h5>
                                                        <p>Math Student</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        <div className="swiper-slide">
                                            <div className="ed-testimonial__slider-item bg-color-4">
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
                                                        <img src="/assets/images/testimonial/testimonial-1/author-4.png" alt="author-img" />
                                                    </div>
                                                    <div className="ed-testimonial__author-info">
                                                        <h5>Charles Morgan</h5>
                                                        <p>Globe Student</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        <div className="swiper-slide">
                                            <div className="ed-testimonial__slider-item bg-color-2">
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
                                                        <img src="/assets/images/testimonial/testimonial-1/author-2.png" alt="author-img" />
                                                    </div>
                                                    <div className="ed-testimonial__author-info">
                                                        <h5>Franklin Chen</h5>
                                                        <p>Art Student</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="swiper-pagination"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    

                    
                    <section className="ed-faq position-relative">
                        <div className="container ed-container">
                            <div className="ed-faq__inner position-relative">
                                <div className="row align-items-center">
                                    <div className="col-lg-12 col-xl-6 col-12">
                                        
                                        <div className="ed-faq__images position-relative">
                                            <div className="ed-faq__images-group">
                                                <div className="ed-faq__image-group-1">
                                                    <img className="faq-img-1" src="/assets/images/faq/faq-1/faq-img-1.png" alt="faq-img-1" />
                                                </div>
                                                <div className="ed-faq__image-group-2">
                                                    <img className="faq-img-2" src="/assets/images/faq/faq-1/faq-img-2.png" alt="faq-img-2" />
                                                    <img className="faq-img-3" src="/assets/images/faq/faq-1/faq-img-3.png" alt="faq-img-2" />
                                                </div>
                                            </div>

                                            
                                            <div className="ed-faq__shapes">
                                                <img className="ed-faq__shape-1" src="/assets/images/faq/faq-1/shape-1.svg" alt="shape-1" />
                                                <img className="ed-faq__shape-2" src="/assets/images/faq/faq-1/shape-2.svg" alt="shape-2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-xl-6 col-12">
                                        
                                        <div className="ed-faq__content">
                                            <div className="ed-section-head m-0">
                                                <span className="ed-section-head__sm-title">FREQUENTLY ASKED QUESTIONS</span>
                                                <h3 className="ed-section-head__title ed-split-text right">
                                                    Most Popular Questions About Our Online Courses
                                                </h3>
                                            </div>
                                            <div className="ed-faq__accordion faq-inner accordion" id="accordionExample">
                                                
                                                <div className="ed-faq__accordion-item">
                                                    <h2 className="accordion-header" id="headingOne">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                            How can I start with your online class?
                                                        </button>
                                                    </h2>
                                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                        <div className="ed-faq__accordion-body">
                                                            <p className="ed-faq__accordion-text">
                                                                Excepteur sint occaecat cupidatat non proident sunta in culpa qui officia for this is a for that tempor.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="ed-faq__accordion-item">
                                                    <h2 className="accordion-header" id="headingTwo">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                            How can I register to your website to learn?
                                                        </button>
                                                    </h2>
                                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                        <div className="ed-faq__accordion-body">
                                                            <p className="ed-faq__accordion-text">
                                                                Excepteur sint occaecat cupidatat non proident sunta in culpa qui officia for this is a for that tempor.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="ed-faq__accordion-item">
                                                    <h2 className="accordion-header" id="headingThree">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                            Can i get lifetime access for your any courses?
                                                        </button>
                                                    </h2>
                                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                        <div className="ed-faq__accordion-body">
                                                            <p className="ed-faq__accordion-text">
                                                                Excepteur sint occaecat cupidatat non proident sunta in culpa qui officia for this is a for that tempor.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                
                                                <div className="ed-faq__accordion-item">
                                                    <h2 className="accordion-header" id="headingFour">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                            How can I contact a school directly?
                                                        </button>
                                                    </h2>
                                                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                        <div className="ed-faq__accordion-body">
                                                            <p className="ed-faq__accordion-text">
                                                                Excepteur sint occaecat cupidatat non proident sunta in culpa qui officia for this is a for that tempor.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                    
                
    </>
  );
}
