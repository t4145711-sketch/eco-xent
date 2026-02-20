import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpacedHeading from "./SpacedHeading";

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ scale: sectionScale, opacity: sectionOpacity }}
    >
      {/* Background texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background" />
      </motion.div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Problem statement */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.p
            className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Sach Jaano
          </motion.p>

          <SpacedHeading
            text="Chemical products hurt — Eco-Xent heals"
            className="text-3xl md:text-4xl lg:text-5xl text-gradient-gold mb-8 leading-tight"
            delay={0.2}
          />

          <motion.p
            className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Market ke 90% products sirf oopar se kaam karte hain — <span className="text-foreground/80 italic">andar se nuqsan karte hain.</span> Parabens, sulfates, synthetic fragrances — yeh sab aapki skin aur baalon ko slowly damage kar rahe hain. Eco-Xent ne alag raasta chuna — <span className="text-primary font-medium">qudrat se healing ka raasta.</span>
          </motion.p>
        </div>

        {/* Comparison grid */}
        <motion.div
          className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          {/* Chemical products — bad */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "linear-gradient(160deg, hsl(0 40% 15% / 0.3), hsl(0 30% 10% / 0.5))",
              border: "1px solid hsl(0 50% 40% / 0.15)",
            }}
          >
            <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-red-400/70 mb-4">❌ Chemical Products</p>
            <ul className="space-y-2.5">
              {[
                "Sulfates se baal kamzor hote hain",
                "Parabens hormones disturb karte hain",
                "Synthetic fragrances skin irritate karte hain",
                "Sirf temporary glow, andar nuqsan",
                "Long-term mein skin damage karte hain",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground/70 font-body">
                  <span className="text-red-400/50 mt-0.5 flex-shrink-0">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Eco-Xent — good */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "linear-gradient(160deg, hsl(43 50% 55% / 0.06), hsl(160 40% 12% / 0.5))",
              border: "1px solid hsl(43 50% 55% / 0.15)",
            }}
          >
            <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-primary mb-4">✦ Eco-Xent Healing</p>
            <ul className="space-y-2.5">
              {[
                "Qudrati herbs baalon ko andar se mazboot karte hain",
                "Zero harmful chemicals — 100% safe",
                "Therapeutic ingredients deep healing karte hain",
                "Long-term real results, koi side effect nahi",
                "Poori family ke liye safe formula",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/75 font-body">
                  <span className="text-primary mt-0.5 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Transition question */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <SpacedHeading
            text="Agar apka skincare actually heal kare — toh kaisa hoga?"
            className="text-2xl md:text-3xl lg:text-4xl text-foreground/50 italic"
            delay={0.9}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProblemSection;
