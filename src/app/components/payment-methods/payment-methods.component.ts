import { Component, Input, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { FormsModule } from '@angular/forms';
import {map} from 'rxjs/operators';
import { NgFor } from '@angular/common';

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

  cardType: string = "";
  logoPath: string = "";

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
    this.getCreditCardLogo(this.cardType);
  }

  test( index : number ){ 
    this.currentCardIndex = index; //questa funzione serve al click in quanto quando clicco su una carta mi escono i dati relativi//
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
 
    

    getCreditCardLogo(cardType: string) {
        switch(this.cardType) {
          case "Visa":
            this.logoPath = "../../../assets/img-projects/visa-logo-png-2013.png";
            break;
          case "Visa Retired":
            this.logoPath = "../../../assets/img-projects/visa-logo-png-2013.png";
            break;
          case "MasterCard":
            this.logoPath = "../../../assets/img-projects/mastercard-26128.png";
            break;
          case "Discover Card":
            this.logoPath = "../../../assets/img-projects/discover-logo-png-pic-5667.png";
            break;
          case "American Express":
            this.logoPath = "../../../assets/img-projects/american-express.png";
            break;
          default:
            throw new Error("Invalid card type!");
        }
        return this.logoPath;
    }
}
