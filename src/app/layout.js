import "./globals.css";
import { UIProvider } from "@/context/UIContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SidebarCart from "@/components/SidebarCart";
import SidebarContact from "@/components/SidebarContact";
import MobileMenuOffcanvas from "@/components/MobileMenuOffcanvas";
import BackToTop from "@/components/BackToTop";
import SliderInitializer from "@/components/SliderInitializer";

export const metadata = {
  title: "Eduna - Online Education Courses",
  description: "Eduna - Online Education Courses Template converted to Next.js App Router.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zxx" className="no-js">
      <head>
        {/* Vendor Styles */}
        <link rel="stylesheet" href="/assets/plugins/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/plugins/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/plugins/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/assets/plugins/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/plugins/css/maginific-popup.min.css" />
        <link rel="stylesheet" href="/assets/plugins/css/nice-select.min.css" />
        <link rel="stylesheet" href="/assets/plugins/css/icofont.css" />
        <link rel="stylesheet" href="/assets/plugins/css/uicons.css" />
        {/* Core theme styles */}
        <link rel="stylesheet" href="/style.css" />
        <link rel="shortcut icon" href="/assets/images/favicon.svg" />
      </head>
      <body className="element-wrapper">
        <AuthProvider>
          <CartProvider>
            <UIProvider>
            {/* Global Overlay Components */}
            <Preloader />
            <CustomCursor />
            
            {/* Layout Header */}
            <Header />
            
            {/* GSAP Scroll Container wrapper compatibility */}
            <div id="smooth-wrapper">
              <div id="smooth-content">
                <main>{children}</main>
                {/* Layout Footer */}
                <Footer />
              </div>
            </div>

            {/* Sidebar Drawers & Auth Popups */}
            <SidebarCart />
            <SidebarContact />
            <MobileMenuOffcanvas />
            <BackToTop />
            <SliderInitializer />
          </UIProvider>
        </CartProvider>
      </AuthProvider>
    </body>
    </html>
  );
}
