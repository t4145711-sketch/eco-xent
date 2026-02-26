import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, CheckCircle, Loader2, User, Phone, MapPin, CreditCard, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  price: string;
}

interface CartProduct {
  name: string;
  price: number;
  priceDisplay: string;
  quantity: number;
}

interface CheckoutModalProps {
  product: Product | null;
  cartProducts?: CartProduct[];
  isOpen: boolean;
  onClose: () => void;
}

const paymentMethods = [
  { value: "COD", label: "Cash on Delivery", icon: "💵", desc: "Ghar pe delivery ke waqt payment" },
  { value: "EasyPaisa", label: "EasyPaisa / JazzCash", icon: "📱", desc: "Mobile wallet transfer" },
  { value: "Bank Transfer", label: "Bank Transfer", icon: "🏦", desc: "Bank account mein paise bhejein" },
];

const CheckoutModal = React.memo(({ product, cartProducts, isOpen, onClose }: CheckoutModalProps) => {
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_address: "",
    payment_method: "COD",
    quantity: 1,
    notes: "",
  });

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isCart = cartProducts && cartProducts.length > 0;
    if (!product && !isCart) return;

    if (!form.customer_name.trim() || !form.customer_phone.trim() || !form.customer_address.trim()) {
      toast.error("Sab fields bhar dein");
      return;
    }

    setLoading(true);
    try {
      if (isCart) {
        // Insert one order per cart item
        const orders = cartProducts.map((cp) => ({
          customer_name: form.customer_name.trim(),
          customer_phone: form.customer_phone.trim(),
          customer_address: form.customer_address.trim(),
          product_name: cp.name,
          product_price: cp.priceDisplay,
          payment_method: form.payment_method,
          quantity: cp.quantity,
          notes: form.notes.trim() || null,
          status: "pending",
        }));
        const { error } = await supabase.from("orders").insert(orders);
        if (error) throw error;

        const totalPrice = cartProducts.reduce((s, cp) => s + cp.price * cp.quantity, 0);
        const itemsList = cartProducts.map((cp) => `• ${cp.name} x${cp.quantity} (${cp.priceDisplay})`).join("\n");
        const msg = encodeURIComponent(
          `السلام علیکم! 🌿\n*نیا آرڈر آیا ہے!*\n\n👤 نام: ${form.customer_name}\n📞 نمبر: ${form.customer_phone}\n📍 پتہ: ${form.customer_address}\n\n📦 پروڈکٹس:\n${itemsList}\n\n💰 Total: Rs.${totalPrice.toLocaleString()}\n💳 ادائیگی: ${form.payment_method}\n${form.notes ? `📝 نوٹ: ${form.notes}` : ""}\n\nشکریہ!`
        );
        window.open(`https://wa.me/923295991062?text=${msg}`, "_blank");
      } else if (product) {
        const { error } = await supabase.from("orders").insert({
          customer_name: form.customer_name.trim(),
          customer_phone: form.customer_phone.trim(),
          customer_address: form.customer_address.trim(),
          product_name: product.name,
          product_price: product.price,
          payment_method: form.payment_method,
          quantity: form.quantity,
          notes: form.notes.trim() || null,
          status: "pending",
        });
        if (error) throw error;

        const msg = encodeURIComponent(
          `السلام علیکم! 🌿\n*نیا آرڈر آیا ہے!*\n\n👤 نام: ${form.customer_name}\n📞 نمبر: ${form.customer_phone}\n📍 پتہ: ${form.customer_address}\n\n📦 پروڈکٹ: ${product.name}\n💰 قیمت: ${product.price}\n🔢 مقدار: ${form.quantity}\n💳 ادائیگی: ${form.payment_method}\n${form.notes ? `📝 نوٹ: ${form.notes}` : ""}\n\nشکریہ!`
        );
        window.open(`https://wa.me/923295991062?text=${msg}`, "_blank");
      }

      setStep("success");
    } catch (err) {
      console.error(err);
      toast.error("Order submit nahi ho saka. Dobara try karein.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep("form");
    setForm({ customer_name: "", customer_phone: "", customer_address: "", payment_method: "COD", quantity: 1, notes: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-primary/20 bg-card shadow-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 bg-card border-b border-primary/10">
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground">Order Karein</h2>
                {product && (
                  <p className="text-sm text-primary font-body mt-0.5">{product.name}</p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {step === "form" ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-6 flex flex-col gap-5"
                >
                  {/* Product summary */}
                  {cartProducts && cartProducts.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {cartProducts.map((cp, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-xl border border-primary/15"
                          style={{ background: "hsl(43 50% 55% / 0.05)" }}
                        >
                          <Package className="w-4 h-4 text-primary shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-heading font-semibold text-foreground truncate">{cp.name}</p>
                            <p className="text-xs text-primary font-body">{cp.priceDisplay} × {cp.quantity}</p>
                          </div>
                          <span className="text-sm font-heading font-bold text-foreground">
                            Rs.{(cp.price * cp.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between px-3 pt-2">
                        <span className="text-xs font-body text-muted-foreground">Total</span>
                        <span className="text-base font-heading font-bold text-foreground">
                          Rs.{cartProducts.reduce((s, cp) => s + cp.price * cp.quantity, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ) : product ? (
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl border border-primary/15"
                      style={{ background: "hsl(43 50% 55% / 0.05)" }}
                    >
                      <Package className="w-5 h-5 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-heading font-semibold text-foreground truncate">{product.name}</p>
                        <p className="text-xs text-primary font-body">{product.price}</p>
                      </div>
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleChange("quantity", Math.max(1, form.quantity - 1))}
                          className="w-7 h-7 rounded-full border border-primary/30 text-primary text-sm font-bold hover:bg-primary/10 transition-colors"
                        >−</button>
                        <span className="text-sm font-heading font-bold text-foreground w-4 text-center">{form.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleChange("quantity", form.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-primary/30 text-primary text-sm font-bold hover:bg-primary/10 transition-colors"
                        >+</button>
                      </div>
                    </div>
                  ) : null}

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-body font-semibold text-muted-foreground tracking-wider uppercase flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Apna Naam
                    </label>
                    <input
                      type="text"
                      value={form.customer_name}
                      onChange={(e) => handleChange("customer_name", e.target.value)}
                      placeholder="Jaise: Ahmed Khan"
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/50 focus:outline-none text-sm font-body text-foreground placeholder:text-muted-foreground transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-body font-semibold text-muted-foreground tracking-wider uppercase flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.customer_phone}
                      onChange={(e) => handleChange("customer_phone", e.target.value)}
                      placeholder="0300-1234567"
                      required
                      maxLength={15}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/50 focus:outline-none text-sm font-body text-foreground placeholder:text-muted-foreground transition-colors"
                    />
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-body font-semibold text-muted-foreground tracking-wider uppercase flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Delivery Address
                    </label>
                    <textarea
                      value={form.customer_address}
                      onChange={(e) => handleChange("customer_address", e.target.value)}
                      placeholder="Ghar ka pura pata — gali, mohalla, shehar"
                      required
                      maxLength={300}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/50 focus:outline-none text-sm font-body text-foreground placeholder:text-muted-foreground transition-colors resize-none"
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-body font-semibold text-muted-foreground tracking-wider uppercase flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5" /> Payment Method
                    </label>
                    <div className="grid gap-2">
                      {paymentMethods.map((pm) => (
                        <label
                          key={pm.value}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                            form.payment_method === pm.value
                              ? "border-primary/50 bg-primary/5"
                              : "border-border hover:border-primary/25"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={pm.value}
                            checked={form.payment_method === pm.value}
                            onChange={() => handleChange("payment_method", pm.value)}
                            className="sr-only"
                          />
                          <span className="text-lg">{pm.icon}</span>
                          <div>
                            <p className="text-sm font-body font-semibold text-foreground">{pm.label}</p>
                            <p className="text-xs text-muted-foreground font-body">{pm.desc}</p>
                          </div>
                          {form.payment_method === pm.value && (
                            <div className="ml-auto w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-body font-semibold text-muted-foreground tracking-wider uppercase">
                      Koi Note? (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      placeholder="Jaise: jaldi chahiye, ya koi khas hidal..."
                      maxLength={200}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/50 focus:outline-none text-sm font-body text-foreground placeholder:text-muted-foreground transition-colors"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full font-body font-bold text-sm tracking-[0.08em] uppercase transition-all duration-300 disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", color: "#fff" }}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <MessageCircle className="w-4 h-4" />
                    )}
                    {loading ? "Order ho raha hai..." : "Order Confirm Karen"}
                  </motion.button>

                  <p className="text-[11px] text-muted-foreground font-body text-center leading-relaxed">
                    Order save hoga aur WhatsApp pe confirmation milegi 🌿
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-10 flex flex-col items-center text-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">Order Ho Gaya! 🎉</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs">
                    Aapka order record ho gaya hai. WhatsApp pe hamari team aap se rabta karegi jald hi.
                  </p>
                  <p className="text-xs text-primary font-body">JazakAllah Khair ❤️</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    className="mt-2 px-8 py-3 rounded-full border border-primary/30 text-primary font-body text-sm font-semibold hover:bg-primary/5 transition-all duration-200"
                  >
                    Theek Hai
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

CheckoutModal.displayName = "CheckoutModal";

export default CheckoutModal;
