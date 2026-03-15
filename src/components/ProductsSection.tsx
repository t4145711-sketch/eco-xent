import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ShoppingCart, ArrowRight, Filter } from "lucide-react";
import CheckoutModal from "@/components/CheckoutModal";

import productSerum from "@/assets/product-serum-with-ingredients.jpg";
import productHairOil from "@/assets/product-hairoil-with-ingredients.jpg";
import productShampoo from "@/assets/product-shampoo-with-ingredients.jpg";
import productSoap from "@/assets/product-soap-with-box.png";
import productConditioner from "@/assets/product-conditioner-with-ingredients.jpg";
import productNew1 from "@/assets/product-new-botanical-with-ingredients.jpg";
import productNew2 from "@/assets/product-cleaning-soap-updated.jpg";
import productHairSerum from "@/assets/product-hair-serum-new.jpg";

interface Product {
  id: number;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  priceDisplay: string;
  originalPriceDisplay: string;
  image: string;
  discount: number;
  badge?: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1, name: "Botanic Shield Serum", tagline: "Advanced Protection",
    description: "Proven to heal dull, sun-damaged skin. Real users saw visible radiance and protection from environmental stress within weeks of regular use.",
    price: 1550, originalPrice: 1999, priceDisplay: "Rs.1,550", originalPriceDisplay: "Rs.1,999",
    image: productSerum, discount: 22, badge: "Best Seller", category: "Skincare",
  },
  {
    id: 2, name: "Hair Healer Oil", tagline: "Deep Restoration",
    description: "Healed thousands of damaged scalps. 13+ therapeutic oils that have repaired weak follicles and restored hair growth in real people.",
    price: 850, originalPrice: 999, priceDisplay: "Rs.850", originalPriceDisplay: "Rs.999",
    image: productHairOil, discount: 25, category: "Haircare",
  },
  {
    id: 3, name: "Herbal Shampoo", tagline: "Gentle Cleanse",
    description: "Healed chemically treated and weakened hair for hundreds of users. Sulfate-free formula that gently removes toxins while preserving natural scalp oils.",
    price: 750, originalPrice: 950, priceDisplay: "Rs.750", originalPriceDisplay: "Rs.950",
    image: productShampoo, discount: 21, category: "Haircare",
  },
  {
    id: 4, name: "Herbal Soap", tagline: "Pure Botanical",
    description: "Healed irritated, acne-prone skin naturally. Handcrafted organic herbs draw out impurities and restore your skin's balance without any harsh chemicals.",
    price: 1200, originalPrice: 1500, priceDisplay: "Rs.1,200", originalPriceDisplay: "Rs.1,500",
    image: productSoap, discount: 24, badge: "Limited", category: "Skincare",
  },
  {
    id: 5, name: "Velvet Ritual Conditioner", tagline: "Herbal Transformation",
    description: "Healed dry, brittle hair that nothing else could fix. Deep herbal nourishment that transforms rough, lifeless strands into silky smooth results after every wash.",
    price: 850, originalPrice: 1100, priceDisplay: "Rs.850", originalPriceDisplay: "Rs.1,100",
    image: productConditioner, discount: 23, badge: "New", category: "Haircare",
  },
  {
    id: 6, name: "All-in-One Serum", tagline: "Complete Skin Transformation",
    description: "Healed melasma, dark spots and fine lines for countless users. Clinical-grade Niacinamide, Vitamin C, Kojic Acid & Alpha Arbutin deliver visible, proven results.",
    price: 1500, originalPrice: 2000, priceDisplay: "Rs.1,500", originalPriceDisplay: "Rs.2,000",
    image: productNew1, discount: 25, badge: "Best Seller", category: "Skincare",
  },
  {
    id: 7, name: "Eco-Xent Cleansing Soap", tagline: "Neem & Shea Butter",
    description: "Healed rough, acne-prone skin with Neem, Amla, Tea Tree, Frankincense & Shea Butter. Deep pore cleansing that repairs and leaves your skin silky smooth and naturally refreshed.",
    price: 700, originalPrice: 950, priceDisplay: "Rs.700", originalPriceDisplay: "Rs.950",
    image: productNew2, discount: 26, badge: "New", category: "Skincare",
  },
  {
    id: 8, name: "Hair Living Serum", tagline: "Advanced Hair Care & Shine",
    description: "Nourish from nature and repair damage with Argan Oil, Marula Oil, Camellia Oil, Baobab Oil & Murumuru Butter. Controls frizz, adds natural shine and protects from environmental damage.",
    price: 1200, originalPrice: 1600, priceDisplay: "Rs.1,200", originalPriceDisplay: "Rs.1,600",
    image: productHairSerum, discount: 25, badge: "New", category: "Haircare",
  },
];

