"use server";

import { revalidatePath } from "next/cache";
import { Food, Order, CouponState } from "../types";

export const getFoods = async (category?: string): Promise<Food[]> => {
  let url = "http://localhost:3000/api/foods";
  if (category) {
    url += `?category=${encodeURIComponent(category)}`;
  }
  const response = await fetch(url, {
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

// Action function cho useActionState
export const applyCouponAction = async (
  prevState: CouponState,
  code: string
) => {
  try {
    const result = await applyCoupon(code);
    if (result.success) {
      return { success: true, discount: result.discount, error: null };
    } else {
      return {
        success: false,
        discount: 0,
        error: result.error || "Invalid coupon code",
      };
    }
  } catch (e) {
    return { success: false, discount: 0, error: "An error occurred!" };
  }
};
