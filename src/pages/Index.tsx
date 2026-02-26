import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import SolutionSection from "@/components/SolutionSection";
import RamzanBanner from "@/components/RamzanBanner";
import ProductShowcase from "@/components/ProductShowcase";
import StatsBar from "@/components/StatsBar";
import ProductsSection from "@/components/ProductsSection";
import BestSellerSection from "@/components/BestSellerSection";
import ReviewsSection from "@/components/ReviewsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyBar from "@/components/MobileStickyBar";
import AIChatbot from "@/components/AIChatbot";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import { toast } from "sonner";

// Product info for cart (matches ProductsSection data)
import productSerum from "@/assets/product-serum-new.png";
import productHairOil from "@/assets/product-hairoil-premium.jpg";
import productShampoo from "@/assets/product-shampoo-premium.jpg";
import productSoap from "@/assets/product-soap-new.png";
import productConditioner from "@/assets/product-conditioner.png";
import productNew1 from "@/assets/product-new-botanical.png";
import productNew2 from "@/assets/product-new-herbal.png";

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
      <LoadingScreen />
      <AnnouncementBar />
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <HeroSection />
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
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default Index;
