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
      name: 'Audífonos Inalámbricos',
      description: 'Audífonos premium con cancelación de ruido y 30 horas de batería.',
      price: 899900,
      imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Electrónicos',
      inStock: true,
      rating: 4.8,
      features: ['Cancelación de ruido', 'Bluetooth 5.0', '30 horas de batería', 'Carga rápida']
    },
    {
      id: 2,
      name: 'Smartphone X',
      description: 'Último modelo con pantalla OLED de 6.7", capacidad 5G y 128GB de almacenamiento.',
      price: 3499900,
      imageUrl: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Electrónicos',
      inStock: true,
      rating: 4.7,
      features: ['Pantalla OLED 6.7"', 'Compatible 5G', '128GB almacenamiento', 'Resistente al agua']
    },
    {
      id: 3,
      name: 'Tenis para Correr',
      description: 'Tenis ligeros con amortiguación responsive y parte superior de malla transpirable.',
      price: 429900,
      imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Deportes',
      inStock: true,
      rating: 4.5,
      features: ['Diseño ligero', 'Amortiguación responsive', 'Malla transpirable', 'Suela durable']
    },
    {
      id: 4,
      name: 'Cafetera Programable',
      description: 'Cafetera programable con capacidad de 12 tazas y función de auto-apagado.',
      price: 299900,
      imageUrl: 'https://images.pexels.com/photos/6312086/pexels-photo-6312086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Hogar',
      inStock: true,
      rating: 4.3,
      features: ['Capacidad 12 tazas', 'Temporizador programable', 'Auto-apagado', 'Control de intensidad']
    },
    {
      id: 5,
      name: 'Mochila',
      description: 'Mochila durable con compartimiento para laptop, bolsillos para botella y correas acolchadas.',
      price: 189900,
      imageUrl: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Moda',
      inStock: true,
      rating: 4.6,
      features: ['Compartimiento laptop', 'Bolsillos para botella', 'Correas acolchadas', 'Resistente al agua']
    },
    {
      id: 6,
      name: 'Reloj Inteligente',
      description: 'Monitor de actividad física con medidor de ritmo cardíaco, GPS y resistencia al agua hasta 50m.',
      price: 649900,
      imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Electrónicos',
      inStock: false,
      rating: 4.4,
      features: ['Monitor cardíaco', 'GPS integrado', 'Resistente al agua', 'Monitor de sueño']
    },
    {
      id: 7,
      name: 'Lámpara de Escritorio',
      description: 'Lámpara LED con brillo ajustable, temperatura de color y puerto de carga USB.',
      price: 159900,
      imageUrl: 'https://images.pexels.com/photos/4769488/pexels-photo-4769488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Hogar',
      inStock: true,
      rating: 4.2,
      features: ['Brillo ajustable', 'Control de temperatura de color', 'Puerto de carga USB', 'Control táctil']
    },
    {
      id: 8,
      name: 'Tapete de Yoga',
      description: 'Tapete antideslizante con líneas de alineación y correa de transporte, ideal para todos los estilos de yoga.',
      price: 129900,
      imageUrl: 'https://images.pexels.com/photos/4056529/pexels-photo-4056529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Deportes',
      inStock: true,
      rating: 4.5,
      features: ['Superficie antideslizante', 'Líneas de alineación', 'Correa de transporte', 'Material ecológico']
    }
  ];

  private categorySubject = new BehaviorSubject<string[]>(['Todos', 'Electrónicos', 'Deportes', 'Hogar', 'Moda']);

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