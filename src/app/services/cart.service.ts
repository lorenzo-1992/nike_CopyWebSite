import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scarpa } from '../model/scarpa';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: { product: Scarpa; quantity: number }[] = [];
  private cartItemsSubject = new BehaviorSubject<
    { product: Scarpa; quantity: number }[]
  >([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Recupera gli articoli del carrello dal localStorage all'inizializzazione
    const storedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItems = storedCart;
    this.cartItemsSubject.next([...this.cartItems]);
  }

  addToCart(product: Scarpa): void {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));;
    this.cartItemsSubject.next([...this.cartItems]);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));;
    this.cartItemsSubject.next([...this.cartItems]);
  }

  updateQuantity(productId: number, change: number): void {
    const item = this.cartItems.find((item) => item.product.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));;
      this.cartItemsSubject.next([...this.cartItems]);
    }
  }

  setQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));;
      this.cartItemsSubject.next([...this.cartItems]);
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.prezzo * item.quantity,
      0
    );
  }

  clearCart(): void {
    this.cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));;
    this.cartItemsSubject.next([]);
  }

  savePurchases(): void {
    const acquistiAttuali = JSON.parse(localStorage.getItem('acquisti') || '[]');

    const nuoviAcquisti = this.cartItems.map((item) => ({
      nome: item.product.nome,
      prezzo: item.product.prezzo,
      immagine: item.product.immagini,
      quantità: item.quantity,
    }));

    const acquistiAggiornati = [...acquistiAttuali, ...nuoviAcquisti];
    localStorage.setItem('acquisti', JSON.stringify(acquistiAggiornati));

    this.clearCart(); // Svuota il carrello dopo aver salvato gli acquisti
  }

}
