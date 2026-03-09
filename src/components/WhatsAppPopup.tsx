import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923295991062";
const WELCOME_DELAY = 6000; // 6 seconds
const SESSION_KEY = "ecoxent_wa_popup_shown";

const WhatsAppPopup = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [exitShown, setExitShown] = useState(false);

  // Welcome popup - show after delay, only once per session
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setShowWelcome(true);
      sessionStorage.setItem(SESSION_KEY, "welcome");
    }, WELCOME_DELAY);

    return () => clearTimeout(timer);
  }, []);

  // Exit intent popup - detect mouse leaving viewport (desktop only)
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitShown && !showWelcome) {
        setShowExit(true);
        setExitShown(true);
      }
    },
    [exitShown, showWelcome]
  );

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const handleWhatsApp = (type: "welcome" | "exit") => {
    const messages = {
      welcome:
        "Hello! 🌿\nI just visited your website and I'm interested in Eco-Xent herbal products.\nPlease share details!",
      exit: "Hello! 🌿\nI was browsing Eco-Xent products and would like to know more before I go.\nCan you help?",
    };
    const msg = encodeURIComponent(messages[type]);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setShowWelcome(false);
    setShowExit(false);
  };

  const dismiss = (type: "welcome" | "exit") => {
    if (type === "welcome") setShowWelcome(false);
    else setShowExit(false);
  };

  return (
    <>
      {/* Welcome Popup */}
      <AnimatePresence>
        {showWelcome && (
          <PopupCard
            title="Assalam-o-Alaikum! 🌿"
            description="Welcome to Eco-Xent! Want to explore our 100% natural herbal products? Chat with us on WhatsApp!"
            buttonText="Chat on WhatsApp"
            onAction={() => handleWhatsApp("welcome")}
            onDismiss={() => dismiss("welcome")}
          />
        )}
      </AnimatePresence>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExit && (
          <PopupCard
            title="Wait! Don't go yet 🛑"
            description="Get 10% OFF on your first order! Message us on WhatsApp and claim your discount now."
            buttonText="Claim Discount 🎁"
            onAction={() => handleWhatsApp("exit")}
            onDismiss={() => dismiss("exit")}
          />
        )}
      </AnimatePresence>
    </>
  );
};

interface PopupCardProps {
  title: string;
  description: string;
  buttonText: string;
  onAction: () => void;
  onDismiss: () => void;
}

const PopupCard = ({ title, description, buttonText, onAction, onDismiss }: PopupCardProps) => (
  <motion.div
    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {/* Backdrop */}
    <motion.div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onDismiss}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />

    {/* Card */}
    <motion.div
      className="relative w-full max-w-sm rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, hsl(var(--background)), hsl(var(--secondary)))",
        border: "1px solid hsl(var(--primary) / 0.25)",
        boxShadow: "0 20px 60px hsl(var(--primary) / 0.2), 0 0 0 1px hsl(var(--primary) / 0.1)",
      }}
      initial={{ scale: 0.8, y: 30, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.8, y: 30, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Close button */}
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        style={{ background: "hsl(var(--muted))" }}
        aria-label="Close popup"
      >
        <X className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Green accent strip */}
      <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #25D366, #128C7E)" }} />

      <div className="p-6 pt-5 text-center">
        {/* WhatsApp icon */}
        <div
          className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
          }}
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </div>

        <h3 className="font-heading text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{description}</p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAction}
          className="w-full py-3 rounded-xl font-body font-semibold text-white text-sm flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
          }}
        >
          <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white">
            <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.64 4.64 1.853 6.64L2.667 29.333l6.88-1.8A13.29 13.29 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24.267a11.03 11.03 0 0 1-5.6-1.52l-.4-.24-4.08 1.067 1.093-3.96-.267-.413A10.987 10.987 0 0 1 5.04 16c0-6.04 4.92-10.96 10.96-10.96S26.96 9.96 26.96 16s-4.92 10.933-10.957 10.933zM22.32 18.88c-.333-.173-1.973-.973-2.28-1.08-.307-.107-.533-.16-.747.16-.213.32-.84 1.08-.987 1.28-.16.2-.307.227-.64.08-.333-.16-1.4-.52-2.667-1.653-.987-.88-1.64-1.973-1.84-2.307-.187-.32-.013-.493.147-.653.147-.133.333-.347.493-.52.16-.173.213-.293.32-.507.107-.213.053-.4-.027-.56-.08-.16-.747-1.787-.987-2.453-.267-.64-.52-.547-.747-.56-.187-.013-.4-.013-.613-.013-.213 0-.56.08-.853.387-.293.307-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.827.76.333 1.36.533 1.827.68.76.24 1.453.213 2 .133.613-.093 1.88-.773 2.147-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.627-.373z" />
          </svg>
          {buttonText}
        </motion.button>

        <button
          onClick={onDismiss}
          className="mt-3 font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          No thanks, I'll browse myself
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default WhatsAppPopup;
