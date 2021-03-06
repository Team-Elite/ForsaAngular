var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AuthenticateServiceService } from '../../Shared/authenticate-service.service';
var BankDashboardService = /** @class */ (function () {
    function BankDashboardService(http, authenticateServiceService) {
        this.http = http;
        this.authenticateServiceService = authenticateServiceService;
        this.userId = 0;
        this.NewPassword = '';
        this.ConfirmPassword = '';
        this.lastGroupId = '';
    }
    BankDashboardService.prototype.GetRateOfInterestOfBank = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.authenticateServiceService.baseURL + '/api/BankDashBoard/GetRateOfInterestOfBank?userId=' + this.userId).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    BankDashboardService.prototype.UpdateRateOfInterest = function (rateModel) {
        var body = JSON.stringify(rateModel);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/UpdateRateOfInterestOfBank', body, requestOptions).map(function (x) { return x.json(); });
    };
    BankDashboardService.prototype.PublishAndUnPublish = function (IsPublished) {
        //var body=JSON.stringify(rateModel);
        var headerOptions = new Headers({ 'Content-Type': 'application/text' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/PublishAndUnPublish?IsPublished=' + IsPublished + "&userId=" + this.userId, requestOptions).map(function (x) { return x.json(); });
    };
    BankDashboardService.prototype.GetUserGroupForSettingRateOfInterestVisibility = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.authenticateServiceService.baseURL + '/api/BankDashBoard/GetUserGroupForSettingRateOfInterestVisibility?userId=' + this.userId).map(function (data) {
                            return data.json();
                        }).toPromise().then(function (x) {
                            _this.listUserGroupForSettingRateOfInterestVisibility = x;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BankDashboardService.prototype.UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible = function (GroupIds) {
        //var body=JSON.stringify(rateModel);
        var headerOptions = new Headers({ 'Content-Type': 'application/text' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible?GroupIds=' + GroupIds + "&userId=" + this.userId, requestOptions).map(function (x) { return x.json(); });
    };
    BankDashboardService.prototype.UpdateUserProfile = function (userModel) {
        var body = JSON.stringify(userModel);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.authenticateServiceService.baseURL + '/api/User/UpdateUser', body, requestOptions).map(function (x) { return x.json(); });
    };
    BankDashboardService.prototype.GetLenderSendRequestRequestdOnTheBasisOfBorrowerId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.authenticateServiceService.baseURL + '/api/BankDashBoard'
                            + '/GetLenderSendRequestRequestdOnTheBasisOfBorrowerId?borrowerId=' + this.userId).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    BankDashboardService.prototype.UpdateLenderSendRequestRateOfInterest = function (lenderSendRequestModel) {
        var body = JSON.stringify(lenderSendRequestModel);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/UpdateRateOfInterest', body, requestOptions).map(function (x) { return x.json(); });
    };
    BankDashboardService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http, AuthenticateServiceService])
    ], BankDashboardService);
    return BankDashboardService;
}());
export { BankDashboardService };
//# sourceMappingURL=bank-dashboard.service.js.map