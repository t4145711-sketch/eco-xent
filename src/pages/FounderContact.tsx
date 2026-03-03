import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send } from "lucide-react";
import FounderLayout from "@/components/founder/FounderLayout";
import { toast } from "sonner";

const contactMethods = [
  { icon: Phone, label: "Phone", value: "+92 329 5991062", href: "tel:+923295991062" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat on WhatsApp", href: "https://wa.me/923295991062" },
  { icon: Mail, label: "Email", value: "info@eco-xent.com", href: "mailto:info@eco-xent.com" },
  { icon: Clock, label: "Availability", value: "Mon–Sat, 10 AM – 8 PM", href: null },
];

const FounderContact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please fill in name and phone number.");
      return;
    }
    setSending(true);
    // Send via WhatsApp
    const text = `Hi, I'm ${form.name}.\nPhone: ${form.phone}\n\n${form.message}`;
    window.open(`https://wa.me/923295991062?text=${encodeURIComponent(text)}`, "_blank");
    setSending(false);
    toast.success("Redirecting to WhatsApp...");
  };

  return (
    <FounderLayout activeTab="contact">
      {/* Contact Hero */}
      <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] opacity-[0.04]" style={{ background: "radial-gradient(ellipse, hsl(var(--gold)), transparent 70%)", filter: "blur(60px)" }} />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold tracking-[0.5em] uppercase text-[10px] font-body font-semibold mb-4">Get In Touch</p>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              Let's <span className="italic" style={{ color: "hsl(var(--gold-dark))" }}>Connect</span>
            </h1>
            <div className="w-16 h-[2px] mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }} />
            <p className="text-muted-foreground font-body text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Ready to begin your transformation? Reach out through any of the channels below or fill in the form.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards + Form */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
            {/* Contact Methods */}
            <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {contactMethods.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="rounded-2xl p-6 border border-border hover:border-gold/20 transition-all duration-300 bg-background group"
                >
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 border border-gold/15 group-hover:border-gold/30 group-hover:scale-110 transition-all duration-300" style={{ background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--cream)))" }}>
                        <c.icon className="w-5 h-5 text-gold-dark" />
                      </div>
                      <p className="text-xs text-muted-foreground font-body tracking-wider uppercase mb-1">{c.label}</p>
                      <p className="text-foreground font-body text-sm font-medium">{c.value}</p>
                    </a>
                  ) : (
                    <div>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 border border-gold/15" style={{ background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--cream)))" }}>
                        <c.icon className="w-5 h-5 text-gold-dark" />
                      </div>
                      <p className="text-xs text-muted-foreground font-body tracking-wider uppercase mb-1">{c.label}</p>
                      <p className="text-foreground font-body text-sm font-medium">{c.value}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-3 rounded-2xl p-8 md:p-10 border border-border bg-background relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />
              <h3 className="font-heading font-bold text-foreground text-xl mb-2">Send a Message</h3>
              <p className="text-muted-foreground font-body text-sm mb-8">Fill in the form and we'll redirect you to WhatsApp.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-body font-semibold text-foreground/70 uppercase tracking-wider mb-2 block">Your Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-cream/50 text-foreground font-body text-sm focus:outline-none focus:border-gold/40 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-body font-semibold text-foreground/70 uppercase tracking-wider mb-2 block">Phone Number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-cream/50 text-foreground font-body text-sm focus:outline-none focus:border-gold/40 transition-colors"
                    placeholder="e.g. 0329-5991062"
                  />
                </div>
                <div>
                  <label className="text-xs font-body font-semibold text-foreground/70 uppercase tracking-wider mb-2 block">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-cream/50 text-foreground font-body text-sm focus:outline-none focus:border-gold/40 transition-colors resize-none"
                    placeholder="Tell me about your situation..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-body font-bold text-sm tracking-wide text-forest-dark shadow-lg w-full sm:w-auto"
                  style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))" }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Send className="w-4 h-4" />
                  Send via WhatsApp
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </FounderLayout>
  );
};

export default FounderContact;
