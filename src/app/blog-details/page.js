'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Page() {
  return (
    <>
      
                    <div className="section-bg">
                        <Breadcrumbs title="Blog Details" menu={[{ label: 'Blog Details' }]} />
                    </div>

                    
                    <section className="ed-blog__details section-gap position-relative">
                        <div className="container ed-container">
                            <div className="row">
                                <div className="col-lg-12 col-xl-8 col-12">
                                    
                                    <div className="ed-blog__details-main">
                                        <div className="ed-blog__details-top">
                                            
                                            <div className="ed-blog__details-cover">
                                                <div className="ed-blog__details-cover-img">
                                                    <img src="/assets/images/blog/blog-details/b-details-img-1.png" alt="b-details-img-1" />
                                                </div>
                                                <ul className="ed-blog__details-meta">
                                                    <li><i className="fi fi-rr-calendar"></i>30 April, 2024</li>
                                                    <li><i className="fi fi-rr-comment-alt-dots"></i>18 Comments</li>
                                                    <li>
                                                        <a href="/blog">Marketing</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <h2 className="ed-blog__details-title">
                                                Fostering Student Growth through Mindful for Your Mentoring Students
                                            </h2>
                                            <p className="ed-blog__details-text">
                                                Lorem ipsum dolor sit amet consectur adipisicing elit, sed do eiusmod tempor inc idid unt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exerec tation ullamco laboris nis
                                                aliquip commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur enim ipsam.
                                            </p>
                                            <br />
                                            <p className="ed-blog__details-text">
                                                Lorem ipsum dolor sit amet consectur adipisicing elit, sed do eiusmod tempor inc idid unt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exerec tation ullamco laboris nis
                                                aliquip commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur enim ipsam.
                                            </p>
                                        </div>

                                        
                                        <div className="ed-blog__details-widget">
                                            <h5 className="ed-blog__details-widget-title">
                                                Where Does it Come From Template
                                            </h5>
                                            <ul className="ed-blog__details-list">
                                                <li>
                                                    <img src="/assets/images/icons/icon-check-blue.svg" alt="icon-check-blue" />
                                                    Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis
                                                </li>
                                                <li>
                                                    <img src="/assets/images/icons/icon-check-blue.svg" alt="icon-check-blue" />
                                                    Neque sodales ut etiam sit amet nisl purus non tellus orci ac auctor
                                                </li>
                                                <li>
                                                    <img src="/assets/images/icons/icon-check-blue.svg" alt="icon-check-blue" />
                                                    Tristique nulla aliquet enim tortor at auctor urna. Sit amet aliquam id diam maer
                                                </li>
                                                <li>
                                                    <img src="/assets/images/icons/icon-check-blue.svg" alt="icon-check-blue" />
                                                    Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis
                                                </li>
                                            </ul>
                                        </div>

                                        
                                        <div className="ed-blog__details-widget-img">
                                            <img src="/assets/images/blog/blog-details/b-details-img-2.png" alt="b-details-img-2" />
                                            <img src="/assets/images/blog/blog-details/b-details-img-3.png" alt="b-details-img-3" />
                                        </div>

                                        
                                        <div className="ed-blog__details-widget">
                                            <h5 className="ed-blog__details-widget-title">
                                                Figma Template Design
                                            </h5>
                                            <p className="ed-blog__details-text">
                                                Lorem ipsum dolor sit amet consectur adipisicing elit, sed do eiusmod tempor inc idid unt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exerec tation ullamco laboris nis
                                                aliquip commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur enim ipsam.
                                            </p>
                                        </div>

                                        
                                        <div className="ed-blog__details-comment">
                                            <h3 className="ed-blog__comment-title">2 Comment</h3>
                                            
                                            <div className="ed-blog__comment-item">
                                                <div className="ed-blog__comment-img">
                                                    <img src="/assets/images/blog/blog-details/comment-1.png" alt="comment-1" />
                                                </div>
                                                <div className="ed-blog__comment-info">
                                                    <div className="ed-blog__comment-info-head">
                                                        <h6 className="ed-blog__comment-name">John Smith</h6>
                                                        <a href="#" className="ed-blog__comment-reply">Reply</a>
                                                    </div>
                                                    <p className="ed-blog__comment-text">
                                                        Fusce condimentum enim vestibulum libero gravida, ut accumsan quam bibendum. Curabitur gravida est sit amet cursus.
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="ed-blog__comment-item reply-comment">
                                                <div className="ed-blog__comment-img">
                                                    <img src="/assets/images/blog/blog-details/comment-2.png" alt="comment-2" />
                                                </div>
                                                <div className="ed-blog__comment-info">
                                                    <div className="ed-blog__comment-info-head">
                                                        <h6 className="ed-blog__comment-name">Franklin Chen</h6>
                                                        <a href="#" className="ed-blog__comment-reply">Reply</a>
                                                    </div>
                                                    <p className="ed-blog__comment-text">
                                                        Fusce condimentum enim vestibulum libero gravida, ut accumsan quam bibendum. Curabitur gravida est sit amet cursus.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        <div className="ed-blog__details-form">
                                            <h3 className="ed-blog__details-form-title">Leave a Reply</h3>
                                            <form action="#" method="post">
                                                <div className="form-group">
                                                    <input type="text" name="your-name" placeholder="Enter your name*" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" name="your-email" placeholder="Enter your email*" required />
                                                </div>
                                                <div className="form-group">
                                                    <textarea name="message" placeholder="How can we help you? Feel free to get in touch!" required></textarea>
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        I agree to the Privacy Policy.
                                                    </label>
                                                </div>
                                                <div className="ed-blog__details-form-btn">
                                                    <button type="submit" className="ed-btn">Post a Comment<i className="fi fi-rr-arrow-small-right"></i></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-xl-4 col-md-8 col-12">
                                    <div className="ed-blog__sidebar">
                                        
                                        <div className="ed-blog__sidebar-widget">
                                            <h4 className="ed-blog__sidebar-title">Search Here</h4>
                                            <form action="#" method="post" className="ed-blog__sidebar-search">
                                                <input type="search" name="search" placeholder="Search..." required="" />
                                            </form>
                                        </div>

                                        
                                        <div className="ed-blog__sidebar-widget">
                                            <h4 className="ed-blog__sidebar-title">Categories</h4>
                                            <div className="ed-blog__sidebar-category">
                                                <ul>
                                                    <li>
                                                        <a href="#">Education <span>09</span> </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Marketing <span>54</span> </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Business <span>17</span> </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Technology <span>15</span> </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Language <span>29</span> </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        
                                        <div className="ed-blog__sidebar-widget">
                                            <h4 className="ed-blog__sidebar-title">Popular News</h4>
                                            <div className="ed-blog__latest">
                                                
                                                <div className="ed-blog__latest-item">
                                                    <div className="ed-blog__latest-img">
                                                        <img src="/assets/images/blog/blog-details/latest-1.png" alt="latest-1" />
                                                    </div>
                                                    <div className="ed-blog__latest-info">
                                                        <a href="/blog-details">How to Start a Blog Beginner Best Tooling</a>
                                                        <span> Jan 10,2022 </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="ed-blog__latest-item">
                                                    <div className="ed-blog__latest-img">
                                                        <img src="/assets/images/blog/blog-details/latest-2.png" alt="latest-2" />
                                                    </div>
                                                    <div className="ed-blog__latest-info">
                                                        <a href="/blog-details">Start Your Career for Your Best Planning Days</a>
                                                        <span> 30 April, 2024 </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="ed-blog__latest-item">
                                                    <div className="ed-blog__latest-img">
                                                        <img src="/assets/images/blog/blog-details/latest-3.png" alt="latest-3" />
                                                    </div>
                                                    <div className="ed-blog__latest-info">
                                                        <a href="/blog-details">How to Start a Blog Beginner Best Tooling</a>
                                                        <span> 30 April, 2024 </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        <div className="ed-blog__sidebar-widget">
                                            <h4 className="ed-blog__sidebar-title">Contact Us</h4>
                                            
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

                                        
                                        <div className="ed-blog__sidebar-widget">
                                            <h4 className="ed-blog__sidebar-title">Popular Tags</h4>
                                            <div className="ed-blog__tags">
                                                <ul>
                                                    <li>
                                                        <a href="#">Design</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Creative </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Solution</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Laptop</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Product</a>
                                                    </li>
                                                </ul>
                                            </div>
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
