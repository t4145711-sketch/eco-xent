import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

  const problems = [
    { icon: "🧴", title: "Chemical Overload", desc: "Parabens, sulfates, synthetic fragrances — yeh sab aapki skin aur baalon ko slowly damage kar rahe hain." },
    { icon: "💸", title: "Paisa Barbad", desc: "Mehnge products khareedte ho, waqti glow milta hai — phir waapis wohi masla. Koi permanent solution nahi." },
    { icon: "😔", title: "Trust ki Kami", desc: "Har brand claims karta hai 'natural', lekin ingredients list mein chemicals ki bhar maar hoti hai." },
  ];

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
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
          <p className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium">The Problem</p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
        </motion.div>

        {/* Main heading */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gradient-gold text-center mb-6 leading-tight max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Chemicals se bhari duniya mein asli healing kahan hai?
        </motion.h2>

        <motion.p
          className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          Market ke 90% products sirf oopar se kaam karte hain —{" "}
          <span className="text-foreground/80 italic">andar se nuqsan karte hain.</span> Eco-Xent ne alag raasta chuna —{" "}
          <span className="text-primary font-medium">qudrat se healing ka raasta.</span>
        </motion.p>

        {/* Problem cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-20">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-6 text-center"
              style={{
                background: "linear-gradient(160deg, hsl(var(--secondary) / 0.6), hsl(var(--background) / 0.8))",
                border: "1px solid hsl(var(--border))",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{p.icon}</div>
              <h4 className="font-heading font-bold text-foreground mb-3">{p.title}</h4>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Transition question */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.h3
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground/50 italic"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            Agar apka skincare actually heal kare — toh kaisa hoga?
          </motion.h3>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProblemSection;
