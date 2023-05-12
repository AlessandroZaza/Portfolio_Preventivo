import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

interface CompanyResponse {
  filter: any[];
  status: string;
  code: number;
  total: number;
  data: Array<Companies>;
}

interface Companies {
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

export class CompaniesComponent implements OnInit {
  
  loading = false;
  searchTermByName: string = '';
  searchTermByEmail: string = '';
  searchTermByVat: string = '';
  searchTermByPhone: string = '';
  searchTermByCountry: string = '';
  searchTermByAddresses: string = '';
 
  CompaniesDisplay: Companies[] = [];
  filteredData: Companies[] = [];
  DialogDataDialog: Companies[] = [];
  
  private readonly apiAddress = 'https://fakerapi.it/api/v1/companies?_quantity=';
  private readonly quantity = 100;
  
  Companies: any;
  CompaniesDisplayDeepCopy: CompanyResponse = {
    data: [],
    status: '',
    code: 0,
    total: 0,
    filter: [],
  };
  
  displayedColumns: string[] = ['id','name', 'email', 'phone', 'vat', 'country', 'addresses']; // colonne che voglio visualizzare nella tabella
  data: any;
  
  constructor(public http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCompanies();
    this.filteredData = this.CompaniesDisplay;
  }

  loadCompanies(): any {

    //const url = 'https://fakerapi.it/api/v1/companies'; 
    //let queryParams = new HttpParams(); 
    //queryParams = queryParams.append("_quantity", 100 ); 
    //this.http.get<ApiResponse>(url,{params:queryParams})

    this.loading = true;
    this.http.get<CompanyResponse>(`${this.apiAddress}${this.quantity}`).subscribe((response) => {
        this.CompaniesDisplay = response.data;
        //this.CompaniesDisplayDeepCopy = JSON.parse(JSON.stringify(this.CompaniesDisplay));
        this.filteredData = this.CompaniesDisplay;
        console.log('------------------------------'); 
        this.CompaniesDisplay.forEach((Companies) => {
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
    if (this.searchTermByName || this.searchTermByEmail || this.searchTermByVat || this.searchTermByPhone || this.searchTermByCountry || this.searchTermByAddresses) {
      this.filteredData = this.CompaniesDisplay.filter((company: {
        addresses: any; name: string; email: string; vat: { toString: () => string; }; phone: { toString: () => string; }; country: string;}) =>
        company.name.toLowerCase().includes(this.searchTermByName.toLowerCase()) &&
        company.email.toLowerCase().includes(this.searchTermByEmail.toLowerCase()) &&
        company.vat.toString().toLowerCase().includes(this.searchTermByVat.toString().toLowerCase()) &&
        company.phone.toString().toLowerCase().includes(this.searchTermByPhone.toString().toLowerCase()) &&
        company.country.toLowerCase().includes(this.searchTermByCountry.toLowerCase())     
      );
    } else {
      this.filteredData = this.CompaniesDisplay;
      console.log(this.filteredData);
      return this.filteredData;
    }
  }
  
  openDialog( row: Companies) {
    console.log(row)
    this.dialog.open(DialogDataDialog, {
      data: row,
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
function openDialog() {
  throw new Error('Function not implemented.');
}