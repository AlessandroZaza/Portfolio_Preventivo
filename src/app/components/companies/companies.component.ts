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
  countries: string[] = []; // array degli stati per il filtro a tendina
  filterText: any; // testo inserito dall'utente per filtrare i nomi
  filter: string = ''; 
  selectedCountry: any; // stato selezionato
  filteredCompanies: ApiResponse = { data: [] }; // tabella filtrata, ora vuota, andrà a popolarsi successivamente
  noFilterTable = true; // booleana per far apparire o meno la tabella con i filtri o senza
  filterBoxText = false; // booleana per far apparire il div con il filtro (nome) inserito dall'utente
  filterBoxCountry = false; // booleana per far apparire il div con il filtro (stato) inserito dall'utente
  filterBoxWithResults = false; // booleana per far apparire il div con tutti i filtri e il numero di risultati
  viewOptions = false; // booleana per far apparire il div con le View Options della tabella
  visibleColumns = [true, true, true, true, true, true, true, false]; // array di booleani per settare quali colonne devono essere visibili o no

  private readonly apiAddress =
    'https://fakerapi.it/api/v1/companies?_quantity=';
  private readonly quantity = 100;

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

        // funzione per popolare l'array countries e ordinarlo 
        this.tableDisplay.data.forEach(company => { this.countries.push(company.country)}); 
        this.countries.sort((a,b)=> {
          if (a > b) { return 1 }
          if (a < b) { return -1}
          return 0;
        })

        this.loading = false;
      });
  }

  
  filterCompanies(filterText: string) {
    this.filterBoxWithResults = true;
    this.filterBoxText = true;
    this.noFilterTable = false;
    this.filter = filterText;
    if(filterText == ''){
      this.resetFilterText();
    }
    this.filteredCompanies.data = this.tableDisplay.data.filter((company) => {
      return company.name.toLowerCase().includes(filterText.toLowerCase());
    }); 
}

filterTableByCountry() {
  if (this.selectedCountry === 'Tutti gli stati') {
    this.filteredCompanies.data = this.tableDisplay.data;
  } else {
    this.filteredCompanies.data = this.tableDisplay.data.filter(company => company.country === this.selectedCountry);
  }
  this.filterBoxWithResults = true;
  this.noFilterTable = false;
  this.filterBoxCountry = true;
}
  
  resetFilterText() {
    this.filterBoxText = false;
    this.filterText = '';
    this.noFilterTable = true;
    if(this.filterBoxText == false && this.filterBoxCountry == false){
      this.filterBoxWithResults = false;
    }
  }  
  resetFilterCountry() {
    this.filterBoxCountry = false;
    this.selectedCountry = 'Tutti gli stati';
    this.noFilterTable = true;
    if(this.filterBoxText == false && this.filterBoxCountry == false){
      this.filterBoxWithResults = false;
    }
  }  
 
  openViewOptions(){
    if(this.viewOptions == false){
      this.viewOptions = true;
    } else {
      this.viewOptions = false;
    }
  }

  visibleOrInvisible(i: number){
    if(this.visibleColumns[i] == true){
      this.visibleColumns[i] = false;
    } else {
      this.visibleColumns[i] = true;
    }
  }

  hideAll(){
    this.visibleColumns.fill(false);
  }
  displayAll(){
    this.visibleColumns.fill(true);
  }

  
}
