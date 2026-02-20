import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Heart, Star, Shield } from "lucide-react";

const values = [
  { icon: Leaf, title: "Healing Ingredients", desc: "Har ingredient qudrati healing power se bhara hua hai — chemical-free." },
  { icon: Heart, title: "Haath se Heal Kiya", desc: "Har product handcrafted hai — factory ki jagah dil se banaya gaya." },
  { icon: Star, title: "Real Healing Results", desc: "Hazaron customers ne actual healing results dekhe aur phir wapas aaye." },
  { icon: Shield, title: "Safe Healing Formula", desc: "Koi harmful chemical nahi — puri family ke liye safe therapeutic formula." },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: false, margin: "-80px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 gradient-radial-gold opacity-5" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Section label */}
        <motion.div
          ref={headingRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <p className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium">Hamari Kahani</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gradient-gold mb-6">
            Healing ki Kahani
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Jab market mein chemical products ne logon ko nuqsan pohuncha raha tha, humne ek sawaal poocha —
            <span className="text-foreground/80 italic"> "Kya hum qudrat se healing wali cheez bana sakte hain?"</span>
          </p>
        </motion.div>

        {/* Story block */}
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20 items-center">

          {/* Left — story text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="rounded-3xl p-8 md:p-10 h-full"
              style={{
                background: "linear-gradient(160deg, hsl(var(--primary) / 0.05), hsl(var(--secondary) / 0.4))",
                border: "1px solid hsl(var(--primary) / 0.1)",
              }}
            >
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                🌿 Qudrat ki Healing Taqat
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed mb-5">
                Eco-Xent ki buniyad ek soch pe rakhi gayi — ke <strong className="text-foreground/90">qudrati cheezein hi sach mein heal karti hain.</strong> Hamare founders ne dekha ke market mein chemical products sirf oopar se kaam karte hain — andar se nuqsan karte hain.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-5">
                Is liye humne shuru ki ek healing journey — Ayurvedic herbs ko modern botanical science ke saath milaate hue. Har formula deep healing ke liye banaya gaya hai. Har ingredient therapeutic hai.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                Aaj <strong className="text-foreground/90">hazaron Pakistan families</strong> Eco-Xent se heal ho rahi hain — aur unka trust hi hamara sab se bara award hai.
              </p>
            </div>
          </motion.div>

          {/* Right — stats + promise */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {[
              { num: "5,000+", label: "Khush Customers", sub: "Poore Pakistan mein" },
              { num: "100%", label: "Natural Ingredients", sub: "Koi chemical nahi" },
              { num: "5+", label: "Premium Products", sub: "Har skin aur hair type ke liye" },
              { num: "0%", label: "Compromise", sub: "Quality pe kabhi nahi" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-5 rounded-2xl px-6 py-4"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary) / 0.06), hsl(var(--secondary) / 0.3))",
                  border: "1px solid hsl(var(--primary) / 0.08)",
                }}
              >
                <div className="text-3xl font-heading font-black text-gradient-gold min-w-[80px]">{stat.num}</div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">{stat.label}</p>
                  <p className="text-xs text-muted-foreground font-body">{stat.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 40, filter: "blur(6px)" }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group text-center rounded-2xl p-7"
              style={{
                background: "linear-gradient(160deg, hsl(var(--primary) / 0.04), hsl(var(--secondary) / 0.35))",
                border: "1px solid hsl(var(--primary) / 0.07)",
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors duration-400">
                <v.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-heading font-semibold text-foreground mb-2">{v.title}</h4>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
