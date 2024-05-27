import { db } from "@/db/main";
import { ProductTable } from "@/db/schema";
import { UpdateProductSchema } from "@/schemas/product";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const product = await db
      .select()
      .from(ProductTable)
      .where(eq(ProductTable.id, +id));

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error });
    }
  }
  return NextResponse.json({ id });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const { id } = params;

  try {
    const result = await UpdateProductSchema.safeParseAsync(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues });
    }
    await db
      .update(ProductTable)
      .set(result.data)
      .where(eq(ProductTable.id, +id));

    revalidatePath("/dashboard");
    return NextResponse.json(body);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error });
    }
    return NextResponse.json({ error: "Unknown error" });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    await db.delete(ProductTable).where(eq(ProductTable.id, +id));
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error });
    }
    return NextResponse.json({ error: "Unknown error" });
  }
  return NextResponse.json({ id });
}
