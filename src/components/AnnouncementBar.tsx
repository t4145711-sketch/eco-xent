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
    <div className="relative overflow-hidden z-50 select-none" style={{ minHeight: "40px" }}>
      {/* Background — deep green matching reference site */}
      <div
        className="absolute inset-0"
        style={{ background: "hsl(95 45% 28%)" }}
      />

      {/* Scrolling ticker */}
      <div className="relative flex items-center h-full" style={{ minHeight: "40px" }}>
        <div className="overflow-hidden flex-1 relative">
          <motion.div
            className="flex items-center whitespace-nowrap"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            {repeated.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-8">
                <span
                  className="text-[12px] font-body font-medium tracking-[0.1em]"
                  style={{ color: "hsl(0 0% 100% / 0.92)" }}
                >
                  {item}
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all duration-200 hover:bg-white/20"
        style={{ color: "hsl(0 0% 100% / 0.7)" }}
        aria-label="Close"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
