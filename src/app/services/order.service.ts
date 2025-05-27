import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Order, OrderToSend } from '../models/order.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl;
  private orders: Order[] = [];

  constructor(private http: HttpClient) {
    // Check for orders in localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    }
  }

  createOrder(order: OrderToSend): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/transactions`, order);
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