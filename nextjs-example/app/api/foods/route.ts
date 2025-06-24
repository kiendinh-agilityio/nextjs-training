import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const GET = async (request: Request) => {
  try {
    const filePath = path.join(process.cwd(), "db.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let foods = data.foods;
    if (category) {
      foods = foods.filter((food: any) =>
        food.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    return NextResponse.json(foods);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch foods" },
      { status: 500 }
    );
  }
};
