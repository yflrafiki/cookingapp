
import WelcomeSection from "@/components/home/WelcomeSection";
import ActionGrid from "@/components/home/ActionGrid";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <WelcomeSection />
      <ActionGrid />
    </div>
  );
}
