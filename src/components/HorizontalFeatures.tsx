import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const features = [
  { icon: "💧", title: "Visible in 2 Weeks", desc: "See real results within 14 days of consistent use.", stat: "14", unit: "days" },
  { icon: "🌱", title: "100% Pure", desc: "Every ingredient is organic — no fillers, no synthetics.", stat: "100", unit: "%" },
  { icon: "🛡️", title: "Safe for All", desc: "Dermatologist tested — safe for the entire family.", stat: "0", unit: "chemicals" },
  { icon: "♻️", title: "Eco Packaging", desc: "Biodegradable materials, recyclable packaging.", stat: "0", unit: "waste" },
];

const perks = [
  "COD Available Nationwide",
  "Fast 2-4 Day Delivery",
  "Money Back Guarantee",
  "No Preservatives",
  "Cruelty Free & Vegan",
  "Handcrafted in Small Batches",
];

const HorizontalFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  const perksRef = useRef(null);
  const isPerksInView = useInView(perksRef, { once: false, margin: "-60px" });

  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <motion.p
            className="text-gold tracking-[0.4em] uppercase text-[11px] font-body font-medium mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            Why Choose Us
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-heading font-semibold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            The <span className="text-gradient-gold italic">Eco-Xent</span> Promise
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.7 }}
              whileHover={{ y: -8 }}
              className="rounded-xl p-7 border border-border hover:border-gold/20 transition-all duration-300 group text-center"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-base font-heading font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5">{f.desc}</p>
              <div className="pt-4 border-t border-border">
                <p className="text-2xl font-heading font-bold text-gradient-gold">{f.stat}<span className="text-sm">{f.unit === "%" ? "%" : ""}</span></p>
                <p className="text-[10px] text-muted-foreground/50 font-body tracking-widest uppercase mt-1">{f.unit !== "%" ? f.unit : "organic"}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div
          ref={perksRef}
          className="rounded-xl border border-gold/10 px-8 py-6"
          style={{ background: "hsl(40 30% 97%)" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {perks.map((perk, i) => (
              <motion.div
                key={perk}
                initial={{ opacity: 0, x: -15 }}
                animate={isPerksInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-sm font-body text-foreground/60">{perk}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalFeatures;
