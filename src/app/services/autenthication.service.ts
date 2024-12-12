import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUserData, UserData } from '../model/userdata';

@Injectable({
  providedIn: 'root', // Rende il servizio disponibile in tutta l'applicazione
})
export class AutenthicationService {
  private readonly loggedUser = new BehaviorSubject<undefined | UserData>(undefined);
  readonly loggedUser$ = this.loggedUser.asObservable();

  private apiUrl = 'http://localhost:3000/users'; // URL della sezione `users` nel file JSON

  constructor(private http: HttpClient) {
    this.restore(); // Ripristina lo stato dell'utente dal localStorage se presente
  }

  // Effettua il login dell'utente controllando il file JSON
  login(email: string, password: string): void {
    this.http.get<IUserData[]>(this.apiUrl).subscribe((users) => {
      const user = users.find(
        (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.password === password
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedUser.next(user);
      } else {
        alert('Credenziali non valide. Riprova.');
      }
    });
  }

  // Effettua il logout dell'utente
  logout(): void {
    localStorage.removeItem('user');
    this.loggedUser.next(undefined);
  }

  // Ripristina lo stato dell'utente al caricamento del servizio
  private restore(): void {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    this.loggedUser.next(user);
  }
}
