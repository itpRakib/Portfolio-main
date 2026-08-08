import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import WorkSlider, { projects } from "../../components/WorkSlider";
import { fadeIn } from "../../variants";
import { HiOutlineSparkles, HiOutlineViewGrid } from "react-icons/hi";

// Dynamically import DepthCarousel to avoid SSR issues with GSAP and window objects
const DepthCarousel = dynamic(() => import("../../components/DepthCarousel"), {
  ssr: false,
});

const depthItems = projects.map((p) => ({
  image: p.image,
  title: p.title,
  category: p.category,
  description: p.description,
  tech: p.tech,
  link: p.link,
  github: p.link?.includes("media-collector")
    ? "https://github.com/itpRakib/media-collector"
    : p.link?.includes("online-ticket-reservation")
    ? "https://github.com/itpRakib/Online-Ticket-Reservation-system"
    : `https://github.com/itpRakib/${p.link?.replace(/\/$/, "").split("/").pop()}`,
}));

const Work = () => {
  const [viewMode, setViewMode] = useState("3d"); // "3d" or "slider"

  return (
    <div className="h-full bg-primary/30 py-32 md:py-36 flex items-center justify-center relative overflow-hidden">
      <Circles />
      <div className="container mx-auto px-4 md:px-0 flex flex-col justify-center h-full max-w-6xl z-10">
        {/* text & controls wrapper */}
        <div className="flex flex-col xl:flex-row items-center xl:items-end justify-between mb-6 max-w-full">
          <div className="text-center xl:text-left max-w-[600px] mb-4 xl:mb-0">
            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 mb-2"
            >
              My Work<span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="max-w-xl text-white/70 font-light text-sm md:text-base"
            >
              A showcase of web applications and projects built to demonstrate dynamic UI responsiveness, modular integrations, and clean code paths.
            </motion.p>
          </div>

          {/* View switcher buttons */}
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <button
              onClick={() => setViewMode("3d")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                viewMode === "3d"
                  ? "bg-accent text-white shadow-lg shadow-accent/40 scale-105"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <HiOutlineSparkles className="w-4 h-4" /> 3D Stack View
            </button>
            <button
              onClick={() => setViewMode("slider")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                viewMode === "slider"
                  ? "bg-accent text-white shadow-lg shadow-accent/40 scale-105"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <HiOutlineViewGrid className="w-4 h-4" /> Slider View
            </button>
          </motion.div>
        </div>

        {/* Dynamic Display area */}
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="w-full relative min-h-[440px]"
        >
          {viewMode === "3d" ? (
            <div className="w-full h-[460px] relative">
              <DepthCarousel
                items={depthItems}
                cardWidth={320}
                cardHeight={400}
                depth={220}
                spread={95}
                tilt={20}
                tiltDirection="right"
                perspective={1400}
                visibleCards={4}
                falloff={0.2}
                blur={5}
                autoplay
                autoplayDelay={3500}
                loop
                showControls
                showIndicators
              />
            </div>
          ) : (
            <WorkSlider />
          )}
        </motion.div>
      </div>
      <Bulb />
    </div>
  );
};

export default Work;
