import { OnInit,Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'resetpassword.component.html'
})

export class ResetPasswordComponent implements OnInit {
    model: any = {};
    loading = false;
    userid:string;
    code:string;

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

    reset() {
        this.loading = true;
        this.userService.resetPassword(this.userid,this.code,this.model.password)
            .subscribe(
                data => {
                    this.alertService.success('Password has been reset. Please login to access an account', true);
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
