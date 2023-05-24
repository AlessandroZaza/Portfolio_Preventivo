import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) {}

  patchCompany(newName: string, newEmail: string, newVat: string, newPhone: string, newCountry: string, newWebsite: string) {
    // const url = `https://fakerapi.it/api/v1/companies`;
    const url = '../../../assets/editCompanies.json'
    const payload = { name: newName, email: newEmail, vat: newVat, phone: newPhone, country: newCountry, website: newWebsite };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.patch(url, payload, { headers })
  }
}
