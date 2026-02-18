import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpacedHeading from "./SpacedHeading";
import MagneticButton from "./MagneticButton";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [8, 0]);

  return (
    <section ref={sectionRef} className="relative py-8 px-4 md:px-8 overflow-hidden">
      <motion.div
        className="relative rounded-3xl overflow-hidden min-h-[600px] flex items-center justify-center"
        style={{ scale }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-forest to-secondary" />

        {/* Animated circles */}
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
          className="relative z-10 text-center max-w-3xl mx-auto px-6 py-20"
        >
          <SpacedHeading
            text="You don't get many chances to be early"
            className="text-3xl md:text-4xl lg:text-5xl text-gradient-gold mb-4"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <SpacedHeading
              text="To lead, not follow"
              className="text-2xl md:text-3xl lg:text-4xl text-foreground/50 mb-8"
              delay={0.8}
            />
          </motion.div>

          <motion.p
            className="text-muted-foreground font-body mb-10 leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            Eco-Xent is already in the hands of thousands who chose purity over chemicals. 
            If you're ready, we'll welcome you to the organic revolution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <MagneticButton
              href="#products"
              strength={0.4}
              className="inline-flex items-center gap-3 px-12 py-5 bg-primary text-primary-foreground font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow duration-500"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              href="#contact"
              strength={0.4}
              className="inline-flex items-center gap-3 px-12 py-5 border border-primary/30 text-primary font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full hover:bg-primary/5 hover:border-primary/50 transition-all duration-500"
            >
              <span>Contact Us</span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
