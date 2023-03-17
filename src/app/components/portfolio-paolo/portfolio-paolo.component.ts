import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-paolo',
  templateUrl: './portfolio-paolo.component.html',
  styleUrls: ['./portfolio-paolo.component.css'],
})
export class PortfolioPaoloComponent {

  // dichiara una variabile per il valore dell'input
inputValue: string = '';

// definisci una funzione per gestire l'evento "keydown"
onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') { // controlla se è stato premuto il tasto "Invio"
    console.log(this.inputValue); // stampa il valore dell'input nella console
    this.inputValue = ''; // svuota l'input box
  }
}

onSubmit() {
  console.log(this.inputValue); // stampa il valore dell'input nella console
  this.inputValue = ''; // svuota l'input box
  return false; // impedisce il comportamento predefinito del form di aggiornare la pagina
}


}
