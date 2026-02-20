import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { ShoppingBag, Search, Menu, X, Phone } from "lucide-react";
import { useState, useRef } from "react";
import logoImg from "@/assets/ecoxent-logo-new.jpeg";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Products", href: "#products" },
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
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      style={{
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "0 1px 0 hsl(95 20% 85%)",
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={logoImg}
              alt="Eco-Xent"
              className="object-contain"
              style={{ height: "52px", width: "auto" }}
            />
          </motion.a>

          {/* Desktop nav — centered */}
          <div className="hidden md:flex items-center gap-0">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="relative px-5 py-2 text-[13px] font-body font-medium text-foreground/70 hover:text-primary transition-colors duration-200 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
              </motion.a>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/923295991062"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-body font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              style={{ background: "hsl(95 45% 28%)", color: "#fff" }}
            >
              <Phone className="w-3.5 h-3.5" />
              Order Karein
            </motion.a>

            {/* Cart */}
            <motion.button
              className="relative w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-4 h-4 text-foreground/60" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile menu toggle */}
            <motion.button
              className="md:hidden w-9 h-9 rounded-full border border-border flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-4 h-4 text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
                  transition={{ delay: i * 0.07 }}
                  className="px-4 py-3 rounded-xl text-sm font-body text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="https://wa.me/923295991062"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-body font-semibold text-white"
                style={{ background: "hsl(95 45% 28%)" }}
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
