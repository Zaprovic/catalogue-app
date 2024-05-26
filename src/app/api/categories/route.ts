import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  //todo: check what happens with allCategories variable

  try {
    const allCategories = (await db.select().from(CategoryTable).all()).map(
      ({ id, name }) => ({
        id: name.toLowerCase(),
        name,
      }),
    );

    const categories = await db.select().from(CategoryTable).all();

    return NextResponse.json(categories);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return new Response("Internal Server Error", { status: 500 });
    }
    console.error("Unexpected error:", error); // Log unknown errors
    return new Response("Unexpected Error", { status: 500 });
  }
}
