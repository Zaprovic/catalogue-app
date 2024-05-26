import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { InsertProductSchema } from "@/schemas/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const products = await db.select().from(ProductTable).all();
  return NextResponse.json(products);

  // task: Check what was this being used for before ⬇️

  // const url = new URL(req.url);
  // const categoryId = url.searchParams.get("categoryId");

  // try {
  //   const allProducts = await db
  //     .select({
  //       productId: ProductTable.id,
  //       categoryId: ProductCategoryTable.categoryId,
  //       productName: ProductTable.title,
  //       categoryName: CategoryTable.name,
  //       productDescription: ProductTable.description,
  //       productPrice: ProductTable.price,
  //       productImage: ProductTable.image,
  //       userId: ProductTable.userId,
  //     })
  //     .from(ProductCategoryTable)
  //     .innerJoin(
  //       ProductTable,
  //       eq(ProductTable.id, ProductCategoryTable.productId),
  //     )
  //     .innerJoin(
  //       CategoryTable,
  //       eq(CategoryTable.id, ProductCategoryTable.categoryId),
  //     );

  //   if (categoryId) {
  //     const filteredProducts = allProducts.filter(
  //       (product) => product.categoryId === +categoryId,
  //     );
  //     return NextResponse.json(filteredProducts);
  //   } else {
  //     return NextResponse.json(allProducts);
  //   }
  // } catch (error) {
  //   if (error instanceof Error) {
  //     console.error(error.message);
  //     return new Response("Internal Server Error", { status: 500 });
  //   }
  // }
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
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
