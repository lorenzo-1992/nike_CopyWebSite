import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenthicationService } from '../../services/autenthication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AutenthicationService,
    private router: Router
  ) {}

  onLogin(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password);
      this.authService.loggedUser$.subscribe((user) => {
        if (user) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Credenziali non valide. Riprova.';
        }
      });
    } else {
      this.errorMessage = 'Compila tutti i campi.';
    }
  }
}
