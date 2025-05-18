import { CartItem } from './cart-item.model';

export interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  id?: string;
  items: CartItem[];
  total: number;
  date: Date;
  customer: CustomerInfo;
  payment: PaymentInfo;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}