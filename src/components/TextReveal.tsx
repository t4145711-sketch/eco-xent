import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

const TextReveal = ({ children, className = "", delay = 0, staggerDelay = 0.03, once = true }: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const words = children.split(" ");

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: 45 }}
            animate={isInView ? { y: "0%", rotateX: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: delay + wi * staggerDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default TextReveal;
