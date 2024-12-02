export interface IScarpa {
  id: number;
  nome: string;
  categoria: string;
  prezzo: number;
  taglie_disponibili: string[];
  colori_disponibili: string[];
  descrizione: string;
  immagini: string[];
  nuovo_arrivo: boolean;
  best_seller: number;
}
export class Scarpa implements IScarpa {
  id = 0;
  nome = '';
  categoria = '';
  prezzo = 0;
  taglie_disponibili: string[] = [];
  colori_disponibili: string[] = [];
  descrizione = '';
  immagini: string[] = [];
  nuovo_arrivo = false;
  best_seller = 0;
}
