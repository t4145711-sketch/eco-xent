import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer id="contact" className="relative border-t border-border/30 overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(ellipse, hsl(43 50% 55%), transparent)",
          filter: "blur(100px)",
        }}
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Large brand text */}
        <motion.div
          className="py-16 md:py-24 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-none mb-6"
            style={{
              WebkitTextStroke: "1px hsl(43 50% 55% / 0.2)",
              WebkitTextFillColor: "transparent",
            }}
            initial={{ y: 40 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            ECO-XENT
          </motion.h2>
          <p className="text-sm text-muted-foreground/60 font-body max-w-md mx-auto mb-8">
            Crafting the finest organic skincare and haircare products with nature's purest ingredients.
          </p>
          <div className="flex items-center justify-center gap-3">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Facebook, label: "Facebook" },
              { icon: Twitter, label: "Twitter" },
            ].map(({ icon: Icon, label }, i) => (
              <motion.a
                key={label}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/25 hover:bg-primary/5 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Links grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-border/20">
          {[
            { title: "Products", links: ["Shampoo", "Hair Oil", "Soaps", "Serum"] },
            { title: "Company", links: ["Our Story", "Sustainability", "Ingredients", "Blog"] },
            { title: "Support", links: ["FAQs", "Shipping", "Returns", "Contact"] },
          ].map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + gi * 0.1 }}
            >
              <h4 className="text-xs font-body font-semibold text-foreground/70 tracking-[0.2em] uppercase mb-5">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground/60 hover:text-primary transition-colors font-body group inline-flex items-center gap-1"
                    >
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-xs font-body font-semibold text-foreground/70 tracking-[0.2em] uppercase mb-5">Get In Touch</h4>
            <ul className="space-y-3">
              {[
                { icon: Mail, text: "ecoxent@gmail.com", href: "mailto:ecoxent@gmail.com" },
                { icon: Phone, text: "+92 300 1234567", href: "tel:+923001234567" },
                { icon: MapPin, text: "Pakistan", href: "#" },
              ].map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-2.5 group">
                  <Icon className="w-3.5 h-3.5 text-primary/50 mt-0.5 flex-shrink-0" />
                  <a href={href} className="text-sm text-muted-foreground/60 font-body group-hover:text-primary transition-colors">{text}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-border/15 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p className="text-[11px] text-muted-foreground/30 font-body">
            © 2026 Eco-Xent. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-[11px] text-muted-foreground/30 hover:text-primary/50 transition-colors font-body">
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
