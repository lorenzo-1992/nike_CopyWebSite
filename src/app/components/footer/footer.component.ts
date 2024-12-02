import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  activeSection: string | null = null;

  toggleSection(section: string): void {
    if (this.activeSection === section) {
      this.activeSection = null; // Chiude la sezione
    } else {
      this.activeSection = section; // Apre la sezione selezionata
    }
  }
}
