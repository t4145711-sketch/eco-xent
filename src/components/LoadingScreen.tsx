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
    const done = setTimeout(() => setIsLoading(false), 2200);
    return () => { clearInterval(interval); clearTimeout(p1); clearTimeout(p2); clearTimeout(done); };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-white overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex flex-col items-center">
            <div className="flex overflow-hidden mb-3">
              {"ECO-XENT".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-5xl md:text-7xl font-heading font-light text-foreground inline-block"
                  initial={{ y: 80, opacity: 0 }}
                  animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {letter === "-" ? <span className="inline-block mx-1">-</span> : letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="text-gold/50 text-[10px] tracking-[0.5em] uppercase font-body mb-8"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Luxury Organic Care
            </motion.p>

            <motion.div
              className="w-32 h-px bg-border/30 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-gold/30 via-gold to-gold/30"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
