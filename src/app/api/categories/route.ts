import { db } from "@/db/main";
import { CategoryTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allCategories = (await db.select().from(CategoryTable).all()).map(
      ({ id, name }) => ({
        id: name.toLowerCase(),
        name,
      }),
    );

    return NextResponse.json(allCategories);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
}
