import { NextResponse } from "next/server";
import { products } from "@/app/lib/products-data";

// GET handler
export const GET = async () => NextResponse.json({ products });

// POST handler
export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    // Validate request body
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    // Create new product
    const newProduct = {
      id: products.length + 1,
      name: body.name,
      price: body.price,
    };

    // In a real application, you would save this to a database
    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
