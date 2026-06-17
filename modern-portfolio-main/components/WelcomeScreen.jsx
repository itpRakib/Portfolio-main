import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const WelcomeScreen = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  // Loading progress bar simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Increment blocks smoothly
        const diff = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + diff, 100);
      });
    }, 180);

    return () => clearInterval(timer);
  }, []);

  // Update text stages based on progress percentage
  useEffect(() => {
    if (progress >= 100) {
      setStage(4);
    } else if (progress >= 70) {
      setStage(3);
    } else if (progress >= 40) {
      setStage(2);
    } else if (progress >= 15) {
      setStage(1);
    }
  }, [progress]);

  const welcomeVariants = {
    exit: {
      y: "-100%",
      transition: {
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.div
      variants={welcomeVariants}
      exit="exit"
      className="fixed inset-0 w-screen h-screen bg-[#030303] flex flex-col items-center justify-center z-[9999] overflow-hidden select-none font-sora"
    >
      {/* 3D Ambient Glowing Orbs */}
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -80, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[280px] h-[280px] bg-accent/10 rounded-full blur-[110px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 90, -60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-accent/5 rounded-full blur-[130px] pointer-events-none"
      />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(241,48,36,0.05)_1.5px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[500px] px-8 py-10 mx-4 bg-[#09090b]/40 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col items-center text-center relative z-10"
      >
        {/* Subtle top accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* Logo/Identity Section */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-[0.25em] text-white">
            RAKIBUL <span className="text-accent">ISLAM</span>
          </h1>
          <p className="text-[10px] text-white/45 uppercase tracking-[0.35em] mt-2.5 font-mono">
            Full-Stack Software Engineer &bull; Creative Developer
          </p>
        </motion.div>

        {/* Digital Status Monitor */}
        <div className="w-full bg-black/40 border border-white/5 rounded-xl p-5 mb-8 text-left min-h-[145px] backdrop-blur-md font-mono">
          <div className="text-[11px] leading-relaxed text-white/70 space-y-2.5">
            <div className="flex items-center gap-x-2">
              <span className="text-accent font-bold">&gt;</span>
              <span className="animate-pulse text-white/90">CONNECTING TO CREATIVE PROTOCOLS...</span>
            </div>

            {stage >= 1 && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-emerald-400 flex items-center gap-x-1.5"
              >
                <span className="text-[9px] border border-emerald-500/30 px-1 rounded bg-emerald-500/5 font-semibold">OK</span>
                <span>INTERFACE SECURITY VERIFIED</span>
              </motion.div>
            )}

            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white/50 flex items-center gap-x-1.5"
              >
                <span>&gt; LOADING CREATIVE MATRICES & GRAPHICS</span>
              </motion.div>
            )}

            {stage >= 3 && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-emerald-400 flex items-center gap-x-1.5"
              >
                <span className="text-[9px] border border-emerald-500/30 px-1 rounded bg-emerald-500/5 font-semibold">OK</span>
                <span>DESIGN SYSTEM PARSED SUCCESSFULLY</span>
              </motion.div>
            )}

            {stage >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-accent font-semibold tracking-wider border-t border-accent/20 pt-2.5 mt-2.5 flex items-center gap-x-2 animate-pulse"
              >
                <span>&gt;&gt; HANDSHAKE COMPLETED. INTERFACE UNLOCKED.</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Loading Progress or Enter Button */}
        <div className="w-full min-h-[60px] flex items-center justify-center">
          {progress < 100 ? (
            <div className="w-full flex flex-col items-center">
              {/* Modern Digital Segmented Progress Bar */}
              <div className="w-full flex justify-between gap-[3px] mb-3">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2.5 flex-1 rounded-sm transition-all duration-300 ${
                      progress >= (i + 1) * 5
                        ? "bg-accent shadow-[0_0_10px_rgba(241,48,36,0.5)]"
                        : "bg-white/5 border border-white/5"
                    }`}
                  />
                ))}
              </div>
              <div className="text-[11px] text-white/50 tracking-[0.2em] font-mono uppercase">
                COMPILING MODULES: {progress}%
              </div>
            </div>
          ) : (
            /* Professional glowing entry button */
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onEnter}
              className="w-full relative group py-4 px-6 overflow-hidden rounded-xl border border-accent bg-transparent text-white font-bold text-sm tracking-[0.25em] uppercase transition-all duration-500 shadow-[0_0_15px_rgba(241,48,36,0.15)] hover:shadow-[0_0_30px_rgba(241,48,36,0.4)] flex items-center justify-center gap-x-2"
            >
              {/* Background fill animation */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent to-[#d9241b] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
              <span className="relative z-10 flex items-center gap-x-3 transition-colors duration-500 group-hover:text-black">
                EXPLORE PORTFOLIO
                <svg
                  className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Decorative Cyber Corner Brackets */}
      <div className="absolute top-8 left-8 border-l-2 border-t-2 border-white/10 w-6 h-6 transition-all duration-300 hover:border-accent" />
      <div className="absolute top-8 right-8 border-r-2 border-t-2 border-white/10 w-6 h-6 transition-all duration-300 hover:border-accent" />
      <div className="absolute bottom-8 left-8 border-l-2 border-b-2 border-white/10 w-6 h-6 transition-all duration-300 hover:border-accent" />
      <div className="absolute bottom-8 right-8 border-r-2 border-b-2 border-white/10 w-6 h-6 transition-all duration-300 hover:border-accent" />
    </motion.div>
  );
};

export default WelcomeScreen;
