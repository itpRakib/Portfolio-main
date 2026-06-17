import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring settings for the outer following ring
  const springConfig = { damping: 35, stiffness: 350, mass: 0.35 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is a mobile or touch screen to keep native cursor
    const checkDevice = () => {
      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.innerWidth < 1024;
      const mobile = hasCoarsePointer || isSmallScreen;
      setIsMobile(mobile);
      
      if (!mobile) {
        document.body.style.cursor = "none";
      } else {
        document.body.style.cursor = "auto";
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Track when hovering interactive components
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" ||
        target.closest("a") || 
        target.closest("button") || 
        target.closest(".swiper-pagination-bullet") ||
        target.closest(".light-button") ||
        target.closest(".gmail-button") ||
        target.closest(".continue-application") ||
        target.closest("[role='button']") ||
        window.getComputedStyle(target).cursor === "pointer";
        
      if (isInteractive) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, cursorX, cursorY]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer follow ring (sleek glassmorphic ring that scales up on hover) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/60 pointer-events-none z-[99999] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicked ? 0.75 : hovered ? 1.6 : 1,
          backgroundColor: hovered ? "rgba(241, 48, 36, 0.12)" : "rgba(241, 48, 36, 0)",
          borderColor: hovered ? "rgba(241, 48, 36, 1)" : "rgba(241, 48, 36, 0.6)",
          boxShadow: hovered ? "0 0 15px rgba(241, 48, 36, 0.5)" : "none",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />
      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[99999] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicked ? 1.3 : hovered ? 0.3 : 1,
          opacity: hovered ? 0.7 : 1,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
