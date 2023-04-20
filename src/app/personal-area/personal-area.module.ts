import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalAreaComponent } from './personal-area.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreventivoComponent } from '../components/preventivo/preventivo.component';
import { PaymentMethodsComponent } from '../components/payment-methods/payment-methods.component';
import { LoginComponent } from '../login/login.component';
import { CompaniesComponent } from '../components/companies/companies.component';

const routes: Routes = [ 
  { path: '', component: PersonalAreaComponent },
  { path: 'preventivo', component: PreventivoComponent },
  { path: 'payment-methods', component: PaymentMethodsComponent },
  { path: 'companies', component: CompaniesComponent },
];

 @NgModule({
  declarations: [PersonalAreaComponent, PreventivoComponent, PaymentMethodsComponent, CompaniesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [PersonalAreaComponent, PreventivoComponent, PaymentMethodsComponent, CompaniesComponent],
})

export class PersonalAreaModule {}


