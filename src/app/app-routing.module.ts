import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PortfolioPaoloComponent } from './components/portfolio-paolo/portfolio-paolo.component';
import { PortfolioAlessandroComponent } from './components/portfolio-alessandro/portfolio-alessandro.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'portfolio-paolo', component: PortfolioPaoloComponent },
  { path: 'portfolio-alessandro', component: PortfolioAlessandroComponent },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule)},
  { path: 'personal-area', loadChildren: () => import('./components/personal-area/personal-area.module').then((m) => m.PersonalAreaModule)},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
