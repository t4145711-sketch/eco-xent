import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroProducts from "@/assets/hero-products.jpg";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Hero background image */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={heroProducts}
          alt="Eco-Xent organic products collection"
          className="w-full h-full object-cover opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </motion.div>
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

        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
