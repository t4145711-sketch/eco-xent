import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, Heart, Shield, Sparkles, Users, Award, Quote, Star, MessageCircle, ChevronRight, Play, Zap, Target, Eye } from "lucide-react";
import { lazy, Suspense } from "react";
import logoImg from "@/assets/ecoxent-logo-new.jpeg";
import founderBanner1 from "@/assets/founder-banner-1.jpg";
import founderBanner2 from "@/assets/founder-banner-2.jpg";
import founderBanner3 from "@/assets/founder-banner-3.jpg";

const founderSlides = [
  { image: founderBanner1, subtitle: "Neuro-Linguistic Programming", heading1: "Rewire Your", heading2: "Mind.", desc: "Transform limiting beliefs into empowering patterns with certified NLP techniques." },
  { image: founderBanner2, subtitle: "Silva Method Mastery", heading1: "Unlock Your", heading2: "Potential.", desc: "Dynamic meditation and visualization to access your mind's deepest power." },
  { image: founderBanner3, subtitle: "Family & Trauma Healing", heading1: "Heal Within.", heading2: "Transform Forever.", desc: "Overcome childhood traumas and restore family harmony from the very first session." },
];

const FounderChatbot = lazy(() => import("@/components/FounderChatbot"));

const specialties = [
  { icon: Brain, title: "Certified NLP Practitioner", desc: "Rewire thought patterns for lasting positive change through proven neuro-linguistic programming techniques.", color: "hsl(var(--gold))" },
  { icon: Sparkles, title: "Silva Method Coach", desc: "Unlock your mind's hidden potential through dynamic meditation and visualization mastery.", color: "hsl(var(--gold))" },
  { icon: Shield, title: "Metaphysics Specialist", desc: "Bridge the gap between science and spirituality for profound self-understanding.", color: "hsl(var(--gold))" },
  { icon: Heart, title: "Trauma Healing Expert", desc: "Heal childhood wounds and overcome deep-rooted fears with compassionate therapeutic guidance.", color: "hsl(var(--gold))" },
  { icon: Users, title: "Family Harmony Coach", desc: "Transform parent-child dynamics and restore harmony using proven relationship techniques.", color: "hsl(var(--gold))" },
  { icon: Award, title: "Instant Results Method", desc: "Experience breakthrough healing and tangible transformation from the very first session.", color: "hsl(var(--gold))" },
];

const testimonials = [
  { name: "Ayesha R.", text: "Just one session changed my perspective completely. My relationship with my children has transformed beyond what I thought possible.", rating: 5, location: "Lahore" },
  { name: "Fatima K.", text: "The Silva Method coaching helped me overcome anxiety I carried for 15 years. Truly life-changing experience.", rating: 5, location: "Karachi" },
  { name: "Hira M.", text: "I was skeptical at first, but the NLP techniques worked instantly. My family life is peaceful now.", rating: 5, location: "Islamabad" },
  { name: "Saima A.", text: "The trauma healing sessions gave me freedom from 20 years of emotional pain. I can finally breathe again.", rating: 5, location: "Rawalpindi" },
];

const stats = [
  { value: "500+", label: "Lives Transformed", icon: Heart },
  { value: "15+", label: "Years Experience", icon: Award },
  { value: "98%", label: "Client Satisfaction", icon: Star },
  { value: "1st", label: "Session Results", icon: Zap },
];

const process = [
  { step: "01", title: "Discovery Call", desc: "A free, no-pressure conversation to understand your challenges and goals.", icon: MessageCircle },
  { step: "02", title: "Personalized Plan", desc: "A custom healing roadmap designed specifically for your unique situation.", icon: Target },
  { step: "03", title: "Deep Healing", desc: "Guided sessions using NLP, Silva Method, and metaphysical techniques.", icon: Eye },
  { step: "04", title: "Lasting Freedom", desc: "Ongoing support to ensure your transformation is permanent and sustainable.", icon: Sparkles },
];

