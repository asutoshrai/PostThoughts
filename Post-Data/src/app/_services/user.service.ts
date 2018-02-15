import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    private baseUrl = environment.apiBaseUrl;
    constructor(private http: Http) { }

    create(user: User) {
        let body=user;// {'Email':''+user.email+'','Password':''+user.password+'','ConfirmPassword':''+user.confirmPassword+''}
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });        

        return this.http.post(this.baseUrl+'api/account/register', body, options)
        .map((response: Response) => response);
    }

    forgotPassword(user: User) {
        let body= {'Email':''+user.email+''};
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });        

        return this.http.post(this.baseUrl+'api/account/ForgotPassword', body, options)
        .map((response: Response) => response);
    }

    resetPassword(userid:string,code:string,password:string) {
        let body= {'UserId':''+userid+'','Code':''+code+'','Password':''+password+''};
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });        

        return this.http.post(this.baseUrl+'api/account/ResetPassword', body, options)
        .map((response: Response) => response);
    }

    confirmEmail(userid:string,code:string) {
        let body= {'UserId':''+userid+'','Code':''+code+''};
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });        

        return this.http.post(this.baseUrl+'api/account/ConfirmEmail', body, options)
        .map((response: Response) => response);
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}