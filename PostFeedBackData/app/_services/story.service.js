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
var http_1 = require("@angular/http");
var StoryService = (function () {
    function StoryService(http) {
        this.http = http;
    }
    StoryService.prototype.create = function (story) {
        var userId = JSON.parse(localStorage.getItem('currentUser')).userName;
        var currentDate = new Date();
        var body = { 'Data': '' + story.data + '', 'UserId': '' + userId + '', 'CreatedOn': '' + currentDate + '' };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = this.tokenHeader();
        return this.http.post('http://localhost:11583/api/feedback/', body, options)
            .map(function (response) { return response; });
    };
    StoryService.prototype.getStories = function () {
        var body = {};
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = this.tokenHeader();
        return this.http.get('http://localhost:11583/api/feedback/', options)
            .map(function (response) { return response.json(); });
    };
    // private helper methods
    StoryService.prototype.tokenHeader = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.access_token) {
            var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUser.access_token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return StoryService;
}());
StoryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], StoryService);
exports.StoryService = StoryService;
//# sourceMappingURL=story.service.js.map