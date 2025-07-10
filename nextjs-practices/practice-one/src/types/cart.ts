export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

type AddPayload = {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  quantity?: number;
};

type UpdatePayload = { id: string; quantity: number };

export type CartActionPayload =
  | { type: 'add'; payload: AddPayload }
  | { type: 'remove'; payload: string }
  | { type: 'update'; payload: UpdatePayload }
  | { type: 'applyCoupon'; payload: string };
