import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css'],
})
export class PaymentMethodsComponent {
  constructor(private http: HttpClient) {
    const result = document.createElement('div');
    this.http
      .get('https://fakerapi.it/api/v1/credit_cards?_quantity=5')
      .subscribe((data) => {
        result.textContent = JSON.stringify(data);
        document.body.appendChild(result);
      });
  }
  
}
