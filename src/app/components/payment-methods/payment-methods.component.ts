import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface CreditCardResponse {
  data: Array<Card>;
}

interface Card {
  type: string;
  number: number;
  expiration: string;
  owner: string;
}

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css'],
})
export class PaymentMethodsComponent implements OnInit {

  loading = false;
  currentCardIndex : number = 0;
  cardsDisplay: CreditCardResponse = {
    data: [
      {
        type: '',
        number: 0,
        expiration: '',
        owner: ''
      }
    ]
  }

  private readonly apiAddress = 'https://fakerapi.it/api/v1/credit_cards?_quantity=';
  private readonly quantity = 5; 

  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.loadCards();
  }

  test( index : number ){ 
    this.currentCardIndex = index;
  }
    
  loadCards(): void {
    this.loading = true;

    this.http
      .get<CreditCardResponse>(
        `${this.apiAddress}${this.quantity}`
      )
      .subscribe((res) => {
        this.cardsDisplay = res;
        this.cardsDisplay.data.sort((a, b) => a.number - b.number); // ordina in base al numero della carta
        //  console.log('-------------------------------------');
        //  this.cardsDisplay.data.forEach((card) => {
        //    console.log(
        //   '| Tipo: ' +
        //       card.type +
        //        '\n| Numero: ' +
        //        card.number +
        //        '\n| Scadenza: ' +
        //        card.expiration +
        //        '\n| Proprietario: ' +
        //        card.owner 
        //    );
        //    console.log('-------------------------------------');
        //  });
        this.loading = false;
      });
  }
}

