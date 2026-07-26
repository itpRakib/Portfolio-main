import { useRef } from "react";
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

const getGithubLink = (link) => {
  if (!link) return "https://github.com/itpRakib";
  if (link.includes("online-ticket-reservation-system-beta.vercel.app")) {
    return "https://github.com/itpRakib/Online-Ticket-Reservation-system";
  }
  const cleaned = link.endsWith("/") ? link.slice(0, -1) : link;
  const parts = cleaned.split("/");
  const repoName = parts[parts.length - 1];
  return `https://github.com/itpRakib/${repoName}`;
};

const WorkSlider = () => {
  const swiperRef = useRef(null);

  return (
    <div
      onMouseEnter={() => {
        if (swiperRef.current?.autoplay) {
          swiperRef.current.autoplay.stop();
        }
      }}
      onMouseLeave={() => {
        if (swiperRef.current?.autoplay) {
          swiperRef.current.autoplay.start();
        }
      }}
      className="w-full h-[360px] py-2"
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={25}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="h-full w-full"
      >
        {projects.map((project, i) => (
          <SwiperSlide key={i} className="h-full">
            <div className="project-card h-full flex flex-col justify-between select-none">
              <div
                className="top-section"
                style={{
                  background: `linear-gradient(180deg, rgba(27,35,61,0.2) 0%, rgba(27,35,61,0.85) 100%), url(${project.image}) center/cover no-repeat`,
                }}
              >
                <div className="border"></div>
                <div className="icons">
                  <div className="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 94 94" className="svg">
                      <path fill="white" d="M38.0481 4.82927C38.0481 2.16214 40.018 0 42.4481 0H51.2391C53.6692 0 55.6391 2.16214 55.6391 4.82927V40.1401C55.6391 48.8912 53.2343 55.6657 48.4248 60.4636C43.6153 65.2277 36.7304 67.6098 27.7701 67.6098C18.8099 67.6098 11.925 65.2953 7.11548 60.6663C2.37183 56.0036 3.8147e-06 49.2967 3.8147e-06 40.5456V4.82927C3.8147e-06 2.16213 1.96995 0 4.4 0H13.2405C15.6705 0 17.6405 2.16214 17.6405 4.82927V39.1265C17.6405 43.7892 18.4805 47.2018 20.1605 49.3642C21.8735 51.5267 24.4759 52.6079 27.9678 52.6079C31.4596 52.6079 34.0127 51.5436 35.6268 49.4149C37.241 47.2863 38.0481 43.8399 38.0481 39.0758V4.82927Z"></path>
                      <path fill="white" d="M86.9 61.8682C86.9 64.5353 84.9301 66.6975 82.5 66.6975H73.6595C71.2295 66.6975 69.2595 64.5353 69.2595 61.8682V4.82927C69.2595 2.16214 71.2295 0 73.6595 0H82.5C84.9301 0 86.9 2.16214 86.9 4.82927V61.8682Z"></path>
                      <path fill="white" d="M2.86102e-06 83.2195C2.86102e-06 80.5524 1.96995 78.3902 4.4 78.3902H83.6C86.0301 78.3902 88 80.5524 88 83.2195V89.1707C88 91.8379 86.0301 94 83.6 94H4.4C1.96995 94 0 91.8379 0 89.1707L2.86102e-06 83.2195Z"></path>
                    </svg>
                  </div>
                  <div className="social-media">
                    <a
                      href={getGithubLink(project.link)}
                      target="_blank"
                      rel="noreferrer noopener"
                      title="View Source Code"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="svg">
                        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
                      </svg>
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      title="Launch Live App"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svg">
                        <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.97 7 1.96 2 6.953-7 3.992 4v-10z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="overlay">
                  <p className="desc">{project.description}</p>
                  <div className="tech-list">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bottom-section flex-1 flex flex-col justify-between">
                <span className="title">{project.title}</span>
                <div className="row row1">
                  <div className="item">
                    <span className="big-text">{project.tech.length}</span>
                    <span className="regular-text">Tech Used</span>
                  </div>
                  <div className="item">
                    <span className="big-text">{project.latency}</span>
                    <span className="regular-text">Latency</span>
                  </div>
                  <div className="item">
                    <span className="big-text text-green-400 font-extrabold uppercase">Online</span>
                    <span className="regular-text">Status</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WorkSlider;
