import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SpacedHeading from "./SpacedHeading";

const AnimatedPercent = ({ target, inView }: { target: number; inView: boolean }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let step = 0;
    const steps = 40;
    const timer = setInterval(() => {
      step++;
      setVal(Math.round((1 - Math.pow(1 - step / steps, 3)) * target));
      if (step >= steps) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span>{val}%</span>;
};

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background" />
      </motion.div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Problem statement */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.p
            className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            The Hidden Truth
          </motion.p>

          <SpacedHeading
            text="Most skincare products never truly nourish your skin"
            className="text-3xl md:text-4xl lg:text-5xl text-gradient-gold mb-8 leading-tight"
            delay={0.2}
          />

          <motion.p
            className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Most of what you apply sits on the surface. Synthetic chemicals, parabens, 
            and harsh sulfates create an illusion of care — while silently damaging 
            your skin's natural barrier.
          </motion.p>
        </div>

        {/* Shocking stats */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { percent: 85, label: "of skincare products", sublabel: "contain harmful chemicals", icon: "⚠️" },
            { percent: 70, label: "of ingredients", sublabel: "never penetrate the skin", icon: "🧪" },
            { percent: 60, label: "of consumers", sublabel: "unknowingly use toxins daily", icon: "💔" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 1 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl p-8 text-center group overflow-hidden"
              style={{
                background: "linear-gradient(160deg, hsl(0 30% 15% / 0.15), hsl(160 40% 8% / 0.5))",
                border: "1px solid hsl(0 30% 40% / 0.1)",
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: "radial-gradient(circle at center, hsl(0 50% 50% / 0.05), transparent 70%)" }}
              />
              <div className="text-3xl mb-3">{stat.icon}</div>
              <p className="text-4xl md:text-5xl font-heading font-bold text-foreground/90 mb-2">
                <AnimatedPercent target={stat.percent} inView={isInView} />
              </p>
              <p className="text-sm text-foreground/60 font-body font-medium">{stat.label}</p>
              <p className="text-xs text-muted-foreground font-body mt-1">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        {/* Transition question */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8 }}
        >
          <SpacedHeading
            text="What if your skincare actually worked?"
            className="text-2xl md:text-3xl lg:text-4xl text-foreground/50 italic"
            delay={1.9}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
