import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BottleScene from "./BottleScene";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-25 scale-110" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </motion.div>

      {/* Animated radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(600px circle at 30% 50%, hsl(43 50% 55% / 0.06) 0%, transparent 60%)",
            "radial-gradient(600px circle at 70% 40%, hsl(43 50% 55% / 0.08) 0%, transparent 60%)",
            "radial-gradient(600px circle at 30% 50%, hsl(43 50% 55% / 0.06) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 3}px`,
            height: `${1 + Math.random() * 3}px`,
            background: `hsl(43 50% 55% / ${0.15 + Math.random() * 0.25})`,
          }}
          animate={{
            y: [0, -(20 + Math.random() * 40), 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div className="container mx-auto px-6 relative z-10" style={{ y: textY }}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-32">
          {/* Left - Text */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 2.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-12 bg-primary/60" />
                <p className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium">
                  Premium Organic Collection
                </p>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] mb-4">
                <span className="text-gradient-gold block">Eco-Xent</span>
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] flex-1 max-w-[60px] bg-gradient-to-r from-primary to-transparent" />
                <p className="text-lg md:text-xl text-foreground/70 font-heading italic">
                  Nature Reimagined. Luxury Redefined.
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.2 }}
              className="text-muted-foreground max-w-lg text-sm md:text-base leading-relaxed font-body"
            >
              Discover the pinnacle of organic luxury. Handcrafted with rare botanicals 
              and ancient herbal wisdom, reimagined for the modern connoisseur.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.5 }}
              className="flex flex-wrap gap-4 mt-2"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full overflow-hidden transition-all duration-500"
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 glow-gold-strong opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.a>
              <motion.a
                href="#experience"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 border border-primary/30 text-primary font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full hover:bg-primary/5 hover:border-primary/50 transition-all duration-500"
              >
                Explore Collection
              </motion.a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.8 }}
              className="flex gap-8 mt-6 pt-6 border-t border-border/30"
            >
              {[
                { value: "100%", label: "Organic" },
                { value: "5K+", label: "Happy Clients" },
                { value: "0%", label: "Chemicals" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl md:text-2xl font-heading font-bold text-gradient-gold">{stat.value}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground font-body tracking-wider uppercase mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - 3D Bottle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 3 }}
            className="h-[350px] md:h-[500px] lg:h-[600px] relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 via-transparent to-forest/10 blur-3xl" />
            <BottleScene />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-primary/30 flex items-start justify-center p-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
