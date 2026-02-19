import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount1(Math.round(eased * 100));
      setCount2(Math.round(eased * 5));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-10 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
      </motion.div>

      {/* Subtle accent glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(43 50% 55% / 0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ y: textY, opacity }}
      >
        <div className="flex items-center justify-center min-h-screen py-32">
          <div className="flex flex-col gap-5 max-w-3xl text-center items-center">
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="h-[1px] w-10 bg-primary/40" />
              <p className="text-primary tracking-[0.5em] uppercase text-[10px] md:text-xs font-body font-medium">
                Premium Organic Collection
              </p>
              <div className="h-[1px] w-10 bg-primary/40" />
            </motion.div>

            {/* Main heading */}
            <div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-bold leading-[0.85]">
                <div className="overflow-hidden">
                  {"Eco-Xent".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      className="text-gradient-gold inline-block"
                      initial={{ y: "120%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.5 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {char === "-" ? "\u2011" : char}
                    </motion.span>
                  ))}
                </div>
              </h1>

              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-foreground/60 font-heading italic mt-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Nature Reimagined. Luxury Redefined.
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              className="text-muted-foreground max-w-lg text-sm md:text-base leading-relaxed font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Discover the pinnacle of organic luxury. Handcrafted with rare botanicals and ancient herbal wisdom, reimagined for the modern connoisseur.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-wrap gap-4 mt-2"
            >
              <MagneticButton
                href="#products"
                strength={0.3}
                className="group px-10 py-4 bg-primary text-primary-foreground font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full transition-all duration-500 shadow-lg shadow-primary/20 hover:shadow-primary/40"
              >
                <span className="flex items-center gap-2">
                  Shop Now
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </MagneticButton>

              <MagneticButton
                href="#experience"
                strength={0.3}
                className="px-10 py-4 border border-primary/30 text-primary font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full hover:bg-primary/5 hover:border-primary/50 transition-all duration-500"
              >
                Explore Collection
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="flex gap-12 mt-8 pt-8 border-t border-border/20"
            >
              {[
                { value: `${count1}%`, label: "Organic" },
                { value: `${count2}K+`, label: "Happy Clients" },
                { value: "0%", label: "Chemicals" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-heading font-bold text-gradient-gold">
                    {stat.value}
                  </p>
                  <p className="text-[10px] md:text-xs text-muted-foreground font-body tracking-wider uppercase mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.p
          className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/40 font-body"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.p>
        <motion.div className="w-5 h-9 rounded-full border border-primary/25 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
