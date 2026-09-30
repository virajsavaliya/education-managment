'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export default function SliderInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const swipers = [];

    // Safe Swiper initializer to prevent crashes on mock/legacy templates
    const initSwiperSafe = (selector, config) => {
      const el = document.querySelector(selector);
      if (el && el.classList.contains('swiper') && el.querySelector('.swiper-wrapper')) {
        try {
          return new Swiper(selector, config);
        } catch (e) {
          console.error(`Swiper init failed on ${selector}:`, e);
        }
      }
      return null;
    };

    // 1. Category Slider
    const s1 = initSwiperSafe('.ed-category__slider', {
      modules: [Autoplay, Pagination, Navigation],
      slidesPerView: 3,
      spaceBetween: 30,
      autoplay: { delay: 5000 },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev',
      },
      breakpoints: {
        576: { slidesPerView: 4 },
        992: { slidesPerView: 5 },
        1200: { slidesPerView: 6 },
        1600: { slidesPerView: 7 },
        1800: { slidesPerView: 8 },
      },
    });
    if (s1) swipers.push(s1);

    // 2. Partner Slider
    const s2 = initSwiperSafe('.ed-partner__slider', {
      modules: [Autoplay],
      slidesPerView: 6,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      spaceBetween: 24,
      breakpoints: {
        300: { slidesPerView: 2 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 4 },
        1200: { slidesPerView: 6 },
      },
    });
    if (s2) swipers.push(s2);

    // 3. Testimonial Slider
    const s3 = initSwiperSafe('.ed-testimonial__slider', {
      modules: [Autoplay, Navigation],
      slidesPerView: 1,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    if (s3) swipers.push(s3);

    // 4. Partner Slider Two
    const s4 = initSwiperSafe('.ed-partner__slider-2', {
      modules: [Autoplay],
      slidesPerView: 1,
      loop: true,
      speed: 5000,
      autoplay: { delay: 1, disableOnInteraction: false },
      breakpoints: {
        360: { slidesPerView: 2 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
        1200: { slidesPerView: 3 },
      },
    });
    if (s4) swipers.push(s4);

    // 5. Partner Slider Three (Reverse)
    const s5 = initSwiperSafe('.ed-partner__slider-2-reverse', {
      modules: [Autoplay],
      slidesPerView: 1,
      loop: true,
      speed: 5000,
      autoplay: { delay: 1, disableOnInteraction: false, reverseDirection: true },
      breakpoints: {
        360: { slidesPerView: 2 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
        1200: { slidesPerView: 3 },
      },
    });
    if (s5) swipers.push(s5);

    // 6. Testimonial Slider Two
    const s6 = initSwiperSafe('.ed-testimonial__slider-2', {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: { delay: 5000 },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    });
    if (s6) swipers.push(s6);

    // 7. Testimonial Slider Three
    const s7 = initSwiperSafe('.ed-testimonial__slider-3', {
      modules: [Navigation],
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        360: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      },
    });
    if (s7) swipers.push(s7);

    // 8. Hero Slider
    const s8 = initSwiperSafe('.ed-hero__slider', {
      modules: [Autoplay, Navigation],
      slidesPerView: 1,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      navigation: {
        nextEl: '.fi-rs-arrow-right',
        prevEl: '.fi-rs-arrow-left',
      },
    });
    if (s8) swipers.push(s8);

    return () => {
      swipers.forEach((s) => {
        try {
          s.destroy(true, true);
        } catch (e) {}
      });
    };
  }, [pathname]);

  return null;
}
