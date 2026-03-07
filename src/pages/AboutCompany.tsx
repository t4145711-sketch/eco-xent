import { motion } from "framer-motion";
import { Leaf, Shield, Award, Heart, CheckCircle, ArrowLeft, Eye, Target, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const whyChoosePoints = [
  { icon: Leaf, text: "100% natural and organic herbal ingredients — zero harmful chemicals." },
  { icon: Award, text: "Years of expertise in traditional herbal formulations and modern wellness science." },
  { icon: Shield, text: "Rigorous quality standards with safety-tested, dermatologist-friendly products." },
  { icon: Users, text: "Thousands of satisfied customers across Pakistan trust Eco-Xent daily." },
  { icon: Heart, text: "Handcrafted with care — every product is made with precision and love." },
  { icon: Sparkles, text: "Proven, visible results backed by real customer testimonials." },
];

const sections = [
  {
    id: "our-story",
    icon: Heart,
    label: "Our Story",
    title: "From Heritage to Your Home",
    content: [
      "Eco-Xent is a herbal wellness company rooted in the rich tradition of natural healing. For many years, we have been deeply involved in the herbal industry — researching, formulating, and perfecting products that harness the true power of nature.",
      "What started as a passion for botanical science and Ayurvedic wisdom has grown into a trusted brand that serves families across Pakistan. Recently, we expanded our presence online to ensure that customers from every corner of the country can easily access our premium herbal products from the comfort of their homes.",
      "Our journey is driven by one simple belief: nature provides the best solutions for health, beauty, and personal care — and everyone deserves access to them.",
    ],
  },
  {
    id: "our-experience",
    icon: Award,
    label: "Our Experience",
    title: "Years of Herbal Expertise",
    content: [
      "Eco-Xent brings years of hands-on experience in herbal formulations and natural wellness solutions. Our team combines deep knowledge of traditional herbal medicine with modern scientific research to create products that deliver real, lasting results.",
      "From sourcing the finest organic ingredients to perfecting every formula through rigorous testing, our experience ensures that each Eco-Xent product meets the highest standards of quality and effectiveness. We understand the unique needs of Pakistani skin and hair, and our formulations are specifically designed to address them naturally.",
    ],
  },
  {
    id: "our-mission",
    icon: Target,
    label: "Our Mission",
    title: "Pure Nature. Powerful Results.",
    content: [
      "Our mission is to provide high-quality, natural herbal products that promote health, beauty, and personal well-being — without compromising on safety or effectiveness.",
      "We believe that personal care should never come at the cost of your health. That's why every Eco-Xent product is free from harmful chemicals, sulfates, parabens, and synthetic fragrances. We are committed to making premium herbal wellness accessible and affordable for every Pakistani family.",
    ],
  },
  {
    id: "our-vision",
    icon: Eye,
    label: "Our Vision",
    title: "A Trusted Name in Herbal Wellness",
    content: [
      "Our vision is to become the most trusted herbal personal care brand in Pakistan — and eventually, to share our products with customers around the world.",
      "We envision a future where natural, chemical-free products are the standard — not the exception. Eco-Xent is working to lead that transformation by continuously innovating, expanding our product line, and building lasting relationships with our customers based on trust, transparency, and results.",
    ],
  },
  {
    id: "our-commitment",
    icon: Shield,
    label: "Our Commitment",
    title: "Uncompromising Quality Standards",
    content: [
      "Quality is not just a promise at Eco-Xent — it's the foundation of everything we do. From ingredient sourcing to final packaging, every step of our process is guided by strict quality control standards.",
      "We use only natural, ethically sourced ingredients that are free from harmful additives. Each product is carefully formulated, tested, and handcrafted to ensure safety, purity, and maximum effectiveness. Our commitment to quality means you can trust every Eco-Xent product for your family's daily care.",
    ],
  },
];

const AboutCompany = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "About Eco-Xent | Organic Herbal Wellness Company Pakistan";
    return () => { document.title = "Eco-Xent | 100% Organic Herbal Products Pakistan"; };
  }, []);

  return (
    <>
      {/* SEO meta tags set via useEffect */}

      <div className="min-h-screen bg-background">
        {/* Hero Banner */}
        <section className="relative pt-28 pb-20 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(var(--forest-deep)), hsl(var(--forest-dark)), hsl(var(--forest)))" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--gold) / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--gold) / 0.2) 0%, transparent 40%)" }} />
          <div className="container mx-auto px-6 relative z-10">
            <motion.button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/60 hover:text-white/90 text-sm font-body mb-8 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </motion.button>

            <motion.p
              className="text-gold tracking-[0.4em] uppercase text-[11px] font-body font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              About Our Company
            </motion.p>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              The Story Behind{" "}
              <span className="text-gradient-gold italic">Eco-Xent</span>
            </motion.h1>
            <motion.p
              className="text-white/60 font-body text-lg max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Pakistan's trusted herbal wellness company — committed to delivering 100% natural, organic personal care products that heal, nourish, and transform.
            </motion.p>
            <div className="w-20 h-px bg-gold/40 mt-8" />
          </div>
        </section>

        {/* Content Sections */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto space-y-24">
            {sections.map((section, sIdx) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <motion.div custom={0} variants={fadeUp} className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                    <section.icon className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <p className="text-gold tracking-[0.3em] uppercase text-[11px] font-body font-medium">
                    {section.label}
                  </p>
                </motion.div>

                <motion.h2
                  custom={1}
                  variants={fadeUp}
                  className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-6"
                >
                  {section.title}
                </motion.h2>

                <motion.div custom={2} variants={fadeUp} className="h-px w-12 bg-gold/30 mb-8" />

                <div className="space-y-5">
                  {section.content.map((para, pIdx) => (
                    <motion.p
                      key={pIdx}
                      custom={3 + pIdx}
                      variants={fadeUp}
                      className="text-muted-foreground font-body text-base leading-[1.85] font-light"
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                {sIdx < sections.length - 1 && (
                  <div className="mt-16 border-b border-border" />
                )}
              </motion.section>
            ))}

            {/* Why Choose Eco-Xent */}
            <motion.section
              id="why-choose"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.div custom={0} variants={fadeUp} className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-accent-foreground" />
                </div>
                <p className="text-gold tracking-[0.3em] uppercase text-[11px] font-body font-medium">
                  Why Choose Us
                </p>
              </motion.div>

              <motion.h2
                custom={1}
                variants={fadeUp}
                className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-6"
              >
                Why Families Trust Eco-Xent
              </motion.h2>

              <motion.div custom={2} variants={fadeUp} className="h-px w-12 bg-gold/30 mb-10" />

              <div className="grid sm:grid-cols-2 gap-4">
                {whyChoosePoints.map((point, i) => (
                  <motion.div
                    key={i}
                    custom={3 + i}
                    variants={fadeUp}
                    className="flex items-start gap-4 p-5 rounded-xl border border-border hover:border-gold/20 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <point.icon className="w-4 h-4 text-gold-dark" />
                    </div>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed pt-1.5">
                      {point.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        {/* CTA Footer */}
        <section className="py-16 border-t border-border">
          <div className="container mx-auto px-6 text-center">
            <motion.h3
              className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Experience the Power of Nature
            </motion.h3>
            <motion.p
              className="text-muted-foreground font-body mb-8 max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              Explore our collection of 100% organic herbal products and discover the Eco-Xent difference.
            </motion.p>
            <motion.button
              onClick={() => navigate("/")}
              className="px-8 py-3.5 rounded-full font-body font-semibold text-sm tracking-wide text-primary-foreground"
              style={{ background: "linear-gradient(135deg, hsl(var(--forest)), hsl(var(--forest-dark)))" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              Browse Our Products
            </motion.button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutCompany;
