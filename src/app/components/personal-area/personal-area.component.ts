import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent implements OnInit {
  email: string = '';
  name: string = '';
  lastName: string = '';
  address: string = '';
  phoneNumber: number = 0;
  pfp: string = '';
  
  constructor() { }

  ngOnInit(): void {
    const userLogged = JSON.parse(localStorage.getItem('userLogged') || '{}');
    this.email = userLogged.email;
    this.name = userLogged.name;
    this.lastName = userLogged.lastName;
    this.address = userLogged.address;
    this.phoneNumber = userLogged.phoneNumber;
    this.pfp = userLogged.pfp;
  }
}