import { CommonModule } from '@angular/common';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { PersonalAreaModule } from '../personal-area/personal-area.module';
import { AuthGuard } from 'auth-guard';

const routes: Routes = [{path: '', component: LoginComponent}];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [LoginComponent]
})

export class LoginModule {}
