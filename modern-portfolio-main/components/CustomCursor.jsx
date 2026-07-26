import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const TRAIL_LENGTH = 16;
const TRAIL_SPAWN_DISTANCE = 8;

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring follows with a satisfying spring delay
  const springConfig = { damping: 32, stiffness: 400, mass: 0.35 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  // Crosshair ring follows even more lazily for layered depth
  const crosshairConfig = { damping: 26, stiffness: 300, mass: 0.45 };
  const crossX = useSpring(cursorX, crosshairConfig);
  const crossY = useSpring(cursorY, crosshairConfig);

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [trail, setTrail] = useState([]);

  const lastTrailPos = useRef({ x: -100, y: -100 });
  const trailIdRef = useRef(0);
  const rafRef = useRef(null);
  const pendingPos = useRef(null);

  // Throttled trail spawning via requestAnimationFrame
  const processTrail = useCallback(() => {
    rafRef.current = null;
    const pos = pendingPos.current;
    if (!pos) return;

    const dx = pos.x - lastTrailPos.current.x;
    const dy = pos.y - lastTrailPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > TRAIL_SPAWN_DISTANCE) {
      lastTrailPos.current = { x: pos.x, y: pos.y };
      const id = trailIdRef.current++;
      setTrail((prev) => [...prev.slice(-(TRAIL_LENGTH - 1)), { id, x: pos.x, y: pos.y }]);
    }
  }, []);

  useEffect(() => {
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

      // Queue trail particle spawn
      pendingPos.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(processTrail);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

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

      setHovered(!!isInteractive);
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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, cursorX, cursorY, processTrail]);

  // Auto-expire trail particles
  useEffect(() => {
    if (trail.length === 0) return;
    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 350);
    return () => clearTimeout(timer);
  }, [trail]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Layer 1: Fading particle trail */}
      <AnimatePresence>
        {trail.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.7, scale: 1.2 }}
            animate={{ opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 left-0 pointer-events-none z-[99996]"
            style={{
              x: p.x,
              y: p.y,
              translateX: "-50%",
              translateY: "-50%",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(var(--accent-color-rgb), ${0.5 - i * 0.03}) 0%, transparent 75%)`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Layer 2: Rotating HUD crosshair ring (outermost, slowest follow) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99997]"
        style={{
          x: crossX,
          y: crossY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicked ? 0.6 : hovered ? 2 : 1,
          opacity: hovered ? 1 : 0.5,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 250 }}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          className="cursor-crosshair-svg"
          style={{ display: "block" }}
        >
          {/* Rotating dashed orbit ring */}
          <circle
            cx="22"
            cy="22"
            r="18"
            stroke="rgba(var(--accent-color-rgb), 0.35)"
            strokeWidth="1"
            strokeDasharray="4 8"
            fill="none"
          />
          {/* Cardinal tick marks */}
          <line x1="22" y1="2" x2="22" y2="7" stroke="rgba(var(--accent-color-rgb), 0.6)" strokeWidth="1" />
          <line x1="22" y1="37" x2="22" y2="42" stroke="rgba(var(--accent-color-rgb), 0.6)" strokeWidth="1" />
          <line x1="2" y1="22" x2="7" y2="22" stroke="rgba(var(--accent-color-rgb), 0.6)" strokeWidth="1" />
          <line x1="37" y1="22" x2="42" y2="22" stroke="rgba(var(--accent-color-rgb), 0.6)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Layer 3: Outer follow ring (sleek glassmorphic ring) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998] mix-blend-screen"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 36,
          height: 36,
          borderWidth: hovered ? 2 : 1.5,
          borderColor: hovered ? "rgba(var(--accent-color-rgb), 1)" : "rgba(var(--accent-color-rgb), 0.5)",
          backgroundColor: hovered ? "rgba(var(--accent-color-rgb), 0.1)" : "rgba(var(--accent-color-rgb), 0)",
          boxShadow: hovered
            ? "0 0 20px rgba(var(--accent-color-rgb), 0.5), inset 0 0 10px rgba(var(--accent-color-rgb), 0.15)"
            : "0 0 6px rgba(var(--accent-color-rgb), 0.15)",
          transition: "border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, border-width 0.2s ease",
        }}
        animate={{
          scale: clicked ? 0.7 : hovered ? 1.8 : 1,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 300 }}
      />

      {/* Layer 4: Inner glowing core dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: clicked
            ? "rgba(var(--accent-color-rgb), 1)"
            : hovered
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(var(--accent-color-rgb), 0.95)",
          boxShadow: clicked
            ? "0 0 24px rgba(var(--accent-color-rgb), 0.8), 0 0 48px rgba(var(--accent-color-rgb), 0.3)"
            : hovered
            ? "0 0 12px rgba(255, 255, 255, 0.6), 0 0 4px rgba(var(--accent-color-rgb), 0.5)"
            : "0 0 10px rgba(var(--accent-color-rgb), 0.6), 0 0 3px rgba(var(--accent-color-rgb), 0.9)",
          transition: "background-color 0.15s ease, box-shadow 0.15s ease",
        }}
        animate={{
          width: clicked ? 12 : hovered ? 4 : 6,
          height: clicked ? 12 : hovered ? 4 : 6,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
