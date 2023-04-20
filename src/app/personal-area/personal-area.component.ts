import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Users {
  email: string;
  password: string;
  phone: string;
  address: string;
  name: string;
  users: any;
}

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent implements OnInit {

 email: string = "";
 password: string = "";
 phone: string = "";
 address: string = "";
 name: string = "";
 users: any = "";

 constructor(private http: HttpClient, private router: Router) {}
  
  ngOnInit() {
    this.fetchUsers().then(data => {
      this.users = data;
      this.email = this.users[0].email;
      this.password = this.users[0].password;
      this.phone = this.users[0].phone;
      this.address = this.users[0].address;
      this.name = this.users[0].name;
    });
  }

  async fetchUsers(): Promise<Users[]> {
     try {
      const response = await fetch('../../assets/personal-area.json');
      const data = await response.json();
      return data as Users[];     
    }
    catch(error) {
      console.error(error);
      return [];
    }
  }
}

