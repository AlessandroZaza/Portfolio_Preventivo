import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PreventivoComponent } from './components/preventivo/preventivo.component';
import { PortfolioPaoloComponent } from './components/portfolio-paolo/portfolio-paolo.component';
import { PortfolioAlessandroComponent } from './components/portfolio-alessandro/portfolio-alessandro.component';
import { PortfolioprovapaoloComponent } from './components/portfolioprovapaolo/portfolioprovapaolo.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'portfolio-paolo', component: PortfolioPaoloComponent },
  { path: 'portfolioprovapaolo', component: PortfolioprovapaoloComponent },
  { path: 'portfolio-alessandro', component: PortfolioAlessandroComponent },
  { path: 'preventivo', component: PreventivoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
