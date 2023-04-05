import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PaymentMethodsComponent } from '../payment-methods/payment-methods.component';

interface User {
  email: string;
  password: string;
  utente: string;
  name: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent implements OnInit {
  
  id: string = ""
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.http.get<User[]>('../../../assets/users.json').subscribe(users => {
        this.user = users.find(user => user.utente === this.id)!;
      });
    });
  }
}
