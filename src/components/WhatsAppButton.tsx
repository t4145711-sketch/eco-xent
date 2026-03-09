import { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "923295991062";

const WhatsAppButton = forwardRef<HTMLDivElement>((_props, ref) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const message = encodeURIComponent(
      "Hello! 🌿\nI'd like to know about Eco-Xent products.\nI want to place an order."
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div ref={ref}>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed bottom-[168px] right-6 z-50 max-sm:bottom-[140px] max-sm:right-4"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="relative w-14 h-14 max-sm:w-12 max-sm:h-12 rounded-full flex items-center justify-center shadow-xl overflow-hidden border-2 border-[#25D366]/30 ring-2 ring-[#25D366]/10 ring-offset-2"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                boxShadow: "0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.2)",
              }}
              aria-label="Order on WhatsApp"
            >
              <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
                <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.64 4.64 1.853 6.64L2.667 29.333l6.88-1.8A13.29 13.29 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24.267a11.03 11.03 0 0 1-5.6-1.52l-.4-.24-4.08 1.067 1.093-3.96-.267-.413A10.987 10.987 0 0 1 5.04 16c0-6.04 4.92-10.96 10.96-10.96S26.96 9.96 26.96 16s-4.92 10.933-10.957 10.933zM22.32 18.88c-.333-.173-1.973-.973-2.28-1.08-.307-.107-.533-.16-.747.16-.213.32-.84 1.08-.987 1.28-.16.2-.307.227-.64.08-.333-.16-1.4-.52-2.667-1.653-.987-.88-1.64-1.973-1.84-2.307-.187-.32-.013-.493.147-.653.147-.133.333-.347.493-.52.16-.173.213-.293.32-.507.107-.213.053-.4-.027-.56-.08-.16-.747-1.787-.987-2.453-.267-.64-.52-.547-.747-.56-.187-.013-.4-.013-.613-.013-.213 0-.56.08-.853.387-.293.307-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.827.76.333 1.36.533 1.827.68.76.24 1.453.213 2 .133.613-.093 1.88-.773 2.147-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.627-.373z" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

WhatsAppButton.displayName = "WhatsAppButton";

export default WhatsAppButton;
