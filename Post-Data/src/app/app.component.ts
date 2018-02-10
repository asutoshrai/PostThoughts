import { Component,OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "./_services/index";
import { Router } from "@angular/router";
import { CurrentUser } from "./_models/index";
// declare var jquery:any;
// declare var $ :any;


@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html',
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
     //
  }
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