import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

interface ApiResponse {
  data: companies[];
}

export interface companies {
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

export interface addressesObj {
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
  loading = false; // booleana per attivare o disattivare il loading
  tableDisplay!: ApiResponse; // = {
  //   data: [
  //     {
  //       id: 0,
  //       name: '',
  //       email: '',
  //       vat: '',
  //       phone: '',
  //       country: '',
  //       addresses: [
  //         {
  //           id: 0,
  //           street: '',
  //           streetName: '',
  //           buildingNumber: 0,
  //           city: '',
  //           zipcode: 0,
  //           country: '',
  //           county_code: '',
  //           latitude: 0,
  //           longitude: 0,
  //         },
  //       ],
  //       website: '',
  //       image: '',
  //       contact: {
  //         id: 0,
  //         firstname: '',
  //         lastname: '',
  //         email: '',
  //         phone: 0,
  //         birthday: 0,
  //         gender: '',
  //         address: {
  //           id: 0,
  //           street: '',
  //           streetName: '',
  //           buildingNumber: 0,
  //           city: '',
  //           zipcode: 0,
  //           country: '',
  //           county_code: '',
  //           latitude: 0,
  //           longitude: 0,
  //         },
  //         website: '',
  //         image: '',
  //       },
  //     },
  //   ],
  // };
  countries: string[] = []; // array contenente tutti gli stati per la select (con parole duplicate)
  uniqueCountries: string[] = []; // array contenente tutti gli stati per la select (senza parole duplicate)
  filterName: any; // testo inserito dall'utente per filtrare i nomi
  filterEmail: any; // testo inserito dall'utente per filtrare l'e-mail
  filterVat: any; // testo inserito dall'utente per filtrare il vat
  filterPhone: any; // testo inserito dall'utente per filtrare il numero di telefono
  filterChipsForName: string = ''; // stringa contenuta all'interno della chip per il filtro name
  filterChipsForEmail: string = ''; // stringa contenuta all'interno della chip per il filtro email
  filterChipsForVat: string = ''; // stringa contenuta all'interno della chip per il filtro vat
  filterChipsForPhone: string = ''; // stringa contenuta all'interno della chip per il filtro phone
  filterChipsForCountry: string = ''; // stringa contenuta all'interno della chip per il filtro country
  selectedCountry: string = 'All state'; // stato selezionato
  filteredCompanies: ApiResponse = { data: [] }; // tabella filtrata, ora vuota, andrà a popolarsi successivamente
  filterBoxName = false; // booleana per far apparire il div con il filtro (nome) inserito dall'utente
  filterBoxEmail = false; // booleana per far apparire il div con il filtro (email) inserito dall'utente
  filterBoxVat = false; // booleana per far apparire il div con il filtro (vat) inserito dall'utente
  filterBoxPhone = false; // booleana per far apparire il div con il filtro (phone) inserito dall'utente
  filterBoxCountry = false; // booleana per far apparire il div con il filtro (stato) inserito dall'utente
  filterBoxWithResults = false; // booleana per far apparire il div con tutti i filtri e il numero di risultati
  viewOptions = false; // booleana per far apparire il div con le View Options della tabella
  viewFilterSection = false; // booleana per far apparire il div con le sezioni per i filtri della tabella
  visibleColumns = [true, true, true, true, true, true, true, false]; // array di booleani per settare quali colonne devono essere visibili o no

  displayedColumns: string[] = [
    'id',
    'Name',
    'E-mail',
    'Vat',
    'Phone number',
    'Country',
    'Street',
  ];

  private readonly apiAddress =
    'https://fakerapi.it/api/v1/companies?_quantity=';
  private readonly quantity = 100;

  constructor(public http: HttpClient, public dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    this.loading = true;

    this.http
      .get<ApiResponse>(`${this.apiAddress}${this.quantity}`)
      .subscribe((res) => {
        this.tableDisplay = res;

        //metodo per creare una copia della tabella originale senza referenze
        this.filteredCompanies = JSON.parse(JSON.stringify(this.tableDisplay));

        // funzione per popolare l'array countries e ordinarlo
        this.tableDisplay.data.forEach((company) => {
          this.countries.push(company.country);
        });

        this.countries.sort((a, b) => {
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          return 0;
        });

        // metodo per creare una copia dell'array countries senza parole duplicate
        this.uniqueCountries = Array.from(new Set(this.countries));

        this.loading = false;
      });
  }
  
