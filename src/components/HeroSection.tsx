import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

import heroBanner1 from "@/assets/banner-botanic-shield-serum.jpg";
import heroBanner2 from "@/assets/banner-hair-healer-oil.jpg";
import heroBanner3 from "@/assets/banner-herbal-shampoo.jpg";
import heroBanner4 from "@/assets/banner-cleansing-soap.jpg";
import heroBanner5 from "@/assets/banner-velvet-conditioner.jpg";
import heroBanner6 from "@/assets/banner-hair-living-serum.jpg";
import heroBanner7 from "@/assets/banner-all-in-one-serum.jpg";
import heroBanner8 from "@/assets/banner-herbal-soap.jpg";

// Preload first banner for instant hero render
if (typeof window !== "undefined") {
  const preloadLink = document.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "image";
  preloadLink.href = heroBanner1;
  preloadLink.fetchPriority = "high";
  document.head.appendChild(preloadLink);

  window.addEventListener("load", () => {
    [heroBanner2, heroBanner3, heroBanner4, heroBanner5, heroBanner6, heroBanner7, heroBanner8].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, { once: true });
}

const slides = [
  {
    image: heroBanner1,
    overline: "Botanic Shield Serum",
    headline: ["Pure Nature.", "Powerful Results."],
  },
  {
    image: heroBanner2,
    overline: "Hair Healer Oil",
    headline: ["Heal Hair.", "Grow Strong."],
  },
  {
    image: heroBanner3,
    overline: "Herbal Shampoo",
    headline: ["Nourish.", "Transform."],
  },
  {
    image: heroBanner4,
    overline: "Eco-Xent Cleansing Soap",
    headline: ["Cleanse.", "Rejuvenate."],
  },
  {
    image: heroBanner5,
    overline: "Velvet Ritual Conditioner",
    headline: ["Silky Smooth.", "Every Wash."],
  },
  {
    image: heroBanner6,
    overline: "Hair Living Serum",
    headline: ["Shine & Repair.", "Naturally."],
  },
  {
    image: heroBanner7,
    overline: "All-in-One Serum",
    headline: ["Complete Care.", "One Bottle."],
  },
  {
    image: heroBanner8,
    overline: "Herbal Soap",
    headline: ["Pure Herbs.", "Gentle Clean."],
  },
];

const textVariants = {
  enter: { opacity: 0, y: 30, filter: "blur(6px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -20, filter: "blur(4px)" },
};

const stagger = {
  center: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goTo = useCallback((index: number) => setCurrent(index), []);
  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isHovered]);

  const slide = slides[current];

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden -mt-[1px]"
      style={{ background: "hsl(90 35% 8%)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Responsive height: mobile shorter, desktop full viewport */}
      <div className="relative w-full min-h-[85vh] sm:min-h-[90vh] md:min-h-screen" style={{ paddingTop: "68px" }}>
        {/* Full-bleed background banners */}
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt={s.overline}
              className="absolute inset-0 w-full h-full object-cover object-[70%_center] sm:object-[60%_center] md:object-center"
              style={{ filter: "brightness(0.82) saturate(1.1)" }}
              loading="eager"
              decoding="async"
              fetchPriority={i === 0 ? "high" : "auto"}
            />
            {/* Left gradient for text readability */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, hsl(90 30% 6% / 0.75) 0%, hsl(90 30% 6% / 0.4) 30%, hsl(90 30% 6% / 0.1) 55%, transparent 100%)" }}
            />
            {/* Mobile: lighter overlay to keep banners HD */}
            <div
              className="absolute inset-0 md:hidden"
              style={{ background: "linear-gradient(to bottom, hsl(90 30% 6% / 0.4) 0%, hsl(90 30% 6% / 0.1) 35%, hsl(90 30% 6% / 0.3) 100%)" }}
            />
            {/* Subtle top/bottom vignette */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, hsl(90 30% 6% / 0.25) 0%, transparent 20%, transparent 80%, hsl(90 30% 6% / 0.35) 100%)" }}
            />
          </div>
        ))}

        {/* Decorative line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent z-10" />

        {/* Slide counter - top right (desktop only) */}
        <div className="absolute top-6 right-6 md:top-8 md:right-10 z-20 hidden md:flex items-center gap-3">
          <span className="text-white/25 font-heading text-4xl lg:text-5xl font-light tabular-nums">
            {String(current + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-5 bg-gold/30" />
            <span className="text-white/15 font-body text-xs tabular-nums">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col justify-center min-h-[calc(85vh-68px)] sm:min-h-[calc(90vh-68px)] md:min-h-[calc(100vh-68px)]">
          <div className="max-w-[85%] sm:max-w-[70%] md:max-w-2xl lg:max-w-3xl py-12 sm:py-16 md:py-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                variants={stagger}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Overline badge */}
                <motion.div
                  variants={textVariants}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-5 sm:mb-6 md:mb-8"
                >
                  <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full border border-gold/20 backdrop-blur-md"
                    style={{ background: "linear-gradient(135deg, hsl(45 50% 50% / 0.1), hsl(45 50% 50% / 0.03))" }}
                  >
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold" />
                    <span className="text-gold-light text-[10px] sm:text-[11px] font-body font-semibold tracking-[0.25em] sm:tracking-[0.35em] uppercase">
                      {slide.overline}
                    </span>
                  </div>
                </motion.div>

                {/* Headlines */}
                {slide.headline.map((line, i) => (
                  <motion.div
                    key={line}
                    variants={textVariants}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden mb-0.5 sm:mb-1"
                  >
                    <h1
                      className={`text-[clamp(2rem,7vw,6rem)] font-heading leading-[0.92] tracking-tight ${
                        i === 0 ? "font-extralight text-white" : "font-normal"
                      }`}
                      style={i === 1 ? {
                        background: "linear-gradient(135deg, hsl(45 55% 62%), hsl(45 45% 48%), hsl(45 55% 58%))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      } : undefined}
                    >
                      {line}
                    </h1>
                  </motion.div>
                ))}

                {/* Trust badges */}
                <motion.div
                  variants={textVariants}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6"
                >
                  {["100% Organic", "Cruelty Free", "Handcrafted"].map((text, i) => (
                    <div key={text} className="flex items-center gap-1.5 sm:gap-2.5">
                      <div
                        className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
                        style={{ background: `hsl(${45 + i * 5} ${50 - i * 5}% ${50 + i * 5}%)` }}
                      />
                      <span className="text-white/30 text-[8px] sm:text-[10px] md:text-[11px] font-body font-medium tracking-[0.15em] sm:tracking-[0.25em] uppercase">
                        {text}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Vertical navigation - right side (desktop) */}
        <div className="absolute right-4 md:right-8 lg:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3">
          <button
            onClick={prev}
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white hover:border-gold/30 hover:bg-white/10 transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4 rotate-90" />
          </button>

          <div className="flex flex-col gap-2 py-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative w-2 rounded-full overflow-hidden transition-all duration-500"
                style={{ height: current === i ? 24 : 7 }}
              >
                <div className="absolute inset-0 bg-white/15 rounded-full" />
                {current === i && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(180deg, hsl(45 55% 55%), hsl(45 50% 42%))" }}
                    initial={{ scaleY: 0, originY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white hover:border-gold/30 hover:bg-white/10 transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4 rotate-90" />
          </button>
        </div>

        {/* Mobile bottom navigation */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 flex md:hidden items-center justify-center gap-2.5 sm:gap-3">
          <button
            onClick={prev}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/50 active:bg-white/15 transition-colors"
          >
            <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
          <div className="flex gap-1.5 sm:gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-1 sm:h-1.5 rounded-full overflow-hidden transition-all duration-500"
                style={{ width: current === i ? 22 : 8 }}
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
          <button
            onClick={next}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/50 active:bg-white/15 transition-colors"
          >
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(90 35% 8%), hsl(90 35% 8% / 0.5), transparent)" }} />
      </div>
    </section>
  );
};

export default HeroSection;
