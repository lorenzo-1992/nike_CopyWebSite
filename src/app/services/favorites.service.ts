import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scarpa } from '../model/scarpa';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoriteItems: Scarpa[] = [];
  private favoritesSubject = new BehaviorSubject<Scarpa[]>([]);

  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.favoriteItems = storedFavorites;
    this.favoritesSubject.next([...this.favoriteItems]);
  }

  addToFavorites(product: Scarpa): void {
    const exists = this.favoriteItems.find(item => item.id === product.id);
    if (!exists) {
      this.favoriteItems.push(product);
      this.updateFavoritesState();
    }
  }

  removeFromFavorites(productId: number): void {
    this.favoriteItems = this.favoriteItems.filter(item => item.id !== productId);
    this.updateFavoritesState();
  }

  private updateFavoritesState(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favoriteItems));
    this.favoritesSubject.next([...this.favoriteItems]);
  }
}
