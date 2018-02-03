"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("../_services/index");
var ConfirmEmailComponent = (function () {
    function ConfirmEmailComponent(activatedRoute, router, userService, alertService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
        this.isConfirmed = false;
    }
    ConfirmEmailComponent.prototype.ngOnInit = function () {
        //    subscribe to router event
        this.userid = this.activatedRoute.snapshot.queryParams['userid'];
        this.code = this.activatedRoute.snapshot.queryParams['code'];
    };
    ConfirmEmailComponent.prototype.cofirmEmail = function () {
        var _this = this;
        this.loading = true;
        this.userService.confirmEmail(this.userid, this.code)
            .subscribe(function (data) {
            _this.loading = false;
            _this.isConfirmed = true;
        }, function (error) {
            var errormessage = '';
            if (error.status === 400) {
                // handle validation error
                var body = JSON.parse(error._body).ModelState;
                for (var key in body) {
                    for (var i = 0; i < body[key].length; i++) {
                        errormessage += body[key][i];
                    }
                    _this.alertService.error(errormessage);
                    _this.loading = false;
                }
            }
            else {
                _this.alertService.error('Something went wrong : ' + errormessage);
                _this.loading = false;
            }
        });
    };
    return ConfirmEmailComponent;
}());
ConfirmEmailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'confirmemail.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        index_1.UserService,
        index_1.AlertService])
], ConfirmEmailComponent);
exports.ConfirmEmailComponent = ConfirmEmailComponent;
//# sourceMappingURL=confirmemail.component.js.map