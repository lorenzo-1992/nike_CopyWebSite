import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Scarpa } from '../../model/scarpa';
import { AutenthicationService } from '../../services/autenthication.service';
import { takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserData } from '../../model/userdata';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  // Voci del menu dinamico
  voiceItem: string[] = [
    'Novità',
    'Nuovi Arrivi',
    'Sconti fino al 20%',
    'Resi e Rimborsi',
  ];
  currentVoiceItem: string = this.voiceItem[0];
  intervalId: any;

  // Stato della barra di ricerca e del menu
  searchTerm: string = '';
  searchResults: Scarpa[] = [];
  isSearchActive: boolean = false;
  isMenuOpen: boolean = false;
  loggedUser: undefined | UserData;

  constructor(
    private productService: ProductService,
    private router: Router,
    private authSrv: AutenthicationService
  ) {
    this.authSrv.loggedUser$.pipe(takeUntilDestroyed()).subscribe((user) => {
      this.loggedUser = user;
      console.log('Utente:', this.loggedUser);
    });
  }

  ngOnInit(): void {
    // Aggiorna automaticamente i messaggi del menu ogni 3 secondi
    this.intervalId = setInterval(() => {
      const nextIndex =
        (this.voiceItem.indexOf(this.currentVoiceItem) + 1) %
        this.voiceItem.length;
      this.currentVoiceItem = this.voiceItem[nextIndex];
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Funzione per effettuare il logout
  logout(): void {
    this.authSrv.logout();
    this.router.navigate(['/login']); // Torna alla pagina di login
  }

  // Funzione per la ricerca
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.productService
        .searchProducts(this.searchTerm.toLowerCase())
        .subscribe((results) => {
          this.searchResults = results.filter(
            (product) =>
              product.nome
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
              product.categoria
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase())
          );
        });
    } else {
      this.searchResults = [];
    }
  }

  clearSearch(): void {
    this.isSearchActive = false;
  }

  preventClose(event: MouseEvent): void {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  closeSearch(event: MouseEvent): void {
    this.isSearchActive = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
