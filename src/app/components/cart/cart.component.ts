import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart', 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] 
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; // Array per memorizzare gli elementi del carrello
  totalPrice: number = 0; // Prezzo totale degli articoli nel carrello

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // Sottoscrive lo stream degli articoli nel carrello dal servizio
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items; // Aggiorna gli articoli del carrello
      console.log(this.cartItems); // Log per debug
      this.totalPrice = this.cartService.getTotalPrice(); // Calcola il prezzo totale
    });
  }

  // Rimuove un elemento dal carrello
  removeFromCart(productId: number, colore: string, taglia: string): void {
    this.cartService.removeFromCart(productId, colore, taglia); // Chiama il servizio per rimuovere l'articolo
  }

  // Aggiorna la quantità di un articolo nel carrello
  updateQuantity(productId: number, colore: string, taglia: string, quantity: number): void {
    this.cartService.updateQuantity(productId, colore, taglia, quantity); // Chiama il servizio per aggiornare la quantità
  }

  // Decrementa la quantità di un articolo specifico
  decrementQuantity(productId: number, colore: string, taglia: string): void {
    const item = this.cartItems.find(
      (item) =>
        item.product.id === productId && // Controlla se l'ID del prodotto corrisponde
        item.colore === colore && // Controlla il colore
        item.taglia === taglia // Controlla la taglia
    );

    if (item) {
      this.updateQuantity(productId, colore, taglia, item.quantity - 1); // Decrementa la quantità
    }
  }

  // Incrementa la quantità di un articolo specifico
  incrementQuantity(productId: number, colore: string, taglia: string): void {
    const item = this.cartItems.find(
      (item) =>
        item.product.id === productId && // Controlla se l'ID del prodotto corrisponde
        item.colore === colore && // Controlla il colore
        item.taglia === taglia // Controlla la taglia
    );

    if (item) {
      this.updateQuantity(productId, colore, taglia, item.quantity + 1); // Incrementa la quantità
    }
  }

  // Naviga alla pagina di pagamento
  goToPayment(): void {
    if (this.cartItems.length > 0) { // Verifica che il carrello non sia vuoto
      this.router.navigate(['/payment']); // Naviga alla pagina di pagamento
    } else {
      alert('Il carrello è vuoto. Aggiungi prodotti prima di procedere al pagamento.'); // Mostra un avviso se il carrello è vuoto
    }
  }
}
