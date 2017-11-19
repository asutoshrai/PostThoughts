import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {

        let url = "http://localhost:11583/token";
        let body = "username=" + username + "&password=" + password + "&grant_type=password";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });        

        return this.http.post(url, body, options)
            .map((response: Response) => {
                // login successful if there's a brearer token in the response
                let user = response.json();
                if (user && user.access_token) {
                    // store user details and bearer token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    isLoggedIn(){
        if(localStorage.getItem('currentUser')) return true;
        else return false;
    }

    getUserName(){
        if(localStorage.getItem('currentUser')) 
            { return JSON.parse(localStorage.getItem('currentUser')).userName;}
        else{
return "Guest";
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}