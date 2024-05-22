import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { InsertProductSchema } from "@/schemas/product";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

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
