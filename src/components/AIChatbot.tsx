import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import ecoxentAiLogo from "@/assets/ecoxent-ai-logo.jpeg";
import ecoxentChatLogo from "@/assets/ecoxent-chat-logo.jpeg";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

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
  content: "Assalam o Alaikum! 🌿 Main Eco-Xent ka AI assistant hoon. Aap mujh se kisi bhi language mein baat kar sakte hain — Urdu, English, Hindi, Arabic, ya koi bhi! Kya madad kar sakta hoon?",
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Msg = { role: "user", content: text };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > messages.length + 1) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev.slice(0, -1), last, { role: "assistant", content: assistantSoFar }].filter(Boolean) as Msg[];
      });
    };

    try {
      // Send only user/assistant messages (skip welcome if needed)
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
  }, [input, isLoading, messages]);

  return (
    <>
      {/* Chat toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 overflow-hidden border-2 border-gold/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={ecoxentChatLogo} alt="Eco-Xent AI" className="w-full h-full object-cover" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center">
              <span className="text-[8px] font-bold text-forest-dark">AI</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl border border-gold/20"
            style={{ maxHeight: "min(550px, calc(100vh - 140px))" }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, hsl(var(--forest)), hsl(var(--forest-dark)))" }}
            >
              <div className="flex items-center gap-3">
                <img src={ecoxentAiLogo} alt="Eco-Xent AI" className="w-9 h-9 rounded-full object-cover border border-gold/30" />
                <div>
                  <h3 className="text-white font-heading font-semibold text-sm">Eco-Xent AI Assistant</h3>
                  <p className="text-white/50 text-[10px] font-body">Multilingual Assistant • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="overflow-y-auto p-4 space-y-4 bg-background"
              style={{ height: "350px" }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.role === "assistant"
                        ? "bg-forest/10 text-forest"
                        : "bg-gold/10 text-gold"
                    }`}
                  >
                    {msg.role === "assistant" ? <img src={ecoxentAiLogo} alt="AI" className="w-7 h-7 rounded-full object-cover" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-secondary text-foreground rounded-bl-sm"
                        : "bg-forest text-white rounded-br-sm"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none text-foreground [&_p]:mb-1 [&_p:last-child]:mb-0">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex gap-2.5">
                  <img src={ecoxentAiLogo} alt="AI" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                  <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-foreground/40" />
                  </div>
                </div>
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
                  placeholder="Type in any language..."
                  className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-gold/30"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={send}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-40 transition-all"
                  style={{ background: "linear-gradient(135deg, hsl(var(--forest)), hsl(var(--forest-dark)))" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-[9px] text-muted-foreground text-center mt-2 font-body">
                Powered by Eco-Xent AI • Supports all languages
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