  // funzione per aprire la modale con i dettagli della company selezionata
  openCompanyDetails(
    row: companies,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    console.log(row);
    this.dialog.open(DialogDetailsCompanyComponent, {
      width: '100vh',
      enterAnimationDuration,
      exitAnimationDuration,
      data: row,
      autoFocus: true,
      restoreFocus: false
    });
  }

  // funzione per filtrare per nome
  filterTableByName(filterName: string) {
    this.filterBoxWithResults = true;
    this.filterBoxName = true;
    this.filterChipsForName = filterName;
    this.filteredCompanies.data = this.filteredCompanies.data.filter(
      (company) => {
        return company.name.toLowerCase().includes(filterName.toLowerCase());
      }
    );
  }
  filterTableByEmail(filterEmail: string) {
    this.filterBoxWithResults = true;
    this.filterBoxEmail = true;
    this.filterChipsForEmail = filterEmail;
    this.filteredCompanies.data = this.filteredCompanies.data.filter(
      (company) => {
        return company.email.toLowerCase().includes(filterEmail.toLowerCase());
      }
    );
  }
  filterTableByVat(filterVat: string) {
    this.filterBoxWithResults = true;
    this.filterBoxVat = true;
    this.filterChipsForVat = filterVat;
    this.filteredCompanies.data = this.filteredCompanies.data.filter(
      (company) => {
        return company.vat.toLowerCase().includes(filterVat.toLowerCase());
      }
    );
  }
  filterTableByPhoneNumber(filterPhone: string) {
    this.filterBoxWithResults = true;
    this.filterBoxPhone = true;
    this.filterChipsForPhone = filterPhone;
    this.filteredCompanies.data = this.filteredCompanies.data.filter(
      (company) => {
        return company.phone.toLowerCase().includes(filterPhone.toLowerCase());
      }
    );
  }
  filterTableByCountry() {
    if (this.selectedCountry != 'All state') {
      this.filteredCompanies.data = this.filteredCompanies.data.filter(
        (company) => company.country === this.selectedCountry      
      );
      this.filterBoxWithResults = true;
      this.filterChipsForCountry = this.selectedCountry;
      this.filterBoxCountry = true;
    }
  }

  // funzione per gestire il campo name vuoto
  nameFilterEmpty() {
    this.filterBoxName = false;
    this.filteredCompanies = JSON.parse(JSON.stringify(this.tableDisplay));
    if (
      this.filterBoxName == false &&
      this.filterBoxEmail == false &&
      this.filterBoxVat == false &&
      this.filterBoxPhone == false &&
      this.filterBoxCountry == false
    ) {
      this.filterBoxWithResults = false;
    }
  }
  emailFilterEmpty() {
    this.filterBoxEmail = false;
    this.filteredCompanies = JSON.parse(JSON.stringify(this.tableDisplay));
    if (
      this.filterBoxName == false &&
      this.filterBoxEmail == false &&
      this.filterBoxVat == false &&
      this.filterBoxPhone == false &&
      this.filterBoxCountry == false
    ) {
      this.filterBoxWithResults = false;
    }
  }
  vatFilterEmpty() {
    this.filterBoxVat = false;
    this.filteredCompanies = JSON.parse(JSON.stringify(this.tableDisplay));
    if (
      this.filterBoxName == false &&
      this.filterBoxEmail == false &&
      this.filterBoxVat == false &&
      this.filterBoxPhone == false &&
      this.filterBoxCountry == false
    ) {
      this.filterBoxWithResults = false;
    }
  }
  phoneFilterEmpty() {
    this.filterBoxPhone = false;
    this.filteredCompanies = JSON.parse(JSON.stringify(this.tableDisplay));
    if (
      this.filterBoxName == false &&
      this.filterBoxEmail == false &&
      this.filterBoxVat == false &&
      this.filterBoxPhone == false &&
      this.filterBoxCountry == false
    ) {
      this.filterBoxWithResults = false;
    }
  }

  //funzione per resettare tutti i filtri con il button reset
  resetAllFilter() {
    // this.filteredCompanies = JSON.parse(JSON.stringify(this.tableDisplay));
    this.filterBoxWithResults = false;
    this.filterBoxName = false;
    this.filterName = '';
    this.filterBoxEmail = false;
    this.filterEmail = '';
    this.filterBoxVat = false;
    this.filterVat = '';
    this.filterBoxPhone = false;
    this.filterPhone = '';
    this.filterBoxCountry = false;
    this.selectedCountry = 'All state';
  }

