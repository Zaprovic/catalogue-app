import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allProducts = await db.select().from(ProductTable).all();
    revalidateTag("products");

    return NextResponse.json(allProducts);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
}
