import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const items = [
  "🌙 Ramadan Eid Mubarak! Special Batch No. 6 Prices",
  "✦ Free Delivery on Orders Above Rs. 2,000",
  "⭐ Eco-Xent Herbal — 100% Natural & Organic",
  "🌿 Limited Stock Available — Order Karo Abhi!",
  "🎁 Eid Gift Sets Available — Contact Us on WhatsApp",
];

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const repeated = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden z-50" style={{ background: "linear-gradient(90deg, hsl(160 60% 6%), hsl(43 60% 12%), hsl(160 60% 6%))" }}>
      {/* Stars layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 3 === 0 ? 2 : 1,
              height: i % 3 === 0 ? 2 : 1,
              left: `${(i * 5.8) % 100}%`,
              top: `${(i * 7.3) % 100}%`,
              background: "hsl(43 80% 70%)",
              opacity: 0.5,
            }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5 + (i % 3) * 0.7, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>

      {/* Top shimmer line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(43 80% 65% / 0.7), hsl(43 80% 65%), hsl(43 80% 65% / 0.7), transparent)" }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Bottom shimmer line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(43 80% 65% / 0.5), hsl(43 80% 65%), hsl(43 80% 65% / 0.5), transparent)" }}
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className="flex items-center py-2.5 pr-10">
        {/* Crescent moon icon left */}
        <div className="hidden md:flex items-center px-4 gap-2 shrink-0">
          <span className="text-base">🌙</span>
        </div>

        {/* Scrolling ticker */}
        <div className="overflow-hidden flex-1 relative">
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, hsl(160 60% 6%), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, hsl(160 60% 6%), transparent)" }} />

          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {repeated.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-8">
                <span
                  className="text-xs md:text-sm font-body font-medium tracking-[0.12em]"
                  style={{ color: "hsl(43 70% 78%)" }}
                >
                  {item}
                </span>
                <motion.span
                  className="inline-block w-1 h-1 rounded-full"
                  style={{ background: "hsl(43 80% 55%)" }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                />
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-200 hover:bg-white/10"
        style={{ color: "hsl(43 60% 65%)" }}
        aria-label="Close announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
