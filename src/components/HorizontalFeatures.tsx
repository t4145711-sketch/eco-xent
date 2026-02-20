import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: "💧",
    title: "Fori Nataij",
    desc: "Products andar se kaam karte hain — sirf 2 hafte mein visible results dekhen.",
    stat: "2 weeks",
    statLabel: "to see results",
  },
  {
    icon: "🌱",
    title: "100% Pure",
    desc: "Har ingredient organic farms se — koi filler, koi synthetic, koi compromise nahi.",
    stat: "100%",
    statLabel: "organic sourced",
  },
  {
    icon: "🛡️",
    title: "Safe Formula",
    desc: "Dermatologist tested — koi side effect nahi, poori family ke liye safe.",
    stat: "0",
    statLabel: "side effects",
  },
  {
    icon: "♻️",
    title: "Eco Packaging",
    desc: "Biodegradable materials, recyclable packaging — environment ka khayal.",
    stat: "0%",
    statLabel: "plastic waste",
  },
];

const perks = [
  "COD Available across Pakistan",
  "Fast 2-4 day delivery",
  "100% money back guarantee",
  "No artificial preservatives",
  "Cruelty free & vegan",
  "Handcrafted in small batches",
];

const HorizontalFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  const perksRef = useRef(null);
  const isPerksInView = useInView(perksRef, { once: false, margin: "-60px" });

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full bg-primary/30" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div ref={ref} className="text-center mb-14">
          <motion.p
            className="text-primary tracking-[0.35em] uppercase text-[11px] font-body font-semibold mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            Why Eco-Xent
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Kyun Choose Karein <span className="text-gradient-gold">Eco-Xent?</span>
          </motion.h2>
        </div>

        {/* 4-column feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="rounded-2xl p-7 border border-border bg-secondary/20 hover:border-primary/30 hover:bg-primary/3 transition-all duration-300 group text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center text-2xl mx-auto mb-5 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="text-base font-heading font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5">{f.desc}</p>
              <div className="pt-4 border-t border-border">
                <p className="text-2xl font-heading font-black text-gradient-gold">{f.stat}</p>
                <p className="text-[10px] text-primary/50 font-body tracking-widest uppercase mt-1">{f.statLabel}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Perks checklist strip */}
        <div
          ref={perksRef}
          className="rounded-2xl border border-primary/15 bg-primary/3 px-8 py-6"
          style={{ background: "linear-gradient(135deg, hsl(95 45% 32% / 0.04), hsl(95 45% 32% / 0.02))" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {perks.map((perk, i) => (
              <motion.div
                key={perk}
                initial={{ opacity: 0, x: -15 }}
                animate={isPerksInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-body text-foreground/70">{perk}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalFeatures;
