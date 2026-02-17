import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="relative border-t border-border/50 bg-secondary/20">
      <div className="container mx-auto px-6">
        {/* Main footer */}
        <div className="grid md:grid-cols-3 gap-12 py-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center">
                <span className="text-primary font-heading font-bold text-xs">E</span>
              </div>
              <span className="text-xl font-heading font-bold text-gradient-gold">Eco-Xent</span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6 max-w-xs">
              Crafting the finest organic skincare and haircare products with nature's purest ingredients. Luxury you can trust.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-primary/15 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-body font-semibold text-foreground tracking-[0.15em] uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Products", "Our Story", "Ingredients", "Sustainability", "FAQs"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-body font-semibold text-foreground tracking-[0.15em] uppercase mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground font-body">contact@ecoxent.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground font-body">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground font-body">Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
