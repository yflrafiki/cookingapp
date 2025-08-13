
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Action } from "@/types";
import { cn } from "@/lib/utils";

export default function ActionCard({ title, icon: Icon, backgroundColor, href }: Action) {
  return (
    <Link href={href}>
      <Card className={cn("group overflow-hidden transition-transform hover:scale-105 hover:shadow-lg h-full", backgroundColor)}>
        <CardContent className="flex flex-col items-center justify-center p-6 gap-3 text-center">
          <Icon className="h-8 w-8 text-foreground" />
          <h3 className="text-md font-semibold text-foreground">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
