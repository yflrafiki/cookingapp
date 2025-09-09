
import { ACTIONS } from "@/lib/constants";
import ActionCard from "./ActionCard";

export default function ActionGrid() {
  return (
    <div className="mt-auto mb-auto">
      <div className="grid grid-cols-2 gap-4">
        {ACTIONS.map((action) => (
          <ActionCard key={action.title} {...action} />
        ))}
      </div>
    </div>
  );
}
