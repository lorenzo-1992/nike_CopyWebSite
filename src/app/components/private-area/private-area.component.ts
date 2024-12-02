import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-area',
  templateUrl: './private-area.component.html',
  styleUrls: ['./private-area.component.css'], 
})
export class PrivateAreaComponent implements OnInit {
  acquisti: { nome: string; prezzo: number; immagine: [] }[] = [];
  preferiti: { nome: string; prezzo: number; immagine: [] }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Recupera i dati simulati dal localStorage
    this.acquisti = JSON.parse(localStorage.getItem('acquisti') || '[]');
    this.preferiti = JSON.parse(localStorage.getItem('preferiti') || '[]');
    console.log(this.acquisti)
  }

  logout(): void {
    localStorage.removeItem('user'); // Rimuove i dati utente
    alert('Sei stato disconnesso con successo!');
    this.router.navigate(['/login']); // Torna al login
  }
}
