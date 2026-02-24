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
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(true);

  // Auto-scroll — wait for image to load before moving to next
  useEffect(() => {
    if (!imageLoaded) return;
    const interval = setInterval(() => {
      setImageLoaded(false);
      setActiveIndex((prev) => (prev + 1) % showcaseProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imageLoaded]);

  const activeProduct = showcaseProducts[activeIndex];

  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 gradient-radial-gold pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
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

        {/* Main showcase — image left, info right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Left: Active product image */}
          <div className="relative flex-shrink-0">
            <div
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden relative flex items-center justify-center"
              style={{
                boxShadow: "0 0 50px hsl(var(--gold) / 0.2), 0 0 100px hsl(var(--gold) / 0.08), 0 20px 60px hsl(var(--forest) / 0.1)",
                border: "3px solid hsl(var(--gold) / 0.35)",
                background: "linear-gradient(135deg, hsl(var(--cream)), hsl(var(--secondary)))",
              }}
            >
              <motion.img
                key={activeIndex}
                src={activeProduct.image}
                alt={activeProduct.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={imageLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onLoad={() => setImageLoaded(true)}
                className="w-[90%] h-[90%] object-contain drop-shadow-lg"
              />
            </div>
            {/* Decorative ring */}
            <div
              className="absolute -inset-3 rounded-[2rem] pointer-events-none"
              style={{
                border: "1px solid hsl(var(--gold) / 0.12)",
              }}
            />
          </div>

          {/* Right: Product info */}
          <motion.div
            key={`info-${activeIndex}`}
            className="text-center lg:text-left flex-1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="px-4 py-2 rounded-full text-xs font-body font-medium border border-gold/20 text-foreground/80 bg-cream"
                >
                  ✓ {h}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom: Thumbnail strip */}
        <div className="flex justify-center gap-6 md:gap-8 mt-16">
          {showcaseProducts.map((product, i) => (
            <button
              key={product.name}
              onClick={() => {
                setImageLoaded(false);
                setActiveIndex(i);
              }}
              className="group relative flex flex-col items-center gap-2 transition-all duration-500"
            >
              <div
                className={`w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full overflow-hidden transition-all duration-500 ${
                  activeIndex === i
                    ? "ring-2 ring-gold scale-110 shadow-lg"
                    : "ring-1 ring-border opacity-50 group-hover:opacity-80 group-hover:scale-105"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`text-[9px] md:text-[10px] font-body tracking-wider uppercase transition-all duration-300 ${
                  activeIndex === i ? "text-gold font-semibold" : "text-muted-foreground"
                }`}
              >
                {product.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
