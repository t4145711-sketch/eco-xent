import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const p1 = setTimeout(() => setPhase(1), 100);
    const p2 = setTimeout(() => setPhase(2), 400);
    const done = setTimeout(() => setIsLoading(false), 1200);
    return () => { clearTimeout(p1); clearTimeout(p2); clearTimeout(done); };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex flex-col items-center">
            <div className="flex overflow-hidden mb-3">
              {"ECO-XENT".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-5xl md:text-7xl font-heading font-light text-foreground inline-block"
                  initial={{ y: 80, opacity: 0 }}
                  animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  {letter === "-" ? <span className="inline-block mx-1">-</span> : letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="text-gold/50 text-[10px] tracking-[0.5em] uppercase font-body mb-6"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              Luxury Organic Care
            </motion.p>

            <motion.div
              className="w-24 h-[2px] rounded-full overflow-hidden bg-border/30"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={phase >= 2 ? { opacity: 1, scaleX: 1 } : {}}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-gold/40 via-gold to-gold/40 rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
