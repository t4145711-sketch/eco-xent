import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import TextReveal from "./TextReveal";

const CTABanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Parallax background pattern */}
      <motion.div
        className="absolute inset-0"
        style={{ y: parallaxY }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-secondary to-forest-deep" />
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-primary/20 rounded-full"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(600px circle at 30% 50%, hsl(43 50% 55% / 0.12) 0%, transparent 60%)",
            "radial-gradient(600px circle at 70% 50%, hsl(43 50% 55% / 0.12) 0%, transparent 60%)",
            "radial-gradient(600px circle at 30% 50%, hsl(43 50% 55% / 0.12) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.p
            className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Limited Edition
          </motion.p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-gradient-gold mb-6">
            <TextReveal delay={0.3}>Begin Your Luxury Ritual</TextReveal>
          </h2>
          <p className="text-muted-foreground font-body mb-10 leading-relaxed">
            <TextReveal delay={0.6} staggerDelay={0.02}>
              Join thousands of discerning individuals who have elevated their daily routine with Eco-Xent's premium organic collection. Free shipping on orders above ₹999.
            </TextReveal>
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
          >
            <MagneticButton
              href="#products"
              strength={0.4}
              className="inline-flex items-center gap-3 px-12 py-5 bg-primary text-primary-foreground font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full animate-glow-pulse"
            >
              <span>Shop The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
