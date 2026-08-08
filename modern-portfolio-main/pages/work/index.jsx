import { motion } from "framer-motion";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import WorkSlider from "../../components/WorkSlider";
import MaskedHeading from "../../components/MaskedHeading";
import { fadeIn } from "../../variants";

const Work = () => {
  return (
    <div className="h-full bg-primary/30 py-36 flex items-center justify-center">
      <Circles />
      <div className="container mx-auto px-4 md:px-0 flex flex-col justify-center h-full">
        {/* text wrapper */}
        <div className="text-center xl:text-left mb-8 max-w-[600px]">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-4"
          >
            <MaskedHeading
              text="My Work."
              tag="h2"
              mediaType="image"
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
              fillScale={1.3}
              parallax={26}
              drift={18}
              brightness={1.2}
              saturation={1.4}
              reveal="rise"
              trigger="view"
              weight={800}
              align="left"
              textScale={0.11}
              className="text-[32px] sm:text-[44px] md:text-[54px]"
            />
          </motion.div>
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
