import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Heart, Users, Mic, CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
import FounderLayout from "@/components/founder/FounderLayout";

const services = [
  {
    icon: Users,
    title: "Parenting Coaching",
    desc: "One-on-one sessions to overcome parenting challenges and build a stronger relationship with your child.",
    features: ["Personalized approach", "Weekly sessions", "Homework & exercises", "Progress tracking"],
  },
  {
    icon: Heart,
    title: "Childhood Trauma Healing",
    desc: "Guided sessions to heal emotional wounds and overcome past traumas using proven mind science techniques.",
    features: ["Gentle, safe process", "NLP techniques", "Emotional release", "Inner child work"],
  },
  {
    icon: Brain,
    title: "Fear & Phobia Release",
    desc: "Powerful techniques to overcome fears and phobias in yourself and your child — often in a single session.",
    features: ["Rapid results", "Painless process", "NLP & Silva Method", "Lasting freedom"],
  },
  {
    icon: Mic,
    title: "Workshops & Seminars",
    desc: "Group sessions on effective parenting, communication, and relationship building for families and organizations.",
    features: ["Interactive format", "Group exercises", "Take-home tools", "Community support"],
  },
];

const FounderServices = () => {
  const servicesRef = useRef(null);
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-50px" });

  return (
    <FounderLayout activeTab="services">
      {/* Services Hero */}
      <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] opacity-[0.04]" style={{ background: "radial-gradient(ellipse, hsl(var(--gold)), transparent 70%)", filter: "blur(60px)" }} />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold tracking-[0.5em] uppercase text-[10px] font-body font-semibold mb-4">What I Offer</p>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              Parenting <span className="italic" style={{ color: "hsl(var(--gold-dark))" }}>Services</span>
            </h1>
            <div className="w-16 h-[2px] mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }} />
            <p className="text-muted-foreground font-body text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Personalized mind science solutions designed to transform your parenting journey and create lasting family harmony.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, boxShadow: "0 20px 50px -12px hsla(var(--gold), 0.12)" }}
                className="rounded-2xl p-8 md:p-10 border border-border hover:border-gold/20 transition-all duration-500 bg-background relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />
                <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500" style={{ background: "radial-gradient(circle, hsl(var(--gold)), transparent)" }} />

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-gold/15 group-hover:border-gold/30 group-hover:scale-110 transition-all duration-300" style={{ background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--cream)))" }}>
                  <s.icon className="w-6 h-6 text-gold-dark" />
                </div>

                <h3 className="font-heading font-bold text-foreground text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">{s.desc}</p>

                <div className="space-y-2.5 mb-8">
                  {s.features.map((f, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isServicesInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.1 + j * 0.05 + 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-gold/60 flex-shrink-0" />
                      <span className="text-foreground/80 font-body text-sm">{f}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.a
                  href={`https://wa.me/923295991062?text=I'm interested in ${s.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold-dark text-sm font-body font-semibold hover:gap-3 transition-all duration-300"
                  whileHover={{ x: 4 }}
                >
                  Book Now <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(170deg, hsl(var(--forest-deep)), hsl(90 30% 12%))" }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-gold tracking-[0.5em] uppercase text-[10px] font-body font-semibold mb-5">Ready to Transform?</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-5 leading-tight">
              Start Your <span className="italic text-gold">Healing Journey</span> Today
            </h2>
            <p className="text-white/50 font-body mb-10 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Book a free consultation — no commitment, just a conversation about how we can create lasting change together.
            </p>
            <motion.a
              href="https://wa.me/923295991062?text=I%20want%20to%20book%20a%20free%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-full font-body font-bold text-sm tracking-wide text-forest-dark shadow-lg"
              style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))" }}
              whileHover={{ scale: 1.04, boxShadow: "0 12px 40px -8px hsla(var(--gold), 0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle className="w-4 h-4" />
              Book Free Consultation
            </motion.a>
          </motion.div>
        </div>
      </section>
    </FounderLayout>
  );
};

export default FounderServices;
