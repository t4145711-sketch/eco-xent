import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Sparkles, Shield, Droplets } from "lucide-react";

const features = [
  { icon: Leaf, title: "100% Organic", desc: "Pure botanical ingredients sourced from pristine ecosystems around the world." },
  { icon: Sparkles, title: "Handcrafted", desc: "Every product is artisan-made with meticulous attention to detail." },
  { icon: Shield, title: "Cruelty Free", desc: "Ethically produced with zero animal testing — a promise we live by." },
  { icon: Droplets, title: "Pure Formulas", desc: "No parabens, sulfates, or synthetic chemicals. Ever." },
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
            "radial-gradient(ellipse at 20% 50%, hsl(160 70% 14% / 0.4) 0%, transparent 60%)",
            "radial-gradient(ellipse at 80% 50%, hsl(43 50% 55% / 0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse at 20% 50%, hsl(160 70% 14% / 0.4) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <p className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium">The Eco-Xent Promise</p>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gradient-gold mb-8">
            Feel The Transformation
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
            Every Eco-Xent creation is a symphony of nature's finest botanicals, 
            ethically sourced and masterfully blended to deliver results that transcend 
            ordinary skincare.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group relative rounded-2xl p-8 text-center overflow-hidden transition-all duration-700"
              style={{
                background: "linear-gradient(160deg, hsl(43 50% 55% / 0.05), hsl(160 40% 12% / 0.3))",
                border: "1px solid hsl(43 50% 55% / 0.08)",
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px hsl(43 50% 55% / 0.15), 0 0 40px hsl(43 50% 55% / 0.08)" }}
              />
              <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors duration-500 border border-primary/10">
                <f.icon className="w-7 h-7 text-primary" />
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

export default ExperienceSection;
