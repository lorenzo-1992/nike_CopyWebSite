import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scarpa } from '../model/scarpa';

@Injectable({
  providedIn: 'root', // Rende il servizio disponibile in tutta l'applicazione
})
export class FavoritesService {
  private favoriteItems: Scarpa[] = []; // Array per memorizzare gli articoli preferiti
  private favoritesSubject = new BehaviorSubject<Scarpa[]>([]); // Observable per notificare i cambiamenti negli articoli preferiti

  favorites$ = this.favoritesSubject.asObservable(); // Observable pubblico per monitorare gli articoli preferiti

  constructor() {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]'); // Recupera i preferiti dal localStorage
    this.favoriteItems = storedFavorites; // Inizializza gli articoli preferiti con i dati recuperati
    this.favoritesSubject.next([...this.favoriteItems]); // Aggiorna l'observable con i dati iniziali
  }

  // Aggiunge un articolo ai preferiti
  addToFavorites(product: Scarpa): void {
    const exists = this.favoriteItems.find(item => item.id === product.id); // Verifica se l'articolo è già tra i preferiti
    if (!exists) {
      this.favoriteItems.push(product); // Aggiunge l'articolo ai preferiti
      this.updateFavoritesState(); // Aggiorna lo stato dei preferiti
    }
  }

  // Rimuove un articolo dai preferiti
  removeFromFavorites(productId: number): void {
    this.favoriteItems = this.favoriteItems.filter(item => item.id !== productId); // Filtra gli articoli mantenendo solo quelli non corrispondenti all'ID
    this.updateFavoritesState(); // Aggiorna lo stato dei preferiti
  }

  // Aggiorna lo stato dei preferiti sia localmente che nel localStorage
  private updateFavoritesState(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favoriteItems)); // Salva i preferiti nel localStorage
    this.favoritesSubject.next([...this.favoriteItems]); // Notifica i cambiamenti agli osservatori
  }
}
