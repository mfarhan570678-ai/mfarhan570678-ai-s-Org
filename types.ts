
export type Role = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
  shippingAddress: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
}

export type View = 'products' | 'product_detail' | 'cart' | 'checkout' | 'order_history' | 'admin';
