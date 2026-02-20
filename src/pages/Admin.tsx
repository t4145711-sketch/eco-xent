import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Package, Clock, CheckCircle, XCircle, TrendingUp, RefreshCw } from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  product_name: string;
  product_price: string;
  payment_method: string;
  quantity: number;
  notes: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
  confirmed: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  dispatched: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  delivered: "text-green-500 bg-green-500/10 border-green-500/20",
  cancelled: "text-red-500 bg-red-500/10 border-red-500/20",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  dispatched: "Dispatched",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error("Login fail ho gaya: " + error.message);
    } else {
      onLogin();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm p-8 rounded-2xl border border-primary/20 bg-card"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
            <Package className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">EcoXent Orders Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/50 focus:outline-none text-sm font-body text-foreground placeholder:text-muted-foreground transition-colors"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/50 focus:outline-none text-sm font-body text-foreground placeholder:text-muted-foreground transition-colors"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full font-body font-bold text-sm tracking-wider uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {loading ? "Log in ho raha hai..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

const Admin = () => {
  const [user, setUser] = useState<null | { id: string; email?: string }>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) checkAdmin(session.user.id);
      else { setIsAdmin(false); setLoading(false); }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) checkAdmin(session.user.id);
      else setLoading(false);
    });
  }, []);

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .single();
    setIsAdmin(!!data);
    setLoading(false);
    if (data) fetchOrders();
  };

  const fetchOrders = async () => {
    setRefreshing(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setOrders(data as Order[]);
    setRefreshing(false);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);
    if (error) {
      toast.error("Status update fail ho gaya");
    } else {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      toast.success("Status update ho gaya!");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    setOrders([]);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("ur-PK", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <LoginForm onLogin={() => {}} />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 text-center">
        <div>
          <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-heading font-bold text-foreground">Access Denied</h2>
          <p className="text-sm text-muted-foreground font-body mt-2">Aapke paas admin access nahi hai.</p>
          <button onClick={handleLogout} className="mt-4 px-6 py-2 rounded-full border border-primary/30 text-primary text-sm font-body hover:bg-primary/5 transition-colors">
            Logout
          </button>
        </div>
      </div>
    );
  }

  const filteredOrders = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading font-bold text-foreground">EcoXent Admin</h1>
            <p className="text-xs text-muted-foreground font-body">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchOrders}
              disabled={refreshing}
              className="p-2 rounded-full border border-border hover:border-primary/30 text-muted-foreground hover:text-primary transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary/30 text-muted-foreground hover:text-primary text-sm font-body transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Orders", value: stats.total, icon: TrendingUp, color: "text-primary" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "text-yellow-500" },
            { label: "Delivered", value: stats.delivered, icon: CheckCircle, color: "text-green-500" },
            { label: "Cancelled", value: stats.cancelled, icon: XCircle, color: "text-red-500" },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl border border-border bg-card"
            >
              <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
              <p className="text-3xl font-heading font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground font-body mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {["all", "pending", "confirmed", "dispatched", "delivered", "cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-body font-semibold tracking-wider uppercase transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
            >
              {f === "all" ? "Saare Orders" : statusLabels[f]}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="flex flex-col gap-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground font-body">
              <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Koi order nahi mila</p>
            </div>
          ) : (
            filteredOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-2xl border border-border bg-card flex flex-col md:flex-row gap-4"
              >
                {/* Order info */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Customer</p>
                    <p className="text-sm font-heading font-semibold text-foreground">{order.customer_name}</p>
                    <p className="text-xs text-muted-foreground font-body">{order.customer_phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Product</p>
                    <p className="text-sm font-body font-semibold text-foreground">{order.product_name}</p>
                    <p className="text-xs text-primary font-body">{order.product_price} × {order.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Address</p>
                    <p className="text-xs text-foreground font-body leading-relaxed">{order.customer_address}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Payment / Date</p>
                    <p className="text-xs text-foreground font-body">{order.payment_method}</p>
                    <p className="text-xs text-muted-foreground font-body">{formatDate(order.created_at)}</p>
                    {order.notes && <p className="text-xs text-muted-foreground font-body mt-1 italic">"{order.notes}"</p>}
                  </div>
                </div>

                {/* Status control */}
                <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                  <span className={`px-3 py-1 rounded-full border text-xs font-body font-semibold ${statusColors[order.status] || statusColors.pending}`}>
                    {statusLabels[order.status] || order.status}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="text-xs font-body bg-background border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:border-primary/50 cursor-pointer"
                  >
                    {Object.entries(statusLabels).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
