import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Story, StoryModel } from '../_models/story';

@Injectable()
export class StoryService {
    constructor(private http: Http) { }

    create(story: Story) {
        let userId=JSON.parse(localStorage.getItem('currentUser')).userName;
        let currentDate=new Date();
        let body={'Data':''+story.data+'','UserId':''+userId+'','CreatedOn':''+currentDate+''}
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = this.tokenHeader();        

        return this.http.post('http://localhost:11583/api/feedback', body, options)
        .map((response: Response) => response);
    }

    getStories(currentPage :number,pageSize :number){
        let body={};
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = this.tokenHeader();        

        return this.http.get('http://localhost:11583/api/feedback?currentPage='+currentPage+'&maxItems='+pageSize+'', options)
        .map((response:Response)=><StoryModel>response.json())
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