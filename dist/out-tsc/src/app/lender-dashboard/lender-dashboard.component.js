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
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticateServiceService } from '../Shared/authenticate-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LenderDashboardService } from './Shared/lender-dashboard.service';
import { BestPriceViewService } from '../lender-dashboard/best-price-view/Shared/best-price-view.service';
var LenderDashboardComponent = /** @class */ (function () {
    function LenderDashboardComponent(lenderDashboardService, spinner, authenticateServiceService, router, toastr, bestPriceViewService) {
        this.lenderDashboardService = lenderDashboardService;
        this.spinner = spinner;
        this.authenticateServiceService = authenticateServiceService;
        this.router = router;
        this.toastr = toastr;
        this.bestPriceViewService = bestPriceViewService;
        this.testList = [{ Id: 1, Value: 'Test1' },
            { Id: 2, Value: 'Test2' },
            { Id: 3, Value: 'Test3' },
            { Id: 4, Value: 'Test4' },
            { Id: 5, Value: 'Test5' }];
        this.IfBankResponseFound = false;
        this.IfBothUserTypeFound = false;
    }
    LenderDashboardComponent.prototype.ngOnInit = function () {
        this.spinner.show();
        debugger;
        this.authenticateServiceService.AuthenticateSession();
        this.lenderDashboardService.UserTypeId = this.authenticateServiceService.GetUserTypeId();
        console.log("this.lenderDashboardService.UserTypeId", this.lenderDashboardService.UserTypeId);
        this.lenderDashboardService.userId = this.authenticateServiceService.GetUserId();
        this.IfBothUserTypeFound = this.authenticateServiceService.GetIfBothUserTypeFound() == (undefined || null) ? false : true;
        this.lenderDashboardService.loggedInUser = this.authenticateServiceService.GetUserDetail();
        this.copyLoggedInUser = Object.assign({}, this.lenderDashboardService.loggedInUser);
        this.GetPagesForLenderSettingStartPage();
        debugger;
        this.SelectedStartPage = this.testList[0].Id;
        //this.GetLenderStartPage();
        this.bestPriceViewService.lenderSendRequestModel2 = {
            RequestId: 0,
            LenderId: 0,
            BorrowerId: 0,
            LenderName: '',
            BorrowerName: '',
            Amount: 0.00,
            StartDate: '',
            EndDate: '',
            NoOfDays: 0,
            InterestConvention: '',
            Payments: '',
            IsRequestAccepted: false,
            DateCreated: new Date(),
            DateModified: new Date(),
            RequestCreatedBy: this.bestPriceViewService.lenderDashboardService.userId,
            InterestConventionName: '',
            LenderEmailId: '',
            PaymentsName: '',
            IsAccepted: null,
            IsRejected: null,
            RateOfInterest: 0.00,
            BorrowerEmailId: '',
            MessageForForsa: '',
            IsMessageSentToForsa: false
        };
        this.SetTimeInterval();
    };
    LenderDashboardComponent.prototype.SetTimeInterval = function () {
        var _this = this;
        this.timer = setInterval(function () {
            _this.GetLenderSendRequestPendingLendedRequestByLenderId();
        }, 5000);
    };
    LenderDashboardComponent.prototype.AcceptLendedRequest = function () {
        var _this = this;
        debugger;
        for (var i = 0; i <= this.bestPriceViewService.listInterestConvention.length - 1; i++) {
            if (this.bestPriceViewService.lenderSendRequestModel2.InterestConvention == this.bestPriceViewService.listInterestConvention[i].Id) {
                this.bestPriceViewService.lenderSendRequestModel2.InterestConventionName = this.bestPriceViewService.listInterestConvention[i].Value;
                break;
            }
        }
        for (var i = 0; i <= this.bestPriceViewService.listPayments.length - 1; i++) {
            if (this.bestPriceViewService.lenderSendRequestModel2.Payments == this.bestPriceViewService.listPayments[i].Id) {
                this.bestPriceViewService.lenderSendRequestModel2.PaymentsName = this.bestPriceViewService.listPayments[i].Value;
                break;
            }
        }
        this.spinner.show();
        this.bestPriceViewService.lenderSendRequestModel2.IsAccepted = true;
        var result = this.bestPriceViewService.AcceptLendedRequest(this.bestPriceViewService.lenderSendRequestModel2).subscribe(function (data) {
            _this.toastr.success('Your deal is completed.', 'Dashboard');
            _this.spinner.hide();
            _this.SetTimeInterval();
            var element = document.getElementById('closeSendRequestModalLender');
            element.click();
        });
    };
    LenderDashboardComponent.prototype.RejectLendedRequest = function () {
        var _this = this;
        debugger;
        for (var i = 0; i <= this.bestPriceViewService.listInterestConvention.length - 1; i++) {
            if (this.bestPriceViewService.lenderSendRequestModel2.InterestConvention == this.bestPriceViewService.listInterestConvention[i].Id) {
                this.bestPriceViewService.lenderSendRequestModel2.InterestConventionName = this.bestPriceViewService.listInterestConvention[i].Value;
                break;
            }
        }
        for (var i = 0; i <= this.bestPriceViewService.listPayments.length - 1; i++) {
            if (this.bestPriceViewService.lenderSendRequestModel2.Payments == this.bestPriceViewService.listPayments[i].Id) {
                this.bestPriceViewService.lenderSendRequestModel2.PaymentsName = this.bestPriceViewService.listPayments[i].Value;
                break;
            }
        }
        this.spinner.show();
        this.bestPriceViewService.lenderSendRequestModel2.IsRejected = true;
        var result = this.bestPriceViewService.RejectLendedRequest(this.bestPriceViewService.lenderSendRequestModel2).subscribe(function (data) {
            _this.toastr.success('The Deal request has been declined.', 'Dashboard');
            _this.spinner.hide();
            var element = document.getElementById('closeSendRequestModalLender');
            element.click();
            _this.SetTimeInterval();
        });
    };
    LenderDashboardComponent.prototype.SaveForsaMessage = function () {
        var _this = this;
        if (this.bestPriceViewService.lenderSendRequestModel2.MessageForForsa == undefined || this.bestPriceViewService.lenderSendRequestModel2.MessageForForsa == null || this.bestPriceViewService.lenderSendRequestModel2.MessageForForsa.toString().trim().length == 0) {
            this.toastr.error("Please enter message", "Dashbaord");
            return;
        }
        this.spinner.show();
        this.bestPriceViewService.lenderSendRequestModel2.IsMessageSentToForsa = true;
        this.bestPriceViewService.SaveForsaMessage(this.bestPriceViewService.lenderSendRequestModel2).subscribe(function (data) {
            _this.spinner.hide();
            _this.toastr.success("Message sent to Forsa", "Dashboard");
            _this.SetTimeInterval();
            var element = document.getElementById('closeSendChatModalLender');
            element.click();
        });
    };
    ///
    LenderDashboardComponent.prototype.chtforse = function () {
        var element = document.getElementById('closeSendRequestModalLender');
        element.click();
    };
    ///	
    LenderDashboardComponent.prototype.GetLenderSendRequestPendingLendedRequestByLenderId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bestPriceViewService.GetLenderSendRequestPendingLendedRequestByLenderId()];
                    case 1:
                        result = _a.sent();
                        if (result.IsSuccess && result.IfDataFound == true) {
                            clearInterval(this.timer);
                            this.IfBankResponseFound = true;
                            element = document.getElementById('ShowSendRequestLDPopup');
                            element.click();
                            this.bestPriceViewService.lenderSendRequestModel2 = JSON.parse(result.data)[0];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LenderDashboardComponent.prototype.GetLenderStartPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        return [4 /*yield*/, this.lenderDashboardService.GetLenderStartPage()];
                    case 1:
                        startPage = _a.sent();
                        this.lenderDashboardService.StartingScreen = JSON.parse(startPage.data);
                        this.spinner.hide();
                        if (this.lenderDashboardService.StartingScreen[0].PageName == "Best Price View") {
                            //this.lenderDashboardService.CurrentPageName="Best Price View";
                            //this.router.navigate(['lenderDashboard/BestPriceView']);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LenderDashboardComponent.prototype.Logout = function () {
        //if(confirm("Are you sure you want to log out?")){
        this.authenticateServiceService.ClearSession();
        this.router.navigate(['/login']);
        //}
    };
    LenderDashboardComponent.prototype.UpdateUserProfile = function () {
        var _this = this;
        debugger;
        /* Validating controls */
        if (this.ValidateUserPfrofileFields(this.copyLoggedInUser, this.lenderDashboardService.NewPassword, this.lenderDashboardService.ConfirmPassword)) {
            this.copyLoggedInUser.NewPassword = this.lenderDashboardService.NewPassword.trim();
            this.copyLoggedInUser.Password = this.copyLoggedInUser.Password.trim();
            this.spinner.show();
            this.lenderDashboardService.UpdateUserProfile(this.copyLoggedInUser).subscribe(function (data) {
                _this.spinner.hide();
                if (data != undefined && data != null) {
                    debugger;
                    if (data.IsSuccess == false) {
                        _this.toastr.error("Old password is not correct.", "Dashboard");
                        return;
                    }
                    _this.authenticateServiceService.UpdateSession(data.data);
                    _this.lenderDashboardService.loggedInUser = _this.authenticateServiceService.GetUserDetail();
                    _this.toastr.success("Updated successfully. An email has been sent to your email id.", "Dashboard");
                }
            });
        }
    };
    LenderDashboardComponent.prototype.ValidateUserPfrofileFields = function (userModel, NewPassword, ConfirmPassword) {
        var IfErrorFound = false;
        var message = 'Fields marked with * are mandatory. Please fill';
        if (userModel.FirstName == undefined || userModel.FirstName == null || userModel.FirstName.trim().length == 0) {
            IfErrorFound = true;
            message = message + " First Name,";
        }
        if (userModel.SurName == undefined || userModel.SurName == null || userModel.SurName.trim().length == 0) {
            IfErrorFound = true;
            message = message + " Sur Name,";
        }
        if (userModel.NameOfCompany == undefined || userModel.NameOfCompany == null || userModel.NameOfCompany.trim().length == 0) {
            IfErrorFound = true;
            message = message + " Name of company,";
        }
        if (userModel.Password == undefined || userModel.Password == null || userModel.Password.trim().length == 0) {
            IfErrorFound = true;
            message = message + " Old Password,";
        }
        if (NewPassword == undefined || NewPassword == null || NewPassword.trim().length == 0) {
            IfErrorFound = true;
            message = message + " New Password,";
        }
        if (ConfirmPassword == undefined || ConfirmPassword == null || ConfirmPassword.trim().length == 0) {
            IfErrorFound = true;
            message = message + " Confirm Password,";
        }
        if (IfErrorFound) {
            message = message.substring(0, message.length - 1);
            this.toastr.error(message, "Dashboard");
            return false;
        }
        if (NewPassword.trim().length < 6) {
            this.toastr.error("Password must be at least of six characters.", "Dashboard");
            return false;
        }
        // if(userModel.NewPassword.trim() == userModel.Password.trim()){
        //   alert('Old password and new password can not be same.');
        //   return false;
        // }
        if (NewPassword.trim() != ConfirmPassword.trim()) {
            this.toastr.error("New password and confirm password not matched.", "Dashboard");
            return false;
        }
        return true;
    };
    LenderDashboardComponent.prototype.ShowUpdateProfileModal = function () {
        this.lenderDashboardService.NewPassword = '';
        this.lenderDashboardService.ConfirmPassword = '';
        this.copyLoggedInUser = Object.assign({}, this.lenderDashboardService.loggedInUser);
    };
    LenderDashboardComponent.prototype.SetCurrentPage = function (pageName) {
        debugger;
        this.lenderDashboardService.CurrentPageName = pageName;
        if (pageName === "Best Price View") {
            this.router.navigate(['lenderDashboard/BestPriceView']);
        }
        if (pageName == "All Banks") {
            this.router.navigate(['lenderDashboard/AllBanks']);
        }
        else if (pageName == 'View All Price') {
            this.router.navigate(['lenderDashboard/ViewAllPrice']);
        }
        else if (pageName == 'Kontact Dashboard') {
            this.router.navigate(['lenderDashboard/AllBanksK']);
        }
    };
    LenderDashboardComponent.prototype.GetPagesForLenderSettingStartPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinner.show();
                        return [4 /*yield*/, this.lenderDashboardService.GetPagesForLenderSettingStartPage()];
                    case 1:
                        response = _a.sent();
                        this.listPagesForStartingPage = JSON.parse(response.data);
                        if (this.listPagesForStartingPage != undefined && this.listPagesForStartingPage.length != 0) {
                            for (i = 0; this.listPagesForStartingPage.length - 1; i++) {
                                if (this.listPagesForStartingPage[i].IsStartPage == true) {
                                    debugger;
                                    this.SelectedStartPage = this.listPagesForStartingPage[i].PageId;
                                    break;
                                }
                            }
                        }
                        this.spinner.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    LenderDashboardComponent.prototype.LenderSaveStartPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinner.show();
                        return [4 /*yield*/, this.lenderDashboardService.LenderSaveStartPage(this.SelectedStartPage)];
                    case 1:
                        response = _a.sent();
                        if (response.IsSuccess) {
                            this.toastr.success("Start page updated successfully.", "Dashboard");
                            element = document.getElementById('btnCloseSetStartPageModal');
                            element.click();
                        }
                        else {
                            this.toastr.error("Something went wrong");
                        }
                        this.spinner.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    LenderDashboardComponent.prototype.SwitchScreen = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.router.navigate(['/bankDashBoard']);
                return [2 /*return*/];
            });
        });
    };
    LenderDashboardComponent.prototype.RegisterAsPartner = function () {
        this.authenticateServiceService.ClearSession();
        this.router.navigate(['/registration/', this.lenderDashboardService.userId, 'KT']);
    };
    LenderDashboardComponent = __decorate([
        Component({
            selector: 'app-lender-dashboard',
            templateUrl: './lender-dashboard.component.html',
            styleUrls: ['./lender-dashboard.component.css']
        }),
        __metadata("design:paramtypes", [LenderDashboardService, NgxSpinnerService,
            AuthenticateServiceService, Router,
            ToastrService,
            BestPriceViewService])
    ], LenderDashboardComponent);
    return LenderDashboardComponent;
}());
export { LenderDashboardComponent };
//# sourceMappingURL=lender-dashboard.component.js.map