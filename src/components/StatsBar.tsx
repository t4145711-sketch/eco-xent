import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 100, suffix: "%", label: "Organic", sublabel: "ingredients" },
  { value: 5, suffix: "K+", label: "Happy", sublabel: "customers" },
  { value: 50, suffix: "+", label: "Products", sublabel: "handcrafted" },
  { value: 0, suffix: "%", label: "Chemicals", sublabel: "guaranteed" },
];

const Counter = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let step = 0;
    const steps = 40;
    const timer = setInterval(() => {
      step++;
      setDisplay(Math.round((1 - Math.pow(1 - step / steps, 3)) * value));
      if (step >= steps) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [value, inView]);
  return <>{display}{suffix}</>;
};

const StatsBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  return (
    <motion.section ref={sectionRef} className="relative py-20 overflow-hidden" style={{ scale: sectionScale }}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-forest to-secondary" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center group"
            >
              <motion.p
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gradient-gold mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Counter value={stat.value} suffix={stat.suffix} inView={isInView} />
              </motion.p>
              <p className="text-sm text-foreground/70 font-body font-medium">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground/50 font-body tracking-wider uppercase">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsBar;
