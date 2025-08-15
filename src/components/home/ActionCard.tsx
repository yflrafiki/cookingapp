
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Action } from "@/types";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

export default function ActionCard({ title, icon: Icon, backgroundColor, href, borderColor, shadow }: Action) {
  return (
    <Link href={href}>
      <Card className={cn("group overflow-hidden transition-transform hover:scale-105 hover:shadow-lg h-full text-white mt-12 ", backgroundColor, borderColor, shadow )}>
        <CardContent className="flex flex-col items-center justify-center p-6 gap-3 text-center">
          <Icon className="h-8 w-8" />
          <h3 className="text-md font-semibold">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
