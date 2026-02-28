import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

import heroBanner1 from "@/assets/hero-banner-serum-new.jpg";
import heroBanner2 from "@/assets/hero-banner-hairoil-new.jpg";
import heroBanner3 from "@/assets/hero-banner-shampoo-new.jpg";
import heroBanner4 from "@/assets/hero-banner-soap-new.jpg";
import heroBanner5 from "@/assets/hero-banner-conditioner-new.jpg";

// Preload first banner for instant hero render
if (typeof window !== "undefined") {
  const preloadLink = document.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "image";
  preloadLink.href = heroBanner1;
  preloadLink.fetchPriority = "high";
  document.head.appendChild(preloadLink);

  // Preload all other banners after page load
  window.addEventListener("load", () => {
    [heroBanner2, heroBanner3, heroBanner4, heroBanner5].forEach((src) => {
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
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section id="hero" className="relative w-full overflow-hidden" style={{ marginTop: "72px" }}>
      <div className="relative w-full" style={{ minHeight: "92vh" }}>
        {/* Background slides - CSS transition only */}
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(90 35% 12%), hsl(90 30% 18%), hsl(90 35% 12%))" }} />
            <img
              src={s.image}
              alt={s.overline}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.35)" }}
              loading="eager"
              decoding="async"
              fetchPriority={i === 0 ? "high" : "auto"}
            />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 30% 45%, hsl(90 30% 28% / 0.15) 0%, transparent 70%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, hsl(90 30% 8% / 0.6) 100%)" }} />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-10 flex flex-col justify-center" style={{ minHeight: "92vh" }}>
           <div className="max-w-3xl py-20">
              {/* Overline */}
              <div className="inline-flex items-center gap-2.5 mb-8 px-5 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span className="text-gold-light text-[11px] font-body font-medium tracking-[0.3em] uppercase">
                  {slide.overline}
                </span>
              </div>

              {/* Headlines */}
              {slide.headline.map((line, i) => (
                <div key={line} className="overflow-hidden mb-1">
                  <h1
                    className={`text-[clamp(3rem,8vw,6.5rem)] font-heading font-light leading-[0.92] tracking-tight ${
                      i === 1 ? "" : "text-white"
                    }`}
                    style={i === 1 ? { color: "hsl(45 55% 58%)" } : undefined}
                  >
                    {line}
                  </h1>
                </div>
              ))}

              {/* Description */}
              <p className="text-white/50 font-body text-base md:text-lg leading-relaxed mb-12 mt-8 max-w-xl font-light">
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-16">
                <a
                  href="#products"
                  className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-body font-medium text-sm tracking-widest uppercase transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    background: "linear-gradient(135deg, hsl(90 30% 30%), hsl(90 35% 22%))",
                    color: "hsl(0 0% 100%)",
                    boxShadow: "0 4px 24px hsl(90 30% 30% / 0.3)",
                  }}
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-body font-medium text-sm tracking-widest uppercase border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 hover:scale-[1.03]"
                >
                  Our Story
                </a>
              </div>

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
