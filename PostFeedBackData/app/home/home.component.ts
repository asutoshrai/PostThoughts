import { Component, OnInit } from '@angular/core';
import { Story } from "../_models/story";
import { StoryService } from "../_services/story.service";
import { AlertService } from "../_services/index";

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
   
    public stories: Story[];

   constructor(
    private storyService: StoryService,
    private alertService: AlertService
    ) { }


    ngOnInit(): void {
        this.storyService.getStories()
        .subscribe(
            stories => {
                this.stories = stories;
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
                    }
                } else {
                    this.alertService.error('Something went wrong : '+errormessage);
                }
            });
    }


    }
