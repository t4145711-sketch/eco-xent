import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  priceDisplay: string;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-border z-[61] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-heading font-semibold text-foreground">
                  Your Cart
                </h2>
                {totalItems > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-body font-semibold text-primary-foreground bg-primary">
                    {totalItems}
                  </span>
                )}
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-accent/50 transition-colors"
              >
                <X className="w-4 h-4 text-foreground" />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground mb-1">Cart is empty</p>
                    <p className="text-sm font-body text-muted-foreground">Add products to get started</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0 }}
                        className="flex gap-4 p-3 rounded-xl border border-border bg-card"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-heading font-semibold text-foreground truncate">{item.name}</h3>
                          <p className="text-sm font-body font-bold text-primary mt-1">{item.priceDisplay}</p>

                          {/* Quantity controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1.5">
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-accent/50 transition-colors"
                              >
                                <Minus className="w-3 h-3 text-foreground" />
                              </motion.button>
                              <span className="w-8 text-center text-sm font-body font-semibold text-foreground">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-accent/50 transition-colors"
                              >
                                <Plus className="w-3 h-3 text-foreground" />
                              </motion.button>
                            </div>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => onRemove(item.id)}
                              className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-muted-foreground">Total</span>
                  <span className="text-xl font-heading font-bold text-foreground">
                    Rs.{totalPrice.toLocaleString()}
                  </span>
                </div>
                <motion.a
                  href={`https://wa.me/923295991062?text=${encodeURIComponent(
                    `Hi! I'd like to order:\n${items.map(i => `• ${i.name} x${i.quantity} (${i.priceDisplay})`).join('\n')}\n\nTotal: Rs.${totalPrice.toLocaleString()}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-body font-semibold text-sm tracking-wider uppercase text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                >
                  Checkout via WhatsApp
                </motion.a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
