import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import heroProducts from "@/assets/hero-products.jpg";
import { ArrowRight, ShieldCheck, Truck, Star } from "lucide-react";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ marginTop: "72px" }}
    >
      {/* ─── FULL-WIDTH HERO BANNER ─── */}
      <div className="relative w-full" style={{ minHeight: "88vh" }}>
        {/* Background */}
        <motion.div
          className="absolute inset-0"
          style={{ y: bgY }}
        >
          {/* Green gradient background — like reference */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, hsl(95 50% 22%) 0%, hsl(95 45% 32%) 40%, hsl(95 40% 38%) 70%, hsl(95 38% 28%) 100%)",
            }}
          />
          {/* Subtle geometric pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Radial light from center */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(95 45% 45% / 0.4) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Product image — right side decorative */}
        <motion.div
          className="absolute right-0 bottom-0 w-[55%] md:w-[45%] h-full pointer-events-none"
          style={{ y: bgY }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 0.25, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={heroProducts}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(95_50%_22%)] via-[hsl(95_50%_22%/0.3)] to-transparent" />
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-10 container mx-auto px-6 md:px-10 flex flex-col justify-center"
          style={{ y: textY, opacity, minHeight: "88vh" }}
        >
          <div className="max-w-3xl py-20">
            {/* Overline badge */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span className="text-white/90 text-[11px] font-body font-semibold tracking-[0.25em] uppercase">Pakistan's #1 Organic Skincare</span>
            </motion.div>

            {/* Giant Headline */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                className="text-[clamp(3.5rem,10vw,8rem)] font-heading font-black leading-[0.88] text-white tracking-tight"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                ECO-XENT
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-8">
              <motion.p
                className="text-[clamp(1.2rem,3.5vw,2.2rem)] font-heading font-semibold text-white/80 italic"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Heal Naturally. Glow Beautifully.
              </motion.p>
            </div>

            <motion.p
              className="text-white/65 font-body text-base md:text-lg leading-relaxed mb-10 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              100% natural, handcrafted organic products — shampoo, hair oil, soaps & serums. No chemicals. Pure healing.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body font-bold text-sm tracking-wide bg-white hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                style={{ color: "hsl(95 45% 28%)" }}
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923295991062"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body font-semibold text-sm tracking-wide border-2 border-white/50 text-white hover:bg-white/10 hover:border-white transition-all duration-300 hover:-translate-y-0.5"
              >
                WhatsApp Order
              </a>
            </motion.div>

            {/* Trust badges row */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
            >
              {[
                { icon: ShieldCheck, text: "100% Natural" },
                { icon: Truck, text: "Fast Delivery" },
                { icon: Star, text: "5,000+ Happy Customers" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 text-xs font-body font-medium">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroSection;
