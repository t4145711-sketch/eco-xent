import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Clock, CheckCircle, Truck, XCircle, ArrowLeft, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logoImg from "@/assets/ecoxent-logo-new.jpeg";

interface TrackedOrder {
  id: string;
  product_name: string;
  product_price: string;
  quantity: number;
  status: string;
  payment_method: string;
  created_at: string;
}

const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string; bg: string }> = {
  pending: { label: "Pending", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20" },
  confirmed: { label: "Confirmed", icon: CheckCircle, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
  dispatched: { label: "Dispatched", icon: Truck, color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/20" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10 border-green-500/20" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
};

const statusSteps = ["pending", "confirmed", "dispatched", "delivered"];

const TrackOrder = () => {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<TrackedOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    setSearched(true);

    const { data, error } = await supabase.rpc("lookup_orders_by_phone", {
      phone_number: phone.trim(),
    });

    if (!error && data) {
      setOrders(data as TrackedOrder[]);
    } else {
      setOrders([]);
    }
    setLoading(false);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-PK", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const getStepIndex = (status: string) => statusSteps.indexOf(status);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-body">Back</span>
          </a>
          <a href="/">
            <img src={logoImg} alt="Eco-Xent" className="h-9 object-contain rounded-sm" />
          </a>
          <div className="w-16" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Track Your Order</h1>
          <p className="text-sm text-muted-foreground font-body mt-2">
            Apna phone number enter karein aur order ka status dekhein
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSearch}
          className="flex gap-3 mb-10"
        >
          <div className="relative flex-1">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0300-1234567"
              required
              maxLength={15}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-card border border-border focus:border-primary/50 focus:outline-none text-sm font-body text-foreground placeholder:text-muted-foreground transition-colors"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="px-6 rounded-xl bg-primary text-primary-foreground font-body font-bold text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            Track
          </motion.button>
        </motion.form>

        {/* Results */}
        <AnimatePresence mode="wait">
          {searched && !loading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-5"
            >
              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-foreground font-heading font-semibold text-lg">Koi order nahi mila</p>
                  <p className="text-sm text-muted-foreground font-body mt-1">
                    Is phone number se koi order registered nahi hai
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">
                    {orders.length} order{orders.length > 1 ? "s" : ""} found
                  </p>
                  {orders.map((order, i) => {
                    const config = statusConfig[order.status] || statusConfig.pending;
                    const StatusIcon = config.icon;
                    const currentStep = getStepIndex(order.status);
                    const isCancelled = order.status === "cancelled";

                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-5 rounded-2xl border border-border bg-card"
                      >
                        {/* Product info */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="font-heading font-bold text-foreground">{order.product_name}</p>
                            <p className="text-xs text-primary font-body mt-0.5">
                              {order.product_price} × {order.quantity}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full border text-xs font-body font-semibold ${config.bg} ${config.color}`}>
                            <StatusIcon className="w-3 h-3 inline mr-1" />
                            {config.label}
                          </span>
                        </div>

                        {/* Progress tracker */}
                        {!isCancelled && (
                          <div className="flex items-center gap-1 mb-4">
                            {statusSteps.map((step, si) => {
                              const stepConf = statusConfig[step];
                              const isCompleted = si <= currentStep;
                              return (
                                <div key={step} className="flex-1 flex flex-col items-center gap-1.5">
                                  <div className="w-full flex items-center">
                                    <div
                                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                        isCompleted
                                          ? "bg-primary border-primary text-primary-foreground"
                                          : "border-border bg-muted text-muted-foreground"
                                      }`}
                                    >
                                      <stepConf.icon className="w-3 h-3" />
                                    </div>
                                    {si < statusSteps.length - 1 && (
                                      <div
                                        className={`flex-1 h-0.5 transition-all ${
                                          si < currentStep ? "bg-primary" : "bg-border"
                                        }`}
                                      />
                                    )}
                                  </div>
                                  <span className={`text-[10px] font-body ${isCompleted ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                                    {stepConf.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground font-body pt-2 border-t border-border/50">
                          <span>Payment: {order.payment_method}</span>
                          <span>{formatDate(order.created_at)}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TrackOrder;