  // funzione per rimuovere il filtro cliccando la chip
  removeFilterName() {
    this.filterBoxName = false;
    this.filterName = '';
    this.filteredCompanies = JSON.parse(JSON.stringify(this.tableDisplay));
    if (
      this.filterBoxName == false &&
      this.filterBoxEmail == false &&
      this.filterBoxVat == false &&
      this.filterBoxPhone == false &&
      this.filterBoxCountry == false
    ) {
      this.filterBoxWithResults = false;
    }
    this.searchButton();
  }
  removeFilterEmail() {
    this.filterBoxEmail = false;
    this.filterEmail = '';
    this.filteredCompanies = JSON.parse(JSON.stringify(this.tableDisplay));
    if (
      this.filterBoxName == false &&
      this.filterBoxEmail == false &&
      this.filterBoxVat == false &&
      this.filterBoxPhone == false &&
      this.filterBoxCountry == false
    ) {
      this.filterBoxWithResults = false;
    }
    this.searchButton();
  }
  removeFilterVat() {
    this.filterBoxVat = false;
    this.filterVat = '';
    this.filteredCompanies = JSON.parse(JSON.stringify(this.tableDisplay));
    if (
      this.filterBoxName == false &&
      this.filterBoxEmail == false &&
      this.filterBoxVat == false &&
      this.filterBoxPhone == false &&
      this.filterBoxCountry == false
    ) {
      this.filterBoxWithResults = false;
    }
    this.searchButton();
  }
  removeFilterPhone() {
    this.filterBoxPhone = false;
    this.filterPhone = '';
    this.filteredCompanies = JSON.parse(JSON.stringify(this.tableDisplay));
    if (
      this.filterBoxName == false &&
      this.filterBoxEmail == false &&
      this.filterBoxVat == false &&
      this.filterBoxPhone == false &&
      this.filterBoxCountry == false
    ) {
      this.filterBoxWithResults = false;
    }
    this.searchButton();
  }
  removeFilterCountry() {
    this.filterBoxCountry = false;
    this.selectedCountry = 'All state';
    this.filteredCompanies = JSON.parse(JSON.stringify(this.tableDisplay));
    if (
      this.filterBoxName == false &&
      this.filterBoxEmail == false &&
      this.filterBoxVat == false &&
      this.filterBoxPhone == false &&
      this.filterBoxCountry == false
    ) {
      this.filterBoxWithResults = false;
    }
    this.searchButton();
  }

  // funzione per far apparire il div con le view options
  openViewOptions() {
    if (this.viewOptions == false) {
      this.viewOptions = true;
      this.viewFilterSection = false;
    } else {
      this.viewOptions = false;
    }
  }

  // funzione per far apparire il div filter section
  openFilterSection() {
    if (this.viewFilterSection == false) {
      this.viewFilterSection = true;
      this.viewOptions = false;
    } else {
      this.viewFilterSection = false;
    }
  }

  // funzione per rendere visibile o invisibile una colonna della table
  isColumnVisible(i: number) {
    if (this.visibleColumns[i] == true) {
      this.visibleColumns[i] = false;
    } else {
      this.visibleColumns[i] = true;
    }
  }

  // funzione per rendere tutte le colonne invisibili
  hideAll() {
    this.visibleColumns.fill(false);
  }
  // funzione per rendere tutte le colonne visibili
  displayAll() {
    this.visibleColumns.fill(true);
  }

  //funzione per il bottone ricerca dei filtri
  searchButton() {
    if (this.filterName == '') {
      this.nameFilterEmpty();
    }
    if (this.filterEmail == '') {
      this.emailFilterEmpty();
    }
    if (this.filterVat == '') {
      this.vatFilterEmpty();
    }
    if (this.filterPhone == '') {
      this.phoneFilterEmpty();
    }
    if (this.selectedCountry == '' || 'All state'){
      this.filterBoxCountry = false;
      this.filterBoxWithResults = false;
    }
    if (this.filterName) {
      this.filterTableByName(this.filterName);
    }
    if (this.filterEmail) {
      this.filterTableByEmail(this.filterEmail);
    }
    if (this.filterVat) {
      this.filterTableByVat(this.filterVat);
    }
    if (this.filterPhone) {
      this.filterTableByPhoneNumber(this.filterPhone);
    }
    if (this.selectedCountry) {
      this.filterTableByCountry();
    }
    this.viewFilterSection = false;
  }
}

@Component({
  selector: 'dialogDetailsCompany',
  templateUrl: 'dialogDetailsCompany.html',
  styleUrls: ['./companies.component.css'],
})
export class DialogDetailsCompanyComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDetailsCompanyComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: companies
  ) {}
}
