import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import SolutionSection from "@/components/SolutionSection";
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
import { toast } from "sonner";

const Index = () => {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (id: number) => {
    setCartCount((c) => c + 1);
    toast.success("Added to cart", {
      description: "Your item has been added successfully.",
      style: {
        background: "hsl(var(--secondary))",
        border: "1px solid hsl(var(--gold) / 0.2)",
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
      <TrustSection />
      <MarqueeStrip />
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
      <MobileStickyBar />
    </div>
  );
};

export default Index;
