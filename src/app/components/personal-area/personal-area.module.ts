import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonalAreaComponent } from './personal-area.component';
import { PaymentMethodsComponent } from '../payment-methods/payment-methods.component';
import { PreventivoComponent } from '../preventivo/preventivo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaniesComponent, DialogDetailsCompanyComponent } from '../companies/companies.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgPipesModule } from 'ngx-pipes';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
  { path: '', component: PersonalAreaComponent },
  { path: 'preventivo', component: PreventivoComponent },
  { path: 'payment-methods', component: PaymentMethodsComponent },
  { path: 'companies', component: CompaniesComponent },
];

@NgModule({
  declarations: [
    PersonalAreaComponent,
    PreventivoComponent,
    PaymentMethodsComponent,
    CompaniesComponent,
    DialogDetailsCompanyComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    MatChipsModule,
    MatTabsModule,
    MatExpansionModule,
    MatCardModule,
    MatRippleModule,
    MatListModule,
    
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgPipesModule,
  ],
  exports: [PersonalAreaComponent],
})
export class PersonalAreaModule {}
