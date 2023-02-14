import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioPaoloComponent } from '../portfolio-paolo/portfolio-paolo.component';

const routes: Routes = [
  {
    path: '../portfolio-paolo/portfolio-paolo.component.html',
    component: PortfolioPaoloComponent,
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
