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

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [5, 0]);

  return (
    <section ref={sectionRef} className="relative py-8 px-4 md:px-8 overflow-hidden">
      <motion.div
        className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center justify-center"
        style={{ scale, borderRadius }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-forest to-secondary" />

        {/* Geometric circles */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-primary/30 rounded-full"
              style={{
                width: `${150 + i * 120}px`,
                height: `${150 + i * 120}px`,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>

        {/* Floating glow */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(600px circle at 30% 50%, hsl(43 50% 55% / 0.1) 0%, transparent 60%)",
              "radial-gradient(600px circle at 70% 50%, hsl(43 50% 55% / 0.1) 0%, transparent 60%)",
              "radial-gradient(600px circle at 30% 50%, hsl(43 50% 55% / 0.1) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          ref={ref}
          style={{ rotateX, transformPerspective: 1200 }}
          className="relative z-10 text-center max-w-2xl mx-auto px-6 py-20"
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
              Join thousands of discerning individuals who have elevated their daily routine with Eco-Xent's premium organic collection.
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
              className="inline-flex items-center gap-3 px-12 py-5 bg-primary text-primary-foreground font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow duration-500"
            >
              <span>Shop The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTABanner;
