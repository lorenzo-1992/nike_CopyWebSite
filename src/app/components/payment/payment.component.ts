import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  paymentData = {
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  };

  constructor(private router: Router, private cartService: CartService) {}

  onSubmit(paymentForm: any): void {
    if (paymentForm.invalid) {
      alert('Il form non è valido. Controlla i dati inseriti.');
      return;
    }
    console.log('Dati di pagamento:', this.paymentData);

    this.cartService.savePurchases();

    this.router.navigate(['/private']); // Naviga all'area privata
  }

  goBack(): void {
    this.router.navigate(['/cart']); // Torna al carrello
  }
}
