/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
import {
  FaCss3,
  FaHtml5,
  FaJs,
  FaPython,
  FaDatabase,
  FaGitAlt,
  FaLinux,
  FaBootstrap,
  FaRobot,
  FaTerminal,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMysql,
  SiCplusplus,
  SiVisualstudiocode,
  SiVercel,
  SiMicrosoftoffice,
} from "react-icons/si";
import { BsArrowUpRight } from "react-icons/bs";

import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

//  data
export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "FRONTEND",
        icons: [
          { name: "HTML5", Icon: FaHtml5 },
          { name: "CSS3", Icon: FaCss3 },
          { name: "JavaScript", Icon: FaJs },
          { name: "TailwindCSS", Icon: SiTailwindcss },
        ],
      },
      {
        title: "BACKEND",
        icons: [
          { name: "Python", Icon: FaPython },
          { name: "MySQL", Icon: SiMysql },
          { name: "SQL Database", Icon: FaDatabase },
        ],
      },
      {
        title: "DEVOPS & TOOLS",
        icons: [
          { name: "Microsoft Office", Icon: SiMicrosoftoffice },
          { name: "Git/GitHub", Icon: FaGitAlt },
          { name: "Linux (Ubuntu/WSL)", Icon: FaLinux },
          { name: "C/C++", Icon: SiCplusplus },
          { name: "Bootstrap", Icon: FaBootstrap },
          { name: "VS Code", Icon: SiVisualstudiocode },
          { name: "Antigravity (AI)", Icon: FaRobot },
          { name: "Vercel", Icon: SiVercel },
        ],
      },
    ],
  },
  {
    title: "credentials",
    info: [
      {
        title: "B.Sc. in Computer Science & Engineering - Northern University Bangladesh",
        stage: "2023 - Present",
      },
      {
        title: "Higher Secondary Certificate (HSC) - Science",
        stage: "2020 - 2022",
      },
    ],
  },
  {
    title: "achievements",
    info: [
      {
        title: "Forage",
        logo: "https://www.theforage.com/favicon.ico",
        certificates: [
          {
            name: "Certificate 1",
            link: "https://lnkd.in/gMU9a5Zc",
          },
          {
            name: "Certificate 2",
            link: "https://lnkd.in/gAxe_eBV",
          },
          {
            name: "Certificate 3",
            link: "https://lnkd.in/gbymGbV4",
          },
        ],
      },
      {
        title: "IBM",
        logo: "https://www.ibm.com/favicon.ico",
        certificates: [
          {
            name: "Certificate 1",
            link: "https://www.credly.com/badges/c4e9f93c-aebc-4d2c-b0f1-135d5e3b7d4e/public_url",
          },
        ],
      },
      {
        title: "MATLAB Academy",
        logo: "https://www.mathworks.com/favicon.ico",
        certificates: [
          {
            name: "Certificate 1",
            link: "https://matlabacademy.mathworks.com/progress/share/certificate.html?id=bec1251b-03f3-423b-9b1c-a96e4404d674&",
          },
        ],
      },
      {
        title: "Simplilearn",
        logo: "https://play-lh.googleusercontent.com/uphrWz_e_K_pZrPOmCR34A6grxPtva0kM8bhMSgdycrlxiBC7C_JzGtyJLn1mfrRLrg",
        certificates: [
          {
            name: "Certificate 1",
            link: "https://simpli-web.app.link/e/0yhTv092V0b",
          },
          {
            name: "Certificate 2",
            link: "https://simpli-web.app.link/e/eOzJklc3V0b",
          },
          {
            name: "Certificate 3",
            link: "https://simpli-web.app.link/e/lGadyif3V0b",
          },
        ],
      },
      {
        title: "HackerRank",
        logo: "https://www.hackerrank.com/favicon.ico",
        certificates: [
          {
            name: "Certificate 1",
            link: "https://www.hackerrank.com/certificates/iframe/c19b36eff15c",
          },
          {
            name: "Certificate 2",
            link: "https://www.hackerrank.com/certificates/iframe/7ccada193d51",
          },
          {
            name: "Certificate 3",
            link: "https://www.hackerrank.com/certificates/iframe/b7315f2bc1f4",
          },
        ],
      },
      {
        title: "LinkedIn Learning",
        logo: "https://www.linkedin.com/favicon.ico",
        certificates: [
          {
            name: "Certificate 1",
            link: "https://www.linkedin.com/learning/certificates/608f60aa6f66f34e44bfc28125ed33cdb2346c551de7d141ac016a131f1f6e00?trk=share_certificate",
          },
          {
            name: "Certificate 2",
            link: "https://www.linkedin.com/learning/certificates/6fdf38ae2563fcf0d820cb3e8e33252b030d1200f462e5dbb08d164b42b5c416?trk=share_certificate",
          },
          {
            name: "Certificate 3",
            link: "https://www.linkedin.com/learning/certificates/f8a8a37f35796048f14fb439476514edb816224adb5de267254b0973c18ed3ac?trk=share_certificate",
          },
          {
            name: "Certificate 4",
            link: "https://www.linkedin.com/learning/certificates/12e0ecf92602ec1c09976d76ed6e805126a64f6c12f6f67db73f361196d48bc1?trk=share_certificate",
          },
          {
            name: "Certificate 5",
            link: "https://lnkd.in/gMU9a5Zc",
          },
          {
            name: "Certificate 6",
            link: "https://lnkd.in/gAxe_eBV",
          },
          {
            name: "Certificate 7",
            link: "https://lnkd.in/gbymGbV4",
          },
        ],
      },
    ],
  },
];


