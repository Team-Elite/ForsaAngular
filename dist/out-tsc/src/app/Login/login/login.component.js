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
import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { AuthenticateServiceService } from '../../Shared/authenticate-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LenderDashboardService } from '../../lender-dashboard/Shared/lender-dashboard.service';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(loginService, authenticateServiceService, router, toastr, spinner, lenderDashboardService) {
        this.loginService = loginService;
        this.authenticateServiceService = authenticateServiceService;
        this.router = router;
        this.toastr = toastr;
        this.spinner = spinner;
        this.lenderDashboardService = lenderDashboardService;
        this.IfVerificationDone = false;
        this.IfShowPassword = false;
    }
    LoginComponent.prototype.resolved = function (captchaResponse) {
        if (captchaResponse != undefined && captchaResponse != null && captchaResponse.trim().length != 0) {
            this.IfVerificationDone = true;
        }
        else {
            this.IfVerificationDone = false;
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.loginService.loginModel = {
            UserName: '',
            UserPassword: '',
            ForgotPasswordEmailId: '',
        };
    };
    LoginComponent.prototype.ValidateUser = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var expression, user, IfBothUserTypeFound, startPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        if (!(form != null)) return [3 /*break*/, 6];
                        if (form.value.UserName == undefined || form.value.UserName == null || form.value.UserName.trim().length == 0) {
                            this.toastr.error("User name / Email id is required.", "Login");
                            return [2 /*return*/, false];
                        }
                        if (form.value.UserName.indexOf('@') > -1) {
                            expression = void 0;
                            expression = new RegExp(/^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/);
                            if (form.value.UserName != undefined && form.value.UserName != null && form.value.UserName.length != 0) {
                                if (!expression.test(form.value.UserName)) {
                                    this.toastr.error("Email address is not valid.", "Login");
                                    return [2 /*return*/, false];
                                }
                            }
                        }
                        if (form.value.UserPassword == undefined || form.value.UserPassword == null || form.value.UserPassword.trim().length == 0) {
                            this.toastr.error("Password is required.", "Login");
                            return [2 /*return*/, false];
                        }
                        // if(!this.IfVerificationDone){
                        //    this.toastr.error("Please verify captcha.","Login");
                        //    return false;
                        // }
                        this.spinner.show();
                        return [4 /*yield*/, this.loginService.ValidateUser(form.value)];
                    case 1:
                        user = _a.sent();
                        if (!(user.IsSuccess == true)) return [3 /*break*/, 5];
                        debugger;
                        this.authenticateServiceService.SaveSession(user.data);
                        IfBothUserTypeFound = JSON.parse(user.data)[0].UserTypeId.split(',').length > 1 ? true : false;
                        if (IfBothUserTypeFound) {
                            this.authenticateServiceService.SaveIfBothUserTypeFound(IfBothUserTypeFound);
                        }
                        if (!(JSON.parse(user.data)[0].UserTypeId == 4 || IfBothUserTypeFound)) return [3 /*break*/, 2];
                        this.router.navigate(['/bankDashBoard']);
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(JSON.parse(user.data)[0].UserTypeId == 5 || JSON.parse(user.data)[0].UserTypeId == 6)) return [3 /*break*/, 4];
                        this.lenderDashboardService.userId = this.authenticateServiceService.GetUserId();
                        return [4 /*yield*/, this.lenderDashboardService.GetLenderStartPage()];
                    case 3:
                        startPage = _a.sent();
                        this.lenderDashboardService.StartingScreen = JSON.parse(startPage.data);
                        if (this.lenderDashboardService.StartingScreen[0].PageName == "Best Price View") {
                            this.router.navigate(['lenderDashboard/BestPriceView']);
                        }
                        else if (this.lenderDashboardService.StartingScreen[0].PageName == "View All Price") {
                            this.router.navigate(['lenderDashboard/ViewAllPrice']);
                        }
                        else if (this.lenderDashboardService.StartingScreen[0].PageName == "All Banks") {
                            this.router.navigate(['lenderDashboard/AllBanks']);
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.spinner.hide();
                        this.toastr.error("User Name / Email Id or Password is incorrect.", "Login");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.ForgotPassword = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var expression, forgotEmail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        if (form.value.ForgotPasswordEmailId == undefined || form.value.ForgotPasswordEmailId == null || form.value.ForgotPasswordEmailId.trim().length == 0) {
                            this.toastr.error("Email id is required.", "Login");
                            return [2 /*return*/, false];
                        }
                        expression = new RegExp(/^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/);
                        if (form.value.ForgotPasswordEmailId != undefined && form.value.ForgotPasswordEmailId != null && form.value.ForgotPasswordEmailId.length != 0) {
                            if (!expression.test(form.value.ForgotPasswordEmailId)) {
                                this.toastr.error("Email address is not valid.", "Login");
                                return [2 /*return*/, false];
                            }
                        }
                        this.spinner.show();
                        return [4 /*yield*/, this.loginService.ForgotPassword(form.value)];
                    case 1:
                        forgotEmail = _a.sent();
                        if (forgotEmail.IsSuccess == true) {
                            this.toastr.success("Password sent.", "Login - Forgot Password");
                        }
                        else {
                            this.spinner.hide();
                            this.toastr.error("Email id is wrong.", "Login - Forgot Password");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.keydown = function (event) {
        this.IfShowPassword = true;
    };
    LoginComponent.prototype.keyup = function (event) {
        this.IfShowPassword = false;
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [LoginService, AuthenticateServiceService,
            Router, ToastrService,
            NgxSpinnerService,
            LenderDashboardService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map