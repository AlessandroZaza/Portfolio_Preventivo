import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { FormsModule } from '@angular/forms';
import {map} from 'rxjs/operators';
import { NgFor } from '@angular/common';
export interface Card {
     type: string,
     number: string,
     expiration: string,
     owner: string,
 }
 
 export interface APIResponse {
     data: Card[]
     code: string,
     status: string,
     total: number, 
 }
 
@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})

export class PaymentMethodsComponent implements OnInit {
       
       loading: boolean = false;
       card: any;
       data: any;
       selectedData: any;
       
       ngOnInit(): void {
            this.getData()//all'inizializzazione del componente vengono richiamati i dati dell'API//
                             //all'inizializzazione del componente vengono richiamati i dati dell'API//
       }

       constructor(private http: HttpClient) {}

       getData(): void {
           this.loading = true;
           this.http.get('https://fakerapi.it/api/v1/credit_cards?_quantity=5').subscribe((response: any) => {
            this.selectedData = response.data.map((card : any) => {
              return {
                type: card.type,
                number: card.number,
                expiration: card.expiration,
                owner: card.owner,
              }
            });
            console.log(this.selectedData);
            this.loading = false;
          })
           
    }
}

