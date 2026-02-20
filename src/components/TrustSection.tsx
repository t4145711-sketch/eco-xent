import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const trustPoints = [
  { emoji: "👨‍⚕️", title: "Dermatologist Tested", desc: "Skin doctors ki tasdeeq — safe formula" },
  { emoji: "🌿", title: "100% Organic", desc: "Koi chemical nahi — pure qudrati ilaaj" },
  { emoji: "🚚", title: "Fast COD Delivery", desc: "Poore Pakistan mein doorstep delivery" },
  { emoji: "⭐", title: "5,000+ Reviews", desc: "Real customers, real results" },
  { emoji: "🔁", title: "Easy Returns", desc: "7-day return policy, no questions" },
  { emoji: "🏆", title: "Award Winning", desc: "Pakistan's top organic brand 2024" },
];

const TrustSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  const bannerRef = useRef(null);
  const isBannerInView = useInView(bannerRef, { once: false, margin: "-80px" });

  return (
    <section className="w-full overflow-hidden">
      {/* ── BOLD TRUST BANNER — like reference "THE TRUSTED CHOICE OF DOCTORS & CELEBRITIES" ── */}
      <div
        ref={bannerRef}
        className="relative w-full overflow-hidden flex items-center justify-center py-20 md:py-28"
        style={{
          background: "linear-gradient(135deg, hsl(95 50% 22%) 0%, hsl(95 45% 32%) 60%, hsl(95 38% 28%) 100%)",
          minHeight: "400px",
        }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow center */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(95 45% 45% / 0.3) 0%, transparent 70%)",
          }}
        />

        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${80 + i * 60}px`,
              height: `${80 + i * 60}px`,
              left: `${10 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{ y: [0, -12, 0], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            className="text-white/60 text-xs font-body font-semibold tracking-[0.4em] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isBannerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Eco-Xent — The Trusted Choice
          </motion.p>

          <div className="overflow-hidden mb-2">
            <motion.h2
              className="font-heading font-black text-white leading-[0.85]"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.02em" }}
              initial={{ y: "100%" }}
              animate={isBannerInView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              THOUSANDS OF
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2
              className="font-heading font-black text-white/90 leading-[0.85]"
              style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)", letterSpacing: "-0.01em" }}
              initial={{ y: "100%" }}
              animate={isBannerInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              HAPPY PAKISTANI FAMILIES
            </motion.h2>
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isBannerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {["5,000+ Orders Delivered", "100% Natural", "COD Available", "Fast Shipping"].map((tag) => (
              <span
                key={tag}
                className="px-5 py-2 rounded-full border border-white/25 text-white/80 text-xs font-body font-medium backdrop-blur-sm bg-white/5"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.a
            href="#products"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white font-body font-bold text-sm tracking-wide hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            style={{ color: "hsl(95 45% 28%)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isBannerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Shop All Products
          </motion.a>
        </div>
      </div>

      {/* ── 6-column TRUST GRID ── */}
      <div className="bg-white py-16 border-b border-border">
        <div ref={ref} className="container mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {trustPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center gap-2 group"
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center text-2xl mb-1 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300"
                  whileHover={{ rotate: [-3, 3, -3, 0], transition: { duration: 0.5 } }}
                >
                  {point.emoji}
                </motion.div>
                <p className="text-[12px] font-heading font-bold text-foreground">{point.title}</p>
                <p className="text-[11px] text-muted-foreground font-body leading-tight">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
