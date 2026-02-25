import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { ShoppingBag, Menu, X, Phone } from "lucide-react";
import { useState, useRef } from "react";
import logoImg from "@/assets/ecoxent-logo-new.jpeg";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Collection", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ cartCount }: { cartCount: number }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    if (diff > 10 && latest > 150) setHidden(true);
    else if (diff < -5) setHidden(false);
    setScrolled(latest > 20);
    lastScrollY.current = latest;
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md"
      style={{
        boxShadow: scrolled ? "0 1px 12px hsl(40 20% 50% / 0.08)" : "0 1px 0 hsl(var(--border))",
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <motion.a href="#hero" className="flex-shrink-0" whileHover={{ scale: 1.02 }}>
            <img src={logoImg} alt="Eco-Xent" className="object-contain" style={{ height: "48px" }} />
          </motion.a>

          {/* Desktop nav — centered */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="px-5 py-2 rounded-full text-[12px] font-body font-medium tracking-widest uppercase text-foreground/60 hover:text-primary-foreground hover:bg-primary transition-all duration-300"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <motion.a
              href="https://wa.me/923295991062"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-body font-medium tracking-widest uppercase text-white transition-all duration-300 hover:shadow-lg"
              style={{ background: "hsl(var(--primary))" }}
            >
              <Phone className="w-3 h-3" />
              Order Now
            </motion.a>

            {/* Cart */}
            <motion.button
              className="relative w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-gold/40 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-4 h-4 text-foreground/50" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-white text-[9px] flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile */}
            <motion.button
              className="md:hidden w-9 h-9 rounded-full border border-border flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="w-4 h-4 text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="w-4 h-4 text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-white overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="px-4 py-3 rounded-lg text-sm font-body text-foreground/70 hover:text-foreground hover:bg-accent/50 transition-all"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="https://wa.me/923295991062"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-body font-medium text-white"
                style={{ background: "hsl(var(--primary))" }}
              >
                <Phone className="w-4 h-4" />
                WhatsApp Order
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
