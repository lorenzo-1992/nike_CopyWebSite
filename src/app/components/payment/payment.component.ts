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
    cardName: '', // Nome del titolare della carta
    cardNumber: '', // Numero della carta di credito
    expiryDate: '', // Data di scadenza della carta
    cvv: '', // Codice di sicurezza CVV
  };

  shippingData = {
    fullName: '', // Nome completo per la spedizione
    address: '', // Indirizzo di spedizione
    city: '', // Città di spedizione
    postalCode: '', // Codice postale
  };

  showThankYouBox = false; // Gestisce la visibilità del box di ringraziamento

  constructor(private router: Router, private cartService: CartService) {}

  // Gestisce l'invio del modulo di pagamento
  onSubmit(paymentForm: any): void {
    if (paymentForm.invalid || !this.isShippingValid()) {
      alert('Il form non è valido. Controlla i dati inseriti.'); // Mostra un avviso se il form è invalido
      return;
    }

    console.log('Dati di pagamento:', this.paymentData); // Debug dei dati di pagamento
    console.log('Dati di spedizione:', this.shippingData); // Debug dei dati di spedizione

    // Salva gli acquisti
    this.cartService.savePurchases();

    // Mostra il box di ringraziamento
    this.showThankYouBox = true;

    // Nasconde il box dopo 5 secondi e naviga all'area privata
    setTimeout(() => {
      this.showThankYouBox = false;
      this.router.navigate(['/private']); // Naviga alla pagina privata
    }, 5000);
  }

  // Torna alla pagina del carrello
  goBack(): void {
    this.router.navigate(['/cart']); // Naviga alla pagina del carrello
  }

  // Verifica se i dati di spedizione sono validi
  isShippingValid(): boolean {
    const { fullName, address, city, postalCode } = this.shippingData;
    return fullName && address && city && postalCode ? true : false; // Controlla che tutti i campi siano compilati
  }
}
