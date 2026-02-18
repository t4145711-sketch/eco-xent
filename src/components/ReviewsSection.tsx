import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  { name: "Priya Sharma", location: "Mumbai", text: "The Herbal Shampoo transformed my hair completely. It's softer, shinier, and I've never felt more confident. Absolutely premium quality.", rating: 5 },
  { name: "Anika Roy", location: "Delhi", text: "Eco-Xent's Cold Process Soap is pure luxury. The scent is divine, and my skin has never been this smooth. Worth every rupee.", rating: 5 },
  { name: "Meera Kapoor", location: "Bangalore", text: "I've tried every premium brand out there. Nothing compares to the quality and purity of Eco-Xent products. A game changer.", rating: 5 },
  { name: "Ravi Tiwari", location: "Pune", text: "The Hair Oil is extraordinary. My hair growth has visibly improved in just 3 weeks of use. Highly recommended for everyone.", rating: 5 },
  { name: "Sanya Desai", location: "Hyderabad", text: "Finally, a brand that delivers on its promises. The organic ingredients truly make a visible difference. My go-to skincare now.", rating: 5 },
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

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.9, rotateY: dir > 0 ? 15 : -15 }),
    center: { x: 0, opacity: 1, scale: 1, rotateY: 0 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.9, rotateY: dir > 0 ? -15 : 15 }),
  };

  return (
    <section id="reviews" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-radial-gold opacity-15" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

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

        <div className="max-w-2xl mx-auto perspective-[1000px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl p-10 md:p-12 text-center"
              style={{
                background: "linear-gradient(160deg, hsl(43 50% 55% / 0.06), hsl(160 40% 12% / 0.4))",
                border: "1px solid hsl(43 50% 55% / 0.1)",
                backdropFilter: "blur(20px)",
              }}
            >
              <Quote className="w-8 h-8 text-primary/20 mx-auto mb-6" />
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(reviews[current].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </motion.div>
                ))}
              </div>
              <p className="text-base md:text-lg text-foreground/85 font-body italic leading-relaxed mb-8">
                "{reviews[current].text}"
              </p>
              <div>
                <p className="text-primary font-heading font-semibold text-lg">{reviews[current].name}</p>
                <p className="text-xs text-muted-foreground font-body mt-1 tracking-wider">{reviews[current].location}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setDirection(-1); setCurrent((c) => (c - 1 + reviews.length) % reviews.length); }}
              className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/40 transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === current ? "w-8 bg-primary" : "w-1.5 bg-primary/25 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setDirection(1); setCurrent((c) => (c + 1) % reviews.length); }}
              className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/40 transition-all duration-300"
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
