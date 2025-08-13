import { CATEGORIES } from "@/lib/constants";
import CategoryCard from "./CategoryCard";

export default function CategoryGrid() {
  return (
    <section>
      <h2 className="text-2xl font-bold font-headline mb-4">Categories</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}
      </div>
    </section>
  );
}
