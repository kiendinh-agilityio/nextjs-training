import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const POST = async (request: Request) => {
  try {
    const order = await request.json();
    const filePath = path.join(process.cwd(), "db.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    if (!data.orders) {
      data.orders = [];
    }

    data.orders.push(order);

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
};
