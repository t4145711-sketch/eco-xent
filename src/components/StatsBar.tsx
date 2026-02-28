import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 5000, suffix: "+", label: "Happy Customers", icon: "✦" },
  { value: 100, suffix: "%", label: "Organic Ingredients", icon: "✦" },
  { value: 7, suffix: "", label: "Premium Products", icon: "✦" },
  { value: 0, suffix: "%", label: "Harmful Chemicals", icon: "✦" },
];

const Counter = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) { setDisplay(0); return; }
    let step = 0;
    const steps = 50;
    const timer = setInterval(() => {
      step++;
      setDisplay(Math.round((1 - Math.pow(1 - step / steps, 3)) * value));
      if (step >= steps) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [value, inView]);
  return <>{display.toLocaleString()}{suffix}</>;
};

const StatsBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(90 30% 14%) 0%, hsl(90 28% 22%) 50%, hsl(90 30% 14%) 100%)",
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="text-center"
            >
              <p className="text-gold/60 text-sm mb-2 font-heading">{stat.icon}</p>
              <motion.p
                className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-white mb-1"
                whileHover={{ scale: 1.05 }}
              >
                <Counter value={stat.value} suffix={stat.suffix} inView={isInView} />
              </motion.p>
              <p className="text-white/40 text-[11px] font-body font-light tracking-widest uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
