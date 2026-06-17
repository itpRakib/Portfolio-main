import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const WelcomeScreen = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  // Loading progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
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

  // Auto enter after loading completes
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onEnter();
      }, 1000); // 1.0s timeout matches exit animations
      return () => clearTimeout(timer);
    }
  }, [progress, onEnter]);

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
          x: [0, 50, -30, 0],
          y: [0, -70, 30, 0],
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
          x: [0, -60, 40, 0],
          y: [0, 80, -50, 0],
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
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* Logo/Identity Section (System Themed) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-[0.25em] text-white">
            PORTFOLIO <span className="text-accent">CORE</span>
          </h1>
          <p className="text-[10px] text-white/45 uppercase tracking-[0.35em] mt-2.5 font-mono">
            SECURE ACCESS PORTAL &bull; V3.2.0
          </p>
        </motion.div>

        {/* Uiverse.io Animated SVG Frame - Centerpiece */}
        <div className="my-6 flex justify-center items-center h-[260px] relative">
          <motion.div
            animate={progress >= 100 ? {
              scale: [1, 1.1, 0.9, 0],
              rotate: [0, 15, -15, 180],
              opacity: [1, 1, 0.4, 0],
            } : {}}
            transition={{
              duration: 1,
              ease: "easeInOut"
            }}
            className="svg-frame scale-90 md:scale-95 transition-transform duration-300"
          >
            {/* SVG 1 */}
            <svg style={{ "--i": 0, "--j": 0 }}>
              <g id="out1">
                <path fill="#f13024" opacity="0.15" d="M72 172C72 116.772 116.772 72 172 72C227.228 72 272 116.772 272 172C272 227.228 227.228 272 172 272C116.772 272 72 227.228 72 172ZM197.322 172C197.322 158.015 185.985 146.678 172 146.678C158.015 146.678 146.678 158.015 146.678 172C146.678 185.985 158.015 197.322 172 197.322C185.985 197.322 197.322 185.985 197.322 172Z"></path>
                <path mask="url(#path-1-inside-1_111_3212)" strokeMiterlimit="16" strokeWidth="2" stroke="#f13024" d="M72 172C72 116.772 116.772 72 172 72C227.228 72 272 116.772 272 172C272 227.228 227.228 272 172 272C116.772 272 72 227.228 72 172ZM197.322 172C197.322 158.015 185.985 146.678 172 146.678C158.015 146.678 146.678 158.015 146.678 172C146.678 185.985 158.015 197.322 172 197.322C185.985 197.322 197.322 185.985 197.322 172Z"></path>
              </g>
            </svg>

            {/* SVG 2 */}
            <svg style={{ "--i": 1, "--j": 1 }}>
              <g id="out2">
                <mask fill="white" id="path-2-inside-2_111_3212">
                  <path d="M102.892 127.966C93.3733 142.905 88.9517 160.527 90.2897 178.19L94.3752 177.88C93.1041 161.1 97.3046 144.36 106.347 130.168L102.892 127.966Z"></path>
                  <path d="M93.3401 194.968C98.3049 211.971 108.646 226.908 122.814 237.541L125.273 234.264C111.814 224.163 101.99 209.973 97.2731 193.819L93.3401 194.968Z"></path>
                  <path d="M152.707 92.3592C140.33 95.3575 128.822 101.199 119.097 109.421L121.742 112.55C130.981 104.739 141.914 99.1897 153.672 96.3413L152.707 92.3592Z"></path>
                  <path d="M253.294 161.699C255.099 175.937 253.132 190.4 247.59 203.639L243.811 202.057C249.075 189.48 250.944 175.74 249.23 162.214L253.294 161.699Z"></path>
                  <path d="M172 90.0557C184.677 90.0557 197.18 92.9967 208.528 98.6474C219.875 104.298 229.757 112.505 237.396 122.621L234.126 125.09C226.869 115.479 217.481 107.683 206.701 102.315C195.921 96.9469 184.043 94.1529 172 94.1529V90.0557Z"></path>
                  <path d="M244.195 133.235C246.991 138.442 249.216 143.937 250.83 149.623L246.888 150.742C245.355 145.34 243.242 140.12 240.586 135.174L244.195 133.235Z"></path>
                  <path d="M234.238 225.304C223.932 237.338 210.358 246.126 195.159 250.604C179.961 255.082 163.79 255.058 148.606 250.534L149.775 246.607C164.201 250.905 179.563 250.928 194.001 246.674C208.44 242.42 221.335 234.071 231.126 222.639L234.238 225.304Z"></path>
                </mask>
                <path mask="url(#path-2-inside-2_111_3212)" fill="#f13024" d="M102.892 127.966L105.579L101.362L98.6752L102.892 127.966ZM90.2897 178.19L85.304 178.567L85.6817 183.553L90.6674 183.175L90.2897 178.19ZM94.3752 177.88L94.7529 182.866L99.7386 182.488L99.3609 177.503L94.3752 177.88ZM106.347 130.168L110.564 132.855L113.251 128.638L109.034 125.951L106.347 130.168ZM93.3401 194.968L91.9387 190.168L87.1391 191.569L88.5405 196.369L93.3401 194.968ZM122.814 237.541L119.813 241.54L123.812 244.541L126.813 240.542L122.814 237.541ZM125.273 234.264L129.272 237.265L132.273 233.266L128.274 230.265L125.273 234.264ZM97.2731 193.819L102.073 192.418L100.671 187.618L95.8717 189.02L97.2731 193.819ZM152.707 92.3592L157.567 91.182L156.389 86.3226L151.53 87.4998L152.707 92.3592ZM119.097 109.421L115.869 105.603L112.05 108.831L115.278 112.649L119.097 109.421ZM121.742 112.55L117.924 115.778L121.152 119.596L124.97 116.368L121.742 112.55ZM153.672 96.3413L154.849 101.201L159.708 100.023L158.531 95.1641L153.672 96.3413ZM253.294 161.699L258.255 161.07L257.626 156.11L252.666 156.738L253.294 161.699ZM247.59 203.639L245.66 208.251L250.272 210.182L252.203 205.569L247.59 203.639ZM243.811 202.057L239.198 200.126L237.268 204.739L241.88 206.669L243.811 202.057ZM249.23 162.214L248.601 157.253L243.641 157.882L244.269 162.842L249.23 162.214ZM172 90.0557V85.0557H167V90.0557H172ZM208.528 98.6474L206.299 103.123L206.299 103.123L208.528 98.6474ZM237.396 122.621L240.409 126.611L244.399 123.598L241.386 119.608L237.396 122.621ZM234.126 125.09L230.136 128.103L233.149 132.093L237.139 129.08L234.126 125.09ZM206.701 102.315L204.473 106.791L204.473 106.791L206.701 102.315ZM172 94.1529H167V99.1529H172V94.1529ZM244.195 133.235L248.601 130.87L246.235 126.465L241.83 128.83L244.195 133.235ZM250.83 149.623L252.195 154.433L257.005 153.067L255.64 148.257L250.83 149.623ZM246.888 150.742L242.078 152.107L243.444 156.917L248.254 155.552L246.888 150.742ZM240.586 135.174L238.22 130.768L233.815 133.134L236.181 137.539L240.586 135.174ZM234.238 225.304L238.036 228.556L241.288 224.759L237.491 221.506L234.238 225.304ZM195.159 250.604L196.572 255.4L196.572 255.4L195.159 250.604ZM148.606 250.534L143.814 249.107L142.386 253.899L147.178 255.326L148.606 250.534ZM149.775 246.607L151.203 241.816L146.411 240.388L144.983 245.18L149.775 246.607ZM194.001 246.674L195.415 251.47L195.415 251.47L194.001 246.674ZM231.126 222.639L234.379 218.841L230.581 215.589L227.329 219.386L231.126 222.639Z"></path>
              </g>
            </svg>
          </motion.div>
        </div>

        {/* Loading Progress or Auto Redirect Indicator */}
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
                COMPILING INTERFACE: {progress}%
              </div>
            </div>
          ) : (
            <div className="text-center font-mono">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.4, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                className="text-emerald-400 font-bold text-xs tracking-[0.25em] uppercase mb-1"
              >
                ACCESS GRANTED // REDIRECTING
              </motion.div>
              <div className="text-[9px] text-white/35 tracking-[0.3em] uppercase">
                INITIALIZING WORKSPACE
              </div>
            </div>
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
