import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SpacedHeading from "./SpacedHeading";

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ scale: sectionScale, opacity: sectionOpacity }}
    >
      {/* Background texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background" />
      </motion.div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Problem statement */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.p
            className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            The Hidden Truth
          </motion.p>

          <SpacedHeading
            text="Most skincare products never truly nourish your skin"
            className="text-3xl md:text-4xl lg:text-5xl text-gradient-gold mb-8 leading-tight"
            delay={0.2}
          />
        </div>

        {/* Product Details - Hair Healer Oil */}
        <motion.div
          className="max-w-3xl mx-auto mb-20 rounded-2xl p-8 md:p-10"
          style={{
            background: "linear-gradient(160deg, hsl(43 50% 55% / 0.04), hsl(160 40% 12% / 0.5))",
            border: "1px solid hsl(43 50% 55% / 0.1)",
          }}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-gradient-gold mb-4">Hair Healer Oil</h3>
          <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-6">
            Indulge in a powerful solution to stop hair fall and promote healthier hair. This nourishing oil is designed to strengthen hair follicles, reduce hair fall, and stimulate new hair growth. It deeply nourishes and revitalizes the scalp, while promoting thicker, fuller hair. With regular use, this oil helps to restore hair strength, prevent breakage, and support long-term hair health, leaving your hair looking vibrant and resilient.
          </p>

          {/* Key Benefits */}
          <div className="mb-6">
            <h4 className="text-sm font-body font-semibold text-primary tracking-[0.2em] uppercase mb-3">Key Benefits</h4>
            <ul className="space-y-2">
              {[
                "Reduces hair fall effectively.",
                "Promotes natural hair growth.",
                "Strengthens and repairs damaged hair.",
                "Deeply nourishes the scalp.",
                "Enhances shine and smooth texture.",
              ].map((b, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground font-body"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                >
                  <span className="text-primary mt-0.5">✦</span>
                  {b}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Ingredients */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <h4 className="text-sm font-body font-semibold text-primary tracking-[0.2em] uppercase mb-3">Ingredients</h4>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              Coconut Oil, Castor Oil, Mustard Oil, Black Seed Oil, Onion Oil, Amla Oil, Neem Oil, Fenugreek, Hibiscus, Bhringraj, Rosemary Oil, Peppermint Oil, Vitamin E
            </p>
          </motion.div>

          {/* How to Use */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <h4 className="text-sm font-body font-semibold text-primary tracking-[0.2em] uppercase mb-3">How to Use</h4>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              Massage into scalp and hair. Leave overnight. Rinse with shampoo. Use 2–3 times weekly.
            </p>
          </motion.div>

          {/* Caution & Storage */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <div>
              <h4 className="text-sm font-body font-semibold text-primary tracking-[0.2em] uppercase mb-3">Caution</h4>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                Suitable for all hair types, perform a patch test before use. Avoid contact with eyes. Store in a cool, dry place, away from sunlight. For external use only.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-body font-semibold text-primary tracking-[0.2em] uppercase mb-3">How to Store</h4>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                Store in a cool and dry place, away from direct sunlight.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Transition question */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8 }}
        >
          <SpacedHeading
            text="What if your skincare actually worked?"
            className="text-2xl md:text-3xl lg:text-4xl text-foreground/50 italic"
            delay={1.9}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProblemSection;
