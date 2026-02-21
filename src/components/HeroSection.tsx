import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-luxury-bg.jpg";
import { ArrowRight, Sparkles } from "lucide-react";

const FloatingParticle = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: "radial-gradient(circle, hsl(80 45% 45% / 0.6) 0%, transparent 70%)",
    }}
    animate={{
      y: [0, -25, 0],
      opacity: [0.2, 0.6, 0.2],
    }}
    transition={{
      duration: 6 + Math.random() * 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ marginTop: "72px" }}
    >
      <div className="relative w-full" style={{ minHeight: "92vh" }}>
        {/* Cinematic Background */}
        <motion.div
          className="absolute inset-0"
          style={{ y: bgY, scale: bgScale }}
        >
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.4)" }}
          />
          {/* Gold light overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 30% 45%, hsl(120 35% 28% / 0.15) 0%, transparent 70%)",
            }}
          />
          {/* Dark vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, hsl(120 35% 8% / 0.6) 100%)",
            }}
          />
        </motion.div>

        {/* Floating light particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <FloatingParticle
              key={i}
              delay={i * 1.2}
              x={`${15 + i * 18}%`}
              y={`${20 + i * 15}%`}
              size={3 + i * 1.5}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 container mx-auto px-6 md:px-10 flex flex-col justify-center"
          style={{ y: textY, opacity, minHeight: "92vh" }}
        >
          <div className="max-w-3xl py-20">
            {/* Luxury overline */}
            <motion.div
              className="inline-flex items-center gap-2.5 mb-8 px-5 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-gold-light text-[11px] font-body font-medium tracking-[0.3em] uppercase">
                Luxury Organic Personal Care
              </span>
            </motion.div>

            {/* Main headline — elegant serif */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                className="text-[clamp(3rem,8vw,6.5rem)] font-heading font-light leading-[0.92] text-white tracking-tight"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Pure Nature.
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                className="text-[clamp(3rem,8vw,6.5rem)] font-heading font-light leading-[0.92] tracking-tight"
                style={{ color: "hsl(80 45% 55%)" }}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                Powerful Results.
              </motion.h1>
            </div>

            <motion.p
              className="text-white/50 font-body text-base md:text-lg leading-relaxed mb-12 max-w-xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Advanced organic formulations for healthy hair & radiant skin.
              Handcrafted with the finest botanical ingredients.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <motion.a
                href="#products"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-body font-medium text-sm tracking-widest uppercase transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, hsl(120 35% 28%), hsl(120 40% 22%))",
                  color: "hsl(0 0% 100%)",
                  boxShadow: "0 4px 24px hsl(120 35% 28% / 0.3)",
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 40px hsl(120 35% 28% / 0.5)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Shop Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
              <motion.a
                href="#about"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-body font-medium text-sm tracking-widest uppercase border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-500"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Our Story
              </motion.a>
            </motion.div>

            {/* Trust line */}
            <motion.div
              className="flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {["100% Organic", "Cruelty Free", "Handcrafted"].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold/60" />
                  <span className="text-white/40 text-[11px] font-body tracking-widest uppercase">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroSection;
