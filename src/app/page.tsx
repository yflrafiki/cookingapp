
import WelcomeSection from "@/components/home/WelcomeSection";
import ActionGrid from "@/components/home/ActionGrid";
import OnboardingOverlay from "@/components/onboarding/OnboardingOverlay";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex h-full flex-col gap-8 md:gap-12 px-4 py-4">
      <WelcomeSection />
      <Separator />
      <ActionGrid />
      <OnboardingOverlay />
    </div>
  );
}
