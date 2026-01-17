export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  rating?: string;
  ingredients?: string[];
}
