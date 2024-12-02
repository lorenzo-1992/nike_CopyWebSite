import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.updateTotalPrice();
  }

  incrementQuantity(productId: number): void {
    this.cartService.updateQuantity(productId, 1);
    this.updateTotalPrice();
  }

  decrementQuantity(productId: number): void {
    this.cartService.updateQuantity(productId, -1);
    this.updateTotalPrice();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity < 1) {
      this.cartService.removeFromCart(productId);
    } else {
      this.cartService.setQuantity(productId, quantity);
    }
    this.updateTotalPrice();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  goToPayment(): void {
    if (this.cartItems.length === 0) {
      alert(
        'Il carrello è vuoto! Aggiungi articoli per procedere al pagamento.'
      );
      return; // Interrompe l'esecuzione
    }

    this.router.navigate(['/payment']); // Naviga al form di pagamento
  }

 
}
