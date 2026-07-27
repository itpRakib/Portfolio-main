import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

import { fadeIn } from "../../variants";
import { useState } from "react";
import AnimatedInput from "../../components/AnimatedInput";

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
            {/* Column 1 - Hire Me */}
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0"
            >
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
                Hire Me
              </h3>
              <div className="flex flex-col gap-y-4 items-start">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=rakib.00245@gmail.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="gmail-button"
                  aria-label="Email Me"
                />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=rakib.00245@gmail.com&su=Hire%20Request&body=Hi%20Rakibul,%20I'd%20like%20to%20hire%20you..."
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hire-me-btn"
                >
                  <span>Hire Me</span>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                  </svg>
                </a>
              </div>
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
              <div className="flex justify-start w-full">
                <div className="light-socials-container">
                  {/* GitHub */}
                  <div className="light-button">
                    <a
                      href="https://github.com/itpRakib"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="bt"
                      aria-label="GitHub"
                    >
                      <div className="light-holder">
                        <div className="dot"></div>
                        <div className="light"></div>
                      </div>
                      <div className="button-holder">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <p>GitHub</p>
                      </div>
                    </a>
                  </div>

                  {/* LinkedIn */}
                  <div className="light-button">
                    <a
                      href="https://www.linkedin.com/in/md-rakibul-islam-799364327/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="bt"
                      aria-label="LinkedIn"
                    >
                      <div className="light-holder">
                        <div className="dot"></div>
                        <div className="light"></div>
                      </div>
                      <div className="button-holder">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <p>LinkedIn</p>
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
                      aria-label="Instagram"
                    >
                      <div className="light-holder">
                        <div className="dot"></div>
                        <div className="light"></div>
                      </div>
                      <div className="button-holder">
                        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                          <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
                        </svg>
                        <p>Instagram</p>
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
                      aria-label="Twitter"
                    >
                      <div className="light-holder">
                        <div className="dot"></div>
                        <div className="light"></div>
                      </div>
                      <div className="button-holder">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <p>Twitter</p>
                      </div>
                    </a>
                  </div>
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

                  <AnimatedInput
                    type="text"
                    name="name"
                    label="Name"
                    disabled={isLoading}
                    required
                  />
                  <AnimatedInput
                    type="email"
                    name="email"
                    label="E-mail"
                    disabled={isLoading}
                    required
                  />
                </div>
                <AnimatedInput
                  type="text"
                  name="subject"
                  label="Subject"
                  disabled={isLoading}
                  required
                />
                <AnimatedInput
                  isTextArea
                  name="message"
                  label="Message..."
                  disabled={isLoading}
                  required
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
