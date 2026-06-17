import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import {
  RiMailLine,
  RiGithubLine,
  RiLinkedinLine,
  RiTwitterLine,
  RiInstagramLine,
} from "react-icons/ri";

import { fadeIn } from "../../variants";
import { useState } from "react";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Thank you. I will get back to you ASAP.");
        } else {
          console.log(res);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="h-full bg-primary/30">
      <div className="container mx-auto py-32 flex items-center justify-center h-full">
        {/* main container */}
        <div className="flex flex-col w-full xl:max-w-[1100px] px-4 md:px-0">
          {/* heading */}
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center xl:text-left mb-12"
          >
            Contact<span className="text-accent">.</span>
          </motion.h2>

          {/* grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {/* Column 1 - Email */}
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0"
            >
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
                Email
              </h3>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rakib.00245@gmail.com"
                target="_blank"
                rel="noreferrer noopener"
                className="gmail-button"
              >
              </a>
            </motion.div>

            {/* Column 2 - Social */}
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0"
            >
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
                Social
              </h3>
              <div className="flex flex-wrap gap-4 justify-start items-center max-w-[240px]">
                {/* Github */}
                <div className="light-button">
                  <a
                    href="https://github.com/itpRakib"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="bt"
                  >
                    <div className="light-holder">
                      <div className="dot"></div>
                      <div className="light"></div>
                    </div>
                    <div className="button-holder">
                      <RiGithubLine className="social-icon" />
                      <span>Github</span>
                    </div>
                  </a>
                </div>
                {/* Linkedin */}
                <div className="light-button">
                  <a
                    href="https://www.linkedin.com/in/md-rakibul-islam-799364327/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="bt"
                  >
                    <div className="light-holder">
                      <div className="dot"></div>
                      <div className="light"></div>
                    </div>
                    <div className="button-holder">
                      <RiLinkedinLine className="social-icon" />
                      <span>Linkedin</span>
                    </div>
                  </a>
                </div>
                {/* Twitter */}
                <div className="light-button">
                  <a
                    href="https://x.com/RaKib002000"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="bt"
                  >
                    <div className="light-holder">
                      <div className="dot"></div>
                      <div className="light"></div>
                    </div>
                    <div className="button-holder">
                      <RiTwitterLine className="social-icon" />
                      <span>Twitter</span>
                    </div>
                  </a>
                </div>
                {/* Instagram */}
                <div className="light-button">
                  <a
                    href="https://www.instagram.com/zero_zero_two__002?igsh=dmFtaXNtNWxleHI4"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="bt"
                  >
                    <div className="light-holder">
                      <div className="dot"></div>
                      <div className="light"></div>
                    </div>
                    <div className="button-holder">
                      <RiInstagramLine className="social-icon" />
                      <span>Instagram</span>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Column 3 - Form */}
            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col"
            >
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
                Send a Message
              </h3>
              <form
                className="flex-1 flex flex-col gap-6 w-full"
                onSubmit={handleSubmit}
                autoComplete="off"
                autoCapitalize="off"
                name="contact"
              >
                {/* input group */}
                <div className="flex flex-col xl:flex-row gap-4 w-full">
                  <input type="hidden" name="form-name" value="contact" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input w-full"
                    disabled={isLoading}
                    aria-disabled={isLoading}
                    required
                    aria-required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className="input w-full"
                    disabled={isLoading}
                    aria-disabled={isLoading}
                    required
                    aria-required
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="input"
                  disabled={isLoading}
                  aria-disabled={isLoading}
                  required
                  aria-required
                />
                <textarea
                  name="message"
                  placeholder="Message..."
                  className="textarea"
                  disabled={isLoading}
                  aria-disabled={isLoading}
                  required
                  aria-required
                />
                <button
                  type="submit"
                  className="btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group"
                  disabled={isLoading}
                  aria-disabled={isLoading}
                >
                  <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500 font-medium">
                    Let&apos;s talk
                  </span>

                  <BsArrowRight
                    className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]"
                    aria-hidden
                  />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
