import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Scarpa } from '../../model/scarpa';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html', 
  styleUrls: ['./new-arrivals.component.css'], 
})
export class NewArrivalsComponent implements OnInit {
  allProducts: Scarpa[] = []; // Tutti i prodotti per il primo slider
  newArrivals: Scarpa[] = []; // Solo i nuovi arrivi per il secondo slider

  currentIndexAll = 0; // Indice corrente del primo slider
  currentIndexNew = 0; // Indice corrente del secondo slider
  visibleSlides = 5; // Numero di scarpe visibili per slider

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Recupera tutti i prodotti dal servizio
    this.productService.getAllProducts().subscribe((products) => {
      this.allProducts = products; // Assegna tutti i prodotti per il primo slider
      this.newArrivals = products.filter((product) => product.nuovo_arrivo); // Filtra i nuovi arrivi per il secondo slider
    });
  }

  // Calcola la trasformazione per lo scorrimento del primo slider
  getTransformAll(): string {
    return `translateX(-${(this.currentIndexAll * 100) / this.visibleSlides}%)`;
  }

  // Calcola la trasformazione per lo scorrimento del secondo slider
  getTransformNew(): string {
    return `translateX(-${(this.currentIndexNew * 100) / this.visibleSlides}%)`;
  }

  // Naviga alla slide precedente del primo slider
  prevSlideAll(): void {
    if (this.currentIndexAll > 0) {
      this.currentIndexAll--; // Decrementa l'indice corrente
    }
  }

  // Naviga alla slide successiva del primo slider
  nextSlideAll(): void {
    const maxIndex = this.allProducts.length - this.visibleSlides; // Calcola l'indice massimo
    if (this.currentIndexAll < maxIndex) {
      this.currentIndexAll++; // Incrementa l'indice corrente
    }
  }

  // Naviga alla slide precedente del secondo slider
  prevSlideNew(): void {
    if (this.currentIndexNew > 0) {
      this.currentIndexNew--; // Decrementa l'indice corrente
    }
  }

  // Naviga alla slide successiva del secondo slider
  nextSlideNew(): void {
    const maxIndex = this.newArrivals.length - this.visibleSlides; // Calcola l'indice massimo
    if (this.currentIndexNew < maxIndex) {
      this.currentIndexNew++; // Incrementa l'indice corrente
    }
  }
}
