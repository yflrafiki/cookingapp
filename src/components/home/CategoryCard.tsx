
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";

export default function CategoryCard({ title, icon: Icon, backgroundColor, href }: Category) {
  return (
    <Link href={href}>
      <Card className={cn("group overflow-hidden transition-transform h-full", backgroundColor)}>
        <CardContent className="flex flex-col items-center justify-center gap-3">
          <Icon className="h-10 w-10 text-primary-foreground/80 transition-colors group-hover:text-primary-foreground" />
          <h3 className="text-[2px] font-semibold text-primary-foreground">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
