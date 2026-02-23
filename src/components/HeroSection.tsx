import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

import heroBanner1 from "@/assets/hero-banner-1.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";
import heroBanner3 from "@/assets/hero-banner-3.jpg";
import heroBanner4 from "@/assets/hero-banner-4.jpg";
import heroBanner5 from "@/assets/hero-banner-5.jpg";

// Preload first banner for instant hero render
const preloadLink = document.createElement("link");
preloadLink.rel = "preload";
preloadLink.as = "image";
preloadLink.href = heroBanner1;
document.head.appendChild(preloadLink);

const slides = [
  {
    image: heroBanner1,
    overline: "Botanic Shield Serum",
    headline: ["Pure Nature.", "Powerful Results."],
    description: "Advanced herbal defense & restoration serum with Hyaluronic Acid, Vitamin C & Rosehip Oil for radiant, youthful skin.",
  },
  {
    image: heroBanner2,
    overline: "Herbal Shampoo",
    headline: ["Nourish.", "Transform."],
    description: "Sulfate-free herbal shampoo infused with amla, neem & shikakai for soft, nourished and healthy hair.",
  },
  {
    image: heroBanner3,
    overline: "Eco-Xent Cleansing Soap",
    headline: ["Cleanse.", "Rejuvenate."],
    description: "Luxurious herbal cleansing soap with Neem, Amla, Tea Tree & Frankincense for naturally clear skin.",
  },
  {
    image: heroBanner4,
    overline: "Hair Healer Oil",
    headline: ["Heal Hair.", "Grow Strong."],
    description: "Powerful herbal hair oil with Coconut, Castor, Black Seed & Amla oils to reduce hair fall and promote healthy growth.",
  },
  {
    image: heroBanner5,
    overline: "Herbal Soap Collection",
    headline: ["Handcrafted.", "With Love."],
    description: "Natural handcrafted herbal soaps infused with amla, neem & honey. Reduces acne, nourishes & hydrates skin.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const imageVariants = {
    enter: (dir: number) => ({ opacity: 0, scale: 1.1, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, scale: 1, x: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
    exit: (dir: number) => ({ opacity: 0, scale: 1.05, x: dir > 0 ? -80 : 80, transition: { duration: 0.6 } }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 30 },
    center: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden" style={{ marginTop: "72px" }}>
      <div className="relative w-full" style={{ minHeight: "92vh" }}>
        {/* Background slides */}
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={slide.overline}
              className="w-full h-full object-cover"
              loading={current === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={current === 0 ? "high" : "auto"}
              style={{ filter: "brightness(0.35)" }}
            />
            {/* Overlays */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 30% 45%, hsl(120 35% 28% / 0.15) 0%, transparent 70%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, hsl(120 35% 8% / 0.6) 100%)" }} />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-10 flex flex-col justify-center" style={{ minHeight: "92vh" }}>
          <div className="max-w-3xl py-20">
            <AnimatePresence mode="wait">
              <motion.div key={current}>
                {/* Overline */}
                <motion.div
                  className="inline-flex items-center gap-2.5 mb-8 px-5 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm"
                  variants={textVariants}
                  custom={0.1}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span className="text-gold-light text-[11px] font-body font-medium tracking-[0.3em] uppercase">
                    {slide.overline}
                  </span>
                </motion.div>

                {/* Headlines */}
                {slide.headline.map((line, i) => (
                  <div key={line} className="overflow-hidden mb-1">
                    <motion.h1
                      className={`text-[clamp(3rem,8vw,6.5rem)] font-heading font-light leading-[0.92] tracking-tight ${
                        i === 1 ? "" : "text-white"
                      }`}
                      style={i === 1 ? { color: "hsl(80 45% 55%)" } : undefined}
                      variants={textVariants}
                      custom={0.2 + i * 0.15}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      {line}
                    </motion.h1>
                  </div>
                ))}

                {/* Description */}
                <motion.p
                  className="text-white/50 font-body text-base md:text-lg leading-relaxed mb-12 mt-8 max-w-xl font-light"
                  variants={textVariants}
                  custom={0.55}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {slide.description}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  className="flex flex-wrap gap-4 mb-16"
                  variants={textVariants}
                  custom={0.7}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <motion.a
                    href="#products"
                    className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-body font-medium text-sm tracking-widest uppercase transition-all duration-500"
                    style={{
                      background: "linear-gradient(135deg, hsl(120 35% 28%), hsl(120 40% 22%))",
                      color: "hsl(0 0% 100%)",
                      boxShadow: "0 4px 24px hsl(120 35% 28% / 0.3)",
                    }}
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 40px hsl(120 35% 28% / 0.5)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Shop Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.a>
                  <motion.a
                    href="#about"
                    className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-body font-medium text-sm tracking-widest uppercase border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-500"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Our Story
                  </motion.a>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Trust line */}
            <div className="flex items-center gap-8">
              {["100% Organic", "Cruelty Free", "Handcrafted"].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold/60" />
                  <span className="text-white/40 text-[11px] font-body tracking-widest uppercase">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="absolute bottom-8 right-6 md:right-10 z-20 flex items-center gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group relative h-1.5 rounded-full overflow-hidden transition-all duration-500"
              style={{ width: current === i ? 32 : 12 }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full" />
              {current === i && (
                <motion.div
                  className="absolute inset-0 bg-gold rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroSection;
