"use client";

import { useCartStore, calculateCartTotal } from "../store/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useState,
  useOptimistic,
  useActionState,
  startTransition,
} from "react";
import { applyCouponAction } from "../actions/food-actions";
import Image from "next/image";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
}

const CartItem = ({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}: CartItemProps) => (
  <div className="flex items-center gap-4">
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
      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
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

export const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  // useActionState cho apply coupon
  const [couponState, dispatchApplyCoupon, isPending] = useActionState(
    applyCouponAction,
    { success: false, discount: 0, error: null }
  );

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

  const handleApplyCoupon = () => {
    startTransition(() => {
      dispatchApplyCoupon(couponCode);
    });
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      updateOptimisticItems({ type: "remove", id });

      removeItem(id);
    } else {
      updateOptimisticItems({ type: "update", id, quantity: newQuantity });

      updateQuantity(id, newQuantity);
    }
  };

  const handleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCouponCode(e.target.value);

  const handleRemoveItem = (id: string) => {
    updateOptimisticItems({ type: "remove", id });

    removeItem(id);
  };

  const handleClearCart = () => clearCart();

  const createQuantityHandlers = (id: string, quantity: number) => {
    return {
      onDecrease: () => handleQuantityChange(id, quantity - 1),

      onIncrease: () => handleQuantityChange(id, quantity + 1),

      onRemove: () => handleRemoveItem(id),
    };
  };

  const renderCartItems = () => {
    return optimisticItems.map((item) => {
      const handlers = createQuantityHandlers(item.id, item.quantity);

      return <CartItem key={item.id} item={item} {...handlers} />;
    });
  };

  const optimisticTotal = calculateCartTotal(optimisticItems);

  const finalTotal = optimisticTotal - (couponState.discount || 0);

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
            <div className="space-y-4">{renderCartItems()}</div>
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
                  {isPending ? "Applying..." : "Apply"}
                </Button>
              </div>
              {couponState.error && (
                <div className="text-red-500 text-sm mt-1">
                  {couponState.error}
                </div>
              )}
              {couponState.success && couponState.discount > 0 && (
                <div className="text-green-600 text-sm mt-1">
                  Coupon applied! Discount: -${couponState.discount.toFixed(2)}
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${optimisticTotal.toFixed(2)}</span>
                </div>
                {couponState.discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount:</span>
                    <span>-${couponState.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
