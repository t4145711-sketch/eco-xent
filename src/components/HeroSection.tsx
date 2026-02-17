import { motion } from "framer-motion";
import BottleScene from "./BottleScene";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 gradient-radial-gold" />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-32">
          {/* Left - Text */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.8 }}
            >
              <p className="text-primary tracking-[0.4em] uppercase text-sm font-body mb-4">
                Premium Organic Collection
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.95] mb-6">
                <span className="text-gradient-gold">Eco-Xent</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 font-heading italic">
                Nature Reimagined. Luxury Redefined.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.2 }}
              className="text-muted-foreground max-w-md text-base leading-relaxed font-body"
            >
              Discover the pinnacle of organic luxury. Handcrafted with rare botanicals 
              and ancient herbal wisdom, reimagined for the modern connoisseur.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#products"
                className="px-8 py-4 bg-primary text-primary-foreground font-body font-semibold tracking-wider uppercase text-sm rounded-lg hover:shadow-[0_0_30px_hsl(43_50%_55%/0.4)] transition-all duration-500 glow-gold"
              >
                Shop Now
              </a>
              <a
                href="#experience"
                className="px-8 py-4 border border-primary/30 text-primary font-body font-semibold tracking-wider uppercase text-sm rounded-lg hover:bg-primary/10 transition-all duration-500"
              >
                Explore Collection
              </a>
            </motion.div>
          </div>

          {/* Right - 3D Bottle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 3 }}
            className="h-[400px] md:h-[550px] lg:h-[600px]"
          >
            <BottleScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
