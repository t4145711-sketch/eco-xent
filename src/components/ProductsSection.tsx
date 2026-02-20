import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  originalPrice: string;
  image: string;
  comingSoon?: boolean;
  stock?: number;
  category: string;
}

const products: Product[] = [
  { id: 1, name: "Herbal Hair Growth Shampoo", tagline: "Ayurvedic Brilliance", description: "Infused with ancient Ayurvedic herbs for lustrous, healthy hair growth that radiates vitality.", price: "Rs. 750", originalPrice: "Rs. 850", image: productShampoo, stock: 12, category: "Haircare" },
  { id: 2, name: "Healing Hair Oil", tagline: "Botanical Elixir", description: "A potent elixir of rare botanical oils that deeply nourishes roots and strengthens every strand.", price: "Rs. 750", originalPrice: "Rs. 850", image: productHairOil, stock: 8, category: "Haircare" },
  { id: 3, name: "Healing Soap", tagline: "Botanical Art", description: "Elegantly designed botanical soap bars that transform your daily routine into a luxury healing experience.", price: "Rs. 750", originalPrice: "Rs. 900", image: productPourSoap, stock: 15, category: "Skincare" },
  { id: 4, name: "Acne Soap", tagline: "Clear Skin Ritual", description: "Artisan-crafted with organic ingredients specifically formulated to combat acne and restore clear skin.", price: "Rs. 650", originalPrice: "Rs. 790", image: productMeltPourSoap, stock: 20, category: "Skincare" },
  { id: 5, name: "Whitening Serum", tagline: "Radiant Glow", description: "Advanced brightening formula with natural whitening agents for a luminous, even-toned complexion.", price: "Rs. 1,550", originalPrice: "Rs. 1,999", image: productSerum, stock: 10, category: "Skincare" },
  { id: 6, name: "Anti-Aging Serum", tagline: "Timeless Youth", description: "Revolutionary formula with organic retinol alternatives for timeless, youthful radiance.", price: "Rs. 1,650", originalPrice: "Rs. 2,100", image: productSerum, stock: 7, category: "Skincare" },
];

const ProductCard = ({ product, index, onAddToCart }: { product: Product; index: number; onAddToCart: (id: number) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden"
    >
      {/* Card background with animated border */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-700"
        style={{
          background: "linear-gradient(160deg, hsl(43 50% 55% / 0.04), hsl(160 40% 12% / 0.5))",
          border: hovered ? "1px solid hsl(43 50% 55% / 0.25)" : "1px solid hsl(43 50% 55% / 0.08)",
        }}
      />

      {/* Shimmer sweep on hover */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ x: "-100%", opacity: 0 }}
        animate={hovered ? { x: "200%", opacity: 0.08 } : { x: "-100%", opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(90deg, transparent, hsl(43 50% 55%), transparent)",
          width: "50%",
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

        {/* Image with scale + reveal */}
        <div className="relative h-72 overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ scale: hovered ? 1.08 : 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

          {/* Quick view - slide up from bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-6"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: hovered ? 0 : 40, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-background/70 backdrop-blur-md text-primary"
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
            <motion.p
              className="text-[10px] text-primary/60 font-body tracking-[0.25em] uppercase mb-1 flex items-center gap-1.5"
              initial={{ x: -10, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
            >
              <Sparkles className="w-3 h-3" />
              {product.tagline}
            </motion.p>
            <h3 className="text-xl font-heading font-semibold text-foreground">{product.name}</h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed mt-2">{product.description}</p>
          </div>

          <motion.div
            className="h-[1px] w-full bg-gradient-to-r from-primary/15 via-primary/10 to-transparent my-1"
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.6, duration: 0.8 }}
          />

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <motion.span
                  className="text-2xl font-heading font-bold text-gradient-gold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15 + 0.7, duration: 0.5 }}
                >
                  {product.price}
                </motion.span>
                <motion.span
                  className="text-sm font-body text-muted-foreground line-through"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.8, duration: 0.5 }}
                >
                  {product.originalPrice}
                </motion.span>
              </div>
              <span className="text-[9px] font-body text-primary/50 tracking-wider uppercase">Batch No. 6</span>
            </div>
            {!product.comingSoon ? (
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px hsl(43 50% 55% / 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddToCart(product.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-body font-semibold text-xs tracking-[0.1em] uppercase shadow-lg shadow-primary/20 transition-shadow duration-500"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "hsl(43 50% 55% / 0.4)" }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 text-primary/60 font-body text-xs tracking-[0.1em] uppercase transition-all duration-300"
              >
                <span>Notify Me</span>
                <ArrowRight className="w-3 h-3" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom glow on hover */}
      <motion.div
        className="absolute bottom-0 left-[10%] right-[10%] h-[2px] rounded-full pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, hsl(43 50% 55% / 0.5), transparent)" }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

const ProductsSection = ({ onAddToCart }: { onAddToCart: (id: number) => void }) => {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: false });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionScale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <motion.section
      ref={sectionRef}
      id="products"
      className="relative py-32 overflow-hidden"
      style={{ scale: sectionScale, opacity: sectionOpacity }}
    >
      <div className="absolute inset-0 gradient-radial-gold opacity-15" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Eid Special Offer Banner */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full mb-8"
            style={{ background: "linear-gradient(135deg, hsl(43 50% 55% / 0.15), hsl(43 50% 55% / 0.05))", border: "1px solid hsl(43 50% 55% / 0.35)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isHeadingInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-lg"
            >🌙</motion.span>
            <span className="text-primary font-heading font-bold text-sm tracking-[0.2em] uppercase">Eid Special Offer</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              className="text-lg"
            >⭐</motion.span>
          </motion.div>

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProductsSection;
