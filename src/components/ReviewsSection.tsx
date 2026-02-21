import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  { name: "Fatima M.", location: "Lahore", text: "The Hair Oil completely stopped my hair fall within 3 weeks. I tried everything before this — nothing worked like Eco-Xent. Truly remarkable results.", rating: 5, initials: "FM" },
  { name: "Sara A.", location: "Karachi", text: "The Herbal Soap cleared my acne marks in just 2 weeks. My skin has never felt this clean and healthy. Amazing quality.", rating: 5, initials: "SA" },
  { name: "Zainab K.", location: "Islamabad", text: "The Herbal Shampoo made my hair incredibly silky without any chemical smell. The natural fragrance is beautiful. Highly recommend!", rating: 5, initials: "ZK" },
  { name: "Usman R.", location: "Rawalpindi", text: "Ordered the Botanic Shield Serum for my wife — she says her skin is glowing after just one month. Now we both use it daily!", rating: 5, initials: "UR" },
  { name: "Hina B.", location: "Faisalabad", text: "First time ordering online and Eco-Xent exceeded all expectations. Premium packaging, fast delivery, and the products actually work!", rating: 5, initials: "HB" },
];

const ReviewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="relative py-28 overflow-hidden bg-white">
      <div className="absolute inset-0 gradient-radial-gold opacity-15" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.4em] uppercase text-[11px] font-body font-medium mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-foreground">
            What Our <span className="text-gradient-gold italic">Customers</span> Say
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter: (dir: number) => ({ x: dir > 0 ? 150 : -150, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (dir: number) => ({ x: dir > 0 ? -150 : 150, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-xl p-10 md:p-14 text-center border border-border"
              style={{ background: "hsl(40 30% 97%)" }}
            >
              <div className="absolute top-6 left-8 opacity-[0.05]">
                <Quote className="w-16 h-16 text-gold" />
              </div>

              <div className="flex justify-center gap-1 mb-8">
                {[...Array(reviews[current].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-foreground/80 font-heading italic leading-relaxed mb-10 max-w-xl mx-auto">
                "{reviews[current].text}"
              </p>

              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-sm font-heading font-semibold text-gold-dark">{reviews[current].initials}</span>
                </div>
                <div>
                  <p className="text-foreground font-heading font-semibold">{reviews[current].name}</p>
                  <p className="text-xs text-muted-foreground font-body">{reviews[current].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-6 mt-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setDirection(-1); setCurrent((c) => (c - 1 + reviews.length) % reviews.length); }}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="relative h-1.5 rounded-full transition-all duration-500 overflow-hidden"
                  style={{ width: i === current ? 28 : 8 }}
                >
                  <div className="absolute inset-0 rounded-full bg-border" />
                  {i === current && (
                    <motion.div className="absolute inset-0 rounded-full bg-gold" layoutId="review-indicator" />
                  )}
                </button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setDirection(1); setCurrent((c) => (c + 1) % reviews.length); }}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
