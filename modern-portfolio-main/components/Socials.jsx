import Link from "next/link";

import {
  RiMailLine,
  RiGithubLine,
  RiLinkedinLine,
  RiTwitterLine,
  RiInstagramLine,
} from "react-icons/ri";

export const socialData = [
  {
    name: "Gmail",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=rakib.00245@gmail.com",
    Icon: RiMailLine,
  },
  {
    name: "Github",
    link: "https://github.com/itpRakib",
    Icon: RiGithubLine,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/md-rakibul-islam-799364327/",
    Icon: RiLinkedinLine,
  },
  {
    name: "Twitter",
    link: "https://x.com/RaKib002000",
    Icon: RiTwitterLine,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/zero_zero_two__002?igsh=dmFtaXNtNWxleHI4",
    Icon: RiInstagramLine,
  },
];

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-lg">
      {socialData.map((social, i) => (
        <Link
          key={i}
          title={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer noopener"
          className={`${
            social.name === "Github"
              ? "bg-accent rounded-full p-[5px] hover:text-white"
              : "hover:text-accent"
          } transition-all duration-300`}
        >
          <social.Icon aria-hidden />
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
