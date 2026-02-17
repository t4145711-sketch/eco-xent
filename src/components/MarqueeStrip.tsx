import { motion } from "framer-motion";

const phrases = [
  "100% Organic",
  "★",
  "Cruelty Free",
  "★",
  "Handcrafted Luxury",
  "★",
  "Zero Chemicals",
  "★",
  "Ayurvedic Heritage",
  "★",
  "Premium Quality",
  "★",
  "Eco Friendly",
  "★",
  "Nature's Best",
  "★",
];

const MarqueeStrip = () => {
  const fullText = phrases.join("   ");

  return (
    <div className="relative py-5 border-y border-primary/10 overflow-hidden bg-secondary/30">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="text-xs tracking-[0.3em] uppercase text-primary/50 font-body font-medium mx-4"
          >
            {fullText}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeStrip;
