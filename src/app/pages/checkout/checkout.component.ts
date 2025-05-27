import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../models/cart-item.model';
import { CustomerInfo, Order, OrderToSend, PaymentInfo } from '../../models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [OrderService],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;

  customerForm!: FormGroup;
  paymentForm!: FormGroup;

  currentStep = 1;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.initForms();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      if (items.length === 0) {
        // Redirect to cart if empty
        this.router.navigate(['/cart']);
        return;
      }

      this.cartItems = items;
    });

    this.cartService.getCartTotal().subscribe(total => {
      this.cartTotal = total;
    });
  }

  initForms(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardHolder: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.customerForm.valid) {
      this.currentStep = 2;
      window.scrollTo(0, 0);
    }
  }

  prevStep(): void {
    if (this.currentStep === 2) {
      this.currentStep = 1;
      window.scrollTo(0, 0);
    }
  }

  onSubmit(): void {
    if (this.customerForm.invalid || this.paymentForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const customerInfo: CustomerInfo = this.customerForm.value;
    const paymentInfo: PaymentInfo = this.paymentForm.value;

    const order: Order = {
      amount: this.cartTotal,
      type: 'payment',
      description: 'Payment for order',
      userId: '1234567890',
      userIp: '12.12.12.12',
      sourceAccount: '12345',
      destinationAccount: '67890',
      status: 'pending',
      referenceNumber: 'REF123',
      paymentMethod: 'card',
      currency: 'COP',
      items: this.cartItems,
      total: this.cartTotal,
      date: new Date(),
      customer: customerInfo,
      payment: paymentInfo
    };

    this.orderService.createOrder(order).subscribe({
      next: (createdOrder) => {
        console.log('Order created:', createdOrder);
        this.cartService.clearCart();
        this.router.navigate(['/order-confirmation'], {
          state: { orderId: createdOrder.id }
        });
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.isSubmitting = false;
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }

  getItemTotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }
}