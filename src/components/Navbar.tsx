import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { ShoppingBag, Menu, X, Phone, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoImg from "@/assets/ecoxent-logo-new.jpeg";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Collection", href: "#products" },
  { label: "About", href: "/about", isPage: true },
  { label: "Contact", href: "#contact" },
  { label: "Founder", href: "/founder", isPage: true },
  { label: "Track Order", href: "/track", isPage: true },
];

const Navbar = ({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const [activeSection, setActiveSection] = useState("#hero");

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
    lastScrollY.current = latest;
  });

  // Track active section via scroll
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sectionIds = navItems.filter(i => !i.isPage).map(i => i.href);

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      // Check from bottom to top to find the last section that has been scrolled past
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.querySelector(sectionIds[i]) as HTMLElement;
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      // Default to first
      setActiveSection(sectionIds[0]);
    };

    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Glassmorphism background */}
      <motion.div
        className="absolute inset-0 border-b"
        animate={{
          backgroundColor: scrolled ? "hsla(90, 35%, 18%, 0.98)" : "hsla(90, 35%, 18%, 0.95)",
          borderColor: scrolled ? "hsla(0, 0%, 100%, 0.1)" : "hsla(0, 0%, 100%, 0.05)",
        }}
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex-shrink-0 relative group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={logoImg}
              alt="Eco-Xent"
              className="object-contain rounded-sm"
              style={{ height: "44px" }}
            />
          </motion.a>

          {/* Desktop nav — centered with pill indicator */}
          <div className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2 rounded-full p-1 border border-white/15" style={{ background: "hsla(0, 0%, 100%, 0.08)" }}>
            {navItems.map((item, i) => {
              const isActive = item.isPage ? location.pathname === item.href : activeSection === item.href;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.isPage) {
                      e.preventDefault();
                      navigate(item.href);
                    } else if (location.pathname !== "/") {
                      e.preventDefault();
                      navigate("/" + item.href);
                    } else {
                      setActiveSection(item.href);
                    }
                  }}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="relative px-5 py-2 rounded-full text-[11px] font-body font-semibold tracking-[0.12em] uppercase transition-colors duration-300 whitespace-nowrap"
                  style={{
                    color: isActive ? "hsl(90, 35%, 18%)" : "hsla(0, 0%, 100%, 0.7)",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "hsla(0, 0%, 100%, 0.95)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.a>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            {/* Cart */}
            <motion.button
              onClick={onCartClick}
              className="relative w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/10 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-[18px] h-[18px] text-white/70" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: "hsl(45, 55%, 48%)", color: "white" }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              className="lg:hidden w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-4 h-4 text-white" />
                  </motion.div>
                ) : (
                  <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden border-t border-white/10 overflow-hidden relative"
            style={{ background: "hsla(90, 35%, 18%, 0.98)", backdropFilter: "blur(16px)" }}
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => {
                const isActive = item.isPage ? location.pathname === item.href : activeSection === item.href;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      if (item.isPage) {
                        navigate(item.href);
                      } else if (location.pathname !== "/") {
                        navigate("/" + item.href);
                      } else {
                        setTimeout(() => {
                          const el = document.querySelector(item.href);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }, 350);
                      }
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-body font-medium transition-all"
                    style={{
                      background: isActive ? "hsla(0, 0%, 100%, 0.12)" : "transparent",
                      color: isActive ? "white" : "hsla(0, 0%, 100%, 0.65)",
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "white" }} />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
