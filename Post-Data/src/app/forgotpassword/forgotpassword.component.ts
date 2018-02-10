import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'forgotpassword.component.html'
})

export class ForgotPasswordComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    forgot() {
        this.loading = true;
        this.userService.forgotPassword(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Password reset email has been sent to you!', true);
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
