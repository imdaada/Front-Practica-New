import { Component } from '@angular/core';
import {UserService} from "./user.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Praktika';
  role: string = '';
  constructor(private userService: UserService,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.getRole();
  }

  logOut () {
    this.cookieService.delete('token');
    this.cookieService.delete('username');
  }

  getRole() {
    this.userService.role().subscribe(value => {
        console.log(value);
        this.role = value.role;
      },
      error => {
        this.role = 'Unauthorized'
      });
  }
}
