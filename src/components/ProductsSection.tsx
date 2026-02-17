import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ShoppingCart, Clock, Eye, ArrowRight } from "lucide-react";

import productShampoo from "@/assets/product-shampoo.jpg";
import productHairOil from "@/assets/product-hairoil.jpg";
import productColdSoap from "@/assets/product-coldsoap.jpg";
import productPourSoap from "@/assets/product-poursoap.jpg";
import productSerum from "@/assets/product-serum.jpg";

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
  {
    id: 1,
    name: "Herbal Shampoo",
    tagline: "Ayurvedic Brilliance",
    description: "Infused with ancient Ayurvedic herbs for lustrous, healthy hair that radiates vitality.",
    price: "₹899",
    image: productShampoo,
    stock: 12,
    category: "Haircare",
  },
  {
    id: 2,
    name: "Herbal Hair Oil",
    tagline: "Botanical Elixir",
    description: "A potent elixir of rare botanical oils that deeply nourishes roots and strengthens every strand.",
    price: "₹749",
    image: productHairOil,
    stock: 8,
    category: "Haircare",
  },
  {
    id: 3,
    name: "Cold Process Soap",
    tagline: "Artisan Ritual",
    description: "Artisan-crafted with organic butters and essential oils for an indulgent cleansing ritual.",
    price: "₹499",
    image: productColdSoap,
    stock: 15,
    category: "Skincare",
  },
  {
    id: 4,
    name: "Pour Soap",
    tagline: "Botanical Art",
    description: "Elegantly designed botanical soap bars that transform your daily routine into a luxury experience.",
    price: "₹449",
    image: productPourSoap,
    stock: 20,
    category: "Skincare",
  },
  {
    id: 5,
    name: "Anti Aging Serum",
    tagline: "Timeless Youth",
    description: "Revolutionary formula with organic retinol alternatives for timeless, youthful radiance.",
    price: "₹1,299",
    image: productSerum,
    comingSoon: true,
    category: "Skincare",
  },
];

const ProductCard = ({ product, index, onAddToCart }: { product: Product; index: number; onAddToCart: (id: number) => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, hsl(43 50% 55% / 0.06), hsl(160 40% 12% / 0.4))",
        border: "1px solid hsl(43 50% 55% / 0.1)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Category tag */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-secondary/60 backdrop-blur-sm border border-border/50">
        <span className="text-[10px] font-body font-semibold text-primary tracking-[0.15em] uppercase">{product.category}</span>
      </div>

      {/* Coming Soon badge */}
      {product.comingSoon && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/25 backdrop-blur-sm">
          <Clock className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-body font-bold text-primary tracking-[0.15em] uppercase">Coming Soon</span>
        </div>
      )}

      {/* Stock indicator */}
      {!product.comingSoon && product.stock && product.stock <= 15 && (
        <div className="absolute top-4 right-4 z-20">
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-3 py-1 rounded-full bg-destructive/15 border border-destructive/25 backdrop-blur-sm"
          >
            <span className="text-[10px] font-body font-semibold text-destructive tracking-wider">Only {product.stock} left</span>
          </motion.div>
        </div>
      )}

      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

        {/* Quick view overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-background/40 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-background/50 text-primary">
            <Eye className="w-4 h-4" />
            <span className="text-xs font-body font-medium tracking-wider uppercase">Quick View</span>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3">
        <div>
          <p className="text-[10px] text-primary/70 font-body tracking-[0.2em] uppercase mb-1">{product.tagline}</p>
          <h3 className="text-xl font-heading font-semibold text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed mt-2">{product.description}</p>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent my-1" />

        <div className="flex items-center justify-between">
          <span className="text-2xl font-heading font-bold text-gradient-gold">{product.price}</span>
          {!product.comingSoon ? (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(43 50% 55% / 0.35)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(product.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-body font-semibold text-xs tracking-[0.1em] uppercase transition-all duration-500"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Add to Cart
            </motion.button>
          ) : (
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/25 text-primary/70 font-body text-xs tracking-[0.1em] uppercase hover:border-primary/50 hover:text-primary transition-all duration-300">
              <span>Notify Me</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px hsl(43 50% 55% / 0.2), 0 0 30px hsl(43 50% 55% / 0.1)" }}
      />
    </motion.div>
  );
};

const ProductsSection = ({ onAddToCart }: { onAddToCart: (id: number) => void }) => {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  return (
    <section id="products" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-radial-gold opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <p className="text-primary tracking-[0.4em] uppercase text-xs font-body font-medium">The Collection</p>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary/50" />
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
    </section>
  );
};

export default ProductsSection;
