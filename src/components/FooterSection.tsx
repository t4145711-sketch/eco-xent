import { Instagram, Facebook, Twitter } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-heading font-bold text-gradient-gold mb-2">Eco-Xent</h3>
            <p className="text-sm text-muted-foreground font-body">Nature Reimagined. Luxury Redefined.</p>
          </div>

          <div className="flex items-center gap-6">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground font-body">
              contact@ecoxent.com
            </p>
            <p className="text-xs text-muted-foreground/60 font-body mt-1">
              © 2026 Eco-Xent. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
