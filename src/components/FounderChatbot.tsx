import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Loader2, Brain, Sparkles, RotateCcw, Heart, Shield, Users } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/founder-chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
}: {
  messages: Msg[];
  onDelta: (text: string) => void;
  onDone: () => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (resp.status === 429) {
    toast.error("Too many requests. Please wait a moment.");
    throw new Error("Rate limited");
  }
  if (resp.status === 402) {
    toast.error("Service temporarily unavailable.");
    throw new Error("Payment required");
  }
  if (!resp.ok || !resp.body) throw new Error("Failed to start stream");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") { streamDone = true; break; }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

const WELCOME_MSG: Msg = {
  role: "assistant",
  content: "Assalam o Alaikum! 🧠✨ Main founder ki AI assistant hoon. Aap mujh se NLP, Silva Method, trauma healing, ya coaching ke baare mein kuch bhi pooch sakte hain — kisi bhi language mein!",
};

const QUICK_ACTIONS = [
  { label: "NLP kya hai?", icon: Brain },
  { label: "Silva Method", icon: Sparkles },
  { label: "Trauma Healing", icon: Heart },
  { label: "Family Coaching", icon: Users },
];

const FounderChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      await streamChat({
        messages: newMsgs.filter((m) => m !== WELCOME_MSG || newMsgs.indexOf(m) > 0),
        onDelta: (chunk) => {
          if (!assistantSoFar) {
            assistantSoFar = chunk;
            setMessages((prev) => [...prev, { role: "assistant", content: assistantSoFar }]);
          } else {
            assistantSoFar += chunk;
            setMessages((prev) =>
              prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m))
            );
          }
        },
        onDone: () => setIsLoading(false),
      });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  const send = useCallback(() => sendMessage(input), [input, sendMessage]);

  const resetChat = () => {
    setMessages([WELCOME_MSG]);
    setInput("");
  };

  const showQuickActions = messages.length <= 1;

  return (
    <>
      {/* Toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border-2 border-gold/30 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, hsl(var(--forest)), hsl(var(--forest-dark)))" }}
            whileHover={{ scale: 1.1, boxShadow: "0 8px 30px -4px hsla(var(--gold), 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Brain className="w-6 h-6 text-white" />
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full border-2 border-gold/20 animate-ping" style={{ animationDuration: "2s" }} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center shadow-sm">
              <span className="text-[8px] font-bold text-forest-dark">AI</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-24 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl border border-gold/20"
            style={{ maxHeight: "min(580px, calc(100vh - 140px))" }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, hsl(var(--forest)), hsl(var(--forest-dark)))" }}
            >
              {/* Subtle pattern */}
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)", backgroundSize: "20px 20px" }} />
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gold/30 relative" style={{ background: "linear-gradient(135deg, hsla(var(--gold), 0.15), hsla(var(--gold), 0.05))" }}>
                  <Brain className="w-5 h-5 text-gold" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2" style={{ borderColor: "hsl(var(--forest))" }} />
                </div>
                <div>
                  <h3 className="text-white font-heading font-semibold text-sm">Mind Science AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-white/50 text-[10px] font-body">Online • NLP & Silva Method</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 relative z-10">
                <button
                  onClick={resetChat}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all"
                  title="New chat"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="overflow-y-auto p-4 space-y-4 bg-background"
              style={{ height: "370px" }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.role === "assistant" ? "bg-forest/10 text-forest" : "bg-gold/10 text-gold"
                    }`}
                  >
                    {msg.role === "assistant" ? <Brain className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-secondary text-foreground rounded-bl-sm"
                        : "bg-forest text-white rounded-br-sm"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none text-foreground [&_p]:mb-1 [&_p:last-child]:mb-0 [&_strong]:text-foreground [&_ul]:mt-1 [&_ol]:mt-1">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Quick Action Buttons */}
              {showQuickActions && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {QUICK_ACTIONS.map((qa) => (
                    <motion.button
                      key={qa.label}
                      onClick={() => sendMessage(qa.label)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium border border-gold/20 text-foreground/70 hover:text-foreground hover:border-gold/40 hover:bg-gold/5 transition-all duration-200"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <qa.icon className="w-3 h-3 text-gold" />
                      {qa.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Typing indicator */}
              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-3.5 h-3.5 text-forest" />
                  </div>
                  <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                    <motion.span className="w-1.5 h-1.5 rounded-full bg-foreground/30" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.span className="w-1.5 h-1.5 rounded-full bg-foreground/30" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.span className="w-1.5 h-1.5 rounded-full bg-foreground/30" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 bg-background border-t border-border">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about NLP, healing, coaching..."
                  className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-gold/30 transition-all"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={send}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-40 transition-all shadow-lg"
                  style={{ background: "linear-gradient(135deg, hsl(var(--forest)), hsl(var(--forest-dark)))" }}
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 16px -2px hsla(var(--forest), 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <Shield className="w-2.5 h-2.5 text-muted-foreground/50" />
                <p className="text-[9px] text-muted-foreground/60 font-body">
                  Mind Science AI • Certified NLP & Silva Method Expert
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FounderChatbot;
