import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map } from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Observable } from 'rxjs';

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

  totalCompanies: number = 0;
  currentPage: number = 0;
  pageSize: number = 0;
  pages: number[] = [0];

  sliceTenElements: Companies[] = [];
  
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
  httpClient: any;
  httpOptions: any;
  
  constructor(public http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCompanies();
    this.filterCompanies();
    this.paginateData();
  }

  loadCompanies(): any {

    //const url = 'https://fakerapi.it/api/v1/companies'; 
    //let queryParams = new HttpParams(); 
    //queryParams = queryParams.append("_quantity", 100 ); 
    //this.http.get<ApiResponse>(url,{params:queryParams})

    this.loading = true;
    this.http.get<CompanyResponse>(`${this.apiAddress}${this.quantity}`).subscribe((response) => {
        this.CompaniesDisplay = response.data;
        this.filteredData = this.CompaniesDisplay;
        this.totalCompanies = response.total;
        this.currentPage = 0;
        this.pageSize = 10;
        this.calculatePages();
        this.filterCompanies();
        this.paginateData();
        this.goToPage(this.currentPage + 1);
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
   
  calculatePages(): void {
    const filteredCount = this.filteredData.length; //filteredCount var locale che contiene la length dell'array
    const pageCount = Math.ceil(filteredCount / this.pageSize); //pageCount var locale che calcola il num di pagine per i dati filtrati, divide filteredCount per pageSize
    this.pages = Array.from({length: pageCount}, (_, i) => i + 1); //this.pages è una proprietà dell'oggetto (o della classe) che viene popolata con un array contenente il numero di pagine calcolato in precedenza. Viene utilizzata la funzione Array.from() per creare un nuovo array di lunghezza pageCount. Ogni elemento dell'array rappresenta il numero di pagina corrispondente, che va da 1 a pageCount.

    if(this.currentPage >= this.pages.length) {
      this.currentPage = this.pages.length - 1;
      this.paginateData();
    }
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
      return this.filteredData;
    }
    console.log(this.filteredData);
    this.calculatePages();
    this.paginateData();
  }

  paginateData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.sliceTenElements = this.filteredData.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {

    if(page <= this.pages.length){
    this.currentPage = page - 1;
    this.paginateData();
   }
  }
  
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginateData();
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
      this.paginateData();
    }
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
  
  openDialog(row: Companies) {
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: Companies, private http: HttpClient) {}

  ngOnInit(): void {
    this.newName = this.data.name;
    this.newEmail = this.data.email;
    this.newVat = this.data.vat;
    this.newPhone = this.data.phone;
    this.newCountry = this.data.country;
  }

  newName: string = '';
  newEmail: string = '';
  newVat: number = 0;
  newPhone: number = 0;
  newCountry: string = '';

  patchCompany() {

    if(this.newName === this.data.name && this.newEmail === this.data.email && this.newVat === this.data.vat && this.newPhone === this.data.phone && this.newCountry === this.data.country) {
      return;
    }

    const apiUrl = 'https://fakerapi.it/api/v1/companies/1'; //api endpoint
    const payload = {
      name: this.newName,
      email: this.newEmail,
      vat: this.newVat,
      phone: this.newPhone,
      country: this.newCountry,
    };

    this.http.patch(apiUrl, payload).subscribe((response) => {
      console.log('Patch request avvenuta con successo!', response);
    });
  }
}