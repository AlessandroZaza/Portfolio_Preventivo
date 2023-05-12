import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

interface CompanyResponse {
  status: string;
  code: number;
  total: number;
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

// interface companyFilter {
//   name: string;
//   email: string;
//   vat: string;
//   phone: string;
//   country: string;
//   addresses: string[];
// }

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit{
  
  loading = false;
  searchTermByName: string = '';
  searchTermByEmail: string = '';
  searchTermByVat: string = '';
  searchTermByPhone: string = '';
  searchTermByCountry: string = '';
  searchTermByAddresses: string = '';
  companiesDisplayFiltered : CompanyResponse = {
    data: [],
    status: '',
    code: 0,
    total: 0
  };
  
  
  CompaniesDisplay: CompanyResponse = {
    status: '',
    code: 0,
    total: 0,
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
    },],
  };
  
  private readonly apiAddress = 'https://fakerapi.it/api/v1/companies?_quantity=';
  private readonly quantity = 100;
  
  Companies: any;
  CompaniesDisplayDeepCopy: CompanyResponse = {
    data: [],
    status: '',
    code: 0,
    total: 0
  };
  filteredData = this.CompaniesDisplayDeepCopy;
  filters: any = '';
  displayedColumns: string[] = ['id','name', 'email', 'phone', 'vat', 'country', 'addresses']; // colonne che voglio visualizzare nella tabella
  dataSource: any = this.CompaniesDisplayDeepCopy; // dichiara la proprietà dataSource come una nuova istanza di MatTableDataSource, inizializzata con un array vuoto di oggetti Company

  constructor(public http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCompanies();
    console.log(this.dataSource);
  }

  loadCompanies(): any {
    this.loading = true;
    this.http.get<CompanyResponse>(`${this.apiAddress}${this.quantity}`).subscribe((response) => {
        this.CompaniesDisplay = response;
        this.companiesDisplayFiltered = response; //stessa cosa di CompaniesDisplay, i dati della table vengono messi qua dentro//
        this.CompaniesDisplayDeepCopy = JSON.parse(JSON.stringify(this.CompaniesDisplay));
        this.Companies = this.CompaniesDisplay;
        //console.log('------------------------------'); adios
        //this.CompaniesDisplay.data.forEach((Companies) => {
          //    console.log('| Name: ' +
            //   Companies.name +
            //   '\n| Email: ' +
            //   Companies.email +
            //   '\n| Vat: ' +
            //   Companies.vat +
            //   '\n| Phone: ' +
            //   Companies.phone + 
            //   '\n| Country: ' +
            //   Companies.country +
            //   '\n| Addresses: ' +
            //   Companies.addresses[0].street +
            //   '\n| Street: ' + 
            //   Companies.id + 
            //   '\n| Id: ');
        //});
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

  filterCompanies(): any {
    let filteredData = this.CompaniesDisplayDeepCopy.data;
    if(this.searchTermByName || this.searchTermByEmail || this.searchTermByVat || this.searchTermByPhone || this.searchTermByCountry || this.searchTermByAddresses){
      filteredData = filteredData.filter((company) => {
        return(company.name.toLowerCase().includes(this.searchTermByName.toLowerCase()) &&
        company.email.toLowerCase().includes(this.searchTermByEmail.toLowerCase()) && 
        company.vat.toLowerCase().includes(this.searchTermByVat.toLowerCase()) &&
        company.phone.toLowerCase().includes(this.searchTermByPhone.toLowerCase()) &&
        company.country.toLowerCase().includes(this.searchTermByCountry.toLowerCase())
       );
      });
    } 
    else {
      this.CompaniesDisplay.data = filteredData;
    };
    
    this.CompaniesDisplayDeepCopy = this.dataSource;
    //this.dataSource = this.CompaniesDisplayDeepCopy;
    console.log(filteredData);
    return filteredData;
    
  }     

  //  filterCompany(
  //   details: companyFilter[],
  //   searchTermByName: string,
  //   searchTermByEmail: string,
  //   searchTermByVat: string,
  //   searchTermByPhone: string,
  //   searchTermByCountry: string,
  //   searchTermByAddresses: string
  // ): companyFilter[] {
  //   return details.filter((detail) => {
  //     const nameMatch = detail.name.toLowerCase().includes(searchTermByName.toLowerCase());
  //     const emailMatch = detail.email.toLowerCase().includes(searchTermByEmail.toLowerCase());
  //     const vatMatch = detail.vat.toLowerCase().includes(searchTermByVat.toLowerCase());
  //     const phoneMatch = detail.phone.toLowerCase().includes(searchTermByPhone.toLowerCase());
  //     const countryMatch = detail.country.toLowerCase().includes(searchTermByCountry.toLowerCase());
  //     const addressesMatch = detail.addresses.some((addresses) => addresses.toLowerCase().includes(searchTermByAddresses.toLowerCase()));
  //     return nameMatch && emailMatch && vatMatch && phoneMatch && countryMatch && addressesMatch;
  //   });
  // }

  openDialog() {
    this.dialog.open(DialogDataDialog, {
      data: {
        details: this.CompaniesDisplay,
      },
    });
  }
}

@Component({
  selector: 'dialog-company-data',
  templateUrl: 'dialog-company-data.html',
})

export class DialogDataDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Companies) {}
}
