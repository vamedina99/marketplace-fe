import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  order?: Order;
  orderId?: string;

  constructor(
    private router: Router,
    private orderService: OrderService
  ) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      console.log('navigation?.extras.state',  navigation?.extras.state)
      this.orderId = navigation.extras.state['orderId'];
    }
  }

  ngOnInit(): void {
    if (!this.orderId) {
      this.router.navigate(['/']);
      return;
    }

    this.orderService.getOrderById(this.orderId).subscribe(order => {
      if (order) {
        this.order = order;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  getOrderDate(): string {
    if (!this.order) return '';

    const date = new Date(this.order.date);
    return date.toLocaleDateString();
  }

  getEstimatedDelivery(): string {
    if (!this.order) return '';

    const date = new Date(this.order.date);
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString();
  }
}