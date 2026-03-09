import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import showcaseSerum from "@/assets/product-new-botanical-with-ingredients.jpg";
import showcaseHairOil from "@/assets/product-hairoil-with-ingredients.jpg";
import showcaseShampoo from "@/assets/product-shampoo-with-ingredients.jpg";
import showcaseSoap from "@/assets/product-soap-with-box.png";
import showcaseConditioner from "@/assets/product-conditioner-with-ingredients.jpg";

const showcaseProducts = [
  {
    name: "All-in-One Serum",
    tagline: "Complete Skin Transformation",
    highlights: ["Reduces Melasma", "Minimizes Fine Lines & Wrinkles", "Lightens Dark Circles", "Fades Dark Spots"],
    image: showcaseSerum,
    accent: "hsl(var(--gold))",
  },
  {
    name: "Hair Healer Oil",
    tagline: "Nourishing Hair Fall Solution",
    highlights: ["13+ Botanical Oils", "Strengthens Follicles", "Promotes Growth"],
    image: showcaseHairOil,
    accent: "hsl(var(--gold))",
  },
  {
    name: "Herbal Shampoo",
    tagline: "Gentle Herbal Cleanse",
    highlights: ["Sulfate-Free Formula", "Neem & Amla Infused", "Soft & Nourished Hair"],
    image: showcaseShampoo,
    accent: "hsl(var(--gold))",
  },
  {
    name: "Herbal Soap",
    tagline: "Natural Skin Purifier",
    highlights: ["Reduces Acne", "Handcrafted with Herbs", "Nourishes & Hydrates"],
    image: showcaseSoap,
    accent: "hsl(var(--gold))",
  },
  {
    name: "Velvet Ritual Conditioner",
    tagline: "Advanced Hair Transformation",
    highlights: ["Deeply Hydrates", "Enhances Shine", "Daily Shield Protection"],
    image: showcaseConditioner,
    accent: "hsl(var(--gold))",
  },
];

const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 left, 1 right
  const [isFlipping, setIsFlipping] = useState(false);
  const [isPreparingFlip, setIsPreparingFlip] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  // Preload images and mark ready state
  useEffect(() => {
    let mounted = true;

    showcaseProducts.forEach((p, index) => {
      const img = new Image();
      img.src = p.image;

      if (img.complete) {
        if (mounted) {
          setLoadedImages((prev) => {
            if (prev.has(index)) return prev;
            const next = new Set(prev);
            next.add(index);
            return next;
          });
        }
        return;
      }

      img.onload = () => {
        if (!mounted) return;
        setLoadedImages((prev) => {
          if (prev.has(index)) return prev;
          const next = new Set(prev);
          next.add(index);
          return next;
        });
      };
    });

    return () => {
      mounted = false;
    };
  }, []);

  const goTo = useCallback(
    (newIndex: number, dir: number) => {
      if (isFlipping || isPreparingFlip || newIndex === activeIndex) return;

      const performFlip = () => {
        setIsFlipping(true);
        setDirection(dir);
        setActiveIndex(newIndex);
        setTimeout(() => setIsFlipping(false), 1000);
      };

      if (loadedImages.has(newIndex)) {
        performFlip();
        return;
      }

      setIsPreparingFlip(true);
      const img = new Image();
      img.src = showcaseProducts[newIndex].image;
      img.onload = () => {
        setLoadedImages((prev) => {
          if (prev.has(newIndex)) return prev;
          const next = new Set(prev);
          next.add(newIndex);
          return next;
        });
        setIsPreparingFlip(false);
        performFlip();
      };
      img.onerror = () => {
        setIsPreparingFlip(false);
      };
    },
    [activeIndex, isFlipping, isPreparingFlip, loadedImages]
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % showcaseProducts.length, 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + showcaseProducts.length) % showcaseProducts.length, -1);
  }, [activeIndex, goTo]);

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(goNext, 8000);
    return () => clearInterval(timer);
  }, [goNext]);

  const activeProduct = showcaseProducts[activeIndex];

  // 3D card variants
  const cardVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      scale: 0.92,
    }),
    center: {
      rotateY: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      scale: 0.92,
    }),
  };

  const infoVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 gradient-radial-gold pointer-events-none" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
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

        {/* Main 3D Card Showcase */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-5xl mx-auto">
          {/* 3D Flip Card */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ perspective: 1200 }}
          >
            {/* Navigation arrows on card */}
            <button
              onClick={goPrev}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-foreground/70 hover:text-gold hover:border-gold/50 transition-all duration-300 shadow-lg hover:shadow-gold/10"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-foreground/70 hover:text-gold hover:border-gold/50 transition-all duration-300 shadow-lg hover:shadow-gold/10"
              aria-label="Next product"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              className="w-72 h-[22rem] md:w-80 md:h-[26rem] lg:w-[22rem] lg:h-[28rem] relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    rotateY: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: 0.7 },
                  }}
                  className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    background: "linear-gradient(160deg, hsl(var(--cream)), hsl(var(--secondary)), hsl(var(--cream)))",
                    boxShadow:
                      "0 25px 60px -15px hsl(var(--gold) / 0.18), 0 10px 30px -10px hsl(var(--forest) / 0.12), inset 0 1px 0 hsl(var(--gold) / 0.1)",
                    border: "2px solid hsl(var(--gold) / 0.2)",
                  }}
                >
                  {/* Decorative corner accents */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/30 rounded-tl-lg" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/30 rounded-tr-lg" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/30 rounded-bl-lg" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/30 rounded-br-lg" />

                  {/* Shimmer overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, hsl(var(--gold) / 0.08) 45%, hsl(var(--gold) / 0.15) 50%, hsl(var(--gold) / 0.08) 55%, transparent 60%)",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                  />

                  {/* Product image */}
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    loading="eager"
                    decoding="sync"
                    className="w-[70%] h-[70%] object-contain drop-shadow-2xl relative z-10"
                  />

                  {/* Bottom label */}
                  <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                    <motion.span
                      className="inline-block px-4 py-1.5 rounded-full text-[10px] font-body font-semibold tracking-[0.2em] uppercase bg-background/80 backdrop-blur-sm text-gold border border-gold/20"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      {activeProduct.tagline}
                    </motion.span>
                  </div>

                  {/* Radial glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at 50% 85%, hsl(var(--gold) / 0.08), transparent 60%)",
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <div className="text-center lg:text-left flex-1 min-w-0">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`info-${activeIndex}`}
                custom={direction}
                variants={infoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Product counter */}
                <div className="flex items-center gap-3 justify-center lg:justify-start mb-4">
                  <span className="text-gold font-heading text-2xl font-bold">
                    0{activeIndex + 1}
                  </span>
                  <span className="w-8 h-px bg-gold/40" />
                  <span className="text-muted-foreground font-body text-xs tracking-wider">
                    0{showcaseProducts.length}
                  </span>
                </div>

                <h3 className="text-2xl md:text-4xl font-heading font-semibold text-foreground mb-3">
                  {activeProduct.name}
                </h3>
                <p className="text-[11px] font-body font-medium tracking-[0.3em] uppercase text-gold mb-6">
                  {activeProduct.tagline}
                </p>

                <div className="space-y-3 mb-8">
                  {activeProduct.highlights.map((h, idx) => (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.4 + idx * 0.1,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className="flex items-center gap-3 justify-center lg:justify-start"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      <span className="text-sm font-body text-foreground/80">
                        {h}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom: Thumbnail Strip with Progress */}
        <div className="flex justify-center gap-4 md:gap-6 mt-14">
          {showcaseProducts.map((product, i) => (
            <button
              key={product.name}
              onClick={() => {
                if (i !== activeIndex && !isFlipping && !isPreparingFlip) {
                  goTo(i, i > activeIndex ? 1 : -1);
                }
              }}
              className="group relative flex flex-col items-center gap-2 transition-all duration-500"
            >
              <motion.div
                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden transition-all duration-500 ${
                  activeIndex === i
                    ? "ring-2 ring-gold ring-offset-2 ring-offset-background scale-110 shadow-lg shadow-gold/15"
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
                {/* Active progress bar */}
                {activeIndex === i && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gold"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 8, ease: "linear" }}
                    key={`progress-${activeIndex}-${Date.now()}`}
                  />
                )}
              </motion.div>
              <span
                className={`text-[9px] md:text-[10px] font-body tracking-wider uppercase transition-all duration-300 ${
                  activeIndex === i
                    ? "text-gold font-semibold"
                    : "text-muted-foreground"
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
