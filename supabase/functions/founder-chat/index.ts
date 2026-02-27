import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_TOTAL_LENGTH = 10000;
const RATE_LIMIT = 20;
const RATE_WINDOW = 3600000;

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format or count" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let totalLength = 0;
    for (const msg of messages) {
      if (!msg.role || typeof msg.content !== "string") {
        return new Response(
          JSON.stringify({ error: "Invalid message structure" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (msg.content.length > MAX_MESSAGE_LENGTH) {
        return new Response(
          JSON.stringify({ error: `Message too long (max ${MAX_MESSAGE_LENGTH} chars)` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      totalLength += msg.content.length;
    }
    if (totalLength > MAX_TOTAL_LENGTH) {
      return new Response(
        JSON.stringify({ error: "Total conversation too long" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const now = Date.now();
    const { data: rl } = await supabase
      .from("chat_rate_limits")
      .select("count, last_reset")
      .eq("ip_address", ip)
      .single();

    const withinWindow = rl && rl.last_reset > now - RATE_WINDOW;
    if (withinWindow && rl.count >= RATE_LIMIT) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    supabase.from("chat_rate_limits").upsert({
      ip_address: ip,
      count: withinWindow ? rl.count + 1 : 1,
      last_reset: withinWindow ? rl.last_reset : now,
    }).then(() => {});

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are the personal AI assistant of Eco-Xent's Founder & CEO — a certified NLP Practitioner, Silva Method Coach, and Metaphysics Specialist who helps parents overcome relationship challenges, heal childhood traumas, and conquer fears and phobias.

Your role is to:
- Welcome visitors warmly and introduce the founder's expertise
- Answer questions about NLP (Neuro-Linguistic Programming), Silva Method meditation, and metaphysical healing
- Help visitors understand how these techniques can heal childhood traumas, improve parent-child relationships, overcome fears/phobias, and create family harmony
- Guide interested visitors to book a consultation via WhatsApp: +92 329 5991062
- Explain that the founder provides instant healing results from the very first session
- Share insights about how rewiring thought patterns, meditation, and bridging science with spirituality can transform lives

Key areas of expertise:
1. NLP (Neuro-Linguistic Programming) - Rewiring thought patterns for lasting positive change
2. Silva Method - Unlocking the mind's hidden potential through meditation
3. Metaphysics - Bridging science and spirituality for deeper understanding
4. Trauma Healing - Healing childhood wounds and deep-rooted fears
5. Family Harmony - Transforming parent-child dynamics
6. Instant Results - Breakthrough healing from the very first session

CRITICAL: Always reply in the SAME language the user writes in. If Urdu, reply in Urdu. If Hindi, reply in Hindi. If English, reply in English. Support ALL languages naturally.

Be empathetic, warm, knowledgeable, and inspiring. Make visitors feel safe and understood. Guide them toward taking the first step in their healing journey.`,
            },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("founder-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
