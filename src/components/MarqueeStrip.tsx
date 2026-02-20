import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const MarqueeStrip = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
  const lineScale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const words1 = "HEALING  ✦  ORGANIC  ✦  HANDCRAFTED  ✦  PURE  ✦  BOTANICAL  ✦  NATURAL  ✦  ";
  const words2 = "ECO-XENT  ✦  AYURVEDIC  ✦  HEAL NATURALLY  ✦  CHEMICAL FREE  ✦  ARTISAN  ✦  THERAPEUTIC  ✦  ";

  return (
    <div ref={ref} className="relative py-16 overflow-hidden select-none">
      {/* Animated center line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        style={{ scaleX: lineScale }}
      />

      {/* Row 1 — giant outlined text */}
      <motion.div className="flex whitespace-nowrap mb-4" style={{ x: x1 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="text-[clamp(3rem,8vw,7rem)] font-heading font-black tracking-tight mx-2"
            style={{
              WebkitTextStroke: "1.5px hsl(43 50% 55% / 0.25)",
              WebkitTextFillColor: "transparent",
            }}
          >
            {words1}
          </span>
        ))}
      </motion.div>

      {/* Row 2 — filled text, smaller, opposite direction */}
      <motion.div className="flex whitespace-nowrap" style={{ x: x2 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="text-lg md:text-xl font-body font-light tracking-[0.4em] uppercase text-primary/15 mx-4"
          >
            {words2}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeStrip;
