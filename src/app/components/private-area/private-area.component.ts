import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { Scarpa } from '../../model/scarpa';

@Component({
  selector: 'app-private-area',
  templateUrl: './private-area.component.html',
  styleUrls: ['./private-area.component.css'],
})
export class PrivateAreaComponent implements OnInit {
  acquisti: { nome: string; prezzo: number; immagine: [] }[] = []; // Lista degli acquisti
  preferiti: { nome: string; prezzo: number; immagine: [] }[] = []; // Dati simulati dal localStorage
  favorites: Scarpa[] = []; // Lista dei preferiti gestita dal FavoritesService

  constructor(
    private router: Router, // Router per la navigazione
    private favoritesService: FavoritesService // Servizio per i preferiti
  ) {}

  ngOnInit(): void {
    // Recupera gli acquisti dal localStorage
    this.acquisti = JSON.parse(localStorage.getItem('acquisti') || '[]');

    // Recupera i preferiti dal FavoritesService
    this.favoritesService.favorites$.subscribe((items) => {
      this.favorites = items;
    });

    // Recupera eventuali preferiti dal localStorage per la compatibilità con i vecchi dati
    const storedPreferiti = JSON.parse(localStorage.getItem('preferiti') || '[]');
    if (storedPreferiti.length > 0 && this.favorites.length === 0) {
      this.favorites = storedPreferiti;
      this.favorites.forEach((item) => this.favoritesService.addToFavorites(item));
    }

    console.log(this.acquisti, this.favorites);
  }

  // Rimuove un prodotto dai preferiti
  removeFromFavorites(productId: number): void {
    this.favoritesService.removeFromFavorites(productId);
  }

  // Naviga alla pagina del dettaglio prodotto
  navigateToProduct(productId: number): void {
    this.router.navigate(['/scarpa/', productId]);
    // console.log('Navigazione a prodotto ID:', productId);
  }

  // Logout utente
  logout(): void {
    localStorage.removeItem('user'); // Rimuove i dati utente
    alert('Sei stato disconnesso con successo!');
    this.router.navigate(['/login']); // Torna al login
  }
}
