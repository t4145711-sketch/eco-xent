import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "923295991062";

const WhatsAppButton = React.memo(() => {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    const pulseTimer = setTimeout(() => setPulse(false), 8000);
    return () => {
      clearTimeout(timer);
      clearTimeout(pulseTimer);
    };
  }, []);

  const handleClick = () => {
    const message = encodeURIComponent(
      "السلام علیکم! 🌿\nMujhe Eco-Xent products ke baare mein information chahiye.\nOrder karna chahta/chahti hun."
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 md:bottom-6 bottom-20"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Tooltip bubble */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white text-gray-800 text-sm font-body font-medium px-4 py-2.5 rounded-2xl shadow-2xl max-w-[200px] text-right leading-snug"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
              >
                WhatsApp pe Order karein! 🛍️
                <div
                  className="absolute bottom-[-6px] right-5 w-3 h-3 bg-white rotate-45"
                  style={{ boxShadow: "2px 2px 4px rgba(0,0,0,0.05)" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <div className="relative">
            {/* Pulse rings */}
            {pulse && (
              <>
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
                <span
                  className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"
                  style={{ animationDelay: "0.4s" }}
                />
              </>
            )}

            <motion.button
              onClick={handleClick}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                boxShadow: "0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.2)",
              }}
              aria-label="Order on WhatsApp"
            >
              {/* WhatsApp SVG icon */}
              <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
                <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.64 4.64 1.853 6.64L2.667 29.333l6.88-1.8A13.29 13.29 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24.267a11.03 11.03 0 0 1-5.6-1.52l-.4-.24-4.08 1.067 1.093-3.96-.267-.413A10.987 10.987 0 0 1 5.04 16c0-6.04 4.92-10.96 10.96-10.96S26.96 9.96 26.96 16s-4.92 10.933-10.957 10.933zM22.32 18.88c-.333-.173-1.973-.973-2.28-1.08-.307-.107-.533-.16-.747.16-.213.32-.84 1.08-.987 1.28-.16.2-.307.227-.64.08-.333-.16-1.4-.52-2.667-1.653-.987-.88-1.64-1.973-1.84-2.307-.187-.32-.013-.493.147-.653.147-.133.333-.347.493-.52.16-.173.213-.293.32-.507.107-.213.053-.4-.027-.56-.08-.16-.747-1.787-.987-2.453-.267-.64-.52-.547-.747-.56-.187-.013-.4-.013-.613-.013-.213 0-.56.08-.853.387-.293.307-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.827.76.333 1.36.533 1.827.68.76.24 1.453.213 2 .133.613-.093 1.88-.773 2.147-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.627-.373z" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

WhatsAppButton.displayName = "WhatsAppButton";

export default WhatsAppButton;
