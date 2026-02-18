import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import ProductsSection from "@/components/ProductsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ReviewsSection from "@/components/ReviewsSection";
import CTABanner from "@/components/CTABanner";
import FooterSection from "@/components/FooterSection";
import { toast } from "sonner";

const Index = () => {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (id: number) => {
    setCartCount((c) => c + 1);
    toast.success("Added to cart", {
      description: "Your item has been added successfully.",
      style: {
        background: "hsl(160 50% 8%)",
        border: "1px solid hsl(43 50% 55% / 0.2)",
        color: "hsl(40 20% 90%)",
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <LoadingScreen />
      <Navbar cartCount={cartCount} />
      <HeroSection />
      <MarqueeStrip />
      <ProductsSection onAddToCart={handleAddToCart} />
      <ExperienceSection />
      <ReviewsSection />
      <CTABanner />
      <FooterSection />
    </div>
  );
};

export default Index;
