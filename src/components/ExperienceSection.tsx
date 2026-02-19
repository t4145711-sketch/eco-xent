import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Leaf, Sparkles, Shield, Droplets } from "lucide-react";
import TextReveal from "./TextReveal";

const features = [
  { icon: Leaf, title: "100% Organic", desc: "Pure botanical ingredients sourced from pristine ecosystems around the world.", stat: "100%", statLabel: "Pure" },
  { icon: Sparkles, title: "Handcrafted", desc: "Every product is artisan-made with meticulous attention to detail.", stat: "50+", statLabel: "Hours" },
  { icon: Shield, title: "Cruelty Free", desc: "Ethically produced with zero animal testing — a promise we live by.", stat: "Zero", statLabel: "Harm" },
  { icon: Droplets, title: "Pure Formulas", desc: "No parabens, sulfates, or synthetic chemicals. Ever.", stat: "0%", statLabel: "Chemicals" },
];

const AnimatedCounter = ({ value, inView }: { value: string; inView: boolean }) => {
  const [display, setDisplay] = useState(value);
  
  useEffect(() => {
    if (!inView) return;
    const numMatch = value.match(/\d+/);
    if (!numMatch) { setDisplay(value); return; }
    const target = parseInt(numMatch[0]);
    let current = 0;
    const steps = 30;
    const interval = setInterval(() => {
      current++;
      const progress = 1 - Math.pow(1 - current / steps, 3);
      const num = Math.round(progress * target);
      setDisplay(value.replace(/\d+/, String(num)));
      if (current >= steps) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [value, inView]);

  return <span>{display}</span>;
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.2], [0.92, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <motion.section
      ref={sectionRef}
      id="experience"
      className="relative py-32 overflow-hidden"
      style={{ scale: sectionScale, opacity: sectionOpacity }}
    >
      {/* Floating line elements */}
      <motion.div
        className="absolute right-0 top-1/4 w-px h-48 bg-gradient-to-b from-transparent via-primary/15 to-transparent"
        style={{ y: parallaxY }}
      />
      <motion.div
        className="absolute left-0 bottom-1/4 w-px h-32 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
        style={{ y: useTransform(parallaxY, v => -v) }}
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary/50"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <p className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium">The Eco-Xent Promise</p>
            <motion.div
              className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary/50"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gradient-gold mb-8">
            <TextReveal delay={0.3}>Feel The Transformation</TextReveal>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
            <TextReveal delay={0.5} staggerDelay={0.02}>
              Every Eco-Xent creation is a symphony of nature's finest botanicals, ethically sourced and masterfully blended to deliver results that transcend ordinary skincare.
            </TextReveal>
          </p>
        </motion.div>

        {/* Bento-style grid with blur-in animation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group relative rounded-2xl p-6 lg:p-8 text-center overflow-hidden"
              style={{
                background: "linear-gradient(160deg, hsl(43 50% 55% / 0.04), hsl(160 40% 12% / 0.3))",
                border: "1px solid hsl(43 50% 55% / 0.06)",
              }}
            >
              {/* Hover shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
              </div>

              {/* Border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px hsl(43 50% 55% / 0.12)" }}
              />

              {/* Big stat number */}
              <div className="mb-4">
                <p className="text-3xl lg:text-4xl font-heading font-bold text-gradient-gold leading-none">
                  <AnimatedCounter value={f.stat} inView={isInView} />
                </p>
                <p className="text-[9px] text-primary/40 font-body tracking-[0.3em] uppercase mt-1">{f.statLabel}</p>
              </div>

              <motion.div
                className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-500 border border-primary/8"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <f.icon className="w-5 h-5 text-primary" />
              </motion.div>
              <h3 className="text-base font-heading font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ExperienceSection;
