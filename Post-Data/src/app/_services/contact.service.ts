import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ContactUs } from '../_models/contactus';
import { environment } from '../../environments/environment';

@Injectable()
export class ContactUsService {
    private baseUrl = environment.apiBaseUrl;
    constructor(private http: Http) { }

    create(contactus: ContactUs) {
        let userId=JSON.parse(localStorage.getItem('currentUser')).userName;
        let currentDate=new Date();
        let body={'Data':''+contactus.data+'','CreatedBy':''+userId+'','CreatedOn':''+currentDate+''}
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = this.tokenHeader();        

        return this.http.post(this.baseUrl+'api/contactus', body, options)
        .map((response: Response) => response);
    }
    // private helper methods

    private tokenHeader() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.access_token) {
            let headers = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + currentUser.access_token });
            return new RequestOptions({ headers: headers });
        }
    }
}