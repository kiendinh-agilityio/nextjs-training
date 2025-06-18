"use client";

import { useCartStore, calculateCartTotal } from "../store/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useTransition, useOptimistic } from "react";
import { applyCoupon } from "../actions/food-actions";
import Image from "next/image";

export const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isPending, startTransition] = useTransition();
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  // Optimistic state for cart items
  const [optimisticItems, updateOptimisticItems] = useOptimistic(
    items,
    (
      state,
      action: { type: "update" | "remove"; id: string; quantity?: number }
    ) => {
      if (action.type === "update" && action.quantity !== undefined) {
        return state.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity! } : item
        );
      } else if (action.type === "remove") {
        return state.filter((item) => item.id !== action.id);
      }
      return state;
    }
  );

  const handleApplyCoupon = async () => {
    startTransition(async () => {
      const result = await applyCoupon(couponCode);
      if (result.success) {
        setDiscount(result.discount);
      }
    });
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      updateOptimisticItems({ type: "remove", id });
      startTransition(() => removeItem(id));
    } else {
      updateOptimisticItems({ type: "update", id, quantity: newQuantity });
      startTransition(() => updateQuantity(id, newQuantity));
    }
  };

  const handleRemoveItem = (id: string) => {
    updateOptimisticItems({ type: "remove", id });
    startTransition(() => removeItem(id));
  };

  const handleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

  const handleDecreaseQuantity = (id: string, currentQuantity: number) => {
    handleQuantityChange(id, currentQuantity - 1);
  };

  const handleIncreaseQuantity = (id: string, currentQuantity: number) => {
    handleQuantityChange(id, currentQuantity + 1);
  };

  const createQuantityHandlers = (id: string, quantity: number) => {
    return {
      onDecrease: () => handleDecreaseQuantity(id, quantity),
      onIncrease: () => handleIncreaseQuantity(id, quantity),
      onRemove: () => handleRemoveItem(id),
    };
  };

  const optimisticTotal = calculateCartTotal(optimisticItems);
  const finalTotal = optimisticTotal - discount;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {optimisticItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {optimisticItems.map((item) => {
                const { onDecrease, onIncrease, onRemove } =
                  createQuantityHandlers(item.id, item.quantity);
                return (
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
                      <Button variant="outline" size="sm" onClick={onDecrease}>
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button variant="outline" size="sm" onClick={onIncrease}>
                        +
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onRemove}>
                      Remove
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={handleCouponCodeChange}
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
                  <span>${optimisticTotal.toFixed(2)}</span>
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

              <Button className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
