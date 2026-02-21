import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const MarqueeStrip = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);

  const words1 = "ORGANIC  ·  BOTANICAL  ·  HANDCRAFTED  ·  LUXURY  ·  PURE  ·  NATURAL  ·  ";
  const words2 = "ECO-XENT  ·  SERUM  ·  HAIR OIL  ·  SHAMPOO  ·  SOAP  ·  PREMIUM  ·  ";

  return (
    <div ref={ref} className="relative py-8 overflow-hidden select-none border-y border-border/50 bg-white">
      <motion.div className="flex whitespace-nowrap mb-2" style={{ x: x1 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="text-[clamp(2rem,5vw,4rem)] font-heading font-light tracking-tight mx-2"
            style={{
              WebkitTextStroke: "1px hsl(40 55% 52% / 0.2)",
              WebkitTextFillColor: "transparent",
            }}
          >
            {words1}
          </span>
        ))}
      </motion.div>
      <motion.div className="flex whitespace-nowrap" style={{ x: x2 }}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="text-xs font-body font-light tracking-[0.4em] uppercase text-muted-foreground/30 mx-4">
            {words2}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeStrip;
