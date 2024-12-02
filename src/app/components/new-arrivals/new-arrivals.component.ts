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
    this.productService.getAllProducts().subscribe((products) => {
      this.allProducts = products;
      this.newArrivals = products.filter((product) => product.nuovo_arrivo);
    });
  }

  // Primo slider: trasformazione per scorrimento
  getTransformAll(): string {
    return `translateX(-${(this.currentIndexAll * 100) / this.visibleSlides}%)`;
  }

  // Secondo slider: trasformazione per scorrimento
  getTransformNew(): string {
    return `translateX(-${(this.currentIndexNew * 100) / this.visibleSlides}%)`;
  }

  // Navigazione per il primo slider
  prevSlideAll(): void {
    if (this.currentIndexAll > 0) {
      this.currentIndexAll--;
    }
  }

  nextSlideAll(): void {
    const maxIndex = this.allProducts.length - this.visibleSlides;
    if (this.currentIndexAll < maxIndex) {
      this.currentIndexAll++;
    }
  }

  // Navigazione per il secondo slider
  prevSlideNew(): void {
    if (this.currentIndexNew > 0) {
      this.currentIndexNew--;
    }
  }

  nextSlideNew(): void {
    const maxIndex = this.newArrivals.length - this.visibleSlides;
    if (this.currentIndexNew < maxIndex) {
      this.currentIndexNew++;
    }
  }
}
