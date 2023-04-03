import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  
  users: any;

  password: string = '';
  email: string = '';

  isLogged = false;
  loginTrue = false;
  loginFalse = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Recupera i dati degli utenti dal file JSON
    this.http.get('../../../assets/users.json').subscribe(data => {
      this.users = data;
    });
  }

  login(email: string, password: string) {
    // Cerca l'utente con le credenziali inserite dall'utente
    const user = this.users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      this.isLogged = true;
      console.log('Accesso consentito');
      this.router.navigate(['/home']);
      console.log(this.isLogged);
      this.loginTrue = true;
    } else {
      console.log('Accesso negato');
      console.log(this.isLogged);
      this.loginFalse = true;
    }
  }
}
