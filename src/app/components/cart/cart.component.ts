import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      console.log(this.cartItems)
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeFromCart(productId: number, colore: string, taglia: string): void {
    this.cartService.removeFromCart(productId, colore, taglia);
  }

  updateQuantity(productId: number, colore: string, taglia: string, quantity: number): void {
    this.cartService.updateQuantity(productId, colore, taglia, quantity);
  }

  decrementQuantity(productId: number, colore: string, taglia: string): void {
    const item = this.cartItems.find(
      (item) =>
        item.product.id === productId &&
        item.colore === colore &&
        item.taglia === taglia
    );

    if (item) {
      this.updateQuantity(productId, colore, taglia, item.quantity - 1);
    }
  }

  incrementQuantity(productId: number, colore: string, taglia: string): void {
    const item = this.cartItems.find(
      (item) =>
        item.product.id === productId &&
        item.colore === colore &&
        item.taglia === taglia
    );

    if (item) {
      this.updateQuantity(productId, colore, taglia, item.quantity + 1);
    }
  }
  goToPayment(): void {
    // Controlla se il carrello non è vuoto prima di navigare
    if (this.cartItems.length > 0) {
      this.router.navigate(['/payment']); // Naviga alla pagina di pagamento
    } else {
      alert('Il carrello è vuoto. Aggiungi prodotti prima di procedere al pagamento.');
    }
  }
}
