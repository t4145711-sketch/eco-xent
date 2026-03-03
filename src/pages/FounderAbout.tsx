import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Heart, Shield, Sparkles, Users, Award, BookOpen, Lightbulb } from "lucide-react";
import FounderLayout from "@/components/founder/FounderLayout";

const benefits = [
  { icon: Heart, text: "Instant healing from past parenting challenges and emotional wounds." },
  { icon: Users, text: "Improved relationship with your child and family members." },
  { icon: Brain, text: "Effective communication and conflict resolution skills." },
  { icon: Sparkles, text: "Increased self-awareness and self-love as a parent." },
  { icon: Shield, text: "Overcome fears and phobias that impact your parenting." },
];

const howIHelp = [
  "Overcome parenting challenges and build a stronger relationship with your child.",
  "Heal childhood traumas and emotional wounds.",
  "Develop effective communication skills and active listening.",
  "Cultivate self-love and self-acceptance as a parent.",
  "Create a harmonious and loving family environment.",
];

const techniques = [
  { icon: Brain, title: "NLP", subtitle: "Neuro-Linguistic Programming", desc: "Reprogram negative thought patterns and behaviors for lasting positive change." },
  { icon: Lightbulb, title: "Silva Method", subtitle: "Subconscious Mind Access", desc: "Access your subconscious mind and manifest positive change through dynamic meditation." },
  { icon: BookOpen, title: "Metaphysics", subtitle: "Spiritual Parenting", desc: "Understand the spiritual aspects of parenting and relationships for deeper harmony." },
];

const FounderAbout = () => {
  const aboutRef = useRef(null);
  const benefitsRef = useRef(null);
  const techniquesRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-50px" });
  const isBenefitsInView = useInView(benefitsRef, { once: true, margin: "-50px" });
  const isTechniquesInView = useInView(techniquesRef, { once: true, margin: "-50px" });

  return (
    <FounderLayout activeTab="about">
      {/* Hero About */}
      <section ref={aboutRef} className="py-20 md:py-28 bg-cream relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] opacity-[0.04]" style={{ background: "radial-gradient(ellipse, hsl(var(--gold)), transparent 70%)", filter: "blur(60px)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-14"
            >
              <p className="text-gold tracking-[0.5em] uppercase text-[10px] font-body font-semibold mb-4">About Me</p>
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                Mind Science <span className="italic" style={{ color: "hsl(var(--gold-dark))" }}>Expert</span>
              </h1>
              <div className="w-16 h-[2px] mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="rounded-2xl p-8 md:p-12 border border-border bg-background relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />
              <p className="text-muted-foreground font-body leading-relaxed text-base md:text-lg">
                As a <strong className="text-foreground font-semibold">certified NLP practitioner</strong>, <strong className="text-foreground font-semibold">Silva Method coach</strong>, and <strong className="text-foreground font-semibold">metaphysics specialist</strong>, I help parents overcome relationship challenges, heal childhood traumas, and overcome fears and phobias. My expertise empowers parents to experience instant healing and results, creating a more harmonious and loving family environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="py-20 md:py-28 bg-background relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold tracking-[0.5em] uppercase text-[10px] font-body font-semibold mb-3">Why Work With Me</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Benefits of <span className="italic" style={{ color: "hsl(var(--gold-dark))" }}>Working Together</span>
            </h2>
            <div className="w-10 h-[2px] mx-auto mt-5" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }} />
          </motion.div>

          <div className="max-w-3xl mx-auto grid gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isBenefitsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ x: 8, boxShadow: "0 8px 30px -10px hsla(var(--gold), 0.15)" }}
                className="flex items-start gap-5 rounded-2xl p-6 border border-border hover:border-gold/20 transition-all duration-300 bg-background group"
              >
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center border border-gold/15 group-hover:border-gold/30 group-hover:scale-110 transition-all duration-300" style={{ background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--cream)))" }}>
                  <b.icon className="w-5 h-5 text-gold-dark" />
                </div>
                <p className="text-foreground font-body text-sm md:text-base pt-2.5">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How I Help */}
      <section className="py-20 md:py-28 bg-cream relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold tracking-[0.5em] uppercase text-[10px] font-body font-semibold mb-3">My Approach</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              How I Can <span className="italic" style={{ color: "hsl(var(--gold-dark))" }}>Help You</span>
            </h2>
            <div className="w-10 h-[2px] mx-auto mt-5" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }} />
          </motion.div>

          <div className="max-w-3xl mx-auto grid gap-3">
            {howIHelp.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-center gap-4 rounded-xl p-5 border border-border bg-background hover:border-gold/20 transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-heading font-bold text-gold-dark border border-gold/15" style={{ background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--cream)))" }}>
                  {i + 1}
                </div>
                <p className="text-foreground font-body text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mind Science Techniques */}
      <section ref={techniquesRef} className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(170deg, hsl(var(--forest-deep)), hsl(90 30% 12%))" }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={isTechniquesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold tracking-[0.5em] uppercase text-[10px] font-body font-semibold mb-3">My Toolkit</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Mind Science <span className="italic text-gold">Techniques</span>
            </h2>
            <div className="w-10 h-[2px] mx-auto mt-5" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }} />
          </motion.div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5">
            {techniques.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isTechniquesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-2xl p-8 border border-white/10 relative overflow-hidden group"
                style={{ background: "hsla(0, 0%, 100%, 0.04)", backdropFilter: "blur(8px)" }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "inset 0 0 30px -8px hsla(var(--gold), 0.15)" }} />
                <t.icon className="w-10 h-10 text-gold/70 mb-5 group-hover:text-gold transition-colors duration-300" />
                <h3 className="font-heading font-bold text-white text-lg mb-1">{t.title}</h3>
                <p className="text-gold/60 text-xs font-body tracking-wider uppercase mb-4">{t.subtitle}</p>
                <p className="text-white/60 font-body text-sm leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </FounderLayout>
  );
};

export default FounderAbout;
