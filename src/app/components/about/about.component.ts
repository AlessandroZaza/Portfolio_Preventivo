import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../personal-area/user.service';

export interface AboutData {
  title: string;
  description: string;
  location: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  // aboutData: any;
  // newTitle!: string;
  // public aboutUrl = '../../../assets/testAbout.json';

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
    // this.onGetUsers();
    // this.onGetUser();
  }

  // onGetUsers(): void{
  //   this.userService.getUsers().subscribe(
  //     (response: any) => console.log(response),
  //     (error: any) => console.log(error),
  //     () => console.log('Done getting users'),
  //   )
  // }

  // onGetUser(): void{
  //   this.userService.getUser().subscribe(
  //     (response: any) => console.log(response),
  //     (error: any) => console.log(error),
  //     () => console.log('Done getting users'),
  //   )
  // }

  // ngOnInit(): void {
  //   this.http.get<AboutData>('../../../assets/testAbout.json').subscribe(data => {
  //     this.aboutData = data;
  //   });
  // }

  // updateTitle() {
  //   const url = '../../../assets/testAbout.json';
  //   const data: AboutData = { title: this.newTitle, description: this.aboutData.description, location: this.aboutData.location };
  //   this.http.patch<AboutData>(url, data).subscribe(data => {
  //     this.aboutData.title = data.title;
  //   },
    // error => {
    //   console.log(error);
    // }
  //   );
  // }
}
