'use client';

import Link from 'next/link';
import React from 'react';

export default function Breadcrumbs({ title, menu = [] }) {
  return (
    <div className="section-bg">
      <section className="ed-breadcrumbs background-image" style={{ backgroundImage: "url('/assets/images/breadcrumbs-bg.png')" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="ed-breadcrumbs__content">
                <h3 className="ed-breadcrumbs__title">{title}</h3>
                <ul className="ed-breadcrumbs__menu">
                  <li className="active"><Link href="/">Home</Link></li>
                  {menu.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <li>/</li>
                      {item.link ? (
                        <li className="active"><Link href={item.link}>{item.label}</Link></li>
                      ) : (
                        <li>{item.label.toUpperCase()}</li>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
