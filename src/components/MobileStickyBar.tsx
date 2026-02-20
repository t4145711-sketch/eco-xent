import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const MobileStickyBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!dismissed && window.scrollY > 400) {
        setVisible(true);
      } else if (window.scrollY < 400) {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const handleOrder = () => {
    const msg = encodeURIComponent(
      "السلام علیکم! Mujhe Eco-Xent products ke baare mein order karna hai. 🌿\nKripya mujhe available products aur prices batayein."
    );
    window.open(`https://wa.me/923295991062?text=${msg}`, "_blank");
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div
            className="mx-3 mb-3 rounded-2xl p-3 flex items-center gap-3"
            style={{
              background: "linear-gradient(135deg, hsl(var(--background) / 0.97), hsl(var(--secondary) / 0.98))",
              border: "1px solid hsl(var(--primary) / 0.2)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 -4px 30px hsl(var(--primary) / 0.15)",
            }}
          >
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-heading font-bold text-foreground text-sm leading-tight">
                Abhi Order Karein 🌿
              </p>
              <p className="text-muted-foreground font-body text-xs truncate">
                COD available • Free delivery on orders
              </p>
            </div>

            {/* WhatsApp button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleOrder}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-body font-semibold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </motion.button>

            {/* Dismiss */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDismissed(true)}
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "hsl(var(--primary) / 0.08)" }}
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileStickyBar;
