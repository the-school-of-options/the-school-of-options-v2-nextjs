import { LightHeroSection } from "./_components/LightHeroSection";
import { LightWhatYouLearn } from "./_components/LightWhatYouLearn";
import { LightInstructor } from "./_components/LightInstructor";
import { RegistrationSection } from "./_components/RegistrationSection";
import { WhyAttendSection } from "./_components/WhyAttendSection";
import { StickyCtaBar } from "./_components/StickyCtaBar";
import { FAQSection } from "./_components/FAQSection";
import { TopTickerBar } from "./_components/TopTickerBar";
import { WorkshopFooter } from "./_components/WorkshopFooter";
import { PreFooterSummary } from "./_components/PreFooterSummary";

export default function WorkshopPage() {
  return (
    <div className="min-h-screen bg-white workshop-light">
      <TopTickerBar />
      {/* Main Content */}
      <LightHeroSection />
      <LightWhatYouLearn />
      <LightInstructor />
      <WhyAttendSection />
      <RegistrationSection />
      <FAQSection />
      
      {/* Sticky CTA for mobile */}
      <StickyCtaBar />
      <PreFooterSummary />
      <WorkshopFooter />
    </div>
  );
}
