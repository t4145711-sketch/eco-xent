import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Facebook, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import logoImg from "@/assets/ecoxent-logo-new.jpeg";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z"/>
  </svg>
);

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer id="contact" className="relative bg-white overflow-hidden">
      {/* Green top border — like reference */}
      <div className="w-full h-1" style={{ background: "hsl(95 45% 32%)" }} />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Main footer content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-b border-border">
          {/* Logo + description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <img
              src={logoImg}
              alt="Eco-Xent"
              className="object-contain mb-4"
              style={{ height: "48px", width: "auto" }}
            />
            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5">
              Pakistan's #1 organic skincare & haircare brand. 100% natural, handcrafted products.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1Bx4wMoGHi/" },
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/eco_xent?igsh=MTF3Y3R4eGwycmRoeA==" },
                { icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@eco_xent?_r=1&_t=ZS-9438nZAYCUk" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com/@ecoxent?si=ONkgyW-MgbgOxPwi" },
              ].map(({ icon: Icon, label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  {label === "TikTok" ? <TikTokIcon /> : <Icon className="w-4 h-4" />}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links columns */}
          {[
            { title: "Products", links: ["Shampoo", "Hair Oil", "Soaps", "Serum"] },
            { title: "Company", links: ["Our Story", "Sustainability", "Ingredients", "Blog"] },
          ].map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + gi * 0.1 }}
            >
              <h4 className="text-sm font-heading font-bold text-foreground mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                      {link}
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
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-sm font-heading font-bold text-foreground mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              {[
                { icon: Mail, text: "ecoxent@gmail.com", href: "mailto:ecoxent@gmail.com" },
                { icon: Phone, text: "+92 329 5991062", href: "tel:+923295991062" },
                { icon: MapPin, text: "Pakistan", href: "#" },
              ].map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <a href={href} className="text-sm text-muted-foreground font-body hover:text-primary transition-colors">{text}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-body">
            © 2026 Eco-Xent. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((item) => (
              <a key={item} href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors font-body">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
