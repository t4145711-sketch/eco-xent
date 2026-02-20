import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import AnnouncementBar from "@/components/AnnouncementBar";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HorizontalFeatures from "@/components/HorizontalFeatures";
import StatsBar from "@/components/StatsBar";
import ProductsSection from "@/components/ProductsSection";

import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { toast } from "sonner";

const Index = () => {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (id: number) => {
    setCartCount((c) => c + 1);
    toast.success("Added to cart", {
      description: "Your item has been added successfully.",
      style: {
        background: "hsl(var(--secondary))",
        border: "1px solid hsl(var(--primary) / 0.2)",
        color: "hsl(var(--foreground))",
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen />
      <AnnouncementBar />
      <Navbar cartCount={cartCount} />
      <HeroSection />
      <MarqueeStrip />
      <ProblemSection />
      <SolutionSection />
      <HorizontalFeatures />
      <StatsBar />
      <ProductsSection onAddToCart={handleAddToCart} />
      
      <ExperienceSection />
      <AboutSection />
      <ReviewsSection />
      <FAQSection />
      <FinalCTA />
      <FooterSection />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
