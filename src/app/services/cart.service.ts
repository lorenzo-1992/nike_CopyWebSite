import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scarpa } from '../model/scarpa';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: { product: Scarpa; quantity: number; colore: string; taglia: string }[] = [];
  private cartItemsSubject = new BehaviorSubject<{ product: Scarpa; quantity: number; colore: string; taglia: string }[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    const storedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItems = storedCart;
    this.cartItemsSubject.next([...this.cartItems]);
  }

  addToCart(product: Scarpa, colore: string, taglia: string): void {
    const existingItem = this.cartItems.find(
      (item) => 
        item.product.id === product.id &&
        item.colore === colore &&
        item.taglia === taglia
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1, colore, taglia });
    }

    this.updateCartState();
  }

  removeFromCart(productId: number, colore: string, taglia: string): void {
    this.cartItems = this.cartItems.filter(
      (item) =>
        !(item.product.id === productId && item.colore === colore && item.taglia === taglia)
    );
    this.updateCartState();
  }

  updateQuantity(productId: number, colore: string, taglia: string, quantity: number): void {
    const item = this.cartItems.find(
      (item) =>
        item.product.id === productId &&
        item.colore === colore &&
        item.taglia === taglia
    );

    if (item) {
      item.quantity = quantity > 0 ? quantity : 1;
      this.updateCartState();
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.prezzo * item.quantity,
      0
    );
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartState();
  }

  savePurchases(): void {
    const acquistiAttuali = JSON.parse(localStorage.getItem('acquisti') || '[]');
    const nuoviAcquisti = this.cartItems.map((item) => ({
      nome: item.product.nome,
      prezzo: item.product.prezzo,
      immagine: item.product.immagini[0],
      quantità: item.quantity,
      colore: item.colore,
      taglia: item.taglia,
    }));

    const acquistiAggiornati = [...acquistiAttuali, ...nuoviAcquisti];
    localStorage.setItem('acquisti', JSON.stringify(acquistiAggiornati));

    this.clearCart();
  }

  private updateCartState(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next([...this.cartItems]);
  }
}
