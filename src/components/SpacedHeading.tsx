import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SpacedHeadingProps {
  text: string;
  className?: string;
  delay?: number;
}

const SpacedHeading = ({ text, className = "", delay = 0 }: SpacedHeadingProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <h2 ref={ref} className={`font-heading font-bold ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
};

export default SpacedHeading;
