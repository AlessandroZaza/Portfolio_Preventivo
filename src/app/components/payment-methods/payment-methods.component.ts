import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface CreditCardResponse {
  data: Array<{
    type: string;
    number: number;
    expiration: string;
    owner: string;
  }>;
}

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css'],
})
export class PaymentMethodsComponent implements OnInit {
  loading: boolean = false;
  cardsDisplay: CreditCardResponse = {
    data: []
  }
  private readonly apiAddress = 'https://fakerapi.it/api/v1/credit_cards?_quantity=';
  private readonly quantity = 5; 
  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.loading = true;

    let min: number;

    this.http
      .get<CreditCardResponse>(
        `${this.apiAddress}${this.quantity}`
      )
      .subscribe((res) => {
        this.cardsDisplay = res;
        this.cardsDisplay.data.sort((a, b) => a.number - b.number); // ordina in base al numero della carta
        console.log('-------------------------------------');
        this.cardsDisplay.data.forEach((card) => {
          console.log(
            '| Tipo: ' +
              card.type +
              '\n| Numero: ' +
              card.number +
              '\n| Scadenza: ' +
              card.expiration +
              '\n| Proprietario: ' +
              card.owner 
          );
          console.log('-------------------------------------');
        });
        this.loading = false;
      });
  }
}
