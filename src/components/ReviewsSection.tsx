import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { name: "Priya S.", text: "The Herbal Shampoo transformed my hair completely. It's softer, shinier, and I've never felt more confident.", rating: 5 },
  { name: "Anika R.", text: "Eco-Xent's Cold Process Soap is pure luxury. The scent is divine, and my skin has never been this smooth.", rating: 5 },
  { name: "Meera K.", text: "I've tried every premium brand. Nothing compares to the quality and purity of Eco-Xent products.", rating: 5 },
  { name: "Ravi T.", text: "The Hair Oil is extraordinary. My hair growth has visibly improved in just 3 weeks of use.", rating: 5 },
  { name: "Sanya D.", text: "Finally, a brand that delivers on its promises. The organic ingredients truly make a difference.", rating: 5 },
];

const ReviewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-radial-gold opacity-20" />
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.4em] uppercase text-sm font-body mb-4">Social Proof</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            className="glass-gold rounded-2xl p-10 text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(reviews[current].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-lg text-foreground/90 font-body italic leading-relaxed mb-6">
              "{reviews[current].text}"
            </p>
            <p className="text-primary font-heading font-semibold text-lg">{reviews[current].name}</p>
          </motion.div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((c) => (c - 1 + reviews.length) % reviews.length)}
              className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-primary" : "bg-primary/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % reviews.length)}
              className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
