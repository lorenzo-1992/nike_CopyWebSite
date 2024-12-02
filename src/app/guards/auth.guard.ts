import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('user');
    console.log(!!localStorage.getItem('user'))
    if (!isAuthenticated) {
      alert('Devi effettuare l\'accesso per accedere all\'area privata.');
      this.router.navigate(['/login']); // Reindirizza al login
      return false;
    }
    return true;
  }
}
