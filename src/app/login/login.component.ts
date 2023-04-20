import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
           
  password: string = '';
  signedEmail: string = '';
  users: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get('../../../assets/users.json').subscribe(data => {
      this.users = data;
    });
  }
  
  Access(signedEmail: string, password: string) {
    const user = this.users.find((user1: any) => user1.email === this.signedEmail && user1.password === this.password);
    
    if(user) {
      this.router.navigate(['/personal-area']); //se clicco sul button login mi porta nella personal area
      console.log('Login success!');
    } else {
      console.log('Login failed!');
    }

  }                 
}
