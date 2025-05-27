import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Pan de Bono Rescatado',
      description: 'Pan de bono fresco del día, recuperado de El Kiosko’ Ya. Ideal para el desayuno.',
      price: 4000,
      imageUrl: '/assets/images/pandebono.png',
      category: 'Panadería',
      inStock: true,
      rating: 4.8,
      features: ['Hecho con queso costeño', 'Producto del día', 'Sin conservantes', 'Origen local']
    },
    {
      id: 2,
      name: 'Croissant de Chocolate',
      description: 'Croissant artesanal con relleno de chocolate, recuperado de Juan Valdez.',
      price: 6500,
      imageUrl: '/assets/images/croissant.jpg',
      category: 'Repostería',
      inStock: true,
      rating: 4.6,
      features: ['Relleno de chocolate', 'Masa hojaldrada', 'Producto de cafetería', 'Rescatado del desperdicio']
    },
    {
      id: 3,
      name: 'Arepa de Chócolo Empacada',
      description: 'Arepa dulce de chócolo empacada al vacío, rescatada de Sary.',
      price: 5000,
      imageUrl: '/assets/images/arepa-chocolo.png',
      category: 'Snacks Locales',
      inStock: true,
      rating: 4.5,
      features: ['Empaque al vacío', 'Ideal para calentar', 'Origen colombiano', 'Fácil preparación']
    },
    {
      id: 4,
      name: 'Combo de Panadería Local',
      description: 'Combo sorpresa de panes del día (mogolla, pan aliñado, pan de queso), recuperado de panaderías del barrio.',
      price: 6000,
      imageUrl: '/assets/images/combo.png',
      category: 'Panadería',
      inStock: true,
      rating: 4.7,
      features: ['Panes frescos', 'Hechos artesanalmente', 'Recuperados del día', 'Ideal para compartir']
    },
    {
      id: 5,
      name: 'Caja de 12 donas',
      description: 'Donas surtidas',
      price: 9000,
      imageUrl: '/assets/images/dunkin-donuts.jpg',
      category: 'Repostería',
      inStock: true,
      rating: 4.7,
      features: ['Producto típico', 'Congelado', 'Preparación rápida', 'Sabor auténtico']
    },
    {
      id: 6,
      name: 'Dedo de queso',
      description: 'Dedo de queso rescatado de panaderías gourmet. Perfecto para media mañana.',
      price: 4500,
      imageUrl: '/assets/images/punto-caliente.jpg',
      category: 'Repostería',
      inStock: false,
      rating: 4.4,
      features: ['Hecho a mano', 'Con ingredientes naturales', 'Ideal para café', 'Aprovechamiento de excedente']
    }
  ];

  private categorySubject = new BehaviorSubject<string[]>(['Todos', 'Panadería', 'Cafetería', 'Repostería', 'Snacks Locales']);

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  getCategories(): Observable<string[]> {
    return this.categorySubject.asObservable();
  }

  searchProducts(query: string): Observable<Product[]> {
    if (!query.trim()) {
      return of(this.products);
    }

    const filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );

    return of(filteredProducts);
  }

  filterByCategory(category: string): Observable<Product[]> {
    if (category === 'Todos') {
      return of(this.products);
    }

    const filteredProducts = this.products.filter(product =>
      product.category === category
    );

    return of(filteredProducts);
  }
}
