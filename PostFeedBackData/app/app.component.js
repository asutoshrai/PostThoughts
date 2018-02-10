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
var index_1 = require("./_services/index");
var router_1 = require("@angular/router");
// declare var jquery:any;
// declare var $ :any;
var AppComponent = (function () {
    function AppComponent(auth, router, userService) {
        this.auth = auth;
        this.router = router;
        this.userService = userService;
        if (auth.isLoggedIn()) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }
    AppComponent.prototype.ngOnInit = function () {
        //
    };
    AppComponent.prototype.logout = function () {
        this.auth.logout();
        this.router.navigate(['/login']);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app',
        templateUrl: 'app.component.html',
    }),
    __metadata("design:paramtypes", [index_1.AuthenticationService, router_1.Router, index_1.UserService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map