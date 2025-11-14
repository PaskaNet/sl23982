export interface Product {
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}