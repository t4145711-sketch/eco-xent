import { motion, useAnimationFrame } from "framer-motion";
import { useState, useRef } from "react";
import { X } from "lucide-react";

const items = [
  "Eid Mubarak — Batch No. 6 Special Prices",
  "Free Delivery on Orders Above Rs. 2,000",
  "100% Natural & Organic Herbal Products",
  "Limited Stock — Order Karo Abhi",
  "Eid Gift Sets Available on WhatsApp",
];

// SVG Lantern component
const Lantern = ({ className = "", delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={className}
    animate={{ rotate: [-8, 8, -8], y: [0, -3, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
      {/* String */}
      <line x1="11" y1="0" x2="11" y2="5" stroke="hsl(43 70% 60%)" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Top cap */}
      <path d="M6 5 Q11 3 16 5 L15 9 H7 Z" fill="hsl(43 65% 45%)"/>
      {/* Body */}
      <path d="M7 9 Q4 17 5 24 Q8 27 11 27 Q14 27 17 24 Q18 17 15 9 Z"
        fill="hsl(160 55% 12%)" stroke="hsl(43 60% 45%)" strokeWidth="0.8"/>
      {/* Glow panels */}
      <path d="M9 11 Q8 17 9 23 Q10.5 24.5 13 23 Q14 17 13 11 Z"
        fill="hsl(43 90% 65%)" opacity="0.55"/>
      {/* Ribs */}
      <line x1="7" y1="9" x2="5" y2="24" stroke="hsl(43 60% 45%)" strokeWidth="0.5"/>
      <line x1="15" y1="9" x2="17" y2="24" stroke="hsl(43 60% 45%)" strokeWidth="0.5"/>
      <line x1="11" y1="9" x2="11" y2="27" stroke="hsl(43 60% 45%)" strokeWidth="0.4" opacity="0.6"/>
      {/* Bottom cap */}
      <path d="M7 24 L8 28 Q11 30 14 28 L15 24 Z" fill="hsl(43 65% 45%)"/>
      {/* Tassel */}
      <line x1="11" y1="28" x2="11" y2="34" stroke="hsl(43 70% 55%)" strokeWidth="1" strokeLinecap="round"/>
      {/* Inner glow */}
      <motion.ellipse
        cx="11" cy="18" rx="3.5" ry="5"
        fill="hsl(43 100% 75%)"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
      />
    </svg>
    {/* Glow under lantern */}
    <motion.div
      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full blur-sm"
      style={{ background: "hsl(43 90% 65% / 0.4)" }}
      animate={{ opacity: [0.2, 0.6, 0.2] }}
      transition={{ duration: 1.8, repeat: Infinity, delay }}
    />
  </motion.div>
);

// Crescent moon SVG
const Crescent = () => (
  <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
    <path
      d="M14 9C14 13.4 10.4 17 6 17C4.2 17 2.6 16.4 1.3 15.4C2.1 15.6 3 15.7 3.9 15.7C8.9 15.7 13 11.6 13 6.6C13 5 12.6 3.5 11.8 2.2C13.2 3.7 14 5.7 14 7.9V9Z"
      fill="hsl(43 80% 68%)"
    />
  </svg>
);

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  const repeated = [...items, ...items, ...items, ...items];

  if (!visible) return null;

  return (
    <div
      className="relative overflow-hidden z-50 select-none"
      style={{
        background: "linear-gradient(90deg, hsl(160 70% 4%) 0%, hsl(43 40% 8%) 30%, hsl(160 65% 6%) 55%, hsl(43 40% 8%) 80%, hsl(160 70% 4%) 100%)",
        minHeight: "48px",
      }}
    >
      {/* ─── Islamic arch / geometric top border ─── */}
      <svg
        className="absolute top-0 left-0 right-0 w-full pointer-events-none"
        height="3" preserveAspectRatio="none" viewBox="0 0 1000 3"
      >
        <defs>
          <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(43 80% 55%)" stopOpacity="0"/>
            <stop offset="25%" stopColor="hsl(43 80% 65%)" stopOpacity="0.9"/>
            <stop offset="50%" stopColor="hsl(43 90% 75%)" stopOpacity="1"/>
            <stop offset="75%" stopColor="hsl(43 80% 65%)" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="hsl(43 80% 55%)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect width="1000" height="1" fill="url(#borderGrad)"/>
      </svg>

      {/* ─── Bottom border ─── */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
        height="3" preserveAspectRatio="none" viewBox="0 0 1000 3"
      >
        <rect y="2" width="1000" height="1" fill="url(#borderGrad)" opacity="0.5"/>
      </svg>

      {/* ─── Twinkling stars bg ─── */}
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: i % 4 === 0 ? 2 : 1,
            height: i % 4 === 0 ? 2 : 1,
            left: `${(i * 4.3) % 100}%`,
            top: `${20 + (i * 13) % 60}%`,
            background: "hsl(43 90% 80%)",
          }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.6, 1] }}
          transition={{ duration: 1.4 + (i % 5) * 0.4, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}

      {/* ─── Moving shimmer sweep ─── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(43 80% 65% / 0.06) 50%, transparent 100%)",
          width: "40%",
        }}
        animate={{ x: ["-50%", "300%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />

      {/* ─── Layout ─── */}
      <div className="flex items-center h-full pr-10">

        {/* Left lanterns */}
        <div className="hidden sm:flex items-end gap-2 px-3 shrink-0" style={{ paddingTop: 4 }}>
          <Lantern delay={0} className="relative" />
          <Lantern delay={0.6} className="relative -mb-1" />
        </div>

        {/* Crescent + label */}
        <div className="hidden md:flex items-center gap-1.5 shrink-0 px-2">
          <Crescent />
          <span
            className="text-[10px] font-heading font-bold tracking-[0.35em] uppercase whitespace-nowrap"
            style={{ color: "hsl(43 75% 65%)" }}
          >
            Eid Offer
          </span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-5 mx-3 shrink-0" style={{ background: "hsl(43 60% 45% / 0.5)" }} />

        {/* Scrolling ticker */}
        <div className="overflow-hidden flex-1 relative">
          {/* fade masks */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, hsl(160 70% 4%), transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, hsl(160 70% 4%), transparent)" }}
          />

          <motion.div
            className="flex items-center whitespace-nowrap"
            animate={{ x: ["0%", "-25%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {repeated.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-6">
                {/* Star separator */}
                <motion.span
                  className="text-[8px]"
                  style={{ color: "hsl(43 80% 60%)" }}
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 6, repeat: Infinity, delay: i * 0.3 }}
                >
                  ✦
                </motion.span>
                <span
                  className="text-[11px] md:text-xs font-body font-semibold tracking-[0.18em] uppercase"
                  style={{ color: "hsl(43 65% 78%)" }}
                >
                  {item}
                </span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-5 mx-3 shrink-0" style={{ background: "hsl(43 60% 45% / 0.5)" }} />

        {/* Right lanterns */}
        <div className="hidden sm:flex items-end gap-2 px-3 shrink-0" style={{ paddingTop: 4 }}>
          <Lantern delay={0.9} className="relative" />
          <Lantern delay={0.3} className="relative" />
        </div>
      </div>

      {/* Close */}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-200 hover:bg-white/10"
        style={{ color: "hsl(43 60% 60%)" }}
        aria-label="Close"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
