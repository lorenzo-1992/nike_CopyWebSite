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

  shippingData = {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
  };

  showThankYouBox = false; // Gestisce la visibilità del box di ringraziamento

  constructor(private router: Router, private cartService: CartService) {}

  onSubmit(paymentForm: any): void {
    if (paymentForm.invalid || !this.isShippingValid()) {
      alert('Il form non è valido. Controlla i dati inseriti.');
      return;
    }

    console.log('Dati di pagamento:', this.paymentData);
    console.log('Dati di spedizione:', this.shippingData);

    // Salva gli acquisti
    this.cartService.savePurchases();

    // Mostra il box di ringraziamento
    this.showThankYouBox = true;

    // Nasconde il box dopo 5 secondi e naviga all'area privata
    setTimeout(() => {
      this.showThankYouBox = false;
      this.router.navigate(['/private']);
    }, 5000);
  }

  goBack(): void {
    this.router.navigate(['/cart']); // Torna al carrello
  }

  isShippingValid(): boolean {
    const { fullName, address, city, postalCode } = this.shippingData;
    return fullName && address && city && postalCode ? true : false;
  }
}
