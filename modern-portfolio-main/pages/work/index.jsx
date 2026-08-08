import { motion } from "framer-motion";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import WorkSlider from "../../components/WorkSlider";
import { fadeIn } from "../../variants";

const Work = () => {
  return (
    <div className="h-full bg-primary/30 py-36 flex items-center justify-center">
      <Circles />
      <div className="container mx-auto px-4 md:px-0 flex flex-col justify-center h-full">
        {/* text wrapper */}
        <div className="text-center xl:text-left mb-8 max-w-[600px]">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 mb-4"
          >
            My Work<span className="text-accent">.</span>
          </motion.h2>
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-xl text-white/60 font-light text-sm md:text-base"
          >
            A showcase of web applications and projects built to demonstrate dynamic UI responsiveness, modular integrations, and clean code paths.
          </motion.p>
        </div>

        {/* slider */}
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="w-full"
        >
          <WorkSlider />
        </motion.div>
      </div>
      <Bulb />
    </div>
  );
};

export default Work;
