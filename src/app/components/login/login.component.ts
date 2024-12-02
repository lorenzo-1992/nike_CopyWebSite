import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../model/userdata';
import { AutenthicationService } from '../../services/autenthication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userData = new UserData();

  constructor(private router: Router, private authSrv: AutenthicationService) {}

  onLogin(): void {
    if (this.userData.email && this.userData.password) {
      // Simula l'accesso
      this.authSrv.login(this.userData);
      this.router.navigate(['/private']);
    } else {
      alert('Errore durante il login. Riprova.');
    }
  }
}
