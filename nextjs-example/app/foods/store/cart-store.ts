import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState, Food } from "../types";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      addItem: (item: Food) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              total: state.total + item.price,
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
            total: state.total + item.price,
          };
        }),
      removeItem: (id: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          total: state.items
            .filter((item) => item.id !== id)
            .reduce((sum, item) => sum + item.price * item.quantity, 0),
        })),
      updateQuantity: (id: string, quantity: number) =>
        set((state) => {
          const items = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
          return {
            items,
            total: items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
          };
        }),
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: "food-cart",
    }
  )
);
