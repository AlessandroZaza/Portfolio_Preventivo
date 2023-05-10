import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalAreaComponent } from './personal-area.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreventivoComponent } from '../components/preventivo/preventivo.component';
import { PaymentMethodsComponent } from '../components/payment-methods/payment-methods.component';
import { LoginComponent } from '../login/login.component';
import { CompaniesComponent } from '../components/companies/companies.component';
import { MatHeaderCellDef, MatTableModule } from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';


const routes: Routes = [ 
  { path: '', component: PersonalAreaComponent },
  { path: 'preventivo', component: PreventivoComponent },
  { path: 'payment-methods', component: PaymentMethodsComponent },
  { path: 'companies', component: CompaniesComponent },
];

 @NgModule({
  declarations: [PersonalAreaComponent, PreventivoComponent, PaymentMethodsComponent, CompaniesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, MatTableModule, MatExpansionModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  schemas: [NO_ERRORS_SCHEMA],
})

export class PersonalAreaModule {}


