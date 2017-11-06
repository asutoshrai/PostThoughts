import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                (error) => {
                    let errormessage='';
                    if (error.status === 400) {
                        // handle validation error
                        let validationErrorDictionary = JSON.parse(error.text());
                        for (var fieldName in validationErrorDictionary) {
                            if (validationErrorDictionary.hasOwnProperty(fieldName)) {
                                errormessage+=validationErrorDictionary[fieldName]+"\n";
                            }
                            this.alertService.error(errormessage);
                            this.loading = false;
                        }
                    } else {
                        this.alertService.error(errormessage);
                        this.loading = false;
                    }
                });

            }
}
