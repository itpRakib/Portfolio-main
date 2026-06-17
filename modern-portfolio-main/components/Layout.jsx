import { Sora } from "next/font/google";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import WelcomeScreen from "./WelcomeScreen";
import CustomCursor from "./CustomCursor";
import { navData } from "./Nav";

import Header from "../components/Header";
import Nav from "../components/Nav";
import TopLeftImg from "../components/TopLeftImg";

// setup font
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const Layout = ({ children }) => {
  const router = useRouter();
  const lastScrollTime = useRef(0);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Only show on first browser session load
    const isVisited = sessionStorage.getItem("welcome_visited");
    if (!isVisited) {
      setShowWelcome(true);
    }
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem("welcome_visited", "true");
    setShowWelcome(false);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      // Ignore scroll inputs during welcome overlay
      if (showWelcome) return;

      // Cooldown to prevent rapid scroll page-skipping
      const now = Date.now();
      if (now - lastScrollTime.current < 1200) return; // 1.2s cooldown matches page transition

      // Ignore horizontal scrolling
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // Ignore microscopic trackpad/scroll vibrations
      if (Math.abs(e.deltaY) < 5) return;

      // Check if the scroll target or its parents are scrollable and have room to scroll
      let target = e.target;
      let isInsideScrollable = false;

      while (target && target !== document.body && target !== document.documentElement) {
        if (target instanceof Element) {
          const style = window.getComputedStyle(target);
          const overflowY = style.overflowY;
          const isScrollable = overflowY === "auto" || overflowY === "scroll";
          if (isScrollable) {
            const canScrollDown = target.scrollHeight - target.scrollTop > target.clientHeight + 2;
            const canScrollUp = target.scrollTop > 2;
            if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
              isInsideScrollable = true;
              break;
            }
          }
        }
        target = target.parentNode;
      }

      if (isInsideScrollable) return;

      // Find current page index in navData
      const currentIndex = navData.findIndex((item) => item.path === router.pathname);
      if (currentIndex === -1) return;

      if (e.deltaY > 0) {
        // Scroll Down -> Next page
        if (currentIndex < navData.length - 1) {
          lastScrollTime.current = now;
          router.push(navData[currentIndex + 1].path);
        }
      } else {
        // Scroll Up -> Prev page
        if (currentIndex > 0) {
          lastScrollTime.current = now;
          router.push(navData[currentIndex - 1].path);
        }
      }
    };

    const handleTouchStart = (e) => {
      window.touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      // Ignore swipe inputs during welcome overlay
      if (showWelcome) return;

      if (typeof window.touchStartY === "undefined") return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = window.touchStartY - touchEndY; // positive for swipe up (scroll down)

      if (Math.abs(diffY) < 50) return; // minimum swipe distance

      const now = Date.now();
      if (now - lastScrollTime.current < 1200) return;

      // Check if target is inside a scrollable element
      let target = e.target;
      let isInsideScrollable = false;

      while (target && target !== document.body && target !== document.documentElement) {
        if (target instanceof Element) {
          const style = window.getComputedStyle(target);
          const overflowY = style.overflowY;
          const isScrollable = overflowY === "auto" || overflowY === "scroll";
          if (isScrollable) {
            const canScrollDown = target.scrollHeight - target.scrollTop > target.clientHeight + 2;
            const canScrollUp = target.scrollTop > 2;
            if ((diffY > 0 && canScrollDown) || (diffY < 0 && canScrollUp)) {
              isInsideScrollable = true;
              break;
            }
          }
        }
        target = target.parentNode;
      }

      if (isInsideScrollable) return;

      const currentIndex = navData.findIndex((item) => item.path === router.pathname);
      if (currentIndex === -1) return;

      if (diffY > 0) {
        if (currentIndex < navData.length - 1) {
          lastScrollTime.current = now;
          router.push(navData[currentIndex + 1].path);
        }
      } else {
        if (currentIndex > 0) {
          lastScrollTime.current = now;
          router.push(navData[currentIndex - 1].path);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [router, showWelcome]);

  return (
    <main
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      {/* Custom interactive cursor follow */}
      <CustomCursor />

      {/* Welcome Screen overlay */}
      <AnimatePresence>
        {showWelcome && <WelcomeScreen onEnter={handleEnter} />}
      </AnimatePresence>

      {/* metadata */}
      <Head>
        <title>Rakibul Islam | Portfolio</title>
        <meta
          name="description"
          content="Rakibul Islam is a Full-stack web developer."
        />
        <meta
          name="keywords"
          content="react, next, nextjs, html, css, javascript, js, modern-ui, modern-ux, portfolio, framer-motion, 3d-website, particle-effect"
        />
        <meta name="author" content="Rakibul Islam" />
        <meta name="theme-color" content="#f13024" />
      </Head>

      <TopLeftImg />
      <Nav />
      <Header />

      {/* main content */}
      {children}
    </main>
  );
};

export default Layout;
