import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import logoImg from "@/assets/ecoxent-logo-new.jpeg";
import mindScienceLogo from "@/assets/mind-science-logo.png";

const FounderChatbot = lazy(() => import("@/components/FounderChatbot"));

const tabs = [
  { label: "Home", href: "/founder" },
  { label: "About", href: "/founder/about" },
  { label: "Services", href: "/founder/services" },
  { label: "Contact", href: "/founder/contact" },
];

interface FounderLayoutProps {
  activeTab: string;
  children: React.ReactNode;
}

const FounderLayout = ({ activeTab, children }: FounderLayoutProps) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border/50" style={{ background: "hsla(90, 35%, 18%, 0.98)", backdropFilter: "blur(16px)" }}>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-[68px]">
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </motion.button>

          {/* Center nav — desktop */}
          <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2 rounded-full p-1 border border-white/15" style={{ background: "hsla(0, 0%, 100%, 0.08)" }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.label.toLowerCase();
              return (
                <motion.button
                  key={tab.label}
                  onClick={() => navigate(tab.href)}
                  className="relative px-5 py-2 rounded-full text-[11px] font-body font-semibold tracking-[0.12em] uppercase whitespace-nowrap transition-colors duration-300"
                  style={{ color: isActive ? "hsl(90, 35%, 18%)" : "hsla(0, 0%, 100%, 0.7)" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="founder-nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "hsla(0, 0%, 100%, 0.95)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Mind Science Logo */}
            <img src={mindScienceLogo} alt="Mind Science Expert" className="h-9 w-9 rounded-full object-cover border border-white/20" />

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all"
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
            className="fixed top-[68px] left-0 right-0 z-40 md:hidden border-t border-white/10 overflow-hidden"
            style={{ background: "hsla(90, 35%, 18%, 0.98)", backdropFilter: "blur(16px)" }}
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {tabs.map((tab, i) => {
                const isActive = activeTab === tab.label.toLowerCase();
                return (
                  <motion.button
                    key={tab.label}
                    onClick={() => { setMenuOpen(false); navigate(tab.href); }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-body font-medium transition-all text-left"
                    style={{
                      background: isActive ? "hsla(0, 0%, 100%, 0.12)" : "transparent",
                      color: isActive ? "white" : "hsla(0, 0%, 100%, 0.65)",
                    }}
                  >
                    {tab.label}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="pt-[68px]">
        {children}
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground font-body">© {new Date().getFullYear()} Mind Science Expert — Eco-Xent. All rights reserved.</p>
        </div>
      </footer>

      <Suspense fallback={null}>
        <FounderChatbot />
      </Suspense>
    </div>
  );
};

export default FounderLayout;
