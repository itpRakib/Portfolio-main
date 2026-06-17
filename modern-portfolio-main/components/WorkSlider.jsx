import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const projects = [
  {
    title: "Wikipedia Clone",
    category: "Web Application",
    tech: ["HTML5", "CSS3", "JavaScript", "Wikipedia API"],
    description: "A clean, responsive search client utilizing the Wikipedia API to fetch summaries, articles, and media formats with instant typeahead suggestions.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop",
    link: "https://itprakib.github.io/Wikipedia/",
    host: "wikipedia_mirror.sys",
    latency: "12ms"
  },
  {
    title: "Weather App",
    category: "Web Application",
    tech: ["HTML5", "CSS3", "JavaScript", "OpenWeather API"],
    description: "Real-time global weather tracking dashboard featuring temperature metrics, humidity indicators, wind speed data, and adaptive climate icons.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=800&auto=format&fit=crop",
    link: "https://itprakib.github.io/Weather-app/",
    host: "weather_radar.sys",
    latency: "18ms"
  },
  {
    title: "Tip Calculator",
    category: "Web Application",
    tech: ["HTML5", "CSS3", "JavaScript", "UI Hooks"],
    description: "Interactive transaction utility that computes bill splits, custom gratuity percentages, and total tallies instantly with responsive sliders.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    link: "https://itprakib.github.io/tip-calculator/",
    host: "ledger_flow.sys",
    latency: "8ms"
  },
  {
    title: "Restaurant Website",
    category: "Web Application",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    description: "A premium responsive culinary showcase featuring dynamic food menus, online reservation forms, customer testimonials, and smooth scroll animations.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    link: "https://itprakib.github.io/Restaurnt/",
    host: "bistro_online.sys",
    latency: "22ms"
  },
  {
    title: "Day Planner",
    category: "Web Application",
    tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
    description: "A clean organizational dashboard allowing task creation, priority color-coding, status toggles, and persistence using local browser storage.",
    image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=800&auto=format&fit=crop",
    link: "https://itprakib.github.io/Day-Planner/",
    host: "schedule_sync.sys",
    latency: "14ms"
  },
  {
    title: "Clock",
    category: "Web Application",
    tech: ["HTML5", "CSS3", "JavaScript", "CSS Dials"],
    description: "A sleek web clock combining real-time digital readouts with an analog dial face constructed using CSS rotations and dynamic time states.",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    link: "https://itprakib.github.io/Clock/",
    host: "time_keeper.sys",
    latency: "5ms"
  },
  {
    title: "Student Grade Calculator",
    category: "Web Application",
    tech: ["HTML5", "CSS3", "JavaScript", "Form Validation"],
    description: "An academic tool that registers test scores, computes weighted averages, determines grade classes, and visualizes grade ratios dynamically.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    link: "https://itprakib.github.io/Student-grade-Calculate/",
    host: "grade_metrics.sys",
    latency: "19ms"
  },
  {
    title: "Password Generator",
    category: "Web Application",
    tech: ["HTML5", "CSS3", "JavaScript", "Web Crypto API"],
    description: "A cybersecurity utility producing secure passwords with adjustable length, character sets (symbols, numbers, cases), and strength indicators.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    link: "https://itprakib.github.io/Password-Generator/",
    host: "crypt_vault.sys",
    latency: "11ms"
  },
  {
    title: "Quiz App",
    category: "Web Application",
    tech: ["HTML5", "CSS3", "JavaScript", "JSON Data"],
    description: "A gamified trivia dashboard that displays questions, scores correct responses, tracks countdown limits, and reviews summary achievements.",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800&auto=format&fit=crop",
    link: "https://itprakib.github.io/Quiz-app/",
    host: "trivia_nodes.sys",
    latency: "15ms"
  },
  {
    title: "Calculator",
    category: "Web Application",
    tech: ["HTML5", "CSS3", "JavaScript", "CSS Grid"],
    description: "A minimalist glassmorphic calculator with history registers, mathematical error handling, keyboard inputs, and responsive layout scaling.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    link: "https://itprakib.github.io/Calculator/",
    host: "math_algebra.sys",
    latency: "6ms"
  },
];

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={30}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Autoplay, Navigation]}
      className="h-[590px] md:h-[450px] lg:h-[410px] w-full"
    >
      {projects.map((project, i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center bg-[#09090b]/80 border border-white/10 hover:border-accent/40 hover:shadow-[0_0_35px_rgba(241,48,36,0.2)] rounded-2xl p-6 lg:p-10 relative overflow-hidden backdrop-blur-md h-full select-none transition-all duration-500 group/card">
            
            {/* Cyber Matrix Matrix-Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(241,48,36,0.05),transparent)] pointer-events-none" />
            
            {/* Image section framed as a Mac/Linux terminal window */}
            <div className="w-full md:w-[48%] rounded-xl overflow-hidden border border-white/15 bg-black/60 relative group cursor-pointer shrink-0 shadow-2xl transition-all duration-500 group-hover/card:border-accent/30">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/80 text-[10px] font-mono text-white/50 select-none">
                <div className="flex items-center gap-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-90 shadow-[0_0_6px_#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-90 shadow-[0_0_6px_#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-90 shadow-[0_0_6px_#27c93f]" />
                </div>
                <span className="tracking-wider uppercase text-[9px] font-bold text-white/60">
                  terminal // {project.host}
                </span>
                <span className="font-bold opacity-30 select-none">×</span>
              </div>

              {/* Mockup Image wrapper */}
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-700 brightness-[0.8] group-hover:brightness-[0.95]"
                  unoptimized
                  priority={i === 0}
                />
                
                {/* Holographic glowing scanline screen filters */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 z-10" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_95%,rgba(241,48,36,0.12)_95%)] bg-[size:100%_6px] opacity-25 z-10 pointer-events-none group-hover:opacity-40 transition-all duration-300" />
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10 pointer-events-none" />
                
                {/* Visual grid pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(241,48,36,0.15)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 pointer-events-none z-10" />
                
                <div className="absolute top-2 right-2 z-20 bg-accent/80 backdrop-blur-md border border-accent/30 text-[9px] font-mono text-white font-semibold py-0.5 px-2 rounded-md shadow-lg tracking-widest">
                  SYS.EXE // 0{i + 1}
                </div>
              </div>
            </div>

            {/* Text details */}
            <div className="flex-1 flex flex-col justify-center text-left w-full z-20">
              
              {/* Cybersecurity terminal status bar */}
              <div className="flex items-center gap-x-2 text-[10px] font-mono text-accent/80 border-b border-white/5 pb-2 mb-3.5">
                <span>[ ADDR: itprakib.github.io ]</span>
                <span className="text-white/20">•</span>
                <span>[ PING: {project.latency} ]</span>
                <span className="text-white/20">•</span>
                <span className="text-green-400">ONLINE</span>
              </div>

              {/* Status indicator row */}
              <div className="flex items-center gap-x-2 mb-1">
                <span className="text-accent text-xs uppercase tracking-[0.25em] font-extrabold text-[10px] md:text-xs">
                  {project.category}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-black text-white mt-0.5 mb-2.5 tracking-tight group-hover/card:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              
              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="text-[10px] bg-accent/10 text-accent border border-accent/25 px-2 py-0.5 rounded font-mono font-medium tracking-wider shadow-sm">
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-sm text-white/60 mb-6 font-light leading-relaxed max-w-[450px]">
                {project.description}
              </p>
              
              <Link
                href={project.link}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-x-2 btn rounded-full border border-white/20 bg-white/5 hover:bg-accent/20 hover:border-accent py-3 px-6 transition-all duration-300 group text-white hover:text-accent font-semibold text-sm w-fit shadow-md hover:shadow-[0_0_15px_rgba(241,48,36,0.3)] active:scale-95"
              >
                <span>Initialize Module</span>
                <BsArrowRight className="group-hover:translate-x-1.5 transition-all duration-300 text-accent" />
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WorkSlider;
