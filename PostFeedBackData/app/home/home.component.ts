import { Component, OnInit } from '@angular/core';
import { Story } from "../_models/story";
import { StoryService } from "../_services/story.service";
import { AlertService } from "../_services/index";
import { PagerService } from '../_services/index'

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    public stories: Story[];
    // pager object
    pager: any = {};
    
    // array of all items to be paged
    private allItems: number;
// paged items
    pagedItems: any[];
    totalPages:number;

   constructor(
    private storyService: StoryService,
    private alertService: AlertService,
    private pagerService: PagerService
    ) { 
       
    }

    ngOnInit(): void {
       this.setPage(1);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.assignStories(page,5)
       // this.pager = this.pagerService.getPager(this.allItems, page,5);
        
    }

    assignStories(currentPage:number,pageSize:number){
        this.storyService.getStories(currentPage,pageSize)
        .subscribe(
            story => {
               this.pagedItems = <Array<Story>> story.stories;
               this.allItems=story.totalCount;
               this.pager=this.pagerService.getPager(this.allItems, currentPage,5);
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
