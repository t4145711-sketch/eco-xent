import { motion, useInView } from "framer-motion";
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
    highlights: ["Reduces Melasma", "Minimizes Fine Lines", "Lightens Dark Circles"],
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
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div ref={ref} className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.p
            className="text-gold tracking-[0.4em] uppercase text-[11px] font-body font-medium mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            Our Collection
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-heading font-semibold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Discover <span className="text-gradient-gold italic">Eco-Xent</span> Products
          </motion.h2>
          <motion.div
            className="w-16 h-px bg-gold/40 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>

        {/* Scrolling product strip */}
        <div className="relative overflow-hidden" ref={scrollRef}>
          <motion.div
            className="flex gap-8 md:gap-12"
            animate={{ x: `-${activeIndex * (280 + 32)}px` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "max-content" }}
          >
            {showcaseProducts.map((product, i) => (
              <motion.div
                key={product.name}
                className={`flex flex-col items-center min-w-[260px] md:min-w-[280px] cursor-pointer transition-all duration-500 ${
                  activeIndex === i ? "scale-100 opacity-100" : "scale-95 opacity-60"
                }`}
                onClick={() => setActiveIndex(i)}
                whileHover={{ scale: 1.03 }}
              >
                {/* Rounded image with glow */}
                <div
                  className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden mb-6 mx-auto"
                  style={{
                    boxShadow: activeIndex === i
                      ? "0 0 40px hsl(40 55% 52% / 0.25), 0 8px 32px hsl(150 20% 20% / 0.1)"
                      : "0 4px 16px hsl(40 20% 50% / 0.08)",
                    border: activeIndex === i
                      ? "3px solid hsl(40 55% 52% / 0.4)"
                      : "2px solid hsl(40 15% 88%)",
                    transition: "all 0.5s ease",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Shimmer on active */}
                  {activeIndex === i && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                    />
                  )}
                </div>

                {/* Product info */}
                <h3 className="text-lg font-heading font-semibold text-foreground text-center mb-1">
                  {product.name}
                </h3>
                <p className="text-[11px] font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">
                  {product.tagline}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Active product details */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center max-w-md mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {showcaseProducts[activeIndex].highlights.map((h) => (
              <span
                key={h}
                className="px-4 py-2 rounded-full text-xs font-body font-medium border border-gold/20 text-foreground/70"
                style={{ background: "hsl(40 30% 97%)" }}
              >
                ✓ {h}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-2.5 mt-8">
          {showcaseProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="relative w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                background: activeIndex === i ? "hsl(40 55% 48%)" : "hsl(40 15% 85%)",
                transform: activeIndex === i ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
