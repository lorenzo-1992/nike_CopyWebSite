import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Scarpa } from '../../model/scarpa';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-detail-shoe',
  templateUrl: './detail-shoe.component.html',
  styleUrls: ['./detail-shoe.component.css'],
})
export class DetailShoeComponent implements OnInit {
  product: Scarpa | null = null;
  selectedImage: string;
  selectedSize: string | null = null;
  selectedColor: string | null = null;
  showError: boolean = false;
  showConfirmation: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService // Iniezione del servizio del carrello
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((res) => {
          console.log(res)
         return this.productService.getProductById(res['id']);
        })
      )

      .subscribe((product) => {
        this.product = product;
        if (product.immagini?.length > 0) {
          this.selectedImage = product.immagini[0];
        }
      });
  }

  onThumbnailHover(image: string): void {
    this.selectedImage = image;
  }

  onSelectSize(size: string): void {
    this.selectedSize = size;
    this.showError = false;
  }

  onSelectColor(color: string): void {
    this.selectedColor = color;
    this.showError = false;
  }

  addToCart(): void {
    if (!this.selectedSize || !this.selectedColor) {
      this.showError = true;
      this.showConfirmation = false;
    } else {
      this.showError = false;
      this.showConfirmation = true;
  
      // Aggiungi il prodotto al carrello
      if (this.product && this.selectedColor && this.selectedSize) {
        this.cartService.addToCart(this.product, this.selectedColor, this.selectedSize);
      }
      // Nascondi il box di conferma dopo 3 secondi
      setTimeout(() => {
        this.showConfirmation = false;
      }, 3000);
    }
  }
}
