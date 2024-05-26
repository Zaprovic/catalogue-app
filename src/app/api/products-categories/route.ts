import { db } from "@/db/main";
import { ProductCategoryTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const productsCategories = await db.select().from(ProductCategoryTable).all();

  return NextResponse.json(productsCategories);
}

export async function POST(request: Request) {
  const data = await request.json();

  try {
    await db.insert(ProductCategoryTable).values(data).onConflictDoNothing();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error);
    }

    return NextResponse.json({
      error: "Error posting categories and products",
    });
  }
}
