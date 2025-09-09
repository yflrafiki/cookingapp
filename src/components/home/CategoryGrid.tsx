
import { CATEGORIES } from "@/lib/constants";
import CategoryCard from "./CategoryCard";

export default function CategoryGrid() {
  return (
    <section >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}
      </div>
    </section>
  );
}
