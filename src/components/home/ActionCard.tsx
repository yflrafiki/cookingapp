
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Action } from "@/types";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

export default function ActionCard({ title, icon: Icon, backgroundColor, href, borderColor, shadow }: Action) {
  const cardId = title.toLowerCase().replace(/\s+/g, '-') + '-card';
  
  return (
    <Link href={href}>
      <Card 
        id={cardId}
        className={cn("group overflow-hidden transition-transform h-full rounded-sm text-foreground py-10", backgroundColor, borderColor )}
      >
        <CardContent className="flex flex-col items-center justify-center p-1 gap-3 text-center h-full">
          <Icon className="h-8 w-8 text-white" />
          <h3 className="text-md font-semibold text-white">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
