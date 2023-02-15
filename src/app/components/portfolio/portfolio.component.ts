import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioPaoloComponent } from '../portfolio-paolo/portfolio-paolo.component';
import { PortfolioAlessandroComponent } from '../portfolio-alessandro/portfolio-alessandro.component';
import { PortfolioProvaPaoloComponent } from '../portfolio-prova-paolo/portfolio-prova-paolo.component';

const routes: Routes = [
  {
    path: '../portfolio-paolo/portfolio-paolo.component.html',
    component: PortfolioPaoloComponent,
  },
  {
    path: '../portfolio-alessandro/portfolio-alessandro.component.html',
    component: PortfolioAlessandroComponent,
  },
  {
    path: '../portfolio-alessandro/portfolioProva-paolo.component.html',
    component: PortfolioAlessandroComponent,
  },
];

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent {}

NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
});

export class AppRoutingModule {}
