import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const items = [
  "🌙 Ramzan Mubarak — Eid Special Prices On All Products",
  "✦ Free Delivery on Orders Above Rs. 2,000",
  "✦ 100% Natural & Organic Herbal Products",
  "✦ Limited Stock — Abhi Order Karein",
  "🌙 Eid Gift Sets Available — WhatsApp Karo",
];

const repeated = [...items, ...items, ...items];

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative overflow-hidden z-50 select-none" style={{ minHeight: "44px" }}>
      {/* Background — olive green matching logo */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, hsl(95 30% 5%) 0%, hsl(95 22% 8%) 35%, hsl(95 28% 6%) 65%, hsl(95 22% 8%) 85%, hsl(95 30% 5%) 100%)",
        }}
      />

      {/* Top border — leaf green */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(95 40% 45% / 0.6) 30%, hsl(95 48% 62%) 50%, hsl(95 40% 45% / 0.6) 70%, transparent)" }}
      />
      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(95 35% 38% / 0.4) 30%, hsl(95 42% 55% / 0.7) 50%, hsl(95 35% 38% / 0.4) 70%, transparent)" }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 100% at 50% 50%, hsl(95 38% 50% / 0.04) 0%, transparent 70%)" }}
      />

      {/* Layout */}
      <div className="relative flex items-center h-full" style={{ minHeight: "44px" }}>

        {/* Left label */}
        <div className="hidden md:flex items-center gap-2.5 pl-5 pr-4 shrink-0 border-r" style={{ borderColor: "hsl(95 35% 40% / 0.3)" }}>
          <span className="text-[10px] font-heading font-semibold tracking-[0.3em] uppercase whitespace-nowrap" style={{ color: "hsl(95 42% 65%)" }}>
            Eid Offer
          </span>
          <span className="text-[8px]" style={{ color: "hsl(95 38% 55% / 0.6)" }}>✦</span>
          <span className="text-[10px] font-body font-medium tracking-[0.12em] whitespace-nowrap" style={{ color: "hsl(95 30% 60% / 0.75)" }}>
            Ramzan Special
          </span>
        </div>

        {/* Scrolling ticker */}
        <div className="overflow-hidden flex-1 relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, hsl(95 30% 5%), transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, hsl(95 30% 5%), transparent)" }}
          />

          <motion.div
            className="flex items-center whitespace-nowrap"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            {repeated.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-8">
                <span
                  className="text-[11px] md:text-[12px] font-body font-medium tracking-[0.14em]"
                  style={{ color: "hsl(0 0% 82%)" }}
                >
                  {item}
                </span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right badge */}
        <div className="hidden md:flex items-center gap-2 pl-4 pr-10 shrink-0 border-l" style={{ borderColor: "hsl(95 35% 40% / 0.3)" }}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "hsl(95 45% 58%)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[10px] font-body font-medium tracking-[0.2em] uppercase" style={{ color: "hsl(95 38% 62% / 0.85)" }}>
            Limited Time
          </span>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all duration-200 hover:bg-white/10"
        style={{ color: "hsl(95 35% 55% / 0.7)" }}
        aria-label="Close"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
