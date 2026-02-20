import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HorizontalFeatures from "@/components/HorizontalFeatures";
import StatsBar from "@/components/StatsBar";
import ProductsSection from "@/components/ProductsSection";
import InteractiveDemo from "@/components/InteractiveDemo";
import ExperienceSection from "@/components/ExperienceSection";
import ReviewsSection from "@/components/ReviewsSection";
import FinalCTA from "@/components/FinalCTA";
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
      
      <LoadingScreen />
      <Navbar cartCount={cartCount} />
      <HeroSection />
      <MarqueeStrip />
      <ProblemSection />
      <SolutionSection />
      <HorizontalFeatures />
      <StatsBar />
      <ProductsSection onAddToCart={handleAddToCart} />
      <InteractiveDemo />
      <ExperienceSection />
      <ReviewsSection />
      <FinalCTA />
      <FooterSection />
    </div>
  );
};

export default Index;
