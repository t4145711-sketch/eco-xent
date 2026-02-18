import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import SpacedHeading from "./SpacedHeading";

const ingredients = [
  { name: "Aloe Vera", emoji: "🌿", color: "hsl(120 40% 50%)", benefit: "Deep hydration & healing" },
  { name: "Turmeric", emoji: "✨", color: "hsl(43 80% 55%)", benefit: "Anti-inflammatory glow" },
  { name: "Coconut Oil", emoji: "🥥", color: "hsl(30 30% 80%)", benefit: "Intense nourishment" },
  { name: "Rose Water", emoji: "🌹", color: "hsl(340 50% 60%)", benefit: "Natural toning" },
  { name: "Neem", emoji: "🍃", color: "hsl(140 50% 40%)", benefit: "Antibacterial shield" },
];

const InteractiveDemo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [added, setAdded] = useState<number[]>([]);
  const [mixProgress, setMixProgress] = useState(0);

  const addIngredient = (index: number) => {
    if (added.includes(index)) return;
    const next = [...added, index];
    setAdded(next);
    setMixProgress(Math.round((next.length / ingredients.length) * 100));
  };

  const reset = () => {
    setAdded([]);
    setMixProgress(0);
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            Interactive Experience
          </motion.p>
          <SpacedHeading
            text="See the Difference for Yourself"
            className="text-3xl md:text-4xl lg:text-5xl text-gradient-gold mb-4"
          />
          <motion.p
            className="text-muted-foreground font-body text-sm max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            Add ingredients to the blend and watch your perfect formula come alive.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Mixing bowl */}
          <motion.div
            className="relative mx-auto w-64 h-64 md:w-80 md:h-80 rounded-full mb-12 flex items-center justify-center"
            style={{
              background: `conic-gradient(${added.map((idx, i) => {
                const angle = (360 / added.length) * i;
                return `${ingredients[idx].color} ${angle}deg ${angle + 360 / added.length}deg`;
              }).join(", ") || "hsl(160 40% 12%) 0deg 360deg"})`,
              border: "2px solid hsl(43 50% 55% / 0.15)",
              boxShadow: added.length > 0
                ? "0 0 60px hsl(43 50% 55% / 0.1), inset 0 0 40px hsl(0 0% 0% / 0.3)"
                : "inset 0 0 40px hsl(0 0% 0% / 0.3)",
            }}
            animate={added.length > 0 ? { rotate: [0, 360] } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Inner glass effect */}
            <div className="absolute inset-4 rounded-full bg-background/60 backdrop-blur-xl flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {added.length === 0 ? (
                  <motion.p
                    key="empty"
                    className="text-muted-foreground/50 font-body text-sm text-center px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Tap ingredients below to start blending
                  </motion.p>
                ) : added.length === ingredients.length ? (
                  <motion.div
                    key="complete"
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.div
                      className="text-5xl mb-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ✨
                    </motion.div>
                    <p className="text-primary font-heading font-bold text-lg">Perfect Blend!</p>
                    <p className="text-muted-foreground text-xs font-body mt-1">Your Eco-Xent formula is ready</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="progress"
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-4xl font-heading font-bold text-gradient-gold">{mixProgress}%</p>
                    <p className="text-[10px] text-muted-foreground font-body tracking-[0.2em] uppercase mt-1">blended</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Floating ingredient emojis */}
            {added.map((idx, i) => (
              <motion.div
                key={idx}
                className="absolute text-2xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: 1,
                  x: Math.cos((i * 2 * Math.PI) / added.length) * 90,
                  y: Math.sin((i * 2 * Math.PI) / added.length) * 90,
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {ingredients[idx].emoji}
              </motion.div>
            ))}
          </motion.div>

          {/* Ingredient buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {ingredients.map((ing, i) => {
              const isAdded = added.includes(i);
              return (
                <motion.button
                  key={ing.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  whileHover={!isAdded ? { scale: 1.05, y: -3 } : {}}
                  whileTap={!isAdded ? { scale: 0.95 } : {}}
                  onClick={() => addIngredient(i)}
                  className={`relative flex items-center gap-2 px-5 py-3 rounded-full font-body text-sm transition-all duration-500 ${
                    isAdded
                      ? "bg-primary/15 border border-primary/30 text-primary"
                      : "bg-secondary/30 border border-border/30 text-foreground/70 hover:border-primary/20 hover:text-foreground"
                  }`}
                >
                  <span className="text-lg">{ing.emoji}</span>
                  <span className="font-medium">{ing.name}</span>
                  {isAdded && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-primary text-xs"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Benefit list */}
          <AnimatePresence>
            {added.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 flex flex-wrap justify-center gap-2"
              >
                {added.map((idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-3 py-1.5 rounded-full text-[11px] font-body text-primary/80 bg-primary/5 border border-primary/10"
                  >
                    {ingredients[idx].benefit}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset */}
          {added.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-6"
            >
              <button
                onClick={reset}
                className="text-xs text-muted-foreground/40 font-body tracking-wider uppercase hover:text-primary/60 transition-colors"
              >
                Reset Blend
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
