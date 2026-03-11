import { useState, lazy, Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyBar from "@/components/MobileStickyBar";
import CheckoutModal from "@/components/CheckoutModal";
import TrustSection from "@/components/TrustSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import ProductsSection from "@/components/ProductsSection";
import BestSellerSection from "@/components/BestSellerSection";
import ReviewsSection from "@/components/ReviewsSection";
import StatsBar from "@/components/StatsBar";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";

// Lazy load non-critical sections
const SolutionSection = lazy(() => import("@/components/SolutionSection"));
const RamzanBanner = lazy(() => import("@/components/RamzanBanner"));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const AIChatbot = lazy(() => import("@/components/AIChatbot"));

import { toast } from "sonner";

// Product info for cart (matches ProductsSection data)
import productSerum from "@/assets/product-serum-with-ingredients.jpg";
import productHairOil from "@/assets/product-hairoil-with-ingredients.jpg";
import productShampoo from "@/assets/product-shampoo-with-ingredients.jpg";
import productSoap from "@/assets/product-soap-with-box.png";
import productConditioner from "@/assets/product-conditioner-with-ingredients.jpg";
import productNew1 from "@/assets/product-new-botanical-with-ingredients.jpg";
import productNew2 from "@/assets/product-cleaning-soap-updated.jpg";
import productHairSerum from "@/assets/product-hair-serum-new.jpg";

const productMap: Record<number, { name: string; price: number; priceDisplay: string; image: string }> = {
  1: { name: "Botanic Shield Serum", price: 1550, priceDisplay: "Rs.1,550", image: productSerum },
  2: { name: "Hair Healer Oil", price: 750, priceDisplay: "Rs.750", image: productHairOil },
  3: { name: "Herbal Shampoo", price: 750, priceDisplay: "Rs.750", image: productShampoo },
  4: { name: "Herbal Soap", price: 1200, priceDisplay: "Rs.1,200", image: productSoap },
  5: { name: "Velvet Ritual Conditioner", price: 850, priceDisplay: "Rs.850", image: productConditioner },
  6: { name: "All-in-One Serum", price: 1500, priceDisplay: "Rs.1,500", image: productNew1 },
  7: { name: "Eco-Xent Cleaning Soap", price: 700, priceDisplay: "Rs.700", image: productNew2 },
  8: { name: "Hair Living Serum", price: 1200, priceDisplay: "Rs.1,200", image: productHairSerum },
};

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCheckoutOpen, setCartCheckoutOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (id: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const info = productMap[id];
      if (!info) return prev;
      return [...prev, { id, ...info, quantity: 1 }];
    });
    setCartOpen(true);
    toast.success("Added to cart", {
      description: "Your item has been added successfully.",
      style: {
        background: "hsl(var(--secondary))",
        border: "1px solid hsl(var(--gold) / 0.2)",
        color: "hsl(var(--foreground))",
      },
    });
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content — accessibility */}
      <a
        href="#products"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-body focus:font-semibold"
      >
        Skip to Products
      </a>

      {/* JSON-LD: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Eco-Xent",
            url: "https://www.ecoxent.com",
            logo: "https://www.ecoxent.com/favicon.png",
            description: "Pakistan's trusted organic herbal wellness brand offering 100% natural personal care products including hair oil, shampoo, soap, serum and conditioner.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+92-329-5991062",
              contactType: "customer service",
              availableLanguage: ["English", "Urdu"],
              areaServed: "PK",
            },
            sameAs: [
              "https://www.facebook.com/share/1Bx4wMoGHi/",
              "https://www.instagram.com/eco_xent",
              "https://www.tiktok.com/@eco_xent",
              "https://youtube.com/@ecoxent",
              "https://x.com/eco_xent",
            ],
          }),
        }}
      />
      {/* JSON-LD: Product List */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Eco-Xent Organic Herbal Products",
            description: "Complete collection of 100% natural herbal products for hair care, skincare and personal wellness.",
            itemListElement: Object.values(productMap).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Product",
                name: p.name,
                description: `${p.name} - 100% organic herbal product by Eco-Xent. Natural ingredients for hair care & skincare.`,
                image: `https://www.ecoxent.com${p.image}`,
                brand: { "@type": "Brand", name: "Eco-Xent" },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.8",
                  reviewCount: "127",
                  bestRating: "5",
                  worstRating: "1",
                },
                review: {
                  "@type": "Review",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  author: {
                    "@type": "Person",
                    name: "Eco-Xent Customer",
                  },
                  reviewBody: `Excellent quality ${p.name}. 100% organic and natural.`,
                },
                offers: {
                  "@type": "Offer",
                  priceCurrency: "PKR",
                  price: p.price,
                  priceValidUntil: "2026-12-31",
                  availability: "https://schema.org/InStock",
                  url: "https://www.ecoxent.com/#products",
                  seller: { "@type": "Organization", name: "Eco-Xent" },
                },
              },
            })),
          }),
        }}
      />
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ecoxent.com/" },
              { "@type": "ListItem", position: 2, name: "Products", item: "https://www.ecoxent.com/#products" },
              { "@type": "ListItem", position: 3, name: "About", item: "https://www.ecoxent.com/about" },
              { "@type": "ListItem", position: 4, name: "Contact", item: "https://www.ecoxent.com/#contact" },
            ],
          }),
        }}
      />
      <LoadingScreen />
      <AnnouncementBar />
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <HeroSection />
      <TrustSection />
      <MarqueeStrip />
      <Suspense fallback={null}>
        <RamzanBanner />
      </Suspense>
      <ProductsSection onAddToCart={handleAddToCart} />
      <BestSellerSection />
      <ReviewsSection />
      <StatsBar />
      <Suspense fallback={null}>
        <SolutionSection />
        <ProductShowcase />
        <ExperienceSection />
      </Suspense>
      <AboutSection />
      <FAQSection />
      <Suspense fallback={null}>
        <FinalCTA />
      </Suspense>
      <FooterSection />
      <WhatsAppButton />
      <Suspense fallback={null}>
        <AIChatbot />
      </Suspense>
      <MobileStickyBar />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
        onCheckout={() => {
          setCartOpen(false);
          setCartCheckoutOpen(true);
        }}
      />
      <Suspense fallback={null}>
        <CheckoutModal
          product={null}
          cartProducts={cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            priceDisplay: item.priceDisplay,
            quantity: item.quantity,
          }))}
          isOpen={cartCheckoutOpen}
          onClose={() => setCartCheckoutOpen(false)}
        />
      </Suspense>
    </div>
  );
};

export default Index;
