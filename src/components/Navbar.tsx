import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = ({ cartCount }: { cartCount: number }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="text-2xl font-heading font-bold text-gradient-gold">
          Eco-Xent
        </a>
        <div className="hidden md:flex items-center gap-8">
          {["Products", "Experience", "Reviews"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="relative group">
          <ShoppingBag className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-body font-semibold"
            >
              {cartCount}
            </motion.span>
          )}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
