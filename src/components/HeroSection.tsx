import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroProducts from "@/assets/hero-products.jpg";
import logoImg from "@/assets/ecoxent-logo-new.jpeg";

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
          className="w-full h-full object-cover opacity-40"
          style={{ scale: bgScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </motion.div>

      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ y: textY, opacity }}
      >
        <div className="flex flex-col items-center text-center gap-8 max-w-2xl mx-auto">
          {/* Logo with scale + fade reveal */}
          <motion.div
            className="overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={logoImg}
              alt="Eco-Xent Logo"
              className="h-28 sm:h-36 md:h-44 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* Tagline slide up */}
          <div className="overflow-hidden">
            <motion.p
              className="text-lg md:text-xl text-foreground/60 font-heading italic"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Nature Reimagined. Luxury Redefined.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
