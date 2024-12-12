import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Scarpa } from '../model/scarpa';

@Injectable({
  providedIn: 'root', // Rende il servizio disponibile in tutta l'applicazione
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/prodotti'; // URL base per le richieste API

  constructor(private http: HttpClient) {}

  // Metodo per ottenere tutti i prodotti
  getAllProducts(): Observable<Scarpa[]> {
    return this.http.get<Scarpa[]>(this.apiUrl); // Effettua una richiesta GET per tutti i prodotti
  }

  // Metodo per ottenere solo i nuovi arrivi
  getNewArrivals(): Observable<Scarpa[]> {
    return this.http.get<Scarpa[]>(`${this.apiUrl}?nuovo_arrivo=true`); // Effettua una richiesta GET filtrata per i nuovi arrivi
  }

  // Metodo per ottenere i best seller (valore best_seller >= 4)
  getBestSellers(): Observable<Scarpa[]> {
    return this.http.get<Scarpa[]>(`${this.apiUrl}?best_seller_gte=4`); // Effettua una richiesta GET filtrata per i best seller
  }

  // Metodo per ottenere un prodotto in base all'ID
  getProductById(id: number): Observable<Scarpa> {
    return this.http.get<Scarpa>(`${this.apiUrl}/${id}`); // Effettua una richiesta GET per un prodotto specifico
  }

  // Metodo per cercare prodotti in base a un termine
  searchProducts(term: string): Observable<Scarpa[]> {
    return this.http
      .get<Scarpa[]>(`${this.apiUrl}`) // Effettua una richiesta GET per tutti i prodotti
      .pipe(
        map((products) =>
          products.filter(
            (product) =>
              product.nome.toLowerCase().includes(term) || // Filtra i prodotti il cui nome include il termine
              product.categoria.toLowerCase().includes(term) // Filtra i prodotti la cui categoria include il termine
          )
        )
      );
  }
}
