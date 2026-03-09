import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ingredients = [
  {
    name: "Coconut Oil",
    urdu: "ناریل کا تیل",
    healing: "Deep moisture aur scalp ko nourish karta hai, dandruff door karta hai",
    emoji: "🥥",
  },
  {
    name: "Castor Oil",
    urdu: "ارنڈی کا تیل",
    healing: "Hair growth stimulate karta hai, baalon ko thick aur strong banata hai",
    emoji: "🌿",
  },
  {
    name: "Black Seed Oil",
    urdu: "کلونجی کا تیل",
    healing: "Kalonji — anti-inflammatory, hair fall rokta hai aur naye baal ugata hai",
    emoji: "🖤",
  },
  {
    name: "Onion Oil",
    urdu: "پیاز کا تیل",
    healing: "Sulfur rich — keratin production boost karta hai, hair fall dramatically kam karta hai",
    emoji: "🧅",
  },
  {
    name: "Amla Oil",
    urdu: "آملہ کا تیل",
    healing: "Vitamin C se bharpoor — premature greying rokta hai, hair roots mazboot karta hai",
    emoji: "🫒",
  },
  {
    name: "Bhringraj",
    urdu: "بھرنگراج",
    healing: "Ayurveda ka 'King of Herbs' — baalon ki fastest healing aur regrowth ke liye",
    emoji: "🌱",
  },
  {
    name: "Neem Oil",
    urdu: "نیم کا تیل",
    healing: "Anti-fungal, anti-bacterial — scalp infections aur itching ko heal karta hai",
    emoji: "🍃",
  },
  {
    name: "Rosemary Oil",
    urdu: "روزمیری",
    healing: "Blood circulation improve karta hai — scientifically proven hair growth booster",
    emoji: "🌸",
  },
];

const HealingIngredientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section id="ingredients" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 gradient-radial-gold opacity-5" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <p className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium">Healing Formula</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gradient-gold mb-6">
            Healing Ingredients
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Har ingredient ko sochh samajh ke chuna gaya — kyunki{" "}
            <span className="text-foreground/80 italic">healing sirf qudrat se hoti hai.</span> Yahan janiye har cheez kya kaam karti hai.
          </p>
        </motion.div>

        {/* Ingredients Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-14">
          {ingredients.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 40, filter: "blur(6px)" }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group rounded-2xl p-6"
              style={{
                background: "linear-gradient(160deg, hsl(var(--primary) / 0.05), hsl(var(--secondary) / 0.35))",
                border: "1px solid hsl(var(--primary) / 0.08)",
              }}
            >
              <div className="text-3xl mb-3">{ing.emoji}</div>
              <h4 className="font-heading font-bold text-foreground text-sm mb-0.5 group-hover:text-primary transition-colors duration-300">
                {ing.name}
              </h4>
              <p className="text-xs text-primary/50 font-body mb-3 tracking-wide">{ing.urdu}</p>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">{ing.healing}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div
            className="rounded-2xl px-8 py-6"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.07), hsl(var(--secondary) / 0.4))",
              border: "1px solid hsl(var(--primary) / 0.1)",
            }}
          >
            <p className="text-foreground/70 font-body text-sm leading-relaxed">
              🌿 <strong className="text-foreground/90">Koi synthetic chemical nahi.</strong> Koi paraben nahi. Koi sulfate nahi. Sirf
              qudrat ki healing taqat — jo saalon se Ayurveda aur botanical science ne prove ki hai.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HealingIngredientsSection;
