import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount$!: Observable<number>;
  isNavOpen = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartCount$ = this.cartService.getCartItemCount();
  }

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isNavOpen = false;
  }
}