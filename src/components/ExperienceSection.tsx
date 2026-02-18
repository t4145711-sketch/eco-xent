import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Leaf, Sparkles, Shield, Droplets } from "lucide-react";
import TextReveal from "./TextReveal";

const features = [
  { icon: Leaf, title: "100% Organic", desc: "Pure botanical ingredients sourced from pristine ecosystems around the world.", color: "hsl(120, 40%, 50%)" },
  { icon: Sparkles, title: "Handcrafted", desc: "Every product is artisan-made with meticulous attention to detail.", color: "hsl(43, 50%, 55%)" },
  { icon: Shield, title: "Cruelty Free", desc: "Ethically produced with zero animal testing — a promise we live by.", color: "hsl(200, 50%, 55%)" },
  { icon: Droplets, title: "Pure Formulas", desc: "No parabens, sulfates, or synthetic chemicals. Ever.", color: "hsl(280, 40%, 55%)" },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={sectionRef} id="experience" className="relative py-32 overflow-hidden">
      {/* Rotating gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: "conic-gradient(from 0deg, hsl(43 50% 55%), hsl(160 70% 14%), hsl(43 50% 55%))",
          rotate: bgRotate,
          filter: "blur(80px)",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary/50"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <p className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium">The Eco-Xent Promise</p>
            <motion.div
              className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary/50"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gradient-gold mb-8">
            <TextReveal delay={0.3}>Feel The Transformation</TextReveal>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
            <TextReveal delay={0.5} staggerDelay={0.02}>
              Every Eco-Xent creation is a symphony of nature's finest botanicals, ethically sourced and masterfully blended to deliver results that transcend ordinary skincare.
            </TextReveal>
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                y: -12, 
                transition: { duration: 0.4 },
              }}
              className="group relative rounded-2xl p-8 text-center overflow-hidden transition-all duration-700"
              style={{
                background: "linear-gradient(160deg, hsl(43 50% 55% / 0.05), hsl(160 40% 12% / 0.3))",
                border: "1px solid hsl(43 50% 55% / 0.08)",
              }}
            >
              {/* Hover glow behind */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${f.color}15, transparent 70%)`,
                }}
              />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px hsl(43 50% 55% / 0.15), 0 0 40px hsl(43 50% 55% / 0.08)" }}
              />

              <motion.div
                className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors duration-500 border border-primary/10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <f.icon className="w-7 h-7 text-primary" />
              </motion.div>
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
