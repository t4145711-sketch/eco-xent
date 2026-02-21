import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Sparkles, Shield, Droplets } from "lucide-react";

const features = [
  { icon: Leaf, title: "100% Organic", desc: "Pure botanical ingredients sourced from pristine ecosystems.", stat: "100%", statLabel: "Pure" },
  { icon: Sparkles, title: "Handcrafted", desc: "Every product is artisan-made with meticulous attention.", stat: "50+", statLabel: "Hours" },
  { icon: Shield, title: "Cruelty Free", desc: "Ethically produced with zero animal testing.", stat: "Zero", statLabel: "Harm" },
  { icon: Droplets, title: "Pure Formulas", desc: "No parabens, sulfates, or synthetic chemicals.", stat: "0%", statLabel: "Chemicals" },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section id="experience" className="relative py-28 overflow-hidden bg-white">
      <div className="absolute inset-0 gradient-radial-gold opacity-20" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="text-gold tracking-[0.4em] uppercase text-[11px] font-body font-medium mb-4">The Promise</p>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-foreground mb-6">
            Feel The <span className="text-gradient-gold italic">Transformation</span>
          </h2>
          <p className="text-muted-foreground font-body text-base leading-relaxed max-w-2xl mx-auto font-light">
            Every Eco-Xent creation is a symphony of nature's finest botanicals,
            ethically sourced and masterfully blended to deliver extraordinary results.
          </p>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12 }}
              whileHover={{ y: -8 }}
              className="group rounded-xl p-6 lg:p-8 text-center border border-border hover:border-gold/20 transition-all duration-300"
            >
              <div className="mb-4">
                <p className="text-3xl lg:text-4xl font-heading font-light text-gradient-gold">{f.stat}</p>
                <p className="text-[9px] text-gold/40 font-body tracking-[0.3em] uppercase mt-1">{f.statLabel}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <f.icon className="w-4 h-4 text-gold-dark" />
              </div>
              <h3 className="text-base font-heading font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
