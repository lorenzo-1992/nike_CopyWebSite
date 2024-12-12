import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { Scarpa } from '../../model/scarpa';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-shoe', 
  templateUrl: './detail-shoe.component.html', 
  styleUrls: ['./detail-shoe.component.css'], 
})
export class DetailShoeComponent implements OnInit {
  product: Scarpa | null = null; // Prodotto da visualizzare
  selectedImage: string; // Immagine attualmente selezionata
  selectedSize: string | null = null; // Taglia selezionata dall'utente
  selectedColor: string | null = null; // Colore selezionato dall'utente
  showError: boolean = false; // Stato di errore per selezione non valida
  showConfirmation: boolean = false; // Stato di conferma per aggiunta al carrello
  isFavorite: boolean = false; // Stato del prodotto nei preferiti

  constructor(
    private route: ActivatedRoute, // Servizio per accedere ai parametri della rotta
    private productService: ProductService, // Servizio per recuperare i dettagli del prodotto
    private cartService: CartService, // Servizio per gestire il carrello
    private favoritesService: FavoritesService, // Servizio per gestire i preferiti
    private router: Router // Servizio per la navigazione tra pagine
  ) {}

  ngOnInit(): void {
    // Recupera l'ID del prodotto dalla rotta e carica i dettagli del prodotto
    this.route.params
      .pipe(
        switchMap((params) => {
          const productId = Number(params['id']); // Ottiene l'ID dalla rotta
          console.log('ID prodotto dalla rotta:', productId); // Debug ID prodotto
          return this.productService.getProductById(productId); // Recupera il prodotto dal servizio
        })
      )
      .subscribe((product) => {
        this.product = product; // Assegna il prodotto recuperato

        if (product?.immagini?.length > 0) {
          this.selectedImage = product.immagini[0]; // Imposta l'immagine di default
        }

        // Aggiorna lo stato dei preferiti
        this.favoritesService.favorites$.subscribe((favorites) => {
          this.isFavorite = favorites.some((item) => item.id === this.product?.id); // Verifica se il prodotto è tra i preferiti
        });
      });
  }

  // Cambia l'immagine principale quando si passa il mouse su una miniatura
  onThumbnailHover(image: string): void {
    this.selectedImage = image; // Aggiorna l'immagine selezionata
  }

  // Seleziona una taglia
  onSelectSize(size: string): void {
    this.selectedSize = size; // Aggiorna la taglia selezionata
    this.showError = false; // Rimuove eventuali errori precedenti
  }

  // Seleziona un colore
  onSelectColor(color: string): void {
    this.selectedColor = color; // Aggiorna il colore selezionato
    this.showError = false; // Rimuove eventuali errori precedenti
  }

  // Aggiunge il prodotto al carrello
  addToCart(): void {
    if (!this.selectedSize || !this.selectedColor) {
      this.showError = true; // Mostra un errore se taglia o colore non sono selezionati
      this.showConfirmation = false; // Nasconde il messaggio di conferma
    } else {
      this.showError = false; // Rimuove l'errore
      this.showConfirmation = true; // Mostra il messaggio di conferma

      // Aggiunge il prodotto al carrello
      if (this.product && this.selectedColor && this.selectedSize) {
        this.cartService.addToCart(this.product, this.selectedColor, this.selectedSize);
      }

      // Nasconde il box di conferma dopo 3 secondi
      setTimeout(() => {
        this.showConfirmation = false;
        this.router.navigate(['/cart']); // Naviga al carrello
      }, 3000);
    }
  }

  // Aggiunge o rimuove il prodotto dai preferiti
  toggleFavorite(): void {
    if (this.isFavorite && this.product) {
      this.favoritesService.removeFromFavorites(this.product.id); // Rimuove il prodotto dai preferiti
    } else if (this.product) {
      this.favoritesService.addToFavorites(this.product); // Aggiunge il prodotto ai preferiti
    }
  }
}
