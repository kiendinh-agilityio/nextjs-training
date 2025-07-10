import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  subTotal: number;
  discount: number;
  total: number;
  addItem: (item: CartItem) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartProps>((set) => ({
  items: [],
  subTotal: 0,
  discount: 0,
  total: 0,
  addItem: (item) => {
    set((state) => {
      const items = [...state.items, item];
      const subTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const discount = 0;
      const total = subTotal - discount;
      return { items, subTotal, discount, total };
    });
  },

  clearCart: () => set({ items: [], subTotal: 0, discount: 0, total: 0 }),
}));
