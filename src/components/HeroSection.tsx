import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ y: textY, opacity }}
      >
        <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
          {/* Overline */}
          <motion.p
            className="text-primary tracking-[0.5em] uppercase text-[10px] md:text-xs font-body font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Premium Organic Collection
          </motion.p>

          {/* Brand name */}
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-bold leading-[0.85] text-gradient-gold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Eco‑Xent
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-lg md:text-xl text-foreground/60 font-heading italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Nature Reimagined. Luxury Redefined.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <a
              href="#products"
              className="px-10 py-4 bg-primary text-primary-foreground font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full hover:shadow-lg hover:shadow-primary/30 transition-shadow duration-300"
            >
              Shop Now
            </a>
            <a
              href="#experience"
              className="px-10 py-4 border border-primary/30 text-primary font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full hover:bg-primary/5 transition-colors duration-300"
            >
              Explore
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/40 font-body">
          Scroll
        </p>
        <motion.div className="w-5 h-8 rounded-full border border-primary/20 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-primary/50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
