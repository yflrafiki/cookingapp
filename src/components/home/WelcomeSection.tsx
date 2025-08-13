
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function WelcomeSection() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">
        Welcome,
        <br/>
        What would you like to cook?
      </h1>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for recipes, ingredients, or chefs..."
          className="w-full rounded-md bg-secondary pl-10 pr-4 py-5 text-base"
        />
      </div>
    </section>
  );
}
