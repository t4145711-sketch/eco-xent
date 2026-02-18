import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpacedHeading from "./SpacedHeading";

const features = [
  {
    icon: "💧",
    title: "Just apply it",
    desc: "No complicated routines needed. Our products absorb instantly — delivering pure organic goodness in seconds.",
    stat: "30s",
    statLabel: "absorption",
  },
  {
    icon: "🌱",
    title: "100% pure ingredients",
    desc: "Every ingredient is sourced from certified organic farms. No fillers, no synthetics, no compromise.",
    stat: "100%",
    statLabel: "organic",
  },
  {
    icon: "🛡️",
    title: "Zero side effects",
    desc: "12 months of dermatological testing. Zero irritation events recorded. Safe for all skin types.",
    stat: "0",
    statLabel: "irritation",
  },
  {
    icon: "♻️",
    title: "Eco-friendly packaging",
    desc: "Biodegradable materials, recyclable containers. Every product shipped with zero plastic waste.",
    stat: "0%",
    statLabel: "plastic",
  },
];

const HorizontalFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 mb-16" ref={ref}>
        <div className="text-center">
          <motion.p
            className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            Why Eco-Xent
          </motion.p>
          <SpacedHeading
            text="Meet Eco-Xent™"
            className="text-4xl md:text-5xl lg:text-6xl text-gradient-gold"
          />
        </div>
      </div>

      {/* Horizontal scroll cards */}
      <motion.div className="flex gap-6 px-6" style={{ x }}>
        {/* Spacer */}
        <div className="flex-shrink-0 w-[10vw]" />
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="flex-shrink-0 w-[320px] md:w-[380px] rounded-3xl p-8 md:p-10 group relative overflow-hidden"
            style={{
              background: "linear-gradient(160deg, hsl(43 50% 55% / 0.05), hsl(160 40% 12% / 0.4))",
              border: "1px solid hsl(43 50% 55% / 0.08)",
            }}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/3" />
            </div>
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: "inset 0 0 0 1px hsl(43 50% 55% / 0.2), 0 0 40px hsl(43 50% 55% / 0.06)" }}
            />

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-3xl mb-6 group-hover:bg-primary/10 transition-colors duration-500">
                {f.icon}
              </div>

              <h3 className="text-xl font-heading font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">{f.desc}</p>

              {/* Stat */}
              <div className="pt-4 border-t border-border/20">
                <p className="text-3xl font-heading font-bold text-gradient-gold">{f.stat}</p>
                <p className="text-[10px] text-primary/40 font-body tracking-[0.3em] uppercase mt-1">{f.statLabel}</p>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="flex-shrink-0 w-[10vw]" />
      </motion.div>
    </section>
  );
};

export default HorizontalFeatures;
