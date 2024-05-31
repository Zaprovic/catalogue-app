import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";

const CategoryList = async () => {
  const categories = await db.select().from(CategoryTable).all();

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>{category.name}</li>
      ))}
    </ul>
  );
};

export default CategoryList;
