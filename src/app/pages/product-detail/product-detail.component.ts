import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  quantity = 1;
  isLoading = true;
  showAddedToCartMessage = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe(product => {
      if (product) {
        this.product = product;
      } else {
        this.router.navigate(['/']);
      }
      this.isLoading = false;
    });
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  addToCart(): void {
    if (this.product && this.product.inStock) {
      this.cartService.addToCart(this.product, this.quantity);
      this.showAddedToCartMessage = true;
      
      setTimeout(() => {
        this.showAddedToCartMessage = false;
      }, 3000);
    }
  }

  // Generate stars array based on rating
  get stars(): number[] {
    if (!this.product) return [];
    
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