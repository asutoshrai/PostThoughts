
import { Component } from "@angular/core";

import { AlertService } from '../_services/index';
import { StoryService } from "../_services/story.service";

@Component({
    moduleId: module.id,
    templateUrl: 'story.component.html'
})

export class StoryComponent{
    model: any = {};
    loading = false;

    constructor(
        private storyService: StoryService,
        private alertService: AlertService
        ) { }

    postData(){
        this.loading = true;
        this.storyService.create(this.model)
        .subscribe(
            data => {
                this.alertService.success("Your story is posted!!!");
                this.loading = false;
            },
            (error) => {
                let errormessage='';
                if (error.status === 400) {
                    // handle validation error
                    let body = JSON.parse(error._body).ModelState;
                    for (var key in body) {
                        for (var i = 0; i < body[key].length; i++) {
                            errormessage+=body[key][i];
                        }
                        this.alertService.error(errormessage);
                        this.loading = false;
                    }
                } else {
                    this.alertService.error('Something went wrong : '+errormessage);
                    this.loading = false;
                }
            });
    }

}