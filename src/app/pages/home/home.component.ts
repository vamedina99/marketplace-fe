import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory = 'All';
  searchQuery = '';
  isLoading = true;
  showAddedToCartMessage = false;
  addedProductName = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.filterProductsByCategory(this.selectedCategory);
      } else {
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.isLoading = false;
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filterProductsByCategory(category);
  }

  filterProductsByCategory(category: string): void {
    this.isLoading = true;
    this.productService.filterByCategory(category).subscribe(products => {
      this.products = products;
      this.isLoading = false;
    });
  }

  searchProducts(): void {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      this.productService.searchProducts(this.searchQuery).subscribe(products => {
        this.products = products;
        this.isLoading = false;
      });
    } else {
      this.filterProductsByCategory(this.selectedCategory);
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.addedProductName = product.name;
    this.showAddedToCartMessage = true;
    
    setTimeout(() => {
      this.showAddedToCartMessage = false;
    }, 3000);
  }

  onSearchInputChange(): void {
    // Debounce search to avoid too many requests
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchProducts();
    }, 300);
  }

  private searchTimeout: any;
}