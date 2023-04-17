import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonalAreaComponent } from './personal-area.component';
import { PaymentMethodsComponent } from '../payment-methods/payment-methods.component';
import { PreventivoComponent } from '../preventivo/preventivo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaniesComponent } from '../companies/companies.component';


const routes: Routes = [
  { path: '', component: PersonalAreaComponent },
  { path: 'preventivo', component: PreventivoComponent },
  { path: 'payment-methods', component: PaymentMethodsComponent },
  { path: 'companies', component: CompaniesComponent }
];

@NgModule({
  declarations: [ PersonalAreaComponent, PreventivoComponent, PaymentMethodsComponent ],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [PersonalAreaComponent],
})
export class PersonalAreaModule {}
