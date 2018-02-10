import { OnInit,Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'confirmemail.component.html'
})

export class ConfirmEmailComponent implements OnInit {
    model: any = {};
    loading = false;
    userid:string;
    code:string;
    isConfirmed:boolean=false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
         }
    
    ngOnInit(): void {
    //    subscribe to router event

    this.userid=this.activatedRoute.snapshot.queryParams['userid'];
    this.code=this.activatedRoute.snapshot.queryParams['code'];
    }

    cofirmEmail() {
        this.loading = true;
        this.userService.confirmEmail(this.userid,this.code)
            .subscribe(
                data => {
                    this.loading = false;
                    this.isConfirmed=true;
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
