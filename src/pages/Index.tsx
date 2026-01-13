import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import IconCardsSection from "@/sections/IconCardsSection";
import ElevatedCardsSection from "@/sections/ElevatedCardsSection";
import HorizontalCardsSection from "@/sections/HorizontalCardsSection";
import StatsSection from "@/sections/StatsSection";
import KeyEnablers from "@/sections/KeyEnablers";
import GlobalMapSection from "@/sections/GlobalMapSection";
import ImpactSection from "@/sections/Impact";
import AIJourneySection from "@/sections/AIJourneySection";
import OrgChartSection from "@/sections/OrgChartSection";
import { ResearchSection } from "@/sections/R&B";
import VentoGridSection from "@/sections/VentoGridSection";
import FooterSection from "@/sections/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ElevatedCardsSection />
        
        <IconCardsSection />
         <StatsSection />
        <KeyEnablers />
        <HorizontalCardsSection />
       
        <AIJourneySection />
        <OrgChartSection />
        <GlobalMapSection />
        <ResearchSection />
        <ImpactSection />
        <VentoGridSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
