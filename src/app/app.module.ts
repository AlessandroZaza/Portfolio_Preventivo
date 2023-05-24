import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PortfolioPaoloComponent } from './components/portfolio-paolo/portfolio-paolo.component';
import { PortfolioAlessandroComponent } from './components/portfolio-alessandro/portfolio-alessandro.component';
import { PortfolioprovapaoloComponent } from './components/portfolioprovapaolo/portfolioprovapaolo.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonalAreaModule } from './personal-area/personal-area.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginModule } from './login/login.module';
import { MatTableModule } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { DialogDataDialog } from './components/companies/companies.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PortfolioComponent,
    PortfolioPaoloComponent,
    PortfolioAlessandroComponent,
    PortfolioprovapaoloComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgFor,
    RouterModule.forChild([]),
    CarouselModule,
    LoginModule,
    FormsModule,
    CommonModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
