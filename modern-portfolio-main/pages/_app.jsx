import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Layout from "../components/Layout";
import Transition from "../components/Transition";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer;
    const handleStart = (url) => {
      // Avoid flashing the loader for shallow or quick navigations:
      // only show if navigation takes more than 120ms
      const cleanUrl = url.split("?")[0];
      const currentUrl = router.pathname;
      if (cleanUrl !== currentUrl) {
        timer = setTimeout(() => {
          setIsLoading(true);
        }, 120);
      }
    };
    const handleComplete = () => {
      clearTimeout(timer);
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      clearTimeout(timer);
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <Layout>
      {/* High-visibility attractive loader during route shifts or network delay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0d13]/70 backdrop-blur-md transition-opacity duration-300">
          <div className="loader" />
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div key={router.route} className="h-full">
          <Transition />
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
