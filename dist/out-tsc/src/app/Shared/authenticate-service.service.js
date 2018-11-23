var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { Router } from '@angular/router';
var AuthenticateServiceService = /** @class */ (function () {
    //baseURL:string='http://localhost:60744/';
    function AuthenticateServiceService(storage, router) {
        this.storage = storage;
        this.router = router;
        this.userValue = 'userValue';
        this.sessionCreatedAt = 'sessionCreatedAt';
        this.selectedBestPriceId = 'selectedBestPriceId';
        this.ifBothUserTypeFound = 'ifBothUserTypeFound';
        this.UserTypeId = 'UserTypeId';
        this.baseURL = 'http://40.74.232.172';
    }
    AuthenticateServiceService.prototype.SaveSession = function (value) {
        this.storage.set(this.userValue, value);
        this.storage.set(this.sessionCreatedAt, new Date());
    };
    AuthenticateServiceService.prototype.UpdateSession = function (value) {
        this.storage.set(this.userValue, value);
        this.storage.set(this.sessionCreatedAt, new Date());
    };
    AuthenticateServiceService.prototype.AuthenticateSession = function () {
        var val = this.storage.get(this.userValue);
        var sessionDate = this.storage.get(this.sessionCreatedAt);
        if (val == undefined || val == null) {
            this.router.navigate(['/login']);
        }
        if ((new Date().getTime() - new Date(sessionDate).getTime()) > 7200000) {
            //alert("Session expired. Please login again.")
            this.router.navigate(['/login']);
        }
    };
    AuthenticateServiceService.prototype.GetUserId = function () {
        var userId = this.storage.get(this.userValue);
        return JSON.parse(userId)[0].UserId;
    };
    AuthenticateServiceService.prototype.GetLenderName = function () {
        var userId = this.storage.get(this.userValue);
        return JSON.parse(userId)[0].NameOfCompany;
    };
    AuthenticateServiceService.prototype.GetEmailId = function () {
        var userId = this.storage.get(this.userValue);
        return JSON.parse(userId)[0].EmailAddress;
    };
    AuthenticateServiceService.prototype.GetBorrowerName = function () {
        var userId = this.storage.get(this.userValue);
        return JSON.parse(userId)[0].Bank;
    };
    AuthenticateServiceService.prototype.GetUserTypeId = function () {
        var userId = this.storage.get(this.userValue);
        return JSON.parse(userId)[0].UserTypeId;
    };
    AuthenticateServiceService.prototype.GetUserDetail = function () {
        var userId = this.storage.get(this.userValue);
        return JSON.parse(userId)[0];
    };
    AuthenticateServiceService.prototype.ClearSession = function () {
        this.storage.remove(this.userValue);
        this.storage.remove(this.selectedBestPriceId);
        this.storage.remove(this.sessionCreatedAt);
        this.storage.remove(this.ifBothUserTypeFound);
    };
    AuthenticateServiceService.prototype.SaveSelectedTimePeriodId = function (value) {
        this.storage.set(this.selectedBestPriceId, value);
    };
    AuthenticateServiceService.prototype.GetSavedSelectedTimePeriodId = function () {
        var Id = this.storage.get(this.selectedBestPriceId);
        return Id;
    };
    AuthenticateServiceService.prototype.SaveIfBothUserTypeFound = function (value) {
        this.storage.set(this.ifBothUserTypeFound, value);
    };
    AuthenticateServiceService.prototype.GetIfBothUserTypeFound = function () {
        var Id = this.storage.get(this.ifBothUserTypeFound);
        return Id;
    };
    AuthenticateServiceService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(0, Inject(LOCAL_STORAGE)),
        __metadata("design:paramtypes", [Object, Router])
    ], AuthenticateServiceService);
    return AuthenticateServiceService;
}());
export { AuthenticateServiceService };
//# sourceMappingURL=authenticate-service.service.js.map