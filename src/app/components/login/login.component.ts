import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  users: any;
  password: string = '';
  email: string = '';
  errorMessage: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Recupera i dati degli utenti dal file JSON
    this.http.get('../../../assets/users.json').subscribe((data) => {
      this.users = data;
    });
  }

  login(email: string, password: string) {
    // Cerca l'utente con le credenziali inserite dall'utente
    const user = this.users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      console.log('Accesso consentito');
      localStorage.setItem('userLogged', JSON.stringify(user));
      this.router.navigate(['/personal-area']);

      localStorage.setItem('isLogged', JSON.stringify(true));
    } else {
      this.errorMessage = true;
      console.log('Accesso negato');
    }
  }
}
