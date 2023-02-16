import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PreventivoComponent } from './components/preventivo/preventivo.component';
import { PortfolioPaoloComponent } from './components/portfolio-paolo/portfolio-paolo.component';
import { PortfolioAlessandroComponent } from './components/portfolio-alessandro/portfolio-alessandro.component';
import { PortfolioprovapaoloComponent } from './components/portfolioprovapaolo/portfolioprovapaolo.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PortfolioComponent,
    PreventivoComponent,
    PortfolioPaoloComponent,
    PortfolioAlessandroComponent,
    PortfolioprovapaoloComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
