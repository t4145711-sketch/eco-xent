import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShoppingCart, Clock } from "lucide-react";

import productShampoo from "@/assets/product-shampoo.jpg";
import productHairOil from "@/assets/product-hairoil.jpg";
import productColdSoap from "@/assets/product-coldsoap.jpg";
import productPourSoap from "@/assets/product-poursoap.jpg";
import productSerum from "@/assets/product-serum.jpg";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  comingSoon?: boolean;
  stock?: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Herbal Shampoo",
    description: "Infused with ancient Ayurvedic herbs for lustrous, healthy hair that radiates vitality.",
    price: "₹899",
    image: productShampoo,
    stock: 12,
  },
  {
    id: 2,
    name: "Herbal Hair Oil",
    description: "A potent elixir of rare botanical oils that deeply nourishes roots and strengthens every strand.",
    price: "₹749",
    image: productHairOil,
    stock: 8,
  },
  {
    id: 3,
    name: "Cold Process Soap",
    description: "Artisan-crafted with organic butters and essential oils for an indulgent cleansing ritual.",
    price: "₹499",
    image: productColdSoap,
    stock: 15,
  },
  {
    id: 4,
    name: "Pour Soap",
    description: "Elegantly designed botanical soap bars that transform your daily routine into a luxury experience.",
    price: "₹449",
    image: productPourSoap,
    stock: 20,
  },
  {
    id: 5,
    name: "Anti Aging Serum",
    description: "Revolutionary formula with organic retinol alternatives for timeless, youthful radiance.",
    price: "₹1,299",
    image: productSerum,
    comingSoon: true,
  },
];

const ProductCard = ({ product, index, onAddToCart }: { product: Product; index: number; onAddToCart: (id: number) => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className={`group relative glass-gold rounded-2xl overflow-hidden ${
        product.comingSoon ? "opacity-90" : ""
      }`}
    >
      {/* Coming Soon badge */}
      {product.comingSoon && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-body font-semibold text-primary tracking-wider uppercase">Coming Soon</span>
        </div>
      )}

      {/* Stock indicator */}
      {!product.comingSoon && product.stock && product.stock <= 15 && (
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-destructive/20 border border-destructive/30">
          <span className="text-xs font-body text-destructive">Only {product.stock} left</span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-heading font-bold text-gradient-gold">{product.price}</span>
          {!product.comingSoon ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(product.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wider uppercase hover:shadow-[0_0_25px_hsl(43_50%_55%/0.4)] transition-shadow duration-500"
            >
              <ShoppingCart className="w-4 h-4" />
              Add
            </motion.button>
          ) : (
            <span className="px-5 py-2.5 rounded-lg border border-muted text-muted-foreground font-body text-sm tracking-wider uppercase cursor-not-allowed">
              Notify Me
            </span>
          )}
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none glow-gold" />
    </motion.div>
  );
};

const ProductsSection = ({ onAddToCart }: { onAddToCart: (id: number) => void }) => {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  return (
    <section id="products" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-radial-gold opacity-30" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary tracking-[0.4em] uppercase text-sm font-body mb-4">The Collection</p>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-gradient-gold">
            Luxury Essentials
          </h2>
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
