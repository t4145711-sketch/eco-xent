import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Sparkles, Shield, Droplets } from "lucide-react";

const features = [
  { icon: Leaf, title: "100% Organic", desc: "Pure botanical ingredients sourced from pristine ecosystems" },
  { icon: Sparkles, title: "Handcrafted", desc: "Every product is artisan-made with meticulous attention" },
  { icon: Shield, title: "Cruelty Free", desc: "Ethically produced with zero animal testing" },
  { icon: Droplets, title: "Pure Formulas", desc: "No parabens, sulfates, or synthetic chemicals" },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, hsl(160 70% 14% / 0.5) 0%, transparent 60%)",
            "radial-gradient(ellipse at 80% 50%, hsl(43 50% 55% / 0.1) 0%, transparent 60%)",
            "radial-gradient(ellipse at 20% 50%, hsl(160 70% 14% / 0.5) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="text-primary tracking-[0.4em] uppercase text-sm font-body mb-4">The Eco-Xent Promise</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-gradient-gold mb-8">
            Feel The Transformation
          </h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            Every Eco-Xent creation is a symphony of nature's finest botanicals, 
            ethically sourced and masterfully blended to deliver results that transcend 
            ordinary skincare. This isn't just a product — it's a ritual of self-transformation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group glass-gold rounded-2xl p-8 text-center hover:glow-gold transition-shadow duration-700"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-500">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
