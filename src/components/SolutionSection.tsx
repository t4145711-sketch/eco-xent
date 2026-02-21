import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  { icon: "🌿", title: "Pure Botanicals", desc: "Every ingredient sourced from organic farms — no synthetic chemicals, ever." },
  { icon: "✨", title: "Handcrafted", desc: "Small-batch artisan production ensures the highest quality in every bottle." },
  { icon: "🧬", title: "Science-Backed", desc: "Formulations developed with modern botanical science for proven results." },
];

const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div ref={ref} className="container mx-auto px-6">
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

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
              whileHover={{ y: -6 }}
              className="rounded-xl p-8 border border-border hover:border-gold/20 transition-all duration-300 group text-center"
            >
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-2xl mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
