import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const items = [
  "✦ Free Delivery on Orders Above Rs. 2,000",
  "✦ 100% Organic & Handcrafted Products",
  "✦ Limited Edition — Order Before Stock Ends",
  "✦ COD Available Nationwide",
];

const repeated = [...items, ...items, ...items];

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative overflow-hidden z-50 select-none" style={{ minHeight: "38px", background: "hsl(150 30% 18%)" }}>
      <div className="relative flex items-center h-full" style={{ minHeight: "38px" }}>
        <div className="overflow-hidden flex-1 relative">
          <motion.div
            className="flex items-center whitespace-nowrap"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {repeated.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-8">
                <span className="text-[11px] font-body font-light tracking-[0.15em]" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
                  {item}
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all duration-200 hover:bg-white/15"
        style={{ color: "hsl(0 0% 100% / 0.5)" }}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
