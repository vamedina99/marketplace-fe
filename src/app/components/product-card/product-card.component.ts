import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  constructor(private router: Router) {}

  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

  viewProduct(): void {
    this.router.navigate(['/product', this.product.id]);
  }

  // Generate stars array based on rating
  get stars(): number[] {
    const fullStars = Math.floor(this.product.rating);
    const hasHalfStar = this.product.rating % 1 >= 0.5;
    
    const starsArray = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(1);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      starsArray.push(0.5);
    }
    
    // Add empty stars
    while (starsArray.length < 5) {
      starsArray.push(0);
    }
    
    return starsArray;
  }
}