import CategoryGrid from "@/components/home/CategoryGrid";
import WelcomeSection from "@/components/home/WelcomeSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <WelcomeSection />
      <CategoryGrid />
    </div>
  );
}
