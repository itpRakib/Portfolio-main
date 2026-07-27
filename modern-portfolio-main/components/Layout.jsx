import { Sora } from "next/font/google";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import CustomCursor from "./CustomCursor";
import ThemeSwitcher from "./ThemeSwitcher";
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
  const isNavigating = useRef(false);

  // Prefetch all navigation routes on mount to ensure smooth, zero-latency route transitions
  useEffect(() => {
    navData.forEach((item) => {
      router.prefetch(item.path);
    });
  }, [router]);

  useEffect(() => {
    const handleStart = () => {
      isNavigating.current = true;
    };
    const handleComplete = () => {
      isNavigating.current = false;
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    const handleWheel = (e) => {
      if (isNavigating.current) return; // ignore wheel spin if route change is already in progress

      const now = Date.now();
      if (now - lastScrollTime.current < 600) return; // 600ms cooldown matches snappier transition timings

      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // ignore horizontal scrolling
      if (Math.abs(e.deltaY) < 30) return; // ignore minor scroll increments & decaying inertia

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
            if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
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

      if (e.deltaY > 0) {
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

    const handleTouchStart = (e) => {
      window.touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isNavigating.current) return; // ignore touch swipe if route change is already in progress

      if (typeof window.touchStartY === "undefined") return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = window.touchStartY - touchEndY; // positive for swipe up (scroll down)

      if (Math.abs(diffY) < 50) return; // minimum swipe distance

      const now = Date.now();
      if (now - lastScrollTime.current < 600) return; // 600ms cooldown matches snappier transition timings

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
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [router]);

  return (
    <main
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      {/* Custom interactive cursor follow */}
      <CustomCursor />

      {/* Dynamic theme color switcher */}
      <ThemeSwitcher />

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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
