import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star, Shield, Leaf } from "lucide-react";
import productSerum from "@/assets/product-serum-with-ingredients.jpg";

const BestSellerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 overflow-hidden bg-white">
      {/* Subtle gold radial */}
      <div className="absolute inset-0 gradient-radial-gold opacity-30" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left — Product Image with glow */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-[85%] h-[85%] rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(40 55% 52% / 0.08) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.div
              className="relative w-full max-w-md rounded-2xl overflow-hidden group"
              whileHover={{
                boxShadow: "0 0 60px hsl(40 55% 52% / 0.2)",
              }}
              style={{
                border: "1px solid hsl(40 55% 52% / 0.15)",
              }}
            >
              <motion.img
                src={productSerum}
                alt="Botanic Shield Serum"
                className="w-full h-auto object-cover"
              />
              {/* Shimmer overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-body font-medium tracking-[0.4em] uppercase text-gold mb-4">
              ★ Best Seller
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold text-foreground mb-6 leading-tight">
              Botanic Shield
              <span className="block text-gradient-gold">Serum</span>
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-8 max-w-lg">
              Our most advanced formulation combines 15+ rare botanical extracts
              to create a protective shield for your skin. Clinically proven to
              reduce dark spots by 40% in just 4 weeks.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { icon: Leaf, label: "100% Organic" },
                { icon: Shield, label: "Skin Shield" },
                { icon: Star, label: "5,000+ Reviews" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-4 h-4 text-gold-dark" />
                  </div>
                  <p className="text-[11px] font-body text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center gap-6 mb-8">
              <div>
                <span className="text-3xl font-heading font-bold text-foreground">Rs.1,550</span>
                <span className="text-lg font-body text-muted-foreground line-through ml-3">Rs.1,999</span>
              </div>
              <span className="px-3 py-1 rounded-md text-xs font-body font-semibold text-white bg-forest">
                Save 22%
              </span>
            </div>

            <motion.a
              href="#products"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-body font-medium text-sm tracking-widest uppercase text-white transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, hsl(40 55% 48%), hsl(40 50% 42%))",
                boxShadow: "0 4px 24px hsl(40 55% 52% / 0.3)",
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 40px hsl(40 55% 52% / 0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              Buy Now
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BestSellerSection;
