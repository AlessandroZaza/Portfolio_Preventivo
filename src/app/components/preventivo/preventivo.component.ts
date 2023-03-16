import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-preventivo',
  templateUrl: './preventivo.component.html',
  styleUrls: ['./preventivo.component.css'],
})
export class PreventivoComponent {

  domainName: string = '';
  maintenance: number | undefined;
  date: Date | undefined;
  result: number | undefined;
  myForm: FormGroup;
  service: string = '';

  domains: string[] = ['google.com', 'facebook.com', 'apple.com'];
  message: string | undefined;
  arrService: string = '';
  isCheck: boolean = false;
  
  constructor() {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      service: new FormControl('', Validators.required),
      domain: new FormControl('0', Validators.required),
      maintenance: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      domainName: new FormControl(''),
    });
  }

  submit() {
    /*
    console.log(`Il nome è ${this.myForm.value.name} e il cognome è ${this.myForm.value.lastName}`);
    console.log(`Il servizio selezionato è: ${this.myForm.value.service}`);
    console.log(`Hai selezionato: ${this.myForm.value.domain} per il dominio`);
    console.log(`Dominio richiesto: ${this.myForm.value.domainName}`);
    console.log(`Hai selezionato questo tipo di manutenzione: ${this.myForm.value.maintenance}`);
    console.log(`Costo di manutenzione: ${this.myForm.value.maintenance}`);
    */

    this.result =
      parseInt(this.myForm.value.service) +
      parseInt(this.myForm.value.domain) +
      parseInt(this.myForm.value.maintenance);
    /*
    console.log(`Costo finale: ${this.result}`);
  */
    this.domainName = this.myForm.value.domainName;
    if (this.domains.includes(this.domainName) || this.domainName == '') {
      this.message = 'Dominio già in uso o indisponibile';
    } else {
      this.message = 'Dominio disponibile';
    }
  }

  selectedService(event: Event): void {
    const selectedOption = event.target as HTMLSelectElement;
    const selectedOptionName = selectedOption.options[selectedOption.selectedIndex];
    if(selectedOptionName.getAttribute('name') === 'E-Commerce') {
      this.arrService = "E-Commerce";
    }
    else {
      this.arrService = "CMS";
      this.isCheck = false;
    }
  }

}