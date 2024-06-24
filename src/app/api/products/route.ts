import { db } from "@/db/main";
import { ProductCategoryTable, ProductTable } from "@/db/schema";
import { InsertProductSchema } from "@/schemas/product";
import { asc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const categoryId = searchParams.get("categoryId");

  if (categoryId) {
    const productsFilteredByCategory = await db
      .select({
        productId: ProductCategoryTable.productId,
        categoryId: ProductCategoryTable.categoryId,
        title: ProductTable.title,
        description: ProductTable.description,
        price: ProductTable.price,
        brand: ProductTable.brand,
        image: ProductTable.image,
        userId: ProductTable.userId,
        discountPercentage: ProductTable.discountPercentage,
      })
      .from(ProductCategoryTable)
      .innerJoin(
        ProductTable,
        eq(ProductTable.id, ProductCategoryTable.productId),
      )
      .where(eq(ProductCategoryTable.categoryId, Number(categoryId)))
      .orderBy(asc(ProductTable.title));

    return NextResponse.json(
      productsFilteredByCategory.map((p) => ({
        title: p.title,
        productId: p.productId,
        description: p.description,
        brand: p.brand,
        image: p.image,
        discountPercentage: p.discountPercentage,
        userId: p.userId,
        price: p.price,
      })),
    );
  } else {
    const products = await db
      .select()
      .from(ProductTable)
      .orderBy(asc(ProductTable.title));
    return NextResponse.json(products);
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const result = await InsertProductSchema.safeParseAsync(data);

    if (!result.success) {
      return new Response("Invalid data", { status: 400 });
    }

    await db.insert(ProductTable).values(result.data);

    return NextResponse.json(result.data);
  } catch (error) {
    return new Response("Invalid data", { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const data = await req.json();
}
