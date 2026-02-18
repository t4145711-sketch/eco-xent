import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer id="contact" className="relative border-t border-border/50 bg-secondary/20 overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(ellipse, hsl(43 50% 55%), transparent)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 py-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-primary font-heading font-bold text-xs">E</span>
              </motion.div>
              <span className="text-xl font-heading font-bold text-gradient-gold">Eco-Xent</span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6 max-w-xs">
              Crafting the finest organic skincare and haircare products with nature's purest ingredients. Luxury you can trust.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full border border-primary/15 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <h4 className="text-sm font-body font-semibold text-foreground tracking-[0.15em] uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Products", "Our Story", "Ingredients", "Sustainability", "FAQs"].map((link, i) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-body group flex items-center gap-2">
                    <motion.span
                      className="inline-block w-0 h-px bg-primary group-hover:w-4 transition-all duration-300"
                    />
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-sm font-body font-semibold text-foreground tracking-[0.15em] uppercase mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              {[
                { icon: Mail, text: "contact@ecoxent.com" },
                { icon: Phone, text: "+91 98765 43210" },
                { icon: MapPin, text: "Mumbai, Maharashtra, India" },
              ].map(({ icon: Icon, text }, i) => (
                <motion.li
                  key={text}
                  className="flex items-start gap-3 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-muted-foreground font-body group-hover:text-foreground/80 transition-colors">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-border/30 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs text-muted-foreground/50 font-body">
            © 2026 Eco-Xent. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a key={item} href="#" className="text-xs text-muted-foreground/50 hover:text-primary/70 transition-colors font-body">
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
