
import WelcomeSection from "@/components/home/WelcomeSection";
import ActionGrid from "@/components/home/ActionGrid";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <WelcomeSection />
      <Separator />
      <ActionGrid />
    </div>
  );
}
