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
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Hero background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.img
          src={heroProducts}
          alt="Eco-Xent organic products collection"
          className="w-full h-full object-cover"
          style={{ scale: bgScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40" />
      </motion.div>

      {/* Green decorative band at top */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "hsl(95 45% 28%)" }} />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ y: textY, opacity }}
      >
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          {/* Overline */}
          <motion.div
            className="overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary tracking-[0.5em] uppercase text-[10px] md:text-xs font-body font-semibold whitespace-nowrap">
              100% Natural & Organic
            </p>
          </motion.div>

          {/* Brand name */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-bold leading-[0.85]">
            <div className="overflow-hidden">
              {"Eco‑Xent".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="text-gradient-gold inline-block"
                  initial={{ y: "110%", rotateX: 40 }}
                  animate={{ y: "0%", rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          </h1>

          {/* Tagline */}
          <div className="overflow-hidden">
            <motion.p
              className="text-xl md:text-2xl text-foreground/60 font-heading italic"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Heal Naturally. Glow Beautifully.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <a
              href="#products"
              className="px-8 py-3.5 rounded-full font-body font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: "hsl(95 45% 28%)", color: "#fff" }}
            >
              Shop Now
            </a>
            <a
              href="https://wa.me/923295991062"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full font-body font-semibold text-sm tracking-wide border-2 transition-all duration-300 hover:-translate-y-0.5"
              style={{ borderColor: "hsl(95 45% 28%)", color: "hsl(95 45% 28%)" }}
            >
              WhatsApp Order
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
