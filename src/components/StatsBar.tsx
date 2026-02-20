import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 5000, suffix: "+", label: "Happy Customers", icon: "👥" },
  { value: 100, suffix: "%", label: "Organic Ingredients", icon: "🌿" },
  { value: 5, suffix: "+", label: "Premium Products", icon: "✨" },
  { value: 0, suffix: "%", label: "Harmful Chemicals", icon: "🛡️" },
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
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(95 45% 28%) 0%, hsl(95 40% 35%) 50%, hsl(95 45% 28%) 100%)",
      }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p className="text-3xl mb-2">{stat.icon}</p>
              <motion.p
                className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-white mb-1"
                whileHover={{ scale: 1.05 }}
              >
                <Counter value={stat.value} suffix={stat.suffix} inView={isInView} />
              </motion.p>
              <p className="text-white/70 text-xs font-body font-medium tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
