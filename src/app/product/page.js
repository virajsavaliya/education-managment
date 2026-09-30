'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Page() {
  return (
    <>
      
                    <div className="section-bg">
                        <Breadcrumbs title="Our Products" menu={[{ label: 'Our Products' }]} />
                    </div>

                    
                    <section className="ed-product section-gap">
                        <div className="container ed-container">
                            <div className="row">
                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-product__card wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                                        <div className="ed-product__cover">
                                            <div className="ed-product__img">
                                                <img src="/assets/images/product/1.png" alt="product-img" />
                                            </div>
                                            <button type="button" className="ed-btn">Add to Cart<i className="fi fi-rr-shopping-cart"></i></button>
                                        </div>
                                        <div className="ed-product__info">
                                            <a href="/product-details" className="ed-product__title">
                                                Secret Demo Files
                                            </a>
                                            <ul className="ed-product__rattings">
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
                                                    <span>(09 Reviews)</span>
                                                </li>
                                            </ul>
                                            <div className="ed-product__info-bottom">
                                                <div className="ed-product__price">
                                                    <span>$178.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-product__card wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                                        <div className="ed-product__cover">
                                            <div className="ed-product__img">
                                                <img src="/assets/images/product/2.png" alt="product-img" />
                                            </div>
                                            <button type="button" className="ed-btn">Add to Cart<i className="fi fi-rr-shopping-cart"></i></button>
                                        </div>
                                        <div className="ed-product__info">
                                            <a href="/product-details" className="ed-product__title">
                                                Demo of Dreams
                                            </a>
                                            <ul className="ed-product__rattings">
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
                                                    <span>(02 Reviews)</span>
                                                </li>
                                            </ul>
                                            <div className="ed-product__info-bottom">
                                                <div className="ed-product__price">
                                                    <span>$253.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-product__card wow fadeInUp" data-wow-delay=".7s" data-wow-duration="1s">
                                        <div className="ed-product__cover">
                                            <div className="ed-product__img">
                                                <img src="/assets/images/product/3.png" alt="product-img" />
                                            </div>
                                            <button type="button" className="ed-btn">Add to Cart<i className="fi fi-rr-shopping-cart"></i></button>
                                        </div>
                                        <div className="ed-product__info">
                                            <a href="/product-details" className="ed-product__title">
                                                Demo in Darkness
                                            </a>
                                            <ul className="ed-product__rattings">
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
                                                    <span>(23 Reviews)</span>
                                                </li>
                                            </ul>
                                            <div className="ed-product__info-bottom">
                                                <div className="ed-product__price">
                                                    <span>$754.00</span>
                                                    <del>$854.00</del>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-product__card wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                                        <div className="ed-product__cover">
                                            <div className="ed-product__img">
                                                <img src="/assets/images/product/4.png" alt="product-img" />
                                            </div>
                                            <button type="button" className="ed-btn">Add to Cart<i className="fi fi-rr-shopping-cart"></i></button>
                                        </div>
                                        <div className="ed-product__info">
                                            <a href="/product-details" className="ed-product__title">
                                                Demo of Deception
                                            </a>
                                            <ul className="ed-product__rattings">
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
                                                    <span>(48 Reviews)</span>
                                                </li>
                                            </ul>
                                            <div className="ed-product__info-bottom">
                                                <div className="ed-product__price">
                                                    <span>$642.00</span>
                                                    <del>$854.00</del>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-product__card wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                                        <div className="ed-product__cover">
                                            <div className="ed-product__img">
                                                <img src="/assets/images/product/5.png" alt="product-img" />
                                            </div>
                                            <button type="button" className="ed-btn">Add to Cart<i className="fi fi-rr-shopping-cart"></i></button>
                                        </div>
                                        <div className="ed-product__info">
                                            <a href="/product-details" className="ed-product__title">
                                                Digital Demo Chronicles
                                            </a>
                                            <ul className="ed-product__rattings">
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
                                                    <span>(17 Reviews)</span>
                                                </li>
                                            </ul>
                                            <div className="ed-product__info-bottom">
                                                <div className="ed-product__price">
                                                    <span>$404.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-product__card wow fadeInUp" data-wow-delay=".7s" data-wow-duration="1s">
                                        <div className="ed-product__cover">
                                            <div className="ed-product__img">
                                                <img src="/assets/images/product/6.png" alt="product-img" />
                                            </div>
                                            <button type="button" className="ed-btn">Add to Cart<i className="fi fi-rr-shopping-cart"></i></button>
                                        </div>
                                        <div className="ed-product__info">
                                            <a href="/product-details" className="ed-product__title">
                                                Mystic Demo Magic
                                            </a>
                                            <ul className="ed-product__rattings">
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
                                                    <span>(06 Reviews)</span>
                                                </li>
                                            </ul>
                                            <div className="ed-product__info-bottom">
                                                <div className="ed-product__price">
                                                    <span>$842.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-product__card wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                                        <div className="ed-product__cover">
                                            <div className="ed-product__img">
                                                <img src="/assets/images/product/7.png" alt="product-img" />
                                            </div>
                                            <button type="button" className="ed-btn">Add to Cart<i className="fi fi-rr-shopping-cart"></i></button>
                                        </div>
                                        <div className="ed-product__info">
                                            <a href="/product-details" className="ed-product__title">
                                                Demo of Truth
                                            </a>
                                            <ul className="ed-product__rattings">
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
                                                    <span>(09 Reviews)</span>
                                                </li>
                                            </ul>
                                            <div className="ed-product__info-bottom">
                                                <div className="ed-product__price">
                                                    <span>$643.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-product__card wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                                        <div className="ed-product__cover">
                                            <div className="ed-product__img">
                                                <img src="/assets/images/product/8.png" alt="product-img" />
                                            </div>
                                            <button type="button" className="ed-btn">Add to Cart<i className="fi fi-rr-shopping-cart"></i></button>
                                        </div>
                                        <div className="ed-product__info">
                                            <a href="/product-details" className="ed-product__title">
                                                Final Demo Night
                                            </a>
                                            <ul className="ed-product__rattings">
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
                                                    <span>(04 Reviews)</span>
                                                </li>
                                            </ul>
                                            <div className="ed-product__info-bottom">
                                                <div className="ed-product__price">
                                                    <span>$739.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ed-product__card wow fadeInUp" data-wow-delay=".7s" data-wow-duration="1s">
                                        <div className="ed-product__cover">
                                            <div className="ed-product__img">
                                                <img src="/assets/images/product/9.png" alt="product-img" />
                                            </div>
                                            <button type="button" className="ed-btn">Add to Cart<i className="fi fi-rr-shopping-cart"></i></button>
                                        </div>
                                        <div className="ed-product__info">
                                            <a href="/product-details" className="ed-product__title">
                                                Haunted Demo Quest
                                            </a>
                                            <ul className="ed-product__rattings">
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
                                                    <span>(63 Reviews)</span>
                                                </li>
                                            </ul>
                                            <div className="ed-product__info-bottom">
                                                <div className="ed-product__price">
                                                    <span>$754.00</span>
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
