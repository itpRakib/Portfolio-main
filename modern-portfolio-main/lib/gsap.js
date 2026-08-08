// GSAP helper / fallback module
let gsap;

try {
  const g = require('gsap');
  gsap = g.default || g;
} catch (err) {
  gsap = {
    to(target, vars) {
      const duration = (vars.duration || 0) * 1000;
      const startP = target.p;
      const endP = vars.p;
      const startTime = performance.now();
      let active = true;

      const tick = (now) => {
        if (!active) return;
        const elapsed = now - startTime;
        const progress = duration > 0 ? Math.min(1, elapsed / duration) : 1;
        // power3.out easing curve formula: 1 - (1 - t)^3
        const easeVal = 1 - Math.pow(1 - progress, 3);
        target.p = startP + (endP - startP) * easeVal;
        vars.onUpdate?.();
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          vars.onComplete?.();
        }
      };

      if (duration <= 0) {
        target.p = endP;
        vars.onUpdate?.();
        vars.onComplete?.();
      } else {
        requestAnimationFrame(tick);
      }

      return {
        kill() {
          active = false;
        }
      };
    }
  };
}

export default gsap;
