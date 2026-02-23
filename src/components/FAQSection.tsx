import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";

const faqs = [
  { q: "Do you deliver nationwide?", a: "Yes! We deliver across all of Pakistan — Karachi, Lahore, Islamabad, Peshawar, Quetta, and every city in between. Delivery takes 3-5 working days." },
  { q: "Is Cash on Delivery available?", a: "Absolutely. We offer COD across Pakistan. Order first, pay on delivery. No advance payment needed." },
  { q: "Are the products safe for sensitive skin?", a: "Yes, all products are 100% natural and organic. No harmful chemicals, parabens, or sulfates. Suitable for sensitive skin. We recommend a patch test before first use." },
  { q: "How soon will I see results?", a: "Most customers notice visible improvements within 2-4 weeks. For best results, use consistently 2-3 times per week. Significant results typically appear after 8 weeks." },
  { q: "What is the delivery timeline?", a: "Orders are dispatched within 24 hours of confirmation. Delivery takes 3-5 working days. We provide WhatsApp tracking updates." },
  { q: "What is your return policy?", a: "If your product arrives damaged or incorrect, we offer 100% refund or replacement. Simply send a photo via WhatsApp within 48 hours." },
  { q: "Are gift sets available?", a: "Yes! We offer custom gift sets for Eid, weddings, and special occasions. WhatsApp us for custom packages with special bulk pricing." },
  { q: "How do I place an order?", a: "Simply click 'Buy Now' on any product, or WhatsApp us directly at 0329-5991062. Share your name, address, and product — we handle the rest!" },
];

const FAQItem = ({ faq, index }: { faq: { q: string; a: string }; index: number }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="rounded-xl overflow-hidden border transition-all duration-300"
      style={{
        borderColor: open ? "hsl(var(--gold) / 0.2)" : "hsl(var(--border))",
        background: open ? "hsl(var(--cream))" : "hsl(var(--background))",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-6 text-left"
      >
        <span className="font-heading font-semibold text-foreground text-sm md:text-base leading-snug">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center mt-0.5"
          style={{
            borderColor: open ? "hsl(var(--gold) / 0.3)" : "hsl(var(--border))",
            background: open ? "hsl(var(--gold) / 0.1)" : "transparent",
          }}
        >
          {open ? <Minus className="w-3.5 h-3.5 text-gold" /> : <Plus className="w-3.5 h-3.5 text-muted-foreground" />}
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="px-6 pb-6">
              <div className="h-px w-full bg-gold/10 mb-4" />
              <p className="text-muted-foreground font-body text-sm leading-relaxed font-light">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="relative py-28 overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10 max-w-3xl">
        <motion.div
          ref={headingRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-gold tracking-[0.4em] uppercase text-[11px] font-body font-medium mb-4">Questions</p>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-foreground mb-4">
            Frequently <span className="text-gradient-gold italic">Asked</span>
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
        </motion.div>

        <div className="flex flex-col gap-3 mb-12">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center rounded-xl p-8 border border-gold/15 bg-cream"
        >
          <p className="font-heading font-semibold text-foreground text-lg mb-2">Still have questions?</p>
          <p className="text-muted-foreground font-body text-sm mb-5 font-light">Our team is ready to help via WhatsApp.</p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.open("https://wa.me/923295991062", "_blank")}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-body font-medium text-sm tracking-wider uppercase text-white"
            style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
          >
            <MessageCircle className="w-4 h-4" />
            Chat With Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
