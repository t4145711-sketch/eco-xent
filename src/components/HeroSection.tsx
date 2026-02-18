import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";
import TextReveal from "./TextReveal";
import heroBg from "@/assets/hero-bg.jpg";

const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Aurora ribbons */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-[200%] h-[60%]"
          style={{
            top: `${10 + i * 20}%`,
            left: "-50%",
            background: `linear-gradient(${90 + i * 30}deg, transparent 20%, hsl(43 50% 55% / ${0.03 + i * 0.01}) 40%, hsl(160 70% 30% / ${0.04 - i * 0.01}) 60%, transparent 80%)`,
            filter: `blur(${60 + i * 20}px)`,
          }}
          animate={{
            x: ["-10%", "10%", "-10%"],
            y: ["-5%", "5%", "-5%"],
            rotate: [i * 5, i * 5 + 10, i * 5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const FloatingShapes = () => {
  return (
    <>
      {/* Floating geometric shapes with depth */}
      {[...Array(8)].map((_, i) => {
        const size = 40 + Math.random() * 120;
        const isCircle = i % 3 === 0;
        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              width: size,
              height: size,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              border: `1px solid hsl(43 50% 55% / ${0.04 + Math.random() * 0.06})`,
              borderRadius: isCircle ? "50%" : `${Math.random() * 20}px`,
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
            animate={{
              y: [0, -(20 + Math.random() * 40), 0],
              rotate: [0, 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </>
  );
};

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 100 });
  const bgMoveX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const bgMoveY = useTransform(smoothMouseY, [-0.5, 0.5], [-10, 10]);
  const glowMoveX = useTransform(smoothMouseX, [-0.5, 0.5], [20, 80]);
  const glowMoveY = useTransform(smoothMouseY, [-0.5, 0.5], [30, 70]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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
      {/* Parallax image BG */}
      <motion.div className="absolute inset-0" style={{ y: bgY, x: bgMoveX }}>
        <motion.img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-15 scale-125"
          style={{ y: bgMoveY }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
      </motion.div>

      {/* Aurora background */}
      <AuroraBackground />
      <FloatingShapes />

      {/* Mouse-tracking glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [glowMoveX, glowMoveY],
            ([x, y]: number[]) =>
              `radial-gradient(800px circle at ${x}% ${y}%, hsl(43 50% 55% / 0.06) 0%, transparent 60%)`
          ),
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(43 50% 55% / 0.1), transparent)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ y: textY, opacity, scale }}
      >
        <div className="flex items-center justify-center min-h-screen py-32">
          <div className="flex flex-col gap-6 max-w-3xl">
            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 3, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-24 bg-gradient-to-r from-primary to-transparent origin-left"
            />

            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 3.2 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-primary tracking-[0.5em] uppercase text-[10px] md:text-xs font-body font-medium">
                  Premium Organic Collection
                </p>
              </div>
            </motion.div>

            {/* Main heading — character stagger */}
            <div className="mb-4">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-bold leading-[0.85]">
                <div className="overflow-hidden">
                  {"Eco-Xent".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      className="text-gradient-gold inline-block"
                      initial={{ y: "120%", opacity: 0, rotateX: 90 }}
                      animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 3.3 + i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {char === "-" ? "\u2011" : char}
                    </motion.span>
                  ))}
                </div>
              </h1>

              <div className="overflow-hidden mt-2">
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ y: "120%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 3.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="h-[1px] flex-1 max-w-[60px] bg-gradient-to-r from-primary to-transparent" />
                  <p className="text-lg md:text-xl lg:text-2xl text-foreground/70 font-heading italic">
                    Nature Reimagined. Luxury Redefined.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 4 }}
            >
              <p className="text-muted-foreground max-w-lg text-sm md:text-base leading-relaxed font-body">
                <TextReveal delay={4.1}>
                  Discover the pinnacle of organic luxury. Handcrafted with rare botanicals and ancient herbal wisdom, reimagined for the modern connoisseur.
                </TextReveal>
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 4.5 }}
              className="flex flex-wrap gap-4 mt-4"
            >
              <MagneticButton
                href="#products"
                strength={0.4}
                className="group px-10 py-5 bg-primary text-primary-foreground font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full transition-all duration-500 shadow-lg shadow-primary/20 hover:shadow-primary/40"
              >
                <span className="flex items-center gap-2">
                  Shop Now
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </MagneticButton>

              <MagneticButton
                href="#experience"
                strength={0.4}
                className="px-10 py-5 border border-primary/30 text-primary font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full hover:bg-primary/5 hover:border-primary/50 transition-all duration-500"
              >
                Explore Collection
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 4.8 }}
              className="flex gap-10 mt-8 pt-8 border-t border-border/20"
            >
              {[
                { value: `${count1}%`, label: "Organic" },
                { value: `${count2}K+`, label: "Happy Clients" },
                { value: "0%", label: "Chemicals" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-2xl md:text-3xl font-heading font-bold text-gradient-gold group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </p>
                  <p className="text-[10px] md:text-xs text-muted-foreground font-body tracking-wider uppercase mt-1">
                    {stat.label}
                  </p>
                </motion.div>
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
        transition={{ delay: 5.5 }}
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
