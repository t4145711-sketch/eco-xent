import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Sparkles, FlaskConical } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Pure Botanicals",
    desc: "Every ingredient sourced from organic farms — no synthetic chemicals, ever.",
    accent: "from-emerald-500/15 to-green-600/10",
    iconColor: "text-emerald-600",
    borderHover: "hover:border-emerald-500/30",
  },
  {
    icon: Sparkles,
    title: "Handcrafted",
    desc: "Small-batch artisan production ensures the highest quality in every bottle.",
    accent: "from-amber-500/15 to-yellow-600/10",
    iconColor: "text-amber-600",
    borderHover: "hover:border-amber-500/30",
  },
  {
    icon: FlaskConical,
    title: "Science-Backed",
    desc: "Formulations developed with modern botanical science for proven results.",
    accent: "from-blue-500/15 to-indigo-600/10",
    iconColor: "text-blue-600",
    borderHover: "hover:border-blue-500/30",
  },
];

const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            className="text-gold tracking-[0.4em] uppercase text-[11px] font-body font-medium mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            The Difference
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-heading font-semibold text-foreground mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Where Nature Meets{" "}
            <span className="text-gradient-gold italic">Innovation</span>
          </motion.h2>
          <motion.div
            className="w-16 h-px bg-gold/40 mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`relative rounded-2xl p-8 md:p-10 bg-white border border-border/60 ${f.borderHover} transition-all duration-500 group text-center shadow-sm hover:shadow-xl hover:shadow-black/[0.04]`}
              >
                {/* Top gradient accent line */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Icon container */}
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${f.accent} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className={`w-7 h-7 ${f.iconColor}`} strokeWidth={1.5} />
                </div>

                <h3 className="text-lg font-heading font-semibold text-foreground mb-3 tracking-wide">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {f.desc}
                </p>

                {/* Bottom decorative dot */}
                <div className="flex justify-center mt-6">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gold/30 group-hover:bg-gold/60 transition-colors duration-500`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
