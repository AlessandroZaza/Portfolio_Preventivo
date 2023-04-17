import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface ApiResponse {
  data: companies[];
}

interface companies {
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
    id: number;
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
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  loading = false;
  tableDisplay: ApiResponse = {
    data: [
      {
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
      },
    ],
  };

  private readonly apiAddress =
    'https://fakerapi.it/api/v1/companies?_quantity=';
  private readonly quantity = 10;

  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    this.loading = true;

    this.http
      .get<ApiResponse>(`${this.apiAddress}${this.quantity}`)
      .subscribe((res) => {
        this.tableDisplay = res;

        console.log('-------------------------------------');
        this.tableDisplay.data.forEach((table) => {
          console.log(
            '| Nome: ' +
              table.name +
              '\n| E-mail: ' +
              table.email +
              '\n| Vat: ' +
              table.vat +
              '\n| Phone number: ' +
              table.phone + 
              '\n| Country: ' +
              table.country +
              '\n| Street: ' +
              table.addresses[0].street +
              '\n| id: ' +
              table.id
          );
          console.log('-------------------------------------');
        });
        this.loading = false;
      });
  }
}
