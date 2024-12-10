import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Scarpa } from '../model/scarpa';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/prodotti';

  constructor(private http: HttpClient) {}

  // Metodo per ottenere tutti i prodotti
  getAllProducts(): Observable<Scarpa[]> {
    return this.http.get<Scarpa[]>(this.apiUrl);
  }

  // Metodo per ottenere solo i nuovi arrivi
  getNewArrivals(): Observable<Scarpa[]> {
    return this.http.get<Scarpa[]>(`${this.apiUrl}?nuovo_arrivo=true`);
  }

  // Metodo per ottenere i best seller (valore best_seller >= 4)
  getBestSellers(): Observable<Scarpa[]> {
    return this.http.get<Scarpa[]>(`${this.apiUrl}?best_seller_gte=4`);
  }
  // Metodo per ottenere un prodotto in base all'ID
  getProductById(id: number): Observable<Scarpa> {
    return this.http.get<Scarpa>(`${this.apiUrl}/${id}`);
  }
  searchProducts(term: string): Observable<Scarpa[]> {
    return this.http
      .get<Scarpa[]>(`${this.apiUrl}`)
      .pipe(
        map((products) =>
          products.filter(
            (product) =>
              product.nome.toLowerCase().includes(term) ||
              product.categoria.toLowerCase().includes(term)
          )
        )
      );
  }
}
