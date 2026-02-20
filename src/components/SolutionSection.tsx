import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpacedHeading from "./SpacedHeading";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";
import { ArrowRight } from "lucide-react";

const features = [
  {
    icon: "🌿",
    title: "Smaller than a skin cell",
    desc: "Our nano-botanical technology delivers nutrients deep within the dermis — not just on the surface.",
  },
  {
    icon: "✨",
    title: "Effortlessly natural",
    desc: "No complicated routines. No synthetic ingredients. Just pure organic power — simplified.",
  },
  {
    icon: "🌍",
    title: "Zero harmful chemicals",
    desc: "We completely bypass parabens, sulfates, and silicones — no toxins, no compromise.",
  },
];

const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.section ref={sectionRef} className="relative py-32 overflow-hidden" style={{ scale, opacity }}>
      {/* Glow background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(800px circle at 30% 50%, hsl(43 50% 55% / 0.04) 0%, transparent 60%)",
            "radial-gradient(800px circle at 70% 50%, hsl(43 50% 55% / 0.06) 0%, transparent 60%)",
            "radial-gradient(800px circle at 30% 50%, hsl(43 50% 55% / 0.04) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            The Eco-Xent Difference
          </motion.p>

          <SpacedHeading
            text="We found a better way"
            className="text-4xl md:text-5xl lg:text-6xl text-gradient-gold mb-6"
          />

          <motion.p
            className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <TextReveal delay={0.4}>
              Meet Eco-Xent. Powered by ancient Ayurvedic wisdom and modern botanical science, 
              our formulas deliver 100% organic nutrition directly where your skin needs it most.
            </TextReveal>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <MagneticButton
              href="#products"
              strength={0.4}
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-500"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Feature cards with stagger + blur reveal */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.8 + i * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: "linear-gradient(160deg, hsl(43 50% 55% / 0.05), hsl(160 40% 12% / 0.4))",
                border: "1px solid hsl(43 50% 55% / 0.08)",
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
              </div>
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px hsl(43 50% 55% / 0.15)" }}
              />
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SolutionSection;
