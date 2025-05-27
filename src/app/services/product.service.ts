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
      name: 'Caja de Frutas Frescas',
      description: 'Caja con frutas frescas rescatadas de excedentes agrícolas locales. Variedad según temporada.',
      price: 25000,
      imageUrl: 'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Alimentos',
      inStock: true,
      rating: 4.9,
      features: ['Frutas de temporada', 'Producto local', 'Frescura garantizada', 'Ideal para snacks saludables']
    },
    {
      id: 2,
      name: 'Pan Artesanal del Día',
      description: 'Pan fresco artesanal rescatado de panaderías locales con descuentos para evitar desperdicios.',
      price: 8000,
      imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Alimentos',
      inStock: true,
      rating: 4.7,
      features: ['Pan fresco', 'Artesanal', 'Producto local', 'Descuento especial']
    },
    {
      id: 3,
      name: 'Verduras Orgánicas',
      description: 'Paquete de verduras orgánicas rescatadas de fincas cercanas, ideales para tus recetas saludables.',
      price: 18000,
      imageUrl: 'https://images.pexels.com/photos/5938/food-vegetables-healthy-lunch.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Alimentos',
      inStock: true,
      rating: 4.6,
      features: ['Orgánico', 'Producto local', 'Variedad de verduras', 'Frescas y nutritivas']
    },
    {
      id: 4,
      name: 'Café de Origen',
      description: 'Paquete de café molido de finca colombiana, rescatado antes de su fecha de vencimiento.',
      price: 12000,
      imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Bebidas',
      inStock: true,
      rating: 4.8,
      features: ['Café 100% colombiano', 'Molido fresco', 'Sabor intenso', 'Rescatado a tiempo']
    },
    {
      id: 5,
      name: 'Jabón Artesanal Natural',
      description: 'Jabón hecho a mano con ingredientes naturales, rescatado de excedentes de tiendas locales.',
      price: 9000,
      imageUrl: 'https://images.pexels.com/photos/3775145/pexels-photo-3775145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Cuidado Personal',
      inStock: true,
      rating: 4.5,
      features: ['Ingredientes naturales', 'Hecho a mano', 'Respetuoso con el medio ambiente', 'Aroma fresco']
    },
    {
      id: 6,
      name: 'Snack Saludable',
      description: 'Snack saludable con frutos secos y semillas, rescatado de tiendas locales para reducir desperdicios.',
      price: 7000,
      imageUrl: 'https://images.pexels.com/photos/5938/food-vegetables-healthy-lunch.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Alimentos',
      inStock: false,
      rating: 4.3,
      features: ['Frutos secos', 'Sin aditivos', 'Energía natural', 'Empaque eco-friendly']
    },
    {
      id: 7,
      name: 'Botella Reutilizable',
      description: 'Botella de agua reutilizable, rescatada de excedentes de producción, ideal para uso diario.',
      price: 35000,
      imageUrl: 'https://images.pexels.com/photos/4052143/pexels-photo-4052143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Hogar y Vida',
      inStock: true,
      rating: 4.6,
      features: ['Material BPA free', 'Capacidad 750 ml', 'Diseño ergonómico', 'Resistente y duradera']
    },
    {
      id: 8,
      name: 'Kit de Plantas Aromáticas',
      description: 'Kit con semillas y macetas para cultivar tus propias plantas aromáticas en casa.',
      price: 28000,
      imageUrl: 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Hogar y Vida',
      inStock: true,
      rating: 4.7,
      features: ['Semillas orgánicas', 'Macetas incluidas', 'Fácil de cultivar', 'Mejora tu espacio']
    }
  ];

  private categorySubject = new BehaviorSubject<string[]>(['Todos', 'Alimentos', 'Bebidas', 'Cuidado Personal', 'Hogar y Vida']);



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
