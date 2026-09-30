'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Page() {
  return (
    <>
      
                    <div className="section-bg">
                        <Breadcrumbs title="Latest Blog & News" menu={[{ label: 'Latest Blog' }]} />
                    </div>

                    
                    <section className="ed-blog ed-blog-page section-gap">
                        <div className="container ed-container">
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

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-blog__card wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                                        <div className="ed-blog__head">
                                            <div className="ed-blog__img">
                                                <img src="/assets/images/blog/blog-1/4.png" alt="blog-img" />
                                            </div>
                                            <a href="/blog" className="ed-blog__category">Development</a>
                                        </div>
                                        <div className="ed-blog__content">
                                            <ul className="ed-blog__meta">
                                                <li><i className="fi fi-rr-calendar"></i>09 January, 2024</li>
                                                <li><i className="fi fi-rr-comment-alt-dots"></i>44 Comments</li>
                                            </ul>
                                            <a href="/blog-details" className="ed-blog__title">
                                                <h4>
                                                    Stories from the Educational Front at Classroom Is Allow
                                                </h4>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-blog__card wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                                        <div className="ed-blog__head">
                                            <div className="ed-blog__img">
                                                <img src="/assets/images/blog/blog-1/5.png" alt="blog-img" />
                                            </div>
                                            <a href="/blog" className="ed-blog__category">Social</a>
                                        </div>
                                        <div className="ed-blog__content">
                                            <ul className="ed-blog__meta">
                                                <li><i className="fi fi-rr-calendar"></i>08 January, 2024</li>
                                                <li><i className="fi fi-rr-comment-alt-dots"></i>02 Comments</li>
                                            </ul>
                                            <a href="/blog-details" className="ed-blog__title">
                                                <h4>
                                                    Digital Business Is So Amazing For Every People For Improve
                                                </h4>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-blog__card wow fadeInUp" data-wow-delay=".7s" data-wow-duration="1s">
                                        <div className="ed-blog__head">
                                            <div className="ed-blog__img">
                                                <img src="/assets/images/blog/blog-1/6.png" alt="blog-img" />
                                            </div>
                                            <a href="/blog" className="ed-blog__category">Security</a>
                                        </div>
                                        <div className="ed-blog__content">
                                            <ul className="ed-blog__meta">
                                                <li><i className="fi fi-rr-calendar"></i>30 April, 2024</li>
                                                <li><i className="fi fi-rr-comment-alt-dots"></i>18 Comments</li>
                                            </ul>
                                            <a href="/blog-details" className="ed-blog__title">
                                                <h4>
                                                    Fostering Student Growth through Mindful Mentoring
                                                </h4>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-blog__card wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                                        <div className="ed-blog__head">
                                            <div className="ed-blog__img">
                                                <img src="/assets/images/blog/blog-1/7.png" alt="blog-img" />
                                            </div>
                                            <a href="/blog" className="ed-blog__category">Solutions</a>
                                        </div>
                                        <div className="ed-blog__content">
                                            <ul className="ed-blog__meta">
                                                <li><i className="fi fi-rr-calendar"></i>05 June, 2024</li>
                                                <li><i className="fi fi-rr-comment-alt-dots"></i>32 Comments</li>
                                            </ul>
                                            <a href="/blog-details" className="ed-blog__title">
                                                <h4>
                                                    Connecting the Dots in Education with Learning Nexus
                                                </h4>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-blog__card wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                                        <div className="ed-blog__head">
                                            <div className="ed-blog__img">
                                                <img src="/assets/images/blog/blog-1/8.png" alt="blog-img" />
                                            </div>
                                            <a href="/blog" className="ed-blog__category">Academy</a>
                                        </div>
                                        <div className="ed-blog__content">
                                            <ul className="ed-blog__meta">
                                                <li><i className="fi fi-rr-calendar"></i>09 April, 2024</li>
                                                <li><i className="fi fi-rr-comment-alt-dots"></i>46 Comments</li>
                                            </ul>
                                            <a href="/blog-details" className="ed-blog__title">
                                                <h4>
                                                    Boost Your Well-being Through Smart Food Choices
                                                </h4>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-blog__card wow fadeInUp" data-wow-delay=".7s" data-wow-duration="1s">
                                        <div className="ed-blog__head">
                                            <div className="ed-blog__img">
                                                <img src="/assets/images/blog/blog-1/9.png" alt="blog-img" />
                                            </div>
                                            <a href="/blog" className="ed-blog__category">Learning</a>
                                        </div>
                                        <div className="ed-blog__content">
                                            <ul className="ed-blog__meta">
                                                <li><i className="fi fi-rr-calendar"></i>09 May, 2024</li>
                                                <li><i className="fi fi-rr-comment-alt-dots"></i>09 Comments</li>
                                            </ul>
                                            <a href="/blog-details" className="ed-blog__title">
                                                <h4>
                                                    Fueling Your Body for Success: A for Nutrition Guide
                                                </h4>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="ed-pagination">
                                        <ul className="ed-pagination__list">
                                            <li className="active">
                                                <a href="#">01</a>
                                            </li>
                                            <li>
                                                <a href="#">02</a>
                                            </li>
                                            <li>
                                                <a href="#"><i className="fi-rr-arrow-small-right"></i></a>
                                            </li>
                                        </ul>
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
