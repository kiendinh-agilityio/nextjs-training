import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/cart';

interface CartProps {
  items: CartItem[];
  subTotal: number;
  discount: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartProps>()(
  persist(
    (set) => ({
      items: [],
      subTotal: 0,
      discount: 0,
      total: 0,
      addItem: (item) => {
        set((state) => {
          const exist = state.items.find((i) => i.id === item.id);

          let items;

          if (exist) {
            items = state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
            );
          } else {
            items = [...state.items, { ...item, quantity: 1 }];
          }

          const subTotal = items.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0,
          );

          const discount = 0;

          const total = subTotal - discount;

          return { items, subTotal, discount, total };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const items = state.items.filter((i) => i.id !== id);

          const subTotal = items.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0,
          );

          const discount = 0;

          const total = subTotal - discount;

          return { items, subTotal, discount, total };
        });
      },
      updateQuantity: (id, quantity) => {
        set((state) => {
          const items = state.items
            .map((i) => (i.id === id ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0);

          const subTotal = items.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0,
          );

          const discount = 0;

          const total = subTotal - discount;

          return { items, subTotal, discount, total };
        });
      },
      clearCart: () => set({ items: [], subTotal: 0, discount: 0, total: 0 }),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        subTotal: state.subTotal,
        discount: state.discount,
        total: state.total,
      }),
    },
  ),
);
