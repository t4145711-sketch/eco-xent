import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const trustPoints = [
  { icon: "🌿", title: "100% Organic", desc: "Pure botanical ingredients" },
  { icon: "🧪", title: "Lab Tested", desc: "Dermatologist approved" },
  { icon: "🚚", title: "Fast Delivery", desc: "Nationwide COD" },
  { icon: "⭐", title: "5,000+ Reviews", desc: "Verified customers" },
  { icon: "🔄", title: "Easy Returns", desc: "7-day guarantee" },
  { icon: "🏅", title: "Award Winning", desc: "Premium quality" },
];

const TrustSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section className="w-full py-16 bg-white border-b border-border">
      <div ref={ref} className="container mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center gap-2 group"
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-xl mb-1 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: [-3, 3, -3, 0] }}
                transition={{ duration: 0.4 }}
              >
                {point.icon}
              </motion.div>
              <p className="text-xs font-heading font-semibold text-foreground">{point.title}</p>
              <p className="text-[11px] text-muted-foreground font-body">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
