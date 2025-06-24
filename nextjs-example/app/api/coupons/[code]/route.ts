import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const GET = async (
  request: Request,
  context: { params: { code: string } }
) => {
  try {
    const filePath = path.join(process.cwd(), "db.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    const { code } = await context.params;
    const coupon = data.coupons.find((c: any) => c.code === code);

    if (!coupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json(coupon);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch coupon" },
      { status: 500 }
    );
  }
};
