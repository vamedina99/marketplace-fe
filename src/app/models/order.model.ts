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
  amount: number;
  type: string;
  description: string;
  sourceAccount: string;
  destinationAccount: string;
  userId: string;
  userIp: string;
  referenceNumber: string;
  paymentMethod: string;
  currency: string;
}

export interface OrderToSend {
  amount: number;
  type: string;
  description: string;
  userId: string;
  userIp: string;
  sourceAccount: string;
  destinationAccount: string;
  status: string;
  referenceNumber: string;
  paymentMethod: string;
  currency: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}