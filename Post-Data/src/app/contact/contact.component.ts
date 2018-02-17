
import { Component } from "@angular/core";
import { AuthenticationService } from "../_services/index";
import { AlertService } from '../_services/index';
import { ContactUsService } from "../_services/contact.service";


@Component({
    moduleId: module.id,
    templateUrl: 'contact.component.html',
})

export class ContactUsComponent{
    model: any = {};
    loading = false;

    constructor(
        public auth: AuthenticationService,
        private contactUsService: ContactUsService,
        private alertService: AlertService
        ) {
            
         }

    postData(){
        this.loading = true;
        this.contactUsService.create(this.model)
        .subscribe(
            data => {
                this.alertService.success("We have got your query. We will respond you back on your registered email.");
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