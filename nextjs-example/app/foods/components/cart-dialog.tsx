"use client";

import { Cart } from "./cart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useCartStore } from "../store/cart-store";

export function CartDialog() {
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="relative p-2 bg-green-600 rounded-md focus:outline-none">
          <Image src="/foods/cart-icon.svg" alt="Cart" width={24} height={24} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Your Shopping Cart</DialogTitle>
        </DialogHeader>
        <Cart />
      </DialogContent>
    </Dialog>
  );
}
