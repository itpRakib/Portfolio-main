import { useState } from "react";
import DepthCarousel from "./DepthCarousel";

export const projects = [
  {
    title: "Media Collector",
    category: "Full-Stack Web App",
    tech: ["Next.js", "Tailwind CSS", "React", "Vercel"],
    description: "A modern media archiving and discovery platform for curated digital collections, media indexing, and interactive asset showcases.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    link: "https://media-collector-amber.vercel.app/",
    host: "media_collector.sys",
    latency: "16ms"
  },
  {
    title: "BD GoTicket",
    category: "Full-Stack Web App",
    tech: ["Next.js", "Tailwind CSS", "Vercel", "Node.js"],
    description: "Bangladesh's next-gen multi-modal transit reservation hub. Book Bus, Train, and Flight tickets with NID verification, bKash/Nagad checkout, and real-time route optimization.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
    link: "https://online-ticket-reservation-system-beta.vercel.app/",
    host: "transit_matrix.sys",
    latency: "24ms"
  },
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
  {
    title: "Ticket Reservation",
    category: "Web Application",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Django", "REST API"],
    description: "An advanced online ticket reservation system designed with modern UI, robust seat selection workflows, secure transaction simulation, and real-time availability updates.",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop",
    link: "https://online-ticket-reservation-system-beta.vercel.app/",
    host: "ticket_reservation.sys",
    latency: "24ms"
  },
];

export const getGithubLink = (link) => {
  if (!link) return "https://github.com/itpRakib";
  if (link.includes("media-collector-amber.vercel.app")) {
    return "https://github.com/itpRakib/media-collector";
  }
  if (link.includes("online-ticket-reservation-system-beta.vercel.app")) {
    return "https://github.com/itpRakib/Online-Ticket-Reservation-system";
  }
  const cleaned = link.endsWith("/") ? link.slice(0, -1) : link;
  const parts = cleaned.split("/");
  const repoName = parts[parts.length - 1];
  return `https://github.com/itpRakib/${repoName}`;
};

const WorkSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = projects.map((proj) => ({
    ...proj,
    githubLink: getGithubLink(proj.link),
    alt: proj.title,
  }));

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 py-2">
      {/* 3D Depth Carousel View */}
      <div className="w-full h-[420px] relative overflow-hidden rounded-2xl bg-gradient-to-b from-primary/40 to-black/40 border border-white/10 backdrop-blur-sm shadow-2xl">
        <DepthCarousel
          items={carouselItems}
          cardWidth={310}
          cardHeight={390}
          radius={18}
          tint="#05060a"
          depth={220}
          spread={90}
          tilt={22}
          tiltDirection="right"
          perspective={1400}
          visibleCards={4}
          falloff={0.2}
          blur={6}
          autoplay={true}
          autoplayDelay={3500}
          loop={true}
          showControls={true}
          showIndicators={true}
          onChange={(index) => setActiveIndex(index)}
        />
      </div>

      {/* Active Project Highlight Bar */}
      <div className="w-full max-w-4xl bg-black/60 border border-white/15 rounded-xl p-4 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 text-left transition-all duration-300">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
              {activeProject.category}
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {activeProject.host} ({activeProject.latency})
            </span>
          </div>
          <h4 className="text-lg font-bold text-white tracking-wide">
            {activeProject.title}
          </h4>
          <p className="text-xs text-white/70 font-light line-clamp-2">
            {activeProject.description}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={getGithubLink(activeProject.link)}
            target="_blank"
            rel="noreferrer noopener"
            className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all border border-white/15 flex items-center gap-2 text-xs font-medium"
            title="View GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>Source Code</span>
          </a>

          <a
            href={activeProject.link}
            target="_blank"
            rel="noreferrer noopener"
            className="px-4 py-2.5 rounded-lg bg-accent text-white hover:bg-accent/85 transition-all font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-accent/25"
          >
            <span>Launch Live App</span>
            <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WorkSlider;