const categories = ["All", "Skincare", "Haircare"];

const ProductCard = ({
  product,
  index,
  onAddToCart,
  onBuyNow,
}: {
  product: Product;
  index: number;
  onAddToCart: (id: number) => void;
  onBuyNow: (p: Product) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.35 } }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-gold/20 transition-all duration-300"
      style={{
        boxShadow: "0 2px 12px hsl(var(--foreground) / 0.03)",
      }}
    >
      {/* Hover shadow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "0 16px 48px hsl(var(--foreground) / 0.08), 0 4px 16px hsl(var(--forest) / 0.06)" }}
      />

      {/* Discount badge */}
      {product.discount > 0 && (
        <motion.div
          className="absolute top-3 left-3 z-20"
          initial={{ scale: 0, rotate: -12 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: index * 0.08 + 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="px-2.5 py-1 rounded-md font-body font-semibold text-[11px] text-primary-foreground bg-forest">
            -{product.discount}%
          </div>
        </motion.div>
      )}

      {/* Badge */}
      {product.badge && (
        <motion.div
          className="absolute top-3 right-3 z-20"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.3, type: "spring" }}
        >
          <div className="px-2.5 py-1 rounded-md font-body font-semibold text-[10px] tracking-wider uppercase bg-gold text-primary-foreground">
            {product.badge}
          </div>
        </motion.div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden bg-forest-light">
        <motion.div
          className="w-full aspect-[3/4] flex items-center justify-center overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Quick buy overlay */}
        <motion.div
          className="absolute inset-0 bg-foreground/5 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBuyNow(product)}
            className="px-6 py-2.5 rounded-full font-body font-medium text-xs tracking-wider uppercase text-primary-foreground backdrop-blur-sm bg-forest/90"
          >
            Quick Buy
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <p className="text-[10px] font-body font-medium tracking-[0.2em] uppercase text-gold mb-1.5">
          {product.tagline}
        </p>
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-2 leading-snug">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg md:text-xl font-heading font-bold text-foreground">{product.priceDisplay}</span>
          <span className="text-xs md:text-sm font-body text-muted-foreground line-through">{product.originalPriceDisplay}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onBuyNow(product)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-body font-medium text-[11px] tracking-wider uppercase text-primary-foreground bg-primary transition-all duration-300 hover:bg-primary/90"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Buy Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onAddToCart(product.id)}
            className="px-3 py-2.5 rounded-lg border border-border text-muted-foreground font-body text-[11px] tracking-wider uppercase hover:border-primary/30 hover:text-primary transition-all duration-300"
          >
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsSection = ({ onAddToCart }: { onAddToCart: (id: number) => void }) => {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <section id="products" className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-background">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Section heading */}
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-body font-medium tracking-[0.4em] uppercase text-gold mb-4">
              The Collection
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-foreground mb-4">
              Our Best Sellers
            </h2>
            <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
          </motion.div>

          {/* Category filters */}
          <motion.div
            className="flex justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 15 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full font-body text-xs tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6 max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onAddToCart={onAddToCart}
                  onBuyNow={(p) => setCheckoutProduct(p)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* View All */}
          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a
              href="https://wa.me/923295991062"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-primary/20 text-primary font-body font-medium text-xs tracking-widest uppercase hover:bg-primary/5 transition-all duration-300"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <CheckoutModal
        product={checkoutProduct ? { id: checkoutProduct.id, name: checkoutProduct.name, price: checkoutProduct.priceDisplay } : null}
        isOpen={!!checkoutProduct}
        onClose={() => setCheckoutProduct(null)}
      />
    </>
  );
};

export default ProductsSection;
