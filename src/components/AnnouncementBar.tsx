import { motion } from "framer-motion";
import { useState } from "react";
import { X, Star } from "lucide-react";

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
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, hsl(160 65% 6%) 0%, hsl(43 35% 10%) 35%, hsl(160 60% 7%) 65%, hsl(43 35% 10%) 85%, hsl(160 65% 6%) 100%)",
        }}
      />

      {/* Gold top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(43 70% 55% / 0.6) 30%, hsl(43 85% 70%) 50%, hsl(43 70% 55% / 0.6) 70%, transparent)" }}
      />
      {/* Gold bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(43 60% 45% / 0.4) 30%, hsl(43 70% 60% / 0.7) 50%, hsl(43 60% 45% / 0.4) 70%, transparent)" }}
      />

      {/* Subtle ambient glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 100% at 50% 50%, hsl(43 60% 50% / 0.04) 0%, transparent 70%)" }}
      />

      {/* Layout */}
      <div className="relative flex items-center h-full" style={{ minHeight: "44px" }}>

        {/* Left label — desktop only */}
        <div className="hidden md:flex items-center gap-2.5 pl-5 pr-4 shrink-0 border-r" style={{ borderColor: "hsl(43 50% 45% / 0.25)" }}>
          <span className="text-[10px] font-heading font-semibold tracking-[0.3em] uppercase whitespace-nowrap" style={{ color: "hsl(43 75% 62%)" }}>
            Eid Offer
          </span>
          <span className="text-[8px]" style={{ color: "hsl(43 70% 55% / 0.6)" }}>✦</span>
          <span className="text-[10px] font-body font-medium tracking-[0.12em] whitespace-nowrap" style={{ color: "hsl(43 55% 70% / 0.7)" }}>
            Ramzan Special
          </span>
        </div>

        {/* Scrolling ticker */}
        <div className="overflow-hidden flex-1 relative">
          {/* Fade masks */}
          <div
            className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, hsl(160 65% 6%), transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, hsl(160 65% 6%), transparent)" }}
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
                  style={{ color: "hsl(43 55% 78%)" }}
                >
                  {item}
                </span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right badge — desktop */}
        <div className="hidden md:flex items-center gap-2 pl-4 pr-10 shrink-0 border-l" style={{ borderColor: "hsl(43 50% 45% / 0.25)" }}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "hsl(43 80% 60%)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[10px] font-body font-medium tracking-[0.2em] uppercase" style={{ color: "hsl(43 60% 65% / 0.8)" }}>
            Limited Time
          </span>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all duration-200 hover:bg-white/8"
        style={{ color: "hsl(43 55% 55% / 0.7)" }}
        aria-label="Close"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
