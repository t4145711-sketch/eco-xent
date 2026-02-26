import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import showcaseSerum from "@/assets/showcase-serum.png";
import showcaseHairOil from "@/assets/showcase-hairoil.png";
import showcaseShampoo from "@/assets/showcase-shampoo.png";
import showcaseSoap from "@/assets/showcase-soap.png";
import showcaseConditioner from "@/assets/showcase-conditioner.png";

const showcaseProducts = [
  {
    name: "All-in-One Serum",
    tagline: "Complete Skin Transformation",
    highlights: ["Reduces Melasma", "Minimizes Fine Lines & Wrinkles", "Lightens Dark Circles & Puffiness", "Fades Dark Spots & Heals Dry Patches"],
    image: showcaseSerum,
  },
  {
    name: "Hair Healer Oil",
    tagline: "Nourishing Hair Fall Solution",
    highlights: ["13+ Botanical Oils", "Strengthens Follicles", "Promotes Growth"],
    image: showcaseHairOil,
  },
  {
    name: "Herbal Shampoo",
    tagline: "Gentle Herbal Cleanse",
    highlights: ["Sulfate-Free Formula", "Neem & Amla Infused", "Soft & Nourished Hair"],
    image: showcaseShampoo,
  },
  {
    name: "Herbal Soap",
    tagline: "Natural Skin Purifier",
    highlights: ["Reduces Acne", "Handcrafted with Herbs", "Nourishes & Hydrates"],
    image: showcaseSoap,
  },
  {
    name: "Velvet Ritual Conditioner",
    tagline: "Advanced Hair Transformation",
    highlights: ["Deeply Hydrates", "Enhances Shine", "Daily Shield Protection"],
    image: showcaseConditioner,
  },
];

const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  // Preload all images on mount
  useEffect(() => {
    let loaded = 0;
    const onDone = () => {
      loaded++;
      if (loaded === showcaseProducts.length) setInitialLoad(false);
    };
    showcaseProducts.forEach((p) => {
      const img = new Image();
      img.src = p.image;
      img.onload = onDone;
      img.onerror = onDone;
    });
    const fallback = setTimeout(() => setInitialLoad(false), 2000);
    return () => clearTimeout(fallback);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (initialLoad) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseProducts.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeIndex, initialLoad]);

  const activeProduct = showcaseProducts[activeIndex];

  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 gradient-radial-gold pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.p
            className="text-gold tracking-[0.4em] uppercase text-[11px] font-body font-medium mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6 }}
          >
            Our Collection
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-heading font-semibold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Discover <span className="text-gradient-gold italic">Eco-Xent</span> Products
          </motion.h2>
          <motion.div
            className="w-16 h-px bg-gold/40 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>

        {/* Main showcase — image left, info right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Left: Active product image — circular */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Outer decorative ring */}
            <motion.div
              className="absolute -inset-4 rounded-full pointer-events-none"
              style={{ border: "1px solid hsl(var(--gold) / 0.15)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-8 rounded-full pointer-events-none"
              style={{ border: "1px dashed hsl(var(--gold) / 0.08)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            />

            <div
              className="w-64 h-64 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full overflow-hidden relative flex items-center justify-center"
              style={{
                boxShadow: "0 8px 40px hsl(var(--gold) / 0.15), 0 2px 20px hsl(var(--forest) / 0.08)",
                border: "3px solid hsl(var(--gold) / 0.25)",
                background: "linear-gradient(160deg, hsl(var(--cream)), hsl(var(--secondary)), hsl(var(--cream)))",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.85, rotate: 5 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-[75%] h-[75%] object-contain drop-shadow-xl relative z-10"
                />
              </AnimatePresence>
              <div
                className="absolute inset-0 pointer-events-none rounded-full"
                style={{
                  background: "radial-gradient(ellipse at 50% 80%, hsl(var(--gold) / 0.06), transparent 70%)",
                }}
              />
            </div>
          </motion.div>

          {/* Right: Product info */}
        <div className="text-center lg:text-left flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${activeIndex}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <p className="text-[11px] font-body font-medium tracking-[0.3em] uppercase text-gold mb-2">
                  {activeProduct.tagline}
                </p>
                <h3 className="text-2xl md:text-4xl font-heading font-semibold text-foreground mb-6">
                  {activeProduct.name}
                </h3>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                  {activeProduct.highlights.map((h, idx) => (
                    <motion.span
                      key={h}
                      initial={{ opacity: 0, y: 12, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.08, type: "spring", stiffness: 200, damping: 20 }}
                      className="px-4 py-2 rounded-full text-xs font-body font-medium border border-gold/20 text-foreground/80 bg-cream"
                    >
                      ✓ {h}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom: Circular thumbnail strip */}
        <div className="flex justify-center gap-6 md:gap-8 mt-16">
          {showcaseProducts.map((product, i) => (
            <button
              key={product.name}
              onClick={() => {
                if (i !== activeIndex) setActiveIndex(i);
              }}
              className="group relative flex flex-col items-center gap-2 transition-all duration-500"
            >
              <motion.div
                className={`w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full overflow-hidden transition-all duration-500 ${
                  activeIndex === i
                    ? "ring-2 ring-gold ring-offset-2 ring-offset-background scale-110 shadow-lg shadow-gold/10"
                    : "ring-1 ring-border opacity-50 group-hover:opacity-80 group-hover:scale-105"
                }`}
                whileHover={{ scale: activeIndex === i ? 1.1 : 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <span
                className={`text-[9px] md:text-[10px] font-body tracking-wider uppercase transition-all duration-300 ${
                  activeIndex === i ? "text-gold font-semibold" : "text-muted-foreground"
                }`}
              >
                {product.name.split(" ")[0]}
              </span>
              {activeIndex === i && (
                <motion.div
                  layoutId="showcase-dot"
                  className="w-1.5 h-1.5 rounded-full bg-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
