import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers() {
    throw new Error('Method not implemented.');
  }
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
