import { motion } from "framer-motion";
import Image from "next/image";

const Avatar = () => {
  return (
    <div className="hidden xl:flex xl:max-w-none pointer-events-none select-none relative w-full h-full">
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="translate-z-0 w-full h-full relative"
      >
        {/* Subtle radial background glow behind the avatar */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,48,36,0.12)_0%,transparent_70%)] pointer-events-none blur-2xl scale-125 z-0" />
        <Image
          src="/avatar.png"
          alt="avatar"
          width={737}
          height={678}
          className="translate-z-0 w-full h-full relative z-10"
        />
      </motion.div>
    </div>
  );
};

export default Avatar;
