'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Page() {
  return (
    <>
      
                    <div className="section-bg">
                        <Breadcrumbs title="Contact With Us" menu={[{ label: 'Contact With Us' }]} />
                    </div>

                    
                    <div className="ed-contact__card section-gap">
                        <div className="container ed-container">
                            <div className="row">
                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-contact__card-item">
                                        <div className="ed-contact__card-icon">
                                            <img src="/assets/images/icons/icon-white-phone.svg" alt="icon-white-phone" />
                                        </div>
                                        <div className="ed-contact__card-info">
                                            <a href="tel:+64 939-39-0239">+64 939-39-0239</a>
                                            <a href="tel:+54 939-739-02399">+54 939-739-02399</a>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-contact__card-item">
                                        <div className="ed-contact__card-icon">
                                            <img src="/assets/images/icons/icon-white-message.svg" alt="icon-white-phone" />
                                        </div>
                                        <div className="ed-contact__card-info">
                                            <a href="mailto:helloeduna@gmail.com">helloeduna@gmail.com</a>
                                            <a href="mailto:eduna@gmail.com">eduna@gmail.com</a>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-contact__card-item">
                                        <div className="ed-contact__card-icon">
                                            <img src="/assets/images/icons/icon-white-map.svg" alt="icon-white-phone" />
                                        </div>
                                        <div className="ed-contact__card-info">
                                            <a href="#" target="_blank">
                                                1234 East 27th Street,<br />
                                                New York, NY 101010
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                    
                    <section className="ed-contact ed-contact--style2 section-gap pt-0 position-relative">
                        <div className="container ed-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="ed-contact__inner">
                                        
                                        <div className="ed-contact__img">
                                            <img src="/assets/images/contact/contact-img.png" alt="contact-img" />
                                        </div>

                                        
                                        <div className="ed-contact__form">
                                            <div className="ed-contact__form-head">
                                                <span className="ed-contact__form-sm-title">CONTACT US</span>
                                                <h3 className="ed-contact__form-big-title ed-split-text right">
                                                    Have questions? Contact <br />
                                                    with us today
                                                </h3>
                                            </div>
                                            <form action="#" method="post" className="ed-contact__form-main">
                                                <div className="form-group">
                                                    <input type="text" id="name" name="name" placeholder="Full name" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" id="email" name="email" placeholder="Enter your email" required />
                                                </div>

                                                <div className="form-group">
                                                    <textarea id="message" name="message" placeholder="How can we help you? Feel free to get in touch!" required></textarea>
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="flexCheckDefault"> <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />I agree to the Privacy Policy. </label>
                                                </div>
                                                <div className="ed-contact__form-btn">
                                                    <button type="submit" className="ed-btn">Send Message<i className="fi fi-rr-arrow-small-right"></i></button>
                                                </div>
                                            </form>
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
