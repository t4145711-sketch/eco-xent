import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  { name: "Priya Sharma", location: "Mumbai", text: "The Herbal Shampoo transformed my hair completely. It's softer, shinier, and I've never felt more confident. Absolutely premium quality.", rating: 5, initials: "PS" },
  { name: "Anika Roy", location: "Delhi", text: "Eco-Xent's Cold Process Soap is pure luxury. The scent is divine, and my skin has never been this smooth. Worth every rupee.", rating: 5, initials: "AR" },
  { name: "Meera Kapoor", location: "Bangalore", text: "I've tried every premium brand out there. Nothing compares to the quality and purity of Eco-Xent products. A game changer.", rating: 5, initials: "MK" },
  { name: "Ravi Tiwari", location: "Pune", text: "The Hair Oil is extraordinary. My hair growth has visibly improved in just 3 weeks of use. Highly recommended for everyone.", rating: 5, initials: "RT" },
  { name: "Sanya Desai", location: "Hyderabad", text: "Finally, a brand that delivers on its promises. The organic ingredients truly make a visible difference. My go-to skincare now.", rating: 5, initials: "SD" },
];

const ReviewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <section id="reviews" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-radial-gold opacity-10" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <p className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium">Testimonials</p>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold">
            Trusted By Thousands
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0, scale: 0.95, filter: "blur(8px)" }),
                center: { x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
                exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0, scale: 0.95, filter: "blur(8px)" }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl p-10 md:p-14 text-center"
              style={{
                background: "linear-gradient(160deg, hsl(43 50% 55% / 0.04), hsl(160 40% 12% / 0.3))",
                border: "1px solid hsl(43 50% 55% / 0.08)",
              }}
            >
              {/* Large quote mark */}
              <div className="absolute top-6 left-8 opacity-[0.06]">
                <Quote className="w-20 h-20 text-primary" />
              </div>

              <div className="flex justify-center gap-1 mb-8">
                {[...Array(reviews[current].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </motion.div>
                ))}
              </div>

              <p className="text-lg md:text-xl text-foreground/80 font-body italic leading-relaxed mb-10 max-w-xl mx-auto">
                "{reviews[current].text}"
              </p>

              {/* Avatar + name */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-sm font-heading font-bold text-primary">{reviews[current].initials}</span>
                </div>
                <div>
                  <p className="text-primary font-heading font-semibold text-lg">{reviews[current].name}</p>
                  <p className="text-xs text-muted-foreground font-body tracking-wider">{reviews[current].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setDirection(-1); setCurrent((c) => (c - 1 + reviews.length) % reviews.length); }}
              className="w-11 h-11 rounded-full border border-primary/15 flex items-center justify-center text-primary/50 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative h-2 rounded-full transition-all duration-500 overflow-hidden"
                  style={{ width: i === current ? 32 : 8 }}
                >
                  <div className="absolute inset-0 rounded-full bg-primary/15" />
                  {i === current && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary"
                      layoutId="review-indicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setDirection(1); setCurrent((c) => (c + 1) % reviews.length); }}
              className="w-11 h-11 rounded-full border border-primary/15 flex items-center justify-center text-primary/50 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
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
