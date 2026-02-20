import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const features = [
  { icon: "🌿", title: "Deep Healing Formula", desc: "Botanical healing formulas skin aur baalon ki jad tak kaam karte hain — sirf surface pe nahi." },
  { icon: "✨", title: "100% Qudrati Ilaaj", desc: "Koi synthetic chemical nahi — sirf qudrat ki deni hoi healing power, seedha aapki skin ke liye." },
  { icon: "🌍", title: "Proven Healing Results", desc: "Hazaron customers ne real healing results dekhe — hair fall ruka, skin saaf huwi." },
];

const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Subtle section divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full bg-primary/30" />

      <div ref={ref} className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            className="text-primary tracking-[0.35em] uppercase text-[11px] font-body font-semibold mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            The Eco-Xent Difference
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Qudrat se Healing —{" "}
            <span className="text-gradient-gold">Har Product Mein</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground font-body text-base leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Eco-Xent ke har product mein ancient Ayurvedic healing aur modern botanical science ka kamaal hai —
            jo aapki skin aur baalon ko andar se theek karta hai.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-8"
          >
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body font-semibold text-sm text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "hsl(95 45% 28%)" }}
            >
              Explore Products
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-2xl p-7 border border-border bg-secondary/30 hover:border-primary/30 hover:bg-primary/3 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/12 flex items-center justify-center text-2xl mb-5 group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
