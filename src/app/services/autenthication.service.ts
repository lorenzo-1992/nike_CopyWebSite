import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserData, UserData } from '../model/userdata';

@Injectable({
  providedIn: 'root',
})
export class AutenthicationService {
  private readonly loggedUser = new BehaviorSubject<undefined | UserData>(
    undefined
  );
  readonly loggedUser$ = this.loggedUser.asObservable(); // $ indica che una proprietà è observables , da la possibilità alle classi esterne se quella proprità è cambiata o meno

  constructor() {
    this.restore();
  }

  login(userData: IUserData) {
    localStorage.setItem('user', JSON.stringify(userData));
    this.loggedUser.next(userData); // dentro bheaviorSubject salvo i dati utente
  }
  logout() {
    localStorage.removeItem('user');
    this.loggedUser.next(undefined); // quando si disconnette, resetto il loggedUser
  }

  private restore() {
    const user = JSON.parse(localStorage.getItem('user'));

    this.loggedUser.next(user);
  }
}
