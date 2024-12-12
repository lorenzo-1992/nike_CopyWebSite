import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scarpa } from '../model/scarpa';

@Injectable({
  providedIn: 'root', // Rende il servizio disponibile in tutta l'applicazione
})
export class CartService {
  private cartItems: { product: Scarpa; quantity: number; colore: string; taglia: string }[] = []; // Array per memorizzare gli articoli nel carrello
  private cartItemsSubject = new BehaviorSubject<{ product: Scarpa; quantity: number; colore: string; taglia: string }[]>([]); // Observable per aggiornare lo stato del carrello

  cartItems$ = this.cartItemsSubject.asObservable(); // Observable pubblico per monitorare i cambiamenti degli articoli nel carrello

  constructor() {
    const storedCart = JSON.parse(localStorage.getItem('cartItems') || '[]'); // Recupera il carrello dal localStorage
    this.cartItems = storedCart; // Inizializza il carrello con i dati recuperati
    this.cartItemsSubject.next([...this.cartItems]); // Aggiorna l'observable con i dati iniziali
  }

  // Aggiunge un prodotto al carrello
  addToCart(product: Scarpa, colore: string, taglia: string): void {
    const existingItem = this.cartItems.find(
      (item) => 
        item.product.id === product.id && // Verifica se l'ID del prodotto corrisponde
        item.colore === colore && // Verifica il colore
        item.taglia === taglia // Verifica la taglia
    );

    if (existingItem) {
      existingItem.quantity += 1; // Incrementa la quantità se l'articolo è già presente
    } else {
      this.cartItems.push({ product, quantity: 1, colore, taglia }); // Aggiunge un nuovo articolo al carrello
    }

    this.updateCartState(); // Aggiorna lo stato del carrello
  }

  // Rimuove un articolo dal carrello
  removeFromCart(productId: number, colore: string, taglia: string): void {
    this.cartItems = this.cartItems.filter(
      (item) =>
        !(item.product.id === productId && item.colore === colore && item.taglia === taglia) // Mantiene solo gli articoli che non corrispondono a quelli da rimuovere
    );
    this.updateCartState(); // Aggiorna lo stato del carrello
  }

  // Aggiorna la quantità di un articolo nel carrello
  updateQuantity(productId: number, colore: string, taglia: string, quantity: number): void {
    const item = this.cartItems.find(
      (item) =>
        item.product.id === productId &&
        item.colore === colore &&
        item.taglia === taglia
    );

    if (item) {
      item.quantity = quantity > 0 ? quantity : 1; // Aggiorna la quantità, assicurandosi che sia almeno 1
      this.updateCartState(); // Aggiorna lo stato del carrello
    }
  }

  // Calcola il prezzo totale degli articoli nel carrello
  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.prezzo * item.quantity, // Somma i prezzi moltiplicati per le quantità
      0
    );
  }

  // Svuota completamente il carrello
  clearCart(): void {
    this.cartItems = []; // Rimuove tutti gli articoli dal carrello
    this.updateCartState(); // Aggiorna lo stato del carrello
  }

  // Salva gli acquisti effettuati nel localStorage
  savePurchases(): void {
    const acquistiAttuali = JSON.parse(localStorage.getItem('acquisti') || '[]'); // Recupera gli acquisti precedenti dal localStorage
    const nuoviAcquisti = this.cartItems.map((item) => ({
      nome: item.product.nome,
      prezzo: item.product.prezzo,
      immagine: item.product.immagini[0],
      quantità: item.quantity,
      colore: item.colore,
      taglia: item.taglia,
    }));

    const acquistiAggiornati = [...acquistiAttuali, ...nuoviAcquisti]; // Combina i nuovi acquisti con quelli precedenti
    localStorage.setItem('acquisti', JSON.stringify(acquistiAggiornati)); // Salva gli acquisti aggiornati nel localStorage

    this.clearCart(); // Svuota il carrello dopo aver salvato gli acquisti
  }

  // Aggiorna lo stato del carrello sia localmente che nel localStorage
  private updateCartState(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); // Salva il carrello nel localStorage
    this.cartItemsSubject.next([...this.cartItems]); // Notifica i cambiamenti agli osservatori
  }
}
