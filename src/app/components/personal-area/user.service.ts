import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = {
    name: 'Mario',
    lastName: 'Rossi',
    phoneNumber: ''
  };

  constructor() { }

  getUser() {
    return this.user;
  }
}
