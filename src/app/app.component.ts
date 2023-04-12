import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Portfolio_Preventivo';
  isLogged: boolean = false;

  constructor() {}
  ngDoCheck(): void {
    this.isLogged=JSON.parse(localStorage.getItem("isLogged") || 'false');
  }
}
