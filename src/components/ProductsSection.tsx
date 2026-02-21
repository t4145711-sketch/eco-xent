import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ShoppingCart, Clock, ArrowRight, MessageCircle } from "lucide-react";
import CheckoutModal from "@/components/CheckoutModal";

import productShampoo from "@/assets/product-shampoo-new.png";
import productHairOil from "@/assets/product-hairoil-new.png";
import productPourSoap from "@/assets/product-poursoap.png";
import productMeltPourSoap from "@/assets/product-meltpoursoap.png";
import productSerum from "@/assets/product-serum.png";

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
  comingSoon?: boolean;
  stock?: number;
  category: string;
}

const products: Product[] = [
  { id: 1, name: "Herbal Hair Growth Shampoo", tagline: "Healing Haircare", description: "Ancient Ayurvedic herbs se bana ye shampoo baalon ki jad tak heal karta hai — hair fall rokta hai, growth badhata hai.", price: 750, originalPrice: 850, priceDisplay: "Rs.750.00", originalPriceDisplay: "Rs.850.00", image: productShampoo, stock: 12, category: "Haircare" },
  { id: 2, name: "Healing Hair Oil", tagline: "Deep Heal Formula", description: "13+ qudrati therapeutic oils ka mazboot milaap — scalp ko heal kare, follicles ko mazboot kare, naye baal ugaye.", price: 750, originalPrice: 850, priceDisplay: "Rs.750.00", originalPriceDisplay: "Rs.850.00", image: productHairOil, stock: 8, category: "Haircare" },
  { id: 3, name: "Healing Soap", tagline: "Skin Healing Bar", description: "Handcrafted botanical soap jo skin ko qudrati taur pe heal karta hai — dryness, irritation aur roughness door kare.", price: 750, originalPrice: 900, priceDisplay: "Rs.750.00", originalPriceDisplay: "Rs.900.00", image: productPourSoap, stock: 15, category: "Skincare" },
  { id: 4, name: "Acne Healing Soap", tagline: "Clear Skin Healer", description: "Organic ingredients se bana ye soap acne ko andar se heal karta hai — pimples khatam kare, skin saaf aur clear kare.", price: 650, originalPrice: 790, priceDisplay: "Rs.650.00", originalPriceDisplay: "Rs.790.00", image: productMeltPourSoap, stock: 20, category: "Skincare" },
  { id: 5, name: "Whitening Serum", tagline: "Healing Glow", description: "Qudrati brightening agents se bana ye serum skin tone heal kare — dark spots mitaye, natural glow wapas laaye.", price: 1550, originalPrice: 1999, priceDisplay: "Rs.1,550.00", originalPriceDisplay: "Rs.1,999.00", image: productSerum, stock: 10, category: "Skincare" },
  { id: 6, name: "Anti-Aging Serum", tagline: "Youth Healing", description: "Organic anti-aging herbs se bana ye serum skin cells ko heal kare — jhurriyan mitaye, jawani wali chhaap wapas laaye.", price: 1650, originalPrice: 2100, priceDisplay: "Rs.1,650.00", originalPriceDisplay: "Rs.2,100.00", image: productSerum, stock: 7, category: "Skincare" },
];

const getDiscountPercent = (price: number, original: number) => {
  return Math.round(((original - price) / original) * 100);
};

const ProductCard = ({ product, index, onAddToCart, onBuyNow }: { product: Product; index: number; onAddToCart: (id: number) => void; onBuyNow: (p: Product) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [hovered, setHovered] = useState(false);
  const discount = getDiscountPercent(product.price, product.originalPrice);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-500 overflow-hidden"
    >
      {/* Discount badge — like reference "43% OFF" */}
      {discount > 0 && !product.comingSoon && (
        <div className="absolute top-3 left-3 z-30">
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: index * 0.12 + 0.3, type: "spring", stiffness: 200 }}
            className="px-3 py-1.5 rounded-lg font-body font-bold text-sm text-white"
            style={{ background: "hsl(95 45% 32%)" }}
          >
            {discount}% OFF
          </motion.div>
        </div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden bg-secondary/30">
        <motion.div
          className="w-full aspect-square flex items-center justify-center p-6"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </motion.div>
      </div>

      {/* Content — clean like reference */}
      <div className="p-5">
        {/* Product name */}
        <h3 className="text-base font-heading font-bold text-foreground mb-1 leading-snug">
          {product.name}
        </h3>

        {/* Satisfied customers — like reference */}
        <motion.p
          className="text-xs font-body mb-3"
          style={{ color: "hsl(95 45% 32%)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.4 }}
        >
          5,000+ satisfied customers
        </motion.p>

        {/* Price row — like reference */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-heading font-bold text-foreground">{product.priceDisplay}</span>
          {discount > 0 && (
            <span className="text-sm font-body text-muted-foreground line-through">{product.originalPriceDisplay}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          {!product.comingSoon ? (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onBuyNow(product)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg font-body font-bold text-xs tracking-wide uppercase text-white transition-all duration-300"
                style={{ background: "hsl(95 45% 32%)" }}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Abhi Order Karein
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onAddToCart(product.id)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg border border-primary/30 text-primary font-body text-xs tracking-wide uppercase hover:bg-primary/5 transition-all duration-300"
              >
                <ShoppingCart className="w-3 h-3" />
                Cart mein Add karo
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-primary/20 text-primary/60 font-body text-xs tracking-wide uppercase transition-all duration-300"
            >
              <Clock className="w-3.5 h-3.5" />
              Notify Me
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProductsSection = ({ onAddToCart }: { onAddToCart: (id: number) => void }) => {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: false });
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);

  const handleBuyNow = (p: Product) => {
    setCheckoutProduct(p);
  };

  return (
    <>
      <section
        id="products"
        className="relative py-20 overflow-hidden bg-white"
      >
        <div className="container mx-auto px-6 relative z-10">
          {/* Section heading — clean like reference "Best Sellers" */}
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-border" />
              <h2 className="text-xs font-body font-semibold text-foreground tracking-[0.3em] uppercase">Best Sellers</h2>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-border" />
            </div>
            <p className="text-muted-foreground font-body text-sm max-w-md mx-auto">
              Discover our most popular products loved by customers
            </p>
          </motion.div>

          {/* Product grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onAddToCart={onAddToCart}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>

          {/* View All button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-primary/30 text-primary font-body font-semibold text-sm hover:bg-primary/5 transition-all duration-300"
            >
              View All
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
