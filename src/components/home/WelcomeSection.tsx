
import { Mic } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function WelcomeSection() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">
        Welcome,
        <br/>
        What would you like to cook?
      </h1>
      <div className="relative">
        <Textarea
          placeholder="Tell me what you have and I'll show you what to cook"
          className="w-full rounded-md bg-[#FFFEFE] pr-10 pl-4 py-3 text-base resize-none h-24"
        />
        <Mic className="absolute left-3 bottom-3 h-5 w-5 text-muted-foreground" />
      </div>
    </section>
  );
}
