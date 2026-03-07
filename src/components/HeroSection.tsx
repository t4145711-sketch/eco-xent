import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

import heroBanner1 from "@/assets/hero-banner-serum-new.jpg";
import heroBanner2 from "@/assets/hero-banner-hairoil-new.jpg";
import heroBanner3 from "@/assets/hero-banner-shampoo-new.jpg";
import heroBanner4 from "@/assets/hero-banner-soap-new.jpg";
import heroBanner5 from "@/assets/hero-banner-conditioner-new.jpg";
import heroBanner6 from "@/assets/hero-banner-hair-serum-new.jpg";

// Preload first banner for instant hero render
if (typeof window !== "undefined") {
  const preloadLink = document.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "image";
  preloadLink.href = heroBanner1;
  preloadLink.fetchPriority = "high";
  document.head.appendChild(preloadLink);

  window.addEventListener("load", () => {
    [heroBanner2, heroBanner3, heroBanner4, heroBanner5, heroBanner6].forEach((src) => {
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
    description: "Advanced herbal defense & restoration serum with Hyaluronic Acid, Vitamin C & Rosehip Oil for radiant, youthful skin.",
  },
  {
    image: heroBanner2,
    overline: "Hair Healer Oil",
    headline: ["Heal Hair.", "Grow Strong."],
    description: "Powerful herbal hair oil with 27 essential herbs including Coconut, Castor, Black Seed & Amla oils to reduce hair fall and promote healthy growth.",
  },
  {
    image: heroBanner3,
    overline: "Herbal Shampoo",
    headline: ["Nourish.", "Transform."],
    description: "Sulfate-free herbal shampoo infused with amla, neem & shikakai for soft, nourished and healthy hair.",
  },
  {
    image: heroBanner4,
    overline: "Eco-Xent Cleansing Soap",
    headline: ["Cleanse.", "Rejuvenate."],
    description: "Luxurious herbal cleansing soap with Neem, Amla, Tea Tree & Frankincense for naturally clear skin.",
  },
  {
    image: heroBanner5,
    overline: "Velvet Ritual Conditioner",
    headline: ["Silky Smooth.", "Every Wash."],
    description: "Advanced herbal conditioner that deeply hydrates, enhances shine and provides daily shield protection for silky, healthy hair.",
  },
  {
    image: heroBanner6,
    overline: "Hair Living Serum",
    headline: ["Shine & Repair.", "Naturally."],
    description: "Advanced herbal hair serum with Argan Oil, Marula Oil, Camellia Oil & Murumuru Butter to nourish, control frizz and add natural shine.",
  },
];

const textVariants = {
  enter: { opacity: 0, y: 40, filter: "blur(8px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -30, filter: "blur(6px)" },
};

const stagger = {
  center: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
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
      <div className="relative w-full" style={{ minHeight: "100vh", paddingTop: "68px" }}>
        {/* Background images with Ken Burns effect */}
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, hsl(90 35% 8%), hsl(90 30% 14%), hsl(90 35% 8%))" }}
            />
            <div className="w-full h-full">
              <img
                src={s.image}
                alt={s.overline}
                className="w-full h-full object-cover md:object-center object-right"
                style={{ filter: "brightness(0.85) saturate(1.1)" }}
                loading="eager"
                decoding="async"
                fetchPriority={i === 0 ? "high" : "auto"}
              />
            </div>
            {/* Light edge vignette only */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(90 30% 8% / 0.15) 0%, transparent 15%, transparent 85%, hsl(90 30% 8% / 0.4) 100%)" }} />
          </div>
        ))}

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent z-10" />
        <div className="absolute top-20 right-[10%] w-px h-32 bg-gradient-to-b from-gold/20 to-transparent z-10 hidden lg:block" />
        <div className="absolute bottom-32 left-[8%] w-px h-24 bg-gradient-to-t from-gold/15 to-transparent z-10 hidden lg:block" />

        {/* Slide counter - top right */}
        <div className="absolute top-8 right-6 md:right-10 z-20 hidden md:flex items-center gap-3">
          <span className="text-white/30 font-heading text-5xl font-light tabular-nums">
            {String(current + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-6 bg-gold/40" />
            <span className="text-white/20 font-body text-xs tabular-nums">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Main content - clean banner, no text overlay */}
        <div className="relative z-10" style={{ minHeight: "calc(100vh - 68px)" }} />

        {/* Vertical navigation - right side */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white hover:border-gold/30 hover:bg-white/10 transition-all duration-400"
          >
            <ChevronLeft className="w-4 h-4 rotate-90" />
          </button>

          {/* Vertical dots */}
          <div className="flex flex-col gap-2.5 py-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative w-2 rounded-full overflow-hidden transition-all duration-500"
                style={{ height: current === i ? 28 : 8 }}
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
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white hover:border-gold/30 hover:bg-white/10 transition-all duration-400"
          >
            <ChevronRight className="w-4 h-4 rotate-90" />
          </button>
        </div>

        {/* Mobile bottom navigation */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex md:hidden items-center justify-center gap-3">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/50"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500"
                style={{ width: current === i ? 28 : 10 }}
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
            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/50"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom gradient — matches dark hero, no white bleed */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(90 35% 8%), hsl(90 35% 8% / 0.5), transparent)" }} />
      </div>
    </section>
  );
};

export default HeroSection;
