import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, Heart, Shield, Sparkles, Users, Award } from "lucide-react";
import logoImg from "@/assets/ecoxent-logo-new.jpeg";

const specialties = [
  { icon: Brain, title: "Certified NLP Practitioner", desc: "Rewire thought patterns for lasting positive change" },
  { icon: Sparkles, title: "Silva Method Coach", desc: "Unlock your mind's hidden potential through meditation" },
  { icon: Shield, title: "Metaphysics Specialist", desc: "Bridge science and spirituality for deeper understanding" },
  { icon: Heart, title: "Trauma Healing", desc: "Heal childhood wounds and overcome deep-rooted fears" },
  { icon: Users, title: "Family Harmony", desc: "Transform parent-child dynamics with proven techniques" },
  { icon: Award, title: "Instant Results", desc: "Experience breakthrough healing from the very first session" },
];

const AboutCeo = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const specialtiesRef = useRef(null);
  const missionRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const isSpecialtiesInView = useInView(specialtiesRef, { once: true, margin: "-50px" });
  const isMissionInView = useInView(missionRef, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border/50" style={{ background: "hsla(90, 35%, 18%, 0.98)", backdropFilter: "blur(16px)" }}>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-[68px]">
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </motion.button>
          <motion.a href="/" whileHover={{ scale: 1.02 }}>
            <img src={logoImg} alt="Eco-Xent" className="object-contain rounded-sm" style={{ height: "44px" }} />
          </motion.a>
          <div className="w-20" />
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Avatar placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-8 border-4 border-gold/20 overflow-hidden flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(var(--forest-light)), hsl(var(--accent)))" }}
            >
              <span className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold">F</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="text-gold tracking-[0.4em] uppercase text-[11px] font-body font-medium mb-4">Founder & CEO</p>
              <h1 className="text-4xl md:text-6xl font-heading font-semibold text-foreground mb-6">
                Healing Minds,<br />
                <span className="text-gradient-gold italic">Transforming Lives</span>
              </h1>
              <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed font-light">
                As a certified <strong className="text-foreground/90 font-medium">NLP practitioner</strong>, <strong className="text-foreground/90 font-medium">Silva Method coach</strong>, and <strong className="text-foreground/90 font-medium">metaphysics specialist</strong>, I help parents overcome relationship challenges, heal childhood traumas, and conquer fears and phobias.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section ref={missionRef} className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="rounded-2xl p-8 md:p-12 border border-border bg-background relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />
              <p className="text-gold tracking-[0.3em] uppercase text-[11px] font-body font-medium mb-4">My Mission</p>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-6">
                Empowering Parents for <span className="text-gradient-gold italic">Instant Healing</span>
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed text-base md:text-lg font-light mb-6">
                My expertise empowers parents to experience instant healing and results, creating a more <strong className="text-foreground/90 font-medium">harmonious and loving family environment</strong>.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed text-base md:text-lg font-light">
                I believe that when parents heal, the entire family transforms. Through proven NLP techniques, the Silva Method, and metaphysical wisdom, I guide families toward lasting peace, deeper connections, and emotional freedom.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section ref={specialtiesRef} className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={isSpecialtiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold tracking-[0.4em] uppercase text-[11px] font-body font-medium mb-3">Expertise</p>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
              What I <span className="text-gradient-gold italic">Specialize In</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {specialties.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isSpecialtiesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="rounded-xl p-7 border border-border hover:border-gold/20 transition-all duration-300 group text-center"
              >
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <s.icon className="w-5 h-5 text-gold-dark" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
              Ready to Begin Your <span className="text-gradient-gold italic">Healing Journey?</span>
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-lg mx-auto">Take the first step toward a transformed, harmonious family life.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.a
                href="https://wa.me/923295991062?text=I%20want%20to%20know%20more%20about%20coaching%20sessions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-body font-semibold text-sm tracking-wide transition-all duration-300"
                style={{ background: "hsl(var(--forest-dark))", color: "white" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get in Touch
              </motion.a>
              <motion.button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-body font-semibold text-sm tracking-wide border border-border hover:border-gold/30 transition-all duration-300 text-foreground"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Products
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground font-body">© {new Date().getFullYear()} Eco-Xent. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutCeo;
