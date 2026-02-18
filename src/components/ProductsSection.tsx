import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ShoppingCart, Clock, Eye, ArrowRight, Sparkles } from "lucide-react";

import productShampoo from "@/assets/product-shampoo.png";
import productHairOil from "@/assets/product-hairoil.png";
import productPourSoap from "@/assets/product-poursoap.png";
import productMeltPourSoap from "@/assets/product-meltpoursoap.png";
import productSerum from "@/assets/product-serum.png";

interface Product {
  id: number;
  name: string;
  tagline: string;
  description: string;
  price: string;
  image: string;
  comingSoon?: boolean;
  stock?: number;
  category: string;
}

const products: Product[] = [
  { id: 1, name: "Herbal Shampoo", tagline: "Ayurvedic Brilliance", description: "Infused with ancient Ayurvedic herbs for lustrous, healthy hair that radiates vitality.", price: "₹899", image: productShampoo, stock: 12, category: "Haircare" },
  { id: 2, name: "Herbal Hair Oil", tagline: "Botanical Elixir", description: "A potent elixir of rare botanical oils that deeply nourishes roots and strengthens every strand.", price: "₹749", image: productHairOil, stock: 8, category: "Haircare" },
  { id: 3, name: "Pour Soap", tagline: "Botanical Art", description: "Elegantly designed botanical soap bars that transform your daily routine into a luxury experience.", price: "₹499", image: productPourSoap, stock: 15, category: "Skincare" },
  { id: 4, name: "Melt Pour Soap", tagline: "Artisan Ritual", description: "Artisan-crafted with organic butters and essential oils for an indulgent cleansing ritual.", price: "₹449", image: productMeltPourSoap, stock: 20, category: "Skincare" },
  { id: 5, name: "Anti Aging Serum", tagline: "Timeless Youth", description: "Revolutionary formula with organic retinol alternatives for timeless, youthful radiance.", price: "₹1,299", image: productSerum, comingSoon: true, category: "Skincare" },
];

const ProductCard = ({ product, index, onAddToCart }: { product: Product; index: number; onAddToCart: (id: number) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  // Spotlight position
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);

  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(((e.clientX - rect.left) / rect.width) * 100);
    spotlightY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden"
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]: number[]) =>
              `radial-gradient(400px circle at ${x}% ${y}%, hsl(43 50% 55% / 0.12), transparent 60%)`
          ),
        }}
      />

      {/* Card background */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(160deg, hsl(43 50% 55% / 0.04), hsl(160 40% 12% / 0.5))",
          border: "1px solid hsl(43 50% 55% / 0.08)",
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-20">
        {/* Category tag */}
        <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-background/50 backdrop-blur-xl border border-border/30">
          <span className="text-[10px] font-body font-semibold text-primary tracking-[0.15em] uppercase">{product.category}</span>
        </div>

        {/* Coming Soon / Stock */}
        {product.comingSoon ? (
          <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl">
            <Clock className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-body font-bold text-primary tracking-[0.15em] uppercase">Coming Soon</span>
          </div>
        ) : product.stock && product.stock <= 15 ? (
          <div className="absolute top-4 right-4 z-30">
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 backdrop-blur-xl"
            >
              <span className="text-[10px] font-body font-semibold text-destructive tracking-wider">Only {product.stock} left</span>
            </motion.div>
          </div>
        ) : null}

        {/* Image with parallax depth */}
        <div className="relative h-72 overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            style={{
              scale: hovered ? 1.1 : 1,
              transition: "scale 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

          {/* Quick view */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-background/30 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-background/60 text-primary"
              whileHover={{ scale: 1.05 }}
            >
              <Eye className="w-4 h-4" />
              <span className="text-xs font-body font-medium tracking-wider uppercase">Quick View</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-3">
          <div>
            <p className="text-[10px] text-primary/60 font-body tracking-[0.25em] uppercase mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              {product.tagline}
            </p>
            <h3 className="text-xl font-heading font-semibold text-foreground">{product.name}</h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed mt-2">{product.description}</p>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-primary/15 via-primary/10 to-transparent my-1" />

          <div className="flex items-center justify-between">
            <span className="text-2xl font-heading font-bold text-gradient-gold">{product.price}</span>
            {!product.comingSoon ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddToCart(product.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-body font-semibold text-xs tracking-[0.1em] uppercase shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-500"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </motion.button>
            ) : (
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 text-primary/60 font-body text-xs tracking-[0.1em] uppercase hover:border-primary/40 hover:text-primary transition-all duration-300">
                <span>Notify Me</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1px hsl(43 50% 55% / 0.2), 0 0 40px hsl(43 50% 55% / 0.08), 0 20px 60px -20px hsl(0 0% 0% / 0.5)"
            : "inset 0 0 0 1px hsl(43 50% 55% / 0.05), 0 0 0px transparent",
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

const ProductsSection = ({ onAddToCart }: { onAddToCart: (id: number) => void }) => {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  return (
    <section id="products" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-radial-gold opacity-15" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary/50"
              initial={{ scaleX: 0 }}
              animate={isHeadingInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <p className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium">The Collection</p>
            <motion.div
              className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary/50"
              initial={{ scaleX: 0 }}
              animate={isHeadingInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gradient-gold mb-4">
            Luxury Essentials
          </h2>
          <p className="text-sm text-muted-foreground font-body max-w-md mx-auto">
            Each product is a masterpiece of nature, crafted for those who accept nothing but the finest.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto perspective-1000">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
