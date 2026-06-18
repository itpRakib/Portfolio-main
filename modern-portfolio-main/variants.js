export const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      opacity: 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0, // Exit immediately without delay to enable faster page unmounting
        ease: [0.25, 0.6, 0.3, 0.8],
      },
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.8, // Snappier entrance animation duration
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};