const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="h-full bg-primary/30 py-32 text-center xl:text-left">
      <Circles />

      {/* avatar img */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-[370px]"
      >
        <Avatar />
      </motion.div>

      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6">
        {/* text */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            Engineering <span className="text-accent">scalable</span> systems & backend solutions.
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="max-w-[500px] mx-auto xl:mx-0 mb-6 px-2 xl:px-0"
          >
            I am a Computer Science student and software developer passionate about building high-performance web systems, transaction gateways, and low-level hardware integrations.
          </motion.p>

          {/* resume button */}
          <motion.div
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            animate="show"
            className="flex justify-center xl:justify-start mb-8 xl:mb-12"
          >
            <a
              href="https://drive.google.com/file/d/1olcWNQp22NElbP174Q-iPFBIpHwQNNpr/view?usp=drive_link"
              target="_blank"
              rel="noreferrer noopener"
              className="continue-application"
            >
              <div>
                <div className="pencil"></div>
                <div className="folder">
                  <div className="top">
                    <svg viewBox="0 0 24 27">
                      <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                    </svg>
                  </div>
                  <div className="paper"></div>
                </div>
              </div>
              View Resume
            </a>
          </motion.div>

          {/* counters */}
          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="flex flex-1 xl:gap-x-6">
              {/* technologies */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={10} duration={5} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Technologies mastered.
                </div>
              </div>

              {/* projects */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={12} duration={5} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Finished projects.
                </div>
              </div>

              {/* commits */}
              <div className="relative flex-1">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={300} duration={5} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Git Commits.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* info */}
        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:max-w-[48%] h-[480px]"
        >
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
            {aboutData.map((item, itemI) => (
              <div
                key={itemI}
                className={`${
                  index === itemI &&
                  "text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300"
                } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                onClick={() => setIndex(itemI)}
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="py-2 xl:py-6 flex flex-col gap-y-4 items-center xl:items-start overflow-y-auto max-h-[340px] w-full pr-2 scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-white/5">
            {aboutData[index].info.map((item, itemI) => (
              <div
                key={itemI}
                className="flex flex-col md:flex-row items-center text-center md:text-left text-white/60 gap-y-2 md:gap-y-0 md:gap-x-4 w-full justify-start py-1"
              >
                {/* logo if available */}
                {item.logo && (
                  <div className="flex items-center justify-center bg-white/5 p-1 rounded-md border border-white/10 w-8 h-8 shrink-0">
                    <img
                      src={item.logo}
                      alt={item.title}
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                )}

                {/* title */}
                <div className={`${item.logo ? "font-semibold text-white/90 min-w-[140px]" : "font-light text-white/80"} mb-2 md:mb-0`}>
                  {item.title}
                </div>

                {/* separator and stage if stage is available */}
                {item.stage && (
                  <>
                    <div className="hidden md:flex">-</div>
                    <div className="font-light">{item.stage}</div>
                  </>
                )}

                {/* icons if available */}
                {item.icons && (
                  <div className="flex flex-wrap gap-x-5 gap-y-3">
                    {item.icons.map((iconObj, iconI) => {
                      const Icon = iconObj.Icon;
                      const name = iconObj.name;
                      return (
                        <div
                          key={iconI}
                          className="flex flex-col items-center gap-y-1 text-white transition-all duration-200 hover:text-accent hover:scale-110 cursor-pointer"
                        >
                          <Icon className="text-2xl" />
                          {name && (
                            <span className="text-[10px] leading-tight text-white/50 group-hover/icon:text-accent whitespace-nowrap font-medium tracking-wide">
                              {name}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* certificates if available */}
                {item.certificates && (
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {item.certificates.map((cert, certI) => (
                      <a
                        key={certI}
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-xs rounded-full border border-white/10 bg-white/5 hover:bg-accent/10 hover:border-accent py-1 px-3 transition-all duration-300 text-white/80 hover:text-accent font-light flex items-center gap-x-1 hover:scale-105 active:scale-95"
                      >
                        <span>{cert.name}</span>
                        <BsArrowUpRight className="text-[10px]" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
