import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Scarpa } from '../../model/scarpa';
import { AutenthicationService } from '../../services/autenthication.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserData } from '../../model/userdata';

@Component({
  selector: 'app-menu', // Nome del componente come tag HTML
  templateUrl: './menu.component.html', // Percorso del template HTML
  styleUrls: ['./menu.component.css'], // Percorso del file CSS
})
export class MenuComponent implements OnInit, OnDestroy {
  // Messaggi dinamici del menu
  voiceItem: string[] = [
    'Novità',
    'Nuovi Arrivi',
    'Sconti fino al 20%',
    'Resi e Rimborsi',
  ];
  currentVoiceItem: string = this.voiceItem[0]; // Messaggio corrente del menu
  intervalId: any; // Identificatore per l'intervallo che cambia il messaggio

  // Stato della barra di ricerca e del menu
  searchTerm: string = ''; // Testo inserito dall'utente nella barra di ricerca
  searchResults: Scarpa[] = []; // Risultati della ricerca
  isSearchActive: boolean = false; // Indica se la barra di ricerca è attiva
  isMenuOpen: boolean = false; // Indica se il menu è aperto

  // Stato dell'utente autenticato
  loggedUser: undefined | UserData; // Informazioni sull'utente autenticato

  constructor(
    private productService: ProductService, // Servizio per la gestione dei prodotti
    private router: Router, // Router per la navigazione tra pagine
    private authSrv: AutenthicationService // Servizio per autenticazione e logout
  ) {
    // Sottoscrizione allo stato dell'utente autenticato
    this.authSrv.loggedUser$.pipe(takeUntilDestroyed()).subscribe((user) => {
      this.loggedUser = user; // Aggiorna lo stato dell'utente
      console.log('Utente:', this.loggedUser); // Log per debug
    });
  }

  ngOnInit(): void {
    // Imposta un intervallo per aggiornare ciclicamente i messaggi dinamici del menu
    this.intervalId = setInterval(() => {
      const nextIndex =
        (this.voiceItem.indexOf(this.currentVoiceItem) + 1) %
        this.voiceItem.length; // Calcola l'indice del prossimo messaggio
      this.currentVoiceItem = this.voiceItem[nextIndex]; // Aggiorna il messaggio corrente
    }, 3000); // Cambia messaggio ogni 3 secondi
  }

  ngOnDestroy(): void {
    // Cancella l'intervallo quando il componente viene distrutto per prevenire memory leak
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Funzione per effettuare il logout
  logout(): void {
    this.authSrv.logout(); // Chiama il metodo di logout del servizio
    this.router.navigate(['/login']); // Naviga alla pagina di login
  }

  // Funzione per effettuare una ricerca
  onSearch(): void {
    if (this.searchTerm.trim()) { // Verifica che il termine di ricerca non sia vuoto
      this.productService
        .searchProducts(this.searchTerm.toLowerCase()) // Effettua la ricerca con il termine in lowercase
        .subscribe((results) => {
          // Filtra i risultati in base a nome o categoria
          this.searchResults = results.filter(
            (product) =>
              product.nome
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) || // Controlla se il nome include il termine di ricerca
              product.categoria
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) // Controlla se la categoria include il termine di ricerca
          );
        });
    } else {
      this.searchResults = []; // Se il termine è vuoto, i risultati vengono azzerati
    }
  }

  // Funzione per pulire la barra di ricerca
  clearSearch(): void {
    this.isSearchActive = false; // Disattiva la barra di ricerca
  }

  // Prevenire la chiusura della barra di ricerca quando si clicca all'interno
  preventClose(event: MouseEvent): void {
    event.stopPropagation(); // Impedisce la propagazione dell'evento di clic
  }

  // Chiude la barra di ricerca quando si clicca fuori
  @HostListener('document:click', ['$event'])
  closeSearch(event: MouseEvent): void {
    this.isSearchActive = false; // Disattiva la barra di ricerca
  }

  // Mostra o nasconde il menu
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Inverte lo stato del menu
  }

  // Chiude il menu
  closeMenu(): void {
    this.isMenuOpen = false; // Imposta lo stato del menu come chiuso
  }
}
