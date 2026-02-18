import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const phrases = [
  "100% Organic",
  "✦",
  "Cruelty Free",
  "✦",
  "Handcrafted Luxury",
  "✦",
  "Zero Chemicals",
  "✦",
  "Ayurvedic Heritage",
  "✦",
  "Premium Quality",
  "✦",
  "Eco Friendly",
  "✦",
  "Nature's Best",
  "✦",
];

const MarqueeStrip = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Speed up marquee on scroll
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const fullText = phrases.join("   ");

  return (
    <div ref={ref} className="relative py-8 overflow-hidden border-y border-primary/10 bg-secondary/20">
      {/* Glow lines at top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Row 1 - moves left */}
      <motion.div
        className="flex whitespace-nowrap mb-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="text-xs tracking-[0.3em] uppercase text-primary/40 font-body font-medium mx-4"
          >
            {fullText}
          </span>
        ))}
      </motion.div>

      {/* Row 2 - moves right (opposite) */}
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="text-[10px] tracking-[0.4em] uppercase text-primary/20 font-body font-medium mx-4"
          >
            {fullText}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeStrip;
