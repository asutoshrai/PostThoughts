import { Component } from '@angular/core';
import { AuthenticationService, UserService } from "./_services/index";
import { Router } from "@angular/router";
import { CurrentUser } from "./_models/index";

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    currentUser: CurrentUser;
  
    constructor(private auth: AuthenticationService, private router: Router,private userService: UserService) {
      if(auth.isLoggedIn()){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}
    }
  
    logout() {
      this.auth.logout()
      this.router.navigate(['/login']);
    }
  }