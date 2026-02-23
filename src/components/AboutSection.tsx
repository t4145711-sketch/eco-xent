import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Heart, Star, Shield } from "lucide-react";

const values = [
  { icon: Leaf, title: "Pure Ingredients", desc: "Every ingredient is organic and therapeutic — zero chemicals." },
  { icon: Heart, title: "Handcrafted Care", desc: "Each product is made by hand with love and precision." },
  { icon: Star, title: "Proven Results", desc: "Thousands of customers have seen real, visible improvements." },
  { icon: Shield, title: "Safe Formula", desc: "Family-safe therapeutic formulas with no harmful chemicals." },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-28 overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold tracking-[0.4em] uppercase text-[11px] font-body font-medium mb-4">Our Story</p>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-foreground mb-4">
            Rooted in <span className="text-gradient-gold italic">Nature</span>
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
        </motion.div>

        {/* Story */}
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-xl p-8 md:p-10 border border-border bg-cream">
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
                The Power of Botanicals
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed mb-5 font-light">
                Eco-Xent was born from a simple belief — <strong className="text-foreground/90 font-medium">nature heals better than chemicals.</strong> We saw a market flooded with synthetic products that only treat the surface while causing long-term damage.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-5 font-light">
                Our journey began by combining ancient Ayurvedic wisdom with modern botanical science. Every formula is designed for deep, lasting healing — not quick fixes.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed font-light">
                Today, <strong className="text-foreground/90 font-medium">thousands of families</strong> trust Eco-Xent for their daily personal care — and that trust is our greatest achievement.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {[
              { num: "5,000+", label: "Happy Customers", sub: "Nationwide" },
              { num: "100%", label: "Natural Ingredients", sub: "Zero chemicals" },
              { num: "7", label: "Premium Products", sub: "Handcrafted" },
              { num: "0%", label: "Compromise", sub: "On quality" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-5 rounded-xl px-6 py-4 border border-border hover:border-gold/20 transition-all duration-300"
              >
                <div className="text-2xl font-heading font-bold text-gradient-gold min-w-[70px]">{stat.num}</div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">{stat.label}</p>
                  <p className="text-xs text-muted-foreground font-body">{stat.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -6 }}
              className="text-center rounded-xl p-7 border border-border hover:border-gold/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <v.icon className="w-4 h-4 text-gold-dark" />
              </div>
              <h4 className="font-heading font-semibold text-foreground mb-2">{v.title}</h4>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
