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
export class PaymentMethodsComponent {

}
