'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Page() {
  return (
    <>
      
                    <div className="section-bg">
                        <Breadcrumbs title="Teacher Details" menu={[{ label: 'Teacher Details' }]} />
                    </div>

                    
                    <section className="ed-team__details position-relative section-gap">
                        <div className="container ed-container">
                            <div className="row">
                                <div className="col-12">
                                    
                                    <div className="ed-team__details-top">
                                        
                                        <div className="ed-team__details-image">
                                            <div className="ed-team__details-main-img">
                                                <img src="/assets/images/team/team-1/3.png" alt="team-details-img" />
                                            </div>
                                            
                                            <div className="ed-team__details-meta">
                                                <div className="ed-course__lesson">
                                                    <div className="ed-course__rattings">
                                                        <ul>
                                                            <li><i className="icofont-star"></i></li>
                                                            <li><span>(09 Reviews)</span></li>
                                                        </ul>
                                                    </div>
                                                    <div className="ed-course__part">
                                                        <i className="fi-rr-book"></i>
                                                        <p>254 Students</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="ed-team__details-info">
                                            <span>SCINCE TEACHER</span>
                                            <h4>Michael Anderson</h4>
                                            <p>
                                                If you need help coping with a mental health condition or things going on in your life, like loneliness or stress due to a new baby or financial issues, just come to us.
                                            </p>

                                            <div className="ed-team__details-info-wrapper">
                                                
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
                                            </div>
                                            
                                            <ul className="ed-team__details-info-social">
                                                <li>
                                                    <a href="https://www.facebook.com/" target="_blank"><img src="/assets/images/icons/icon-dark-facebook.svg" alt="icon-dark-facebook" /></a>
                                                </li>
                                                <li>
                                                    <a href="https://www.twitter.com/" target="_blank"><img src="/assets/images/icons/icon-dark-twitter.svg" alt="icon-dark-twitter" /></a>
                                                </li>
                                                <li>
                                                    <a href="https://www.dribbble.com/" target="_blank"><img src="/assets/images/icons/icon-dark-dribbble.svg" alt="icon-dark-dribbble" /></a>
                                                </li>
                                                <li>
                                                    <a href="https://www.instagram.com/" target="_blank"><img src="/assets/images/icons/icon-dark-instagram.svg" alt="icon-dark-instagram" /></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="ed-team__details-bottom">
                                        <h5>About Me</h5>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur elit sed do eius mod tempor incidid labore dolore magna aliqua. enim ad minim eniam quis nostrud exercitation ullamco laboris nisi aliquip ex commodo
                                            consequat. duis aute irure dolor in repreed ut perspiciatis unde omnis iste natus error sit voluptat em acus antium.
                                        </p>
                                        <br />
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur elit sed do eius mod tempor incidid labore dolore magna aliqua. enim ad minim eniam quis nostrud exercitation ullamco laboris nisi aliquip ex commodo
                                            consequat. duis aute irure dolor in repreed ut perspiciatis unde omnis iste natus error sit voluptat em acus antium.
                                        </p>
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
