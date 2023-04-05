import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonalAreaComponent } from './personal-area.component';
import { PaymentMethodsComponent } from '../payment-methods/payment-methods.component';

interface CreditCardResponse {
  data: Array<Card>;
}

interface Card {
  type: string;
  number: number;
  expiration: string;
  owner: string;
}

const routes: Routes = [
  { path: '', component: PersonalAreaComponent }
];

@NgModule({
  declarations: [
    PersonalAreaComponent,
    PaymentMethodsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    PersonalAreaComponent
  ]
})
export class PersonalAreaModule { }
