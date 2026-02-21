import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <section className="relative py-8 px-4 md:px-8 overflow-hidden">
      <motion.div
        ref={ref}
        className="relative rounded-2xl overflow-hidden min-h-[500px] flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, hsl(150 30% 15%) 0%, hsl(150 25% 22%) 50%, hsl(150 30% 15%) 100%)",
        }}
      >
        {/* Subtle gold light */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, hsl(40 55% 52% / 0.08) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 text-center max-w-2xl mx-auto px-6 py-20">
          <motion.p
            className="text-gold/60 tracking-[0.4em] uppercase text-[11px] font-body font-medium mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Join the Movement
          </motion.p>

          <motion.h2
            className="text-3xl md:text-5xl font-heading font-light text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Experience the Power of
          </motion.h2>
          <motion.h2
            className="text-3xl md:text-5xl font-heading font-light mb-8 leading-tight"
            style={{ color: "hsl(40 55% 60%)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
          >
            Pure Botanicals
          </motion.h2>

          <motion.p
            className="text-white/40 font-body mb-10 leading-relaxed max-w-lg mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            Already trusted by thousands who chose purity over chemicals.
            Your transformation starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#products"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-body font-medium text-sm tracking-widest uppercase text-white"
              style={{
                background: "linear-gradient(135deg, hsl(40 55% 48%), hsl(40 50% 42%))",
                boxShadow: "0 4px 24px hsl(40 55% 52% / 0.3)",
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 40px hsl(40 55% 52% / 0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/15 text-white/60 font-body font-medium text-sm tracking-widest uppercase hover:text-white hover:border-white/30 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
