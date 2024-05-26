import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  return NextResponse.json({ id });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    await db.delete(ProductTable).where(eq(ProductTable.id, +id));
    revalidateTag("dashboard-products");
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error });
    }
    return NextResponse.json({ error: "Unknown error" });
  }
  return NextResponse.json({ id });
}
