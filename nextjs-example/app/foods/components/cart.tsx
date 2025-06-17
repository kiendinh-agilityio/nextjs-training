"use client";

import { useCartStore } from "../store/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { applyCoupon } from "../actions/food-actions";
import Image from "next/image";

export const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isPending, startTransition] = useTransition();
  const { items, total, removeItem, updateQuantity, clearCart } =
    useCartStore();

  const handleApplyCoupon = async () => {
    startTransition(async () => {
      const result = await applyCoupon(couponCode);
      if (result.success) {
        setDiscount(result.discount);
      }
    });
  };

  const finalTotal = total - discount;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(0, item.quantity - 1))
                      }
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button
                  onClick={handleApplyCoupon}
                  disabled={isPending || !couponCode}
                >
                  Apply
                </Button>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount:</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full" onClick={() => clearCart()}>
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
