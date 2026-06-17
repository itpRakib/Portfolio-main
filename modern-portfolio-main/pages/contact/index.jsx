import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

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
              <div className="flex justify-start">
                <svg width="0" height="0" style={{ position: "absolute" }}>
                  <defs>
                    <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
                      <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"></path>
                    </clipPath>
                  </defs>
                </svg>

                <div className="relative">
                  <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
                  ></div>

                  <div className="relative flex items-end gap-x-2 p-2">
                    <a
                      href="https://github.com/itpRakib"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative block"
                      aria-label="GitHub"
                    >
                      <div
                        style={{ clipPath: "url(#squircleClip)" }}
                        className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-600/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="h-8 w-8 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                          ></path>
                        </svg>
                      </div>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/md-rakibul-islam-799364327/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative block"
                      aria-label="LinkedIn"
                    >
                      <div
                        style={{ clipPath: "url(#squircleClip)" }}
                        className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="h-8 w-8 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                          ></path>
                        </svg>
                      </div>
                    </a>

                    <a
                      href="https://www.instagram.com/zero_zero_two__002?igsh=dmFtaXNtNWxleHI4"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative block"
                      aria-label="Instagram"
                    >
                      <div
                        style={{ clipPath: "url(#squircleClip)" }}
                        className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg border border-red-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="h-8 w-8 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                          ></path>
                        </svg>
                      </div>
                    </a>

                    <a
                      href="https://discord.com"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative block"
                      aria-label="Discord"
                    >
                      <div
                        style={{ clipPath: "url(#squircleClip)" }}
                        className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg border border-indigo-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="h-8 w-8 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"
                          ></path>
                        </svg>
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
