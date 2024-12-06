import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
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
  isFavorite: boolean = false; // Stato del prodotto nei preferiti

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService, // Iniezione del servizio del carrello
    private favoritesService: FavoritesService // Iniezione del servizio dei preferiti
  ) {}

  ngOnInit(): void {
    // Recupera l'ID del prodotto dalla rotta
    this.route.params
      .pipe(
        switchMap((params) => {
          const productId = Number(params['id']);
          console.log('ID prodotto dalla rotta:', productId);
          return this.productService.getProductById(productId);
        })
      )
      .subscribe((product) => {
        this.product = product;

        if (product?.immagini?.length > 0) {
          this.selectedImage = product.immagini[0];
        }

        // Aggiorna lo stato dei preferiti
        this.favoritesService.favorites$.subscribe((favorites) => {
          this.isFavorite = favorites.some((item) => item.id === this.product?.id);
        });
      });
  }

  // Cambia immagine al passaggio del mouse
  onThumbnailHover(image: string): void {
    this.selectedImage = image;
  }

  // Seleziona la taglia
  onSelectSize(size: string): void {
    this.selectedSize = size;
    this.showError = false;
  }

  // Seleziona il colore
  onSelectColor(color: string): void {
    this.selectedColor = color;
    this.showError = false;
  }

  // Aggiungi il prodotto al carrello
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

  // Aggiungi o rimuovi il prodotto dai preferiti
  toggleFavorite(): void {
    if (this.isFavorite && this.product) {
      this.favoritesService.removeFromFavorites(this.product.id);
    } else if (this.product) {
      this.favoritesService.addToFavorites(this.product);
    }
  }
}
