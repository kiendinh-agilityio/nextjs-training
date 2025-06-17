"use server";

import { revalidatePath } from "next/cache";
import { Food, Order } from "../types";

export const getFoods = async (): Promise<Food[]> => {
  const response = await fetch("http://localhost:3000/api/foods", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch foods");
  }
  return response.json();
};

export const getFoodById = async (id: string): Promise<Food> => {
  const response = await fetch(`http://localhost:3000/api/foods/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch food");
  }
  return response.json();
};

export const placeOrder = async (order: Omit<Order, "id" | "createdAt">) => {
  try {
    const response = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...order,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to place order");
    }

    revalidatePath("/foods");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to place order" };
  }
};

export const applyCoupon = async (code: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/coupons/${code}`);
    if (!response.ok) {
      throw new Error("Invalid coupon code");
    }
    const data = await response.json();
    return { success: true, discount: data.discount };
  } catch (error) {
    return { success: false, error: "Invalid coupon code" };
  }
};
