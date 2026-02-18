import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 3 + 1;
      });
    }, 30);

    const p1 = setTimeout(() => setPhase(1), 400);
    const p2 = setTimeout(() => setPhase(2), 1000);
    const p3 = setTimeout(() => setPhase(3), 1800);
    const done = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(done);
    };
  }, []);

  const brandName = "ECO-XENT";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background overflow-hidden"
          exit={{ 
            clipPath: "circle(0% at 50% 50%)",
          }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated grid lines */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px bg-primary"
                style={{ top: `${(i + 1) * 5}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: i * 0.05, ease: "easeOut" }}
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-px bg-primary"
                style={{ left: `${(i + 1) * 5}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, delay: i * 0.05, ease: "easeOut" }}
              />
            ))}
          </div>

          {/* Radial pulse */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 50% 50%, hsl(43 50% 55% / 0.05) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, hsl(43 50% 55% / 0.12) 0%, transparent 70%)",
                "radial-gradient(circle at 50% 50%, hsl(43 50% 55% / 0.05) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Orbiting particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [
                  Math.cos((i * Math.PI * 2) / 6) * 120,
                  Math.cos((i * Math.PI * 2) / 6 + Math.PI) * 120,
                  Math.cos((i * Math.PI * 2) / 6) * 120,
                ],
                y: [
                  Math.sin((i * Math.PI * 2) / 6) * 120,
                  Math.sin((i * Math.PI * 2) / 6 + Math.PI) * 120,
                  Math.sin((i * Math.PI * 2) / 6) * 120,
                ],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="relative flex flex-col items-center">
            {/* Letter-by-letter brand reveal */}
            <div className="flex overflow-hidden mb-4">
              {brandName.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-gradient-gold inline-block"
                  initial={{ y: 120, opacity: 0, rotateX: 90 }}
                  animate={phase >= 1 ? { y: 0, opacity: 1, rotateX: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter === "-" ? (
                    <span className="inline-block mx-1 md:mx-2">-</span>
                  ) : (
                    letter
                  )}
                </motion.span>
              ))}
            </div>

            {/* Tagline reveal */}
            <motion.div
              className="overflow-hidden"
              initial={{ width: 0 }}
              animate={phase >= 2 ? { width: "auto" } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-primary/60 text-sm md:text-base tracking-[0.5em] uppercase font-body whitespace-nowrap">
                Nature Reimagined
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="mt-10 w-48 h-[1px] bg-border/30 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Loading percentage */}
            <motion.p
              className="mt-3 text-xs text-muted-foreground/40 font-body tracking-[0.3em]"
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : {}}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </div>

          {/* Corner decorations */}
          {[
            "top-8 left-8",
            "top-8 right-8 rotate-90",
            "bottom-8 left-8 -rotate-90",
            "bottom-8 right-8 rotate-180",
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="w-8 h-8 border-l border-t border-primary/30" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
