import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-secondary to-forest-deep" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(500px circle at 30% 50%, hsl(43 50% 55% / 0.12) 0%, transparent 60%)",
              "radial-gradient(500px circle at 70% 50%, hsl(43 50% 55% / 0.12) 0%, transparent 60%)",
              "radial-gradient(500px circle at 30% 50%, hsl(43 50% 55% / 0.12) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium mb-4">Limited Edition</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-gradient-gold mb-6">
            Begin Your Luxury Ritual
          </h2>
          <p className="text-muted-foreground font-body mb-8 leading-relaxed">
            Join thousands of discerning individuals who have elevated their daily routine 
            with Eco-Xent's premium organic collection. Free shipping on orders above ₹999.
          </p>
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-body font-semibold tracking-[0.15em] uppercase text-xs rounded-full animate-glow-pulse"
          >
            <span>Shop The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
