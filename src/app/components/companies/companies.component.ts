import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';

interface UsersResponde {
  data: Array<Users>;
}

interface Users {
  id: number;
  name: string;
  email: string;
  vat: number;
  phone: number;
  country: string;
  addresses: addressesObj[];
  website: string;
  image: string;
  contact: {
    id: number,
    firstname: string;
    lastname: string;
    email: string;
    phone: number;
    birthday: number;
    gender: string;
    address: {
      id: number;
      street: string;
      streetName: string;
      buildingNumber: number;
      city: string;
      zipcode: number;
      country: string;
      county_code: string;
      latitude: number;
      longitude: number;
    };
    website: string;
    image: string;
  };
}

interface addressesObj {
  id: number;
  street: string;
  streetName: string;
  buildingNumber: number;
  city: string;
  zipcode: number;
  country: string;
  county_code: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit{
  
  loading = false;
  searchTerm: any;

  UsersDisplay: UsersResponde = {
    data: [{
      id: 0,
      name: '',
      email: '',
      vat: 0,
      phone: 0,
      country: '',
      addresses: [{
        id: 0,
        street: '',
        streetName: '',
        buildingNumber: 0,
        city: '',
        zipcode: 0,
        country: '',
        county_code: '',
        latitude: 0,
        longitude: 0,
      }],
      website: '',
      image: '',
      contact: {
        id: 0,
        firstname: '',
        lastname: '',
        email: '',
        phone: 0,
        birthday: 0,
        gender: '',
        address: {
          id: 0,
          street: '',
          streetName: '',
          buildingNumber: 0,
          city: '',
          zipcode: 0,
          country: '',
          county_code: '',
          latitude: 0,
          longitude: 0,
        },
        website: '',
        image: '',

      },

    },]
  };
  
  filterData = false;
  filter = '';

  private readonly apiAddress = 'https://fakerapi.it/api/v1/companies?_quantity=';
  private readonly quantity = 100;
  
  Users: any;

  constructor(public http: HttpClient) {}
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): any {
    this.loading = true;
    this.http.get<UsersResponde>(`${this.apiAddress}${this.quantity}`).subscribe((response) => {
        this.UsersDisplay = response;
        this.Users = this.UsersDisplay;
        console.log('------------------------------');
        this.UsersDisplay.data.forEach((Users) => {
              console.log('| Name: ' +
               Users.name +
               '\n| Email: ' +
               Users.email +
               '\n| Vat: ' +
               Users.vat +
               '\n| Phone: ' +
               Users.phone + 
               '\n| Country: ' +
               Users.country +
               '\n| Addresses: ' +
               Users.addresses[0].street +
               '\n| Street: ' + 
               Users.id + 
               '\n| Id: ');
        });
    });
  }

  filterUsers(searchTerm: string) {
    this.filterData = true;
    this.filter = searchTerm;
    this.UsersDisplay.data = this.UsersDisplay.data.filter((user) => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}


