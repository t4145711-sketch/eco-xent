import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Facebook, Youtube, Twitter, Mail, MapPin, Phone } from "lucide-react";
import logoImg from "@/assets/ecoxent-logo-new.jpeg";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z"/>
  </svg>
);

const SnapchatIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.922-.214.04-.012.06-.012.06-.012.076 0 .166.008.237.037a.4.4 0 0 1 .259.364c0 .12-.06.237-.18.343-.18.16-.484.27-.81.39-.12.045-.24.083-.368.12-.237.077-.42.18-.51.343-.06.12-.082.24-.06.391.346 2.093 1.866 3.431 2.692 3.767a.5.5 0 0 1 .326.39c.02.12-.04.276-.18.39-.37.27-.94.478-1.693.623a1.9 1.9 0 0 0-.18.06c-.12.06-.18.18-.21.3-.03.06-.06.18-.06.24 0 .18.12.33.33.39a4.6 4.6 0 0 0 .63.12c.51.06.57.18.57.27 0 .12-.06.21-.18.3-.24.12-.57.18-.93.18-.24 0-.48-.03-.75-.06a4.6 4.6 0 0 0-.63-.06c-.18 0-.36.03-.51.09-.36.12-.72.48-1.17.93-.69.66-1.53 1.5-3.03 1.5h-.03c-1.5 0-2.34-.84-3.03-1.5-.45-.45-.81-.81-1.17-.93a1.4 1.4 0 0 0-.51-.09c-.21 0-.42.03-.63.06-.24.03-.48.06-.75.06-.36 0-.69-.06-.93-.18-.12-.09-.18-.18-.18-.3 0-.09.06-.21.57-.27.21-.03.42-.06.63-.12.21-.06.33-.21.33-.39 0-.06-.03-.18-.06-.24-.03-.12-.09-.24-.21-.3a1.9 1.9 0 0 0-.18-.06c-.75-.15-1.32-.36-1.69-.63-.14-.11-.2-.27-.18-.39a.5.5 0 0 1 .33-.39c.82-.34 2.34-1.67 2.69-3.77.02-.15 0-.27-.06-.39-.09-.16-.27-.27-.51-.34-.12-.04-.24-.08-.37-.12-.33-.12-.63-.23-.81-.39-.12-.1-.18-.22-.18-.34a.4.4 0 0 1 .26-.36c.07-.03.16-.04.24-.04.02 0 .02 0 .06.01.26.09.62.2.92.21.2 0 .33-.04.4-.09-.01-.16-.02-.33-.03-.51l-.003-.06c-.104-1.63-.23-3.654.3-4.847C7.86 1.069 11.216.793 12.206.793Z"/>
  </svg>
);

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer id="contact" className="relative overflow-hidden" style={{ background: "hsl(90 35% 18%)" }}>
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(45 55% 48% / 0.4), transparent)" }} />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-white/10">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
            <img src={logoImg} alt="Eco-Xent" className="object-contain mb-4" style={{ height: "44px" }} />
            <p className="text-sm font-body leading-relaxed mb-5 font-light" style={{ color: "hsl(0 0% 100% / 0.7)" }}>
              Luxury organic personal care. Handcrafted with pure botanicals for healthy hair & radiant skin.
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1Bx4wMoGHi/" },
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/eco_xent" },
                { icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@eco_xent" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com/@ecoxent" },
                { icon: Twitter, label: "X", href: "https://x.com/eco_xent" },
                { icon: SnapchatIcon, label: "Snapchat", href: "https://www.snapchat.com/add/eco_xent" },
              ].map(({ icon: Icon, label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/30 transition-all duration-300"
                >
                  {label === "TikTok" || label === "Snapchat" ? <Icon /> : <Icon className="w-3.5 h-3.5" />}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {[
            { title: "Collection", links: [
              { label: "Serum", href: "#products" },
              { label: "Hair Oil", href: "#products" },
              { label: "Shampoo", href: "#products" },
              { label: "Soap", href: "#products" },
            ]},
            { title: "Company", links: [
              { label: "Our Story", href: "#about" },
              { label: "Sustainability", href: "#about" },
              { label: "Ingredients", href: "#products" },
              { label: "FAQ", href: "#faq" },
            ]},
          ].map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + gi * 0.1 }}
            >
              <h4 className="text-xs font-body font-medium tracking-widest uppercase text-white mb-5">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-white/70 hover:text-gold transition-colors font-body font-light">{link.label}</a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
            <h4 className="text-xs font-body font-medium tracking-widest uppercase text-white mb-5">Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: Mail, text: "ecoxent@gmail.com", href: "mailto:ecoxent@gmail.com" },
                { icon: Phone, text: "+92 329 5991062", href: "tel:+923295991062" },
                { icon: MapPin, text: "Pakistan", href: "#" },
              ].map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" />
                  <a href={href} className="text-sm text-white/70 font-body font-light hover:text-gold transition-colors">{text}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50 font-body font-light">© 2026 Eco-Xent. All rights reserved.</p>
          <p className="text-xs text-white/50 font-body font-light">
            Website by{" "}
            <a href="mailto:neonesttechnologies@gmail.com" className="hover:text-gold transition-colors underline">Neo Nest Technologies</a>
            {" "}— <a href="mailto:neonesttechnologies@gmail.com" className="hover:text-gold transition-colors">neonesttechnologies@gmail.com</a>
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((item) => (
              <a key={item} href="#" className="text-xs text-white/50 hover:text-gold transition-colors font-body font-light">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
