export interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  ingredients: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface CartItem extends Food {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: Food) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
  coupon?: string;
}

export interface CouponState {
  success: boolean;
  discount: number;
  error: string | null;
}
