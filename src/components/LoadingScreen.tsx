import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 3 + 1, 100));
    }, 30);

    const p1 = setTimeout(() => setPhase(1), 300);
    const p2 = setTimeout(() => setPhase(2), 800);
    const p3 = setTimeout(() => setPhase(3), 1600);
    const done = setTimeout(() => setIsLoading(false), 2800);

    return () => { clearInterval(interval); clearTimeout(p1); clearTimeout(p2); clearTimeout(p3); clearTimeout(done); };
  }, []);

  const brandName = "ECO-XENT";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background overflow-hidden"
          exit={{
            clipPath: "inset(0 50% 0 50%)",
            opacity: 0,
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px bg-primary"
                style={{ top: `${(i + 1) * 10}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: i * 0.04 }}
              />
            ))}
          </div>

          {/* Radial pulse */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 50% 50%, hsl(43 50% 55% / 0.04) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, hsl(43 50% 55% / 0.1) 0%, transparent 60%)",
                "radial-gradient(circle at 50% 50%, hsl(43 50% 55% / 0.04) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <div className="relative flex flex-col items-center">
            {/* Brand reveal */}
            <div className="flex overflow-hidden mb-4">
              {brandName.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-gradient-gold inline-block"
                  initial={{ y: 100, opacity: 0, rotateX: 90 }}
                  animate={phase >= 1 ? { y: 0, opacity: 1, rotateX: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter === "-" ? <span className="inline-block mx-1 md:mx-2">-</span> : letter}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.div
              className="overflow-hidden"
              initial={{ width: 0 }}
              animate={phase >= 2 ? { width: "auto" } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-primary/50 text-xs md:text-sm tracking-[0.5em] uppercase font-body whitespace-nowrap">
                Nature Reimagined
              </p>
            </motion.div>

            {/* Progress line */}
            <motion.div
              className="mt-8 w-40 h-[1px] bg-border/20 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary/40"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </motion.div>

            {/* Percentage */}
            <motion.p
              className="mt-2 text-[10px] text-muted-foreground/30 font-body tracking-[0.3em] tabular-nums"
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : {}}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </div>

          {/* Corner marks */}
          {["top-6 left-6", "top-6 right-6 rotate-90", "bottom-6 left-6 -rotate-90", "bottom-6 right-6 rotate-180"].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <div className="w-6 h-6 border-l border-t border-primary/20" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