const AboutCeo = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const specialtiesRef = useRef(null);
  const missionRef = useRef(null);
  const testimonialsRef = useRef(null);
  const processRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const isSpecialtiesInView = useInView(specialtiesRef, { once: true, margin: "-50px" });
  const isMissionInView = useInView(missionRef, { once: true, margin: "-50px" });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-50px" });
  const isProcessInView = useInView(processRef, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % founderSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

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

      {/* Hero Section — Banner Carousel */}
      <section ref={heroRef} className="pt-[68px] relative overflow-hidden min-h-[100vh] flex items-center">
        {/* Background banner images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <img
              src={founderSlides[currentSlide].image}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        {/* Bottom gold accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent z-20" />

        <motion.div style={{ y: heroParallax }} className="container mx-auto px-6 relative z-10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 mb-10 backdrop-blur-sm"
              style={{ background: "hsla(0,0%,0%,0.3)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-[10px] tracking-[0.2em] uppercase font-body font-medium">Certified Mind Science Expert</span>
            </motion.div>

            {/* Slide-specific content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-gold/80 tracking-[0.4em] uppercase text-[10px] md:text-[11px] font-body font-semibold mb-5">{founderSlides[currentSlide].subtitle}</p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-3 leading-[1.1] drop-shadow-lg">
                  {founderSlides[currentSlide].heading1}
                </h1>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1]">
                  <span className="italic bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent drop-shadow-lg">{founderSlides[currentSlide].heading2}</span>
                </h1>
                <div className="w-16 h-[2px] mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }} />
                <p className="text-base md:text-lg text-white/60 font-body leading-relaxed font-light max-w-xl mx-auto mb-10">
                  {founderSlides[currentSlide].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
            >
              <motion.a
                href="https://wa.me/923295991062?text=I%20want%20to%20know%20more%20about%20coaching%20sessions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-body font-semibold text-sm tracking-wide text-forest-dark shadow-xl"
                style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))" }}
                whileHover={{ scale: 1.04, boxShadow: "0 12px 40px -8px hsla(var(--gold), 0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Play className="w-4 h-4 fill-current" />
                Book Free Session
              </motion.a>
              <motion.a
                href="#specialties"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-semibold text-sm tracking-wide border border-white/25 text-white/80 hover:text-white hover:border-white/50 transition-all backdrop-blur-sm"
                style={{ background: "hsla(0,0%,0%,0.2)" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore My Work
                <ChevronRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Slide indicators */}
            <div className="flex items-center justify-center gap-2.5 mb-12">
              {founderSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 bg-gold" : "w-3 bg-white/25 hover:bg-white/40"}`}
                />
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="text-center py-5 px-4 rounded-2xl border border-white/10 backdrop-blur-md transition-all duration-300"
                  style={{ background: "hsla(0, 0%, 0%, 0.3)" }}
                >
                  <stat.icon className="w-4 h-4 text-gold/60 mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-heading font-bold text-gold mb-1">{stat.value}</p>
                  <p className="text-[9px] md:text-[10px] text-white/50 font-body tracking-[0.15em] uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border border-white/15 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-3 rounded-full bg-gold/50"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Mission Statement — Enhanced */}
      <section ref={missionRef} className="py-24 md:py-32 bg-cream relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/30 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <p className="text-gold tracking-[0.5em] uppercase text-[10px] font-body font-semibold mb-4">My Purpose</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight">
                Why I Do <span className="italic" style={{ color: "hsl(var(--gold-dark))" }}>What I Do</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="rounded-2xl p-8 md:p-10 border border-border bg-background relative overflow-hidden group hover:border-gold/20 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />
                <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(var(--gold)), transparent)" }} />
                <Quote className="w-8 h-8 text-gold/20 mb-5" />
                <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-4 leading-snug">
                  Empowering Parents for <span className="italic" style={{ color: "hsl(var(--gold-dark))" }}>Instant Healing</span>
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed text-sm md:text-base font-light">
                  My expertise empowers parents to experience instant healing and results, creating a more <strong className="text-foreground/90 font-medium">harmonious and loving family environment</strong>. I believe that when parents heal, the entire family transforms.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="rounded-2xl p-8 md:p-10 border border-border bg-background relative overflow-hidden group hover:border-gold/20 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />
                <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(var(--gold)), transparent)" }} />
                <Brain className="w-8 h-8 text-gold/20 mb-5" />
                <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-4 leading-snug">
                  The Science of <span className="italic" style={{ color: "hsl(var(--gold-dark))" }}>Transformation</span>
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed text-sm md:text-base font-light">
                  Through proven NLP techniques, the Silva Method, and metaphysical wisdom, I guide families toward lasting peace, deeper connections, and <strong className="text-foreground/90 font-medium">emotional freedom</strong> that transforms every aspect of their lives.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section — NEW */}
      <section ref={processRef} className="py-24 md:py-32 bg-background relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold tracking-[0.5em] uppercase text-[10px] font-body font-semibold mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Your <span className="italic" style={{ color: "hsl(var(--gold-dark))" }}>Healing Journey</span>
            </h2>
            <div className="w-10 h-[2px] mx-auto mt-4" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }} />
          </motion.div>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="relative rounded-2xl p-6 border border-border hover:border-gold/25 transition-all duration-500 group bg-background"
              >
                {/* Step number */}
                <span className="absolute -top-3 -left-1 text-5xl font-heading font-black text-gold/[0.07] select-none">{p.step}</span>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 border border-gold/15 group-hover:border-gold/30 transition-all duration-300" style={{ background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--cream)))" }}>
                  <p.icon className="w-5 h-5 text-gold-dark" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2 text-sm">{p.title}</h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Grid — Enhanced */}
      <section id="specialties" ref={specialtiesRef} className="py-24 md:py-32 bg-cream">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isSpecialtiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold tracking-[0.5em] uppercase text-[10px] font-body font-semibold mb-3">Areas of Expertise</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              What I <span className="italic" style={{ color: "hsl(var(--gold-dark))" }}>Specialize In</span>
            </h2>
            <div className="w-10 h-[2px] mx-auto mt-4" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }} />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {specialties.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isSpecialtiesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, boxShadow: "0 16px 50px -12px hsla(var(--gold), 0.15)" }}
                className="rounded-2xl p-8 border border-border hover:border-gold/25 transition-all duration-500 group bg-background relative overflow-hidden"
              >
                {/* Subtle corner glow on hover */}
                <div className="absolute -top-12 -right-12 w-24 h-24 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500" style={{ background: "radial-gradient(circle, hsl(var(--gold)), transparent)" }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 border border-gold/15 group-hover:border-gold/30 group-hover:scale-110" style={{ background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--cream)))" }}>
                  <s.icon className="w-6 h-6 text-gold-dark" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-3 text-base">{s.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — Premium */}
      <section ref={testimonialsRef} className="py-24 md:py-32 relative overflow-hidden" style={{ background: "linear-gradient(170deg, hsl(var(--forest-deep)), hsl(90 30% 12%))" }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.04]" style={{ background: "radial-gradient(ellipse, hsl(var(--gold)), transparent 70%)", filter: "blur(60px)" }} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold tracking-[0.5em] uppercase text-[10px] font-body font-semibold mb-3">Client Stories</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Real <span className="italic text-gold">Transformations</span>
            </h2>
            <div className="w-10 h-[2px] mx-auto mt-5" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }} />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 25 }}
                animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, borderColor: "hsla(var(--gold), 0.2)" }}
                className="rounded-2xl p-7 md:p-8 border border-white/8 relative transition-all duration-300"
                style={{ background: "hsla(0, 0%, 100%, 0.04)" }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-white/75 font-body text-sm md:text-base leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-heading font-bold text-sm">{t.name}</p>
                    <p className="text-white/35 text-xs font-body">{t.location}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center border border-gold/15" style={{ background: "hsla(var(--gold), 0.08)" }}>
                    <Quote className="w-3.5 h-3.5 text-gold/40" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Premium */}
      <section className="py-24 md:py-32 bg-cream relative overflow-hidden">
        {/* Ambient decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] opacity-[0.04]" style={{ background: "radial-gradient(ellipse, hsl(var(--gold)), transparent 70%)", filter: "blur(60px)" }} />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-gold tracking-[0.5em] uppercase text-[10px] font-body font-semibold mb-5">Take The First Step</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-tight">
              Ready to Begin Your <br className="hidden md:block" />
              <span className="italic" style={{ color: "hsl(var(--gold-dark))" }}>Healing Journey?</span>
            </h2>
            <p className="text-muted-foreground font-body mb-12 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Take the first step toward a transformed, harmonious family life. Book a free consultation today — no commitment, just a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.a
                href="https://wa.me/923295991062?text=I%20want%20to%20know%20more%20about%20coaching%20sessions"
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
              <motion.button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-body font-semibold text-sm tracking-wide border border-border hover:border-gold/30 transition-all duration-300 text-foreground"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Products
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground font-body">© {new Date().getFullYear()} Eco-Xent. All rights reserved.</p>
        </div>
      </footer>

      <Suspense fallback={null}>
        <FounderChatbot />
      </Suspense>
    </div>
  );
};

export default AboutCeo;
