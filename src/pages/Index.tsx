import { useState, lazy, Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyBar from "@/components/MobileStickyBar";
import CheckoutModal from "@/components/CheckoutModal";

// Lazy load below-the-fold sections for faster initial load
const TrustSection = lazy(() => import("@/components/TrustSection"));
const MarqueeStrip = lazy(() => import("@/components/MarqueeStrip"));
const SolutionSection = lazy(() => import("@/components/SolutionSection"));
const RamzanBanner = lazy(() => import("@/components/RamzanBanner"));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase"));
const StatsBar = lazy(() => import("@/components/StatsBar"));
const ProductsSection = lazy(() => import("@/components/ProductsSection"));
const BestSellerSection = lazy(() => import("@/components/BestSellerSection"));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const FooterSection = lazy(() => import("@/components/FooterSection"));
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

const productMap: Record<number, { name: string; price: number; priceDisplay: string; image: string }> = {
  1: { name: "Botanic Shield Serum", price: 1550, priceDisplay: "Rs.1,550", image: productSerum },
  2: { name: "Hair Healer Oil", price: 750, priceDisplay: "Rs.750", image: productHairOil },
  3: { name: "Herbal Shampoo", price: 750, priceDisplay: "Rs.750", image: productShampoo },
  4: { name: "Herbal Soap", price: 650, priceDisplay: "Rs.650", image: productSoap },
  5: { name: "Velvet Ritual Conditioner", price: 850, priceDisplay: "Rs.850", image: productConditioner },
  6: { name: "All-in-One Serum", price: 1500, priceDisplay: "Rs.1,500", image: productNew1 },
  7: { name: "Eco-Xent Cleaning Soap", price: 700, priceDisplay: "Rs.700", image: productNew2 },
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

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Eco-Xent",
            url: "https://eco-xent.lovable.app",
            logo: "https://eco-xent.lovable.app/favicon.ico",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+92-329-5991062",
              contactType: "customer service",
              availableLanguage: ["English", "Urdu"],
            },
            sameAs: [
              "https://www.facebook.com/share/1Bx4wMoGHi/",
              "https://www.instagram.com/eco_xent",
              "https://www.tiktok.com/@eco_xent",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Eco-Xent Products",
            itemListElement: Object.values(productMap).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Product",
                name: p.name,
                offers: {
                  "@type": "Offer",
                  priceCurrency: "PKR",
                  price: p.price,
                  availability: "https://schema.org/InStock",
                },
              },
            })),
          }),
        }}
      />
      <LoadingScreen />
      <AnnouncementBar />
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <HeroSection />
      <Suspense fallback={<div className="h-20" />}>
        <TrustSection />
        <MarqueeStrip />
        <RamzanBanner />
        <ProductsSection onAddToCart={handleAddToCart} />
        <BestSellerSection />
        <ReviewsSection />
        <StatsBar />
        <SolutionSection />
        <ProductShowcase />
        <ExperienceSection />
        <AboutSection />
        <FAQSection />
        <FinalCTA />
        <FooterSection />
        <WhatsAppButton />
        <AIChatbot />
        <MobileStickyBar />
      </Suspense>
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
