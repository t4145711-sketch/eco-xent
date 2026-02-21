import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import CheckoutModal from "@/components/CheckoutModal";

import productSerum from "@/assets/product-serum-premium.jpg";
import productHairOil from "@/assets/product-hairoil-premium.jpg";
import productShampoo from "@/assets/product-shampoo-premium.jpg";
import productSoap from "@/assets/product-soap-premium.jpg";
import productConditioner from "@/assets/product-conditioner.png";

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
    id: 1,
    name: "Botanic Shield Serum",
    tagline: "Advanced Protection",
    description: "Powerful botanical serum that shields skin from environmental damage while promoting radiant glow.",
    price: 1550,
    originalPrice: 1999,
    priceDisplay: "Rs.1,550",
    originalPriceDisplay: "Rs.1,999",
    image: productSerum,
    discount: 22,
    badge: "Best Seller",
    category: "Skincare",
  },
  {
    id: 2,
    name: "Hair Healer Oil",
    tagline: "Deep Restoration",
    description: "13+ therapeutic botanical oils blended to heal scalp, strengthen follicles, and promote hair growth.",
    price: 750,
    originalPrice: 999,
    priceDisplay: "Rs.750",
    originalPriceDisplay: "Rs.999",
    image: productHairOil,
    discount: 25,
    category: "Haircare",
  },
  {
    id: 3,
    name: "Herbal Shampoo",
    tagline: "Gentle Cleanse",
    description: "Sulfate-free herbal formula that cleanses deeply while preserving natural oils and promoting growth.",
    price: 750,
    originalPrice: 950,
    priceDisplay: "Rs.750",
    originalPriceDisplay: "Rs.950",
    image: productShampoo,
    discount: 21,
    category: "Haircare",
  },
  {
    id: 4,
    name: "Herbal Soap",
    tagline: "Pure Botanical",
    description: "Handcrafted botanical soap with organic herbs that heals skin naturally — removes impurities gently.",
    price: 650,
    originalPrice: 850,
    priceDisplay: "Rs.650",
    originalPriceDisplay: "Rs.850",
    image: productSoap,
    discount: 24,
    badge: "Limited",
    category: "Skincare",
  },
  {
    id: 5,
    name: "Velvet Ritual Conditioner",
    tagline: "Herbal Transformation",
    description: "Advanced herbal conditioner that deeply hydrates, enhances shine, and provides a daily shield for silky hair.",
    price: 850,
    originalPrice: 1100,
    priceDisplay: "Rs.850",
    originalPriceDisplay: "Rs.1,100",
    image: productConditioner,
    discount: 23,
    badge: "New",
    category: "Haircare",
  },
];

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
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.35 } }}
      className="group relative bg-white rounded-lg overflow-hidden"
      style={{
        border: "1px solid hsl(40 15% 88%)",
        boxShadow: "0 2px 12px hsl(40 20% 50% / 0.04)",
      }}
    >
      {/* Hover shadow */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "0 16px 48px hsl(40 20% 50% / 0.12), 0 4px 16px hsl(150 20% 20% / 0.06)" }}
      />

      {/* Discount badge */}
      {product.discount > 0 && (
        <motion.div
          className="absolute top-4 left-4 z-20"
          initial={{ scale: 0, rotate: -12 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
        >
          <div
            className="px-3 py-1.5 rounded-md font-body font-semibold text-xs text-white"
            style={{ background: "hsl(150 30% 22%)" }}
          >
            -{product.discount}%
          </div>
        </motion.div>
      )}

      {/* Best Seller / Limited badge */}
      {product.badge && (
        <motion.div
          className="absolute top-4 right-4 z-20"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.4, type: "spring" }}
        >
          <div className="px-3 py-1.5 rounded-md font-body font-semibold text-[10px] tracking-wider uppercase"
            style={{
              background: "linear-gradient(135deg, hsl(40 55% 48%), hsl(40 50% 42%))",
              color: "white",
            }}
          >
            {product.badge}
          </div>
        </motion.div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden" style={{ background: "hsl(40 20% 97%)" }}>
        <motion.div
          className="w-full aspect-[3/4] flex items-center justify-center overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
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
            className="px-6 py-2.5 rounded-full font-body font-medium text-xs tracking-wider uppercase text-white backdrop-blur-sm"
            style={{ background: "hsl(150 30% 22% / 0.9)" }}
          >
            Quick Buy
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[10px] font-body font-medium tracking-[0.2em] uppercase text-gold mb-2">
          {product.tagline}
        </p>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3 leading-snug">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2.5 mb-5">
          <span className="text-xl font-heading font-bold text-foreground">{product.priceDisplay}</span>
          <span className="text-sm font-body text-muted-foreground line-through">{product.originalPriceDisplay}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onBuyNow(product)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-body font-medium text-xs tracking-wider uppercase text-white transition-all duration-300"
            style={{ background: "hsl(150 30% 22%)" }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Buy Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onAddToCart(product.id)}
            className="px-4 py-2.5 rounded-md border border-border text-foreground/60 font-body text-xs tracking-wider uppercase hover:border-primary/30 hover:text-primary transition-all duration-300"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsSection = ({ onAddToCart }: { onAddToCart: (id: number) => void }) => {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: false });
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);

  return (
    <>
      <section id="products" className="relative py-24 overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10">
          {/* Section heading */}
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-body font-medium tracking-[0.4em] uppercase text-gold mb-4">
              The Collection
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-foreground mb-4">
              Our Best Sellers
            </h2>
            <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
          </motion.div>

          {/* 4-column product grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onAddToCart={onAddToCart}
                onBuyNow={(p) => setCheckoutProduct(p)}
              />
            ))}
          </div>

          {/* View All */}
          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a
              href="#products"
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
