import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';

interface CompanyResponse {
  data: Array<Companies>;
}

interface Companies {
  id: number;
  name: string;
  email: string;
  vat: string;
  phone: string;
  country: string;
  addresses: addressesObj[];
  website: string;
  image: string;
  contact: {
    id: number,
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
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
  searchTermByName: any;
  searchTermByEmail: any;
  searchTermByVat: any;
  searchTermByPhone: any;
  searchTermByCountry: any;
  searchTermByAddresses: any;
  companiesDisplayFiltered : CompanyResponse = { data : [] };
  
  CompaniesDisplay: CompanyResponse = {
    data: [{
      id: 0,
      name: '',
      email: '',
      vat: '',
      phone: '',
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
        phone: '',
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
  
  private readonly apiAddress = 'https://fakerapi.it/api/v1/companies?_quantity=';
  private readonly quantity = 100;
  
  Companies: any;
  filterData = false;
  filter = '';
  CompaniesDisplayDeepCopy: CompanyResponse = {data: []};

  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): any {
    this.loading = true;
    this.http.get<CompanyResponse>(`${this.apiAddress}${this.quantity}`).subscribe((response) => {
        this.CompaniesDisplay = response;
        this.companiesDisplayFiltered = response; //stessa cosa di CompaniesDisplay, i dati della table vengono messi qua dentro//
        this.CompaniesDisplayDeepCopy = JSON.parse(JSON.stringify(this.companiesDisplayFiltered));
        this.Companies = this.CompaniesDisplay;
        console.log('------------------------------');
        this.CompaniesDisplay.data.forEach((Companies) => {
              console.log('| Name: ' +
               Companies.name +
               '\n| Email: ' +
               Companies.email +
               '\n| Vat: ' +
               Companies.vat +
               '\n| Phone: ' +
               Companies.phone + 
               '\n| Country: ' +
               Companies.country +
               '\n| Addresses: ' +
               Companies.addresses[0].street +
               '\n| Street: ' + 
               Companies.id + 
               '\n| Id: ');
        });
    });
  }

  filterCompaniesByName(searchTermByName: any): any {
    this.CompaniesDisplay.data = this.CompaniesDisplayDeepCopy.data.filter((Companies) => {
          return Companies.name.toLowerCase().includes(searchTermByName.toLowerCase());
    }); 
  }

  filterCompaniesByEmail(searchTermByEmail: any): any {
    this.CompaniesDisplay.data = this.CompaniesDisplayDeepCopy.data.filter((Companies) => {
      return Companies.email.toLowerCase().includes(searchTermByEmail.toLowerCase());
    }); 
  }

  filterCompaniesByVat(searchTermByVat: any): any {
    this.CompaniesDisplay.data = this.CompaniesDisplayDeepCopy.data.filter((Companies) => {
      return Companies.vat.toLowerCase().includes(searchTermByVat.toLowerCase());
    }); 
  }

  filterCompaniesByPhone(searchTermByPhone: any): any {
    this.CompaniesDisplay.data = this.CompaniesDisplayDeepCopy.data.filter((Companies) => {
      return Companies.phone.toLowerCase().includes(searchTermByPhone.toLowerCase());
    }); 
  }

  filterCompaniesByCountry(searchTermByCountry: any): any {
    this.CompaniesDisplay.data = this.CompaniesDisplayDeepCopy.data.filter((Companies) => {
      return Companies.country.toLowerCase().includes(searchTermByCountry.toLowerCase());
    }); 
  }

  filterCompaniesByAddresses(searchTermByAddresses: any): any {
    this.CompaniesDisplay.data = this.CompaniesDisplayDeepCopy.data.filter((Companies) => {
      return Companies.addresses[0].street.toLowerCase().includes(searchTermByAddresses.toLowerCase());
    }); 
  }

  resetCompaniesFilters() {
    this.searchTermByName = '';
    this.searchTermByEmail = '';
    this.searchTermByVat = '';
    this.searchTermByPhone = '';
    this.searchTermByCountry = '';
    this.searchTermByAddresses = '';
    this.loadCompanies();
  }
  
}
