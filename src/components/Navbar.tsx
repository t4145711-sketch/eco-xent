import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const navItems = [
  { label: "Products", href: "#products" },
  { label: "Experience", href: "#experience" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ cartCount }: { cartCount: number }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Hide navbar on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    if (diff > 10 && latest > 200) setHidden(true);
    else if (diff < -5) setHidden(false);
    setScrolled(latest > 50);
    lastScrollY.current = latest;
  });

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "py-2 bg-background/60 backdrop-blur-2xl border-b border-primary/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="relative w-10 h-10 rounded-xl border border-primary/30 flex items-center justify-center overflow-hidden group-hover:border-primary/60 transition-colors duration-500"
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <span className="text-primary font-heading font-bold text-sm relative z-10">E</span>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-heading font-bold text-gradient-gold leading-none">Eco-Xent</span>
            <span className="text-[8px] text-muted-foreground/40 tracking-[0.3em] uppercase font-body">Premium Organics</span>
          </div>
        </motion.a>

        {/* Desktop nav with pill indicator */}
        <div className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-secondary/30 backdrop-blur-xl border border-border/30">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative px-5 py-2 rounded-full text-[11px] tracking-[0.15em] uppercase font-body font-medium transition-colors duration-300"
            >
              {activeSection === item.href && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-primary/15 border border-primary/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${activeSection === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {item.label}
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Cart with animation */}
          <motion.button
            className="relative w-10 h-10 rounded-xl border border-border/30 flex items-center justify-center bg-secondary/20 hover:bg-secondary/40 hover:border-primary/20 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0, y: 5 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-body font-bold shadow-lg shadow-primary/30"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile menu */}
          <motion.button
            className="md:hidden w-10 h-10 rounded-xl border border-border/30 flex items-center justify-center bg-secondary/20"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden mx-4 mt-2 rounded-2xl overflow-hidden bg-card/90 backdrop-blur-2xl border border-border/50"
          >
            <div className="p-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`px-4 py-3 rounded-xl text-sm tracking-[0.1em] uppercase font-body transition-all duration-300 ${
                    activeSection === item.href
                      ? "text-primary bg-primary/10 border border-primary/15"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
