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
var RegistrationService = /** @class */ (function () {
    function RegistrationService(http, authenticateServiceService) {
        this.http = http;
        this.authenticateServiceService = authenticateServiceService;
        this.confirmEmailAddress = '';
        this.AcceptTermsAndConditions = false;
        this.ShowSection2 = false;
        this.ShowSection3 = false;
    }
    RegistrationService.prototype.getCountryList = function () {
        var _this = this;
        this.http.get(this.authenticateServiceService.baseURL + '/api/Country/GettblCountries').map(function (data) {
            return data.json();
        }).toPromise().then(function (x) {
            _this.CountryList = x;
        });
    };
    RegistrationService.prototype.getDepositInsuranceList = function () {
        var _this = this;
        this.http.get(this.authenticateServiceService.baseURL + '/api/DepositInsurance/GetDepositInsurance').map(function (data) {
            return data.json();
        }).toPromise().then(function (x) {
            _this.listDepositInsurance = x;
        });
    };
    RegistrationService.prototype.GetRatingAgeNturList = function () {
        var _this = this;
        this.http.get(this.authenticateServiceService.baseURL + '/api/RatingAgeNtur/GetRatingAgeNtur').map(function (data) {
            return data.json();
        }).toPromise().then(function (x) {
            _this.listRatingAgeNturModel1 = x;
        });
    };
    RegistrationService.prototype.GetRatingAgeNturList2 = function () {
        var _this = this;
        this.http.get(this.authenticateServiceService.baseURL + '/api/RatingAgeNtur/GetRatingAgeNtur').map(function (data) {
            return data.json();
        }).toPromise().then(function (x) {
            _this.listRatingAgeNturModel2 = x;
        });
    };
    RegistrationService.prototype.GetSubGroupList = function () {
        var _this = this;
        this.http.get(this.authenticateServiceService.baseURL + '/api/SubGroup/GetSubGroup').map(function (data) {
            return data.json();
        }).toPromise().then(function (x) {
            _this.listSubGroupModel = x;
        });
    };
    RegistrationService.prototype.GetSalutationList = function () {
        var _this = this;
        this.http.get(this.authenticateServiceService.baseURL + '/api/Salutation/GetSalutation').map(function (data) {
            return data.json();
        }).toPromise().then(function (x) {
            _this.listSalutationModel = x;
        });
    };
    RegistrationService.prototype.GetGroupList = function () {
        var _this = this;
        this.http.get(this.authenticateServiceService.baseURL + '/api/Group/GetGroup').map(function (data) {
            return data.json();
        }).toPromise().then(function (x) {
            _this.listGroupModel = x;
        });
    };
    RegistrationService.prototype.getLanguageList = function () {
        var _this = this;
        this.http.get(this.authenticateServiceService.baseURL + '/api/Language/GettblLanguages').map(function (data) { return data.json(); }).toPromise().then(function (x) { _this.languageList = x; });
    };
    RegistrationService.prototype.RegisterUser = function (user) {
        var body = JSON.stringify(user);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.authenticateServiceService.baseURL + '/api/User/PosttblUser', body, requestOptions).map(function (x) { return x.json(); });
    };
    RegistrationService.prototype.UpdateUserDetails = function (user) {
        var body = JSON.stringify(user);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.authenticateServiceService.baseURL + '/api/User/UpdateUserDetails', body, requestOptions).map(function (x) { return x.json(); });
    };
    RegistrationService.prototype.CheckIfUserNameIsAvailable = function (userName) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.authenticateServiceService.baseURL + '/api/User/IfUserNameAvailable?userName=' + userName).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    RegistrationService.prototype.CheckIfEmailIdIsRegistered = function (emailId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.authenticateServiceService.baseURL + '/api/User/IfEmailIdIsRegistered?emailId=' + emailId).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    RegistrationService.prototype.GetUserDetailByUserId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.authenticateServiceService.baseURL + '/api/User/GetUserDetailByUserId?userId=' + this.userId).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    RegistrationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http, AuthenticateServiceService])
    ], RegistrationService);
    return RegistrationService;
}());
export { RegistrationService };
//# sourceMappingURL=registration.service.js.map