import { NextResponse } from "next/server";
import { products } from "@/app/lib/products-data";

// GET handler for specific product
export const GET = async (
  request: Request,
  context: { params: { id: string } }
) => {
  const resolvedParams = await Promise.resolve(context.params);
  const id = parseInt(resolvedParams.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
};

// PUT handler to update a product
export const PUT = async (
  request: Request,
  context: { params: { id: string } }
) => {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const id = parseInt(resolvedParams.id);
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const body = await request.json();

    // Validate request body
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    // Update product
    products[productIndex] = {
      ...products[productIndex],
      name: body.name,
      price: body.price,
    };

    return NextResponse.json(products[productIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

// DELETE handler to remove a product
export const DELETE = async (
  request: Request,
  context: { params: { id: string } }
) => {
  const resolvedParams = await Promise.resolve(context.params);
  const id = parseInt(resolvedParams.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // Remove product
  products.splice(productIndex, 1);

  return NextResponse.json(
    { message: "Product deleted successfully" },
    { status: 200 }
  );
};
