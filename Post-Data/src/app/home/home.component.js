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
var story_service_1 = require("../_services/story.service");
var index_1 = require("../_services/index");
var index_2 = require("../_services/index");
var HomeComponent = (function () {
    function HomeComponent(storyService, alertService, pagerService) {
        this.storyService = storyService;
        this.alertService = alertService;
        this.pagerService = pagerService;
        // pager object
        this.pager = {};
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.setPage(1);
    };
    HomeComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.assignStories(page, 5);
        // this.pager = this.pagerService.getPager(this.allItems, page,5);
    };
    HomeComponent.prototype.assignStories = function (currentPage, pageSize) {
        var _this = this;
        this.storyService.getStories(currentPage, pageSize)
            .subscribe(function (story) {
            _this.pagedItems = story.stories;
            _this.allItems = story.totalCount;
            _this.pager = _this.pagerService.getPager(_this.allItems, currentPage, 5);
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
                }
            }
            else {
                _this.alertService.error('Something went wrong : ' + errormessage);
            }
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'home.component.html'
    }),
    __metadata("design:paramtypes", [story_service_1.StoryService,
        index_1.AlertService,
        index_2.PagerService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map