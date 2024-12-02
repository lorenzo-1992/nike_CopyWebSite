import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>(''); // Valore iniziale
  searchQuery$ = this.searchSubject.asObservable(); // Osservabile per ascoltare i cambiamenti

  setSearchQuery(query: string): void {
    this.searchSubject.next(query); // Aggiorna il valore della ricerca
  }
}
