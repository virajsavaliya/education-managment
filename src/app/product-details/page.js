'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Page() {
  return (
    <>
      
                    <div className="section-bg">
                        <Breadcrumbs title="Product Details" menu={[{ label: 'Product Details' }]} />
                    </div>

                    
                    <section className="ed-product__details section-gap">
                        <div className="container ed-container">
                            <div className="row align-items-center g-0">
                                <div className="col-lg-6 col-12">
                                    
                                    <div className="ed-shop-thumb">
                                        <img src="/assets/images/product/product-details/product-1.png" alt="product-details-img" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                    
                                    <div className="product__details-inner">
                                        <div className="ed-course__rattings">
                                            <ul>
                                                <li>
                                                    <i className="icofont-star"></i>
                                                </li>
                                                <li>
                                                    <i className="icofont-star"></i>
                                                </li>
                                                <li>
                                                    <i className="icofont-star"></i>
                                                </li>
                                                <li>
                                                    <i className="icofont-star"></i>
                                                </li>
                                                <li>
                                                    <i className="icofont-star off-color"></i>
                                                </li>
                                                <li>
                                                    <span>(5 customer reviews)</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="ed-product-short">
                                            <h3>Digital Demo Chronicles</h3>
                                            <p>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt. ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam. et justo
                                                duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                                tempor invidunt ut labore.
                                            </p>
                                        </div>

                                        
                                        <div className="ed-product__details-meta">
                                            
                                            <div className="ed-product__d-meta-single">
                                                <p>SKU:</p>
                                                <span>RIO493</span>
                                            </div>
                                            
                                            <div className="ed-product__d-meta-single">
                                                <p>Categories:</p>
                                                <span><a href="#">Book,</a> <a href="#">Education</a> </span>
                                            </div>
                                            
                                            <div className="ed-product__d-meta-single">
                                                <p>Tags:</p>
                                                <span><a href="#">Book</a> </span>
                                            </div>
                                        </div>

                                        
                                        <div className="ed-shop-single__purchase">
                                            <div className="ed-cart__quantity-selector">
                                                <button className="ed-cart__quantity-decrease">
                                                    <i className="fi-rr-minus"></i>
                                                </button>
                                                <input type="number" className="ed-cart__quantity-input" value="1" min="1" />
                                                <button className="ed-cart__quantity-increase">
                                                    <i className="fi-rr-plus"></i>
                                                </button>
                                            </div>
                                            <button type="button" className="ed-btn">Add to Cart<i className="fi fi-rr-shopping-cart"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="ed-product__details-tab">
                                <div className="row">
                                    <div className="col-12">
                                        <ul className="nav nav-tabs mt-5 ed-product-tab-list" id="productTabs" role="tablist">
                                            <li className="nav-item">
                                                <button className="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" role="tab">
                                                    Description
                                                </button>
                                            </li>
                                            <li className="nav-item">
                                                <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" role="tab">Reviews<span>(2)</span></button>
                                            </li>
                                        </ul>
                                        <div className="tab-content mt-4" id="productTabsContent">
                                            <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                                <div className="ed-product-tab-inside">
                                                    <div className="ed-product-tab-inside__content">
                                                        <h2 className="ed-product-single__tab-title">
                                                            Book Story
                                                        </h2>
                                                        <p className="ed-product-single__tab-text">
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                                                            took a galley of type and scrambled it to make a type specimen book.
                                                        </p>
                                                        <br />
                                                        <p className="ed-product-single__tab-text">
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                                                            took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                                <div className="ed-product-tab-insides">
                                                    
                                                    <div className="ed-product__details-comment">
                                                        
                                                        <div className="ed-product__comment-item">
                                                            <div className="ed-product__comment-img">
                                                                <img src="/assets/images/blog/blog-details/comment-1.png" alt="comment-img" />
                                                            </div>
                                                            <div className="ed-product__comment-info">
                                                                <div className="ed-course__rattings">
                                                                    <ul>
                                                                        <li>
                                                                            <i className="icofont-star"></i>
                                                                        </li>
                                                                        <li>
                                                                            <i className="icofont-star"></i>
                                                                        </li>
                                                                        <li>
                                                                            <i className="icofont-star"></i>
                                                                        </li>
                                                                        <li>
                                                                            <i className="icofont-star"></i>
                                                                        </li>
                                                                        <li>
                                                                            <i className="icofont-star off-color"></i>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="ed-product__comment-info-head">
                                                                    <h6 className="ed-product__comment-name">
                                                                        John Smith
                                                                    </h6>
                                                                    <p className="ed-product__comment-date">
                                                                        12 October, 2024
                                                                    </p>
                                                                </div>
                                                                <p className="ed-product__comment-text">
                                                                    Consectur adipisicing elit, sed do eiusmod tempor inc idid unt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exerec tation ullamco laboris nis aliquip
                                                                    commodo consequat duis aute irure dolor in reprehenderit.
                                                                </p>
                                                            </div>
                                                        </div>

                                                        
                                                        <div className="ed-product__comment-item">
                                                            <div className="ed-product__comment-img">
                                                                <img src="/assets/images/blog/blog-details/comment-2.png" alt="comment-img" />
                                                            </div>
                                                            <div className="ed-product__comment-info">
                                                                <div className="ed-course__rattings">
                                                                    <ul>
                                                                        <li>
                                                                            <i className="icofont-star"></i>
                                                                        </li>
                                                                        <li>
                                                                            <i className="icofont-star"></i>
                                                                        </li>
                                                                        <li>
                                                                            <i className="icofont-star"></i>
                                                                        </li>
                                                                        <li>
                                                                            <i className="icofont-star"></i>
                                                                        </li>
                                                                        <li>
                                                                            <i className="icofont-star off-color"></i>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="ed-product__comment-info-head">
                                                                    <h6 className="ed-product__comment-name">
                                                                        Franklin Chen
                                                                    </h6>
                                                                    <p className="ed-product__comment-date">
                                                                        12 October, 2024
                                                                    </p>
                                                                </div>
                                                                <p className="ed-product__comment-text">
                                                                    Consectur adipisicing elit, sed do eiusmod tempor inc idid unt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exerec tation ullamco laboris nis aliquip
                                                                    commodo consequat duis aute irure dolor in reprehenderit.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    
                                                    <div className="ed-product__details-form">
                                                        <h3 className="ed-product-single__tab-title">
                                                            Add Your Review
                                                        </h3>
                                                        <div className="ed-poduct__your-rattings">
                                                            <p>Your Rating:</p>
                                                            <ul>
                                                                <li>
                                                                    <i className="icofont-star"></i>
                                                                </li>
                                                                <li>
                                                                    <i className="icofont-star"></i>
                                                                </li>
                                                                <li>
                                                                    <i className="icofont-star"></i>
                                                                </li>
                                                                <li>
                                                                    <i className="icofont-star"></i>
                                                                </li>
                                                                <li>
                                                                    <i className="icofont-star"></i>
                                                                </li>
                                                            </ul>
                                                        </div>

                                                        <form action="#" method="post" className="ed-contact__form-main mg-top-40">
                                                            <div className="form-group">
                                                                <input type="text" name="your-name" placeholder="Your Name*" required="" />
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="email" name="your-email" placeholder="Your E-mail*" required="" />
                                                            </div>
                                                            <div className="form-group">
                                                                <textarea name="message" placeholder="Write your Message here*" required=""></textarea>
                                                            </div>

                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                                    I agree to the Privacy Policy.
                                                                </label>
                                                            </div>

                                                            <div className="ed-contact__form-btn">
                                                                <button type="submit" className="ed-btn">Submit Your Review<i className="fi fi-rr-arrow-small-right"></i></button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
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
