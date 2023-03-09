import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  // dichiara una variabile per il valore dell'input
  inputName: string = '';
  inputEmail: string = '';
  inputText: string = '';

  onSubmit() {
    console.log('Nome: ' + this.inputName); // stampa il valore dell'input nella console
    console.log('Indirizzo e-mail: ' + this.inputEmail);
    console.log('Messaggio: ' + this.inputText);

    return false; // impedisce il comportamento predefinito del form di aggiornare la pagina
  }
}
