import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];

  constructor() {
    // Check for orders in localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    }
  }

  createOrder(order: Order): Observable<Order> {
    // Generate a simple order ID
    order.id = Date.now().toString();
    order.date = new Date();
    order.status = 'pending';
    
    this.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(this.orders));
    
    return of(order);
  }

  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  getOrderById(id: string): Observable<Order | undefined> {
    const order = this.orders.find(o => o.id === id);
    return of(order);
  }

  updateOrderStatus(id: string, status: 'pending' | 'processing' | 'completed' | 'cancelled'): Observable<boolean> {
    const orderIndex = this.orders.findIndex(o => o.id === id);
    
    if (orderIndex !== -1) {
      this.orders[orderIndex].status = status;
      localStorage.setItem('orders', JSON.stringify(this.orders));
      return of(true);
    }
    
    return of(false);
  }
}