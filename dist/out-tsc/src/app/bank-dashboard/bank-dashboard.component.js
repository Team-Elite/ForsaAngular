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
import { BankDashboardService } from './Shared/bank-dashboard.service';
import { AuthenticateServiceService } from '../Shared/authenticate-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BestPriceViewService } from '../lender-dashboard/best-price-view/Shared/best-price-view.service';
import { DatePipe } from '@angular/common';
import { LenderDashboardService } from '../lender-dashboard/Shared/lender-dashboard.service';
var BankDashboardComponent = /** @class */ (function () {
    function BankDashboardComponent(bankDashboardService, authenticateServiceService, router, toastr, spinner, bestPriceViewService, pipe, lenderDashboardService) {
        this.bankDashboardService = bankDashboardService;
        this.authenticateServiceService = authenticateServiceService;
        this.router = router;
        this.toastr = toastr;
        this.spinner = spinner;
        this.bestPriceViewService = bestPriceViewService;
        this.pipe = pipe;
        this.lenderDashboardService = lenderDashboardService;
        this.IsPublished = false;
        this.testTrue = false;
        this.IfBothUserTypeFound = false;
    }
    BankDashboardComponent.prototype.ngOnInit = function () {
        this.spinner.show();
        this.authenticateServiceService.AuthenticateSession();
        this.IfBothUserTypeFound = this.authenticateServiceService.GetIfBothUserTypeFound() == (undefined || null) ? false : true;
        this.bankDashboardService.userId = this.authenticateServiceService.GetUserId();
        this.GetRateOfInterestOfBank();
        this.GetUserGroupForSettingRateOfInterestVisibility();
        this.bankDashboardService.loggedInUser = this.authenticateServiceService.GetUserDetail();
        this.copyLoggedInUser = Object.assign({}, this.bankDashboardService.loggedInUser);
        this.SetTimeInterval();
        this.spinner.hide();
        this.bestPriceViewService.lenderSendRequestModel = {
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
    };
    BankDashboardComponent.prototype.SetTimeInterval = function () {
        var _this = this;
        debugger;
        this.timer = setInterval(function () {
            _this.GetLenderSendRequestRequestdOnTheBasisOfBorrowerId();
        }, 5000);
    };
    BankDashboardComponent.prototype.GetRateOfInterestOfBank = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rateList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bankDashboardService.GetRateOfInterestOfBank()];
                    case 1:
                        rateList = _a.sent();
                        this.bankDashboardService.listRateOfInterestOfBankModel = JSON.parse(rateList.data);
                        if (this.bankDashboardService.listRateOfInterestOfBankModel != undefined && this.bankDashboardService.listRateOfInterestOfBankModel != null
                            && this.bankDashboardService.listRateOfInterestOfBankModel.length != 0) {
                            this.IsPublished = this.bankDashboardService.listRateOfInterestOfBankModel[0].IsPublished;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BankDashboardComponent.prototype.EnableTextBox = function (rate) {
        rate.IsDoubleTapped = true;
    };
    BankDashboardComponent.prototype.EnableTextBox2 = function () {
        this.testTrue = true;
    };
    BankDashboardComponent.prototype.UpdateRateOfInterest = function (rate) {
        var _this = this;
        if (rate.RateOfInterest == undefined || rate.RateOfInterest == null || rate.RateOfInterest.length == 0) {
            this.toastr.error("Rate must be entered.", "Dashboard");
            return;
        }
        if (rate.RateOfInterest > 9999.99) {
            this.toastr.error("Interest rate can not be greater than 9999.99", "Dashboard");
            return;
        }
        if (rate.RateOfInterest < -9999.99) {
            this.toastr.error("Interest rate can not be less than -9999.99", "Dashboard");
            return;
        }
        rate.IsDoubleTapped = false;
        rate.ModifiedBy = this.bankDashboardService.userId;
        rate.RateOfInterest = rate.RateOfInterest.toFixed(2);
        this.spinner.show();
        this.bankDashboardService.UpdateRateOfInterest(rate).subscribe(function (data) {
            _this.spinner.hide();
        });
    };
    BankDashboardComponent.prototype.IncreaseRateOfInterest = function (rate) {
        var _this = this;
        if (rate.RateOfInterest == undefined || rate.RateOfInterest == null || rate.RateOfInterest.length == 0) {
            this.toastr.error("Rate must be entered.", "Dashboard");
            return;
        }
        if (rate.RateOfInterest >= 9999.99) {
            this.toastr.error("Interest rate can not be greater than 9999.99", "Dashboard");
            return;
        }
        rate.RateOfInterest = parseFloat(rate.RateOfInterest) + .01;
        rate.RateOfInterest = parseFloat(rate.RateOfInterest).toFixed(2);
        rate.ModifiedBy = this.bankDashboardService.userId;
        this.spinner.show();
        this.bankDashboardService.UpdateRateOfInterest(rate).subscribe(function (data) {
            _this.spinner.hide();
        });
    };
    BankDashboardComponent.prototype.DecreaseRateOfInterest = function (rate) {
        var _this = this;
        if (rate.RateOfInterest == undefined || rate.RateOfInterest == null || rate.RateOfInterest.length == 0) {
            this.toastr.error("Rate must be entered.", "Dashboard");
            return;
        }
        if (rate.RateOfInterest <= -9999.99) {
            this.toastr.error("Interest rate can not be less than -9999.99", "Dashboard");
            return;
        }
        rate.RateOfInterest = parseFloat(rate.RateOfInterest) - .01;
        rate.RateOfInterest = parseFloat(rate.RateOfInterest).toFixed(2);
        rate.ModifiedBy = this.bankDashboardService.userId;
        this.spinner.show();
        this.bankDashboardService.UpdateRateOfInterest(rate).subscribe(function (data) {
            _this.spinner.hide();
        });
    };
    BankDashboardComponent.prototype.PublishAndUnPublish = function (value) {
        var _this = this;
        this.spinner.show();
        this.bankDashboardService.PublishAndUnPublish(value).subscribe(function (data) {
            _this.spinner.hide();
            _this.IsPublished = value;
            _this.toastr.success("Changes saved successfully.", "Dashboard");
        });
    };
    BankDashboardComponent.prototype.GetUserGroupForSettingRateOfInterestVisibility = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinner.show();
                        return [4 /*yield*/, this.bankDashboardService.GetUserGroupForSettingRateOfInterestVisibility()];
                    case 1:
                        _a.sent();
                        // Checking if only one group is left checked or not.
                        // If true then disabling control from getting unchecked.
                        this.IfLastGroupLeftThenDisablingControl();
                        this.spinner.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    BankDashboardComponent.prototype.GroupCheckUnCheck = function (event, group) {
        var _this = this;
        //    
        var groupsString = '';
        var ifNoneIsSelected = true;
        // Making string of group ids which are checked.
        for (var i = 0; i <= this.bankDashboardService.listUserGroupForSettingRateOfInterestVisibility.length - 1; i++) {
            var obj = this.bankDashboardService.listUserGroupForSettingRateOfInterestVisibility[i];
            // if(obj.GroupName != group.GroupName && obj.IfRateWillBeVisible == true){
            if (obj.IfRateWillBeVisible == true) {
                ifNoneIsSelected = false;
                groupsString = groupsString + obj.GroupId + ',';
            }
        }
        groupsString = groupsString.substring(0, groupsString.length - 1);
        // Checking if none is selected then not saving last remaining grous value in db.
        if (!ifNoneIsSelected) {
            this.spinner.show();
            this.bankDashboardService.UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible(groupsString).subscribe(function (data) {
                _this.spinner.hide();
                _this.toastr.success("Saved successfully.", "Dashboard");
                // Checking if only one group is left checked or not.
                // If true then disabling control from getting unchecked.
                _this.IfLastGroupLeftThenDisablingControl();
            });
        }
    };
    BankDashboardComponent.prototype.IfLastGroupLeftThenDisablingControl = function () {
        var numberOfGroupsChecked = 0;
        for (var i = 0; i <= this.bankDashboardService.listUserGroupForSettingRateOfInterestVisibility.length - 1; i++) {
            var obj = this.bankDashboardService.listUserGroupForSettingRateOfInterestVisibility[i];
            if (obj.IfRateWillBeVisible) {
                this.bankDashboardService.lastGroupId = obj.GroupName;
                numberOfGroupsChecked++;
            }
        }
        if (numberOfGroupsChecked == 1) {
        }
        else {
            this.bankDashboardService.lastGroupId = '';
        }
    };
    BankDashboardComponent.prototype.Logout = function () {
        //if(confirm("Are you sure you want to log out?")){
        this.authenticateServiceService.ClearSession();
        this.router.navigate(['/login']);
        //}
    };
    BankDashboardComponent.prototype.UpdateUserProfile = function () {
        var _this = this;
        /* Validating controls */
        if (this.ValidateUserPfrofileFields(this.copyLoggedInUser, this.bankDashboardService.NewPassword, this.bankDashboardService.ConfirmPassword)) {
            this.copyLoggedInUser.NewPassword = this.bankDashboardService.NewPassword.trim();
            this.copyLoggedInUser.Password = this.copyLoggedInUser.Password.trim();
            this.spinner.show();
            this.bankDashboardService.UpdateUserProfile(this.copyLoggedInUser).subscribe(function (data) {
                _this.spinner.hide();
                if (data != undefined && data != null) {
                    if (data.IsSuccess == false) {
                        _this.toastr.error("Old password is not correct.", "Dashboard");
                        return;
                    }
                    _this.authenticateServiceService.UpdateSession(data.data);
                    _this.bankDashboardService.loggedInUser = _this.authenticateServiceService.GetUserDetail();
                    _this.toastr.success("Updated successfully. An email has been sent to your email id.", "Dashboard");
                }
            });
        }
    };
    BankDashboardComponent.prototype.ValidateUserPfrofileFields = function (userModel, NewPassword, ConfirmPassword) {
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
    BankDashboardComponent.prototype.ShowUpdateProfileModal = function () {
        //document.getElementById('updateProfile').style.display='block';
        this.bankDashboardService.NewPassword = '';
        this.bankDashboardService.ConfirmPassword = '';
        this.copyLoggedInUser = Object.assign({}, this.bankDashboardService.loggedInUser);
    };
    BankDashboardComponent.prototype.GetLenderSendRequestRequestdOnTheBasisOfBorrowerId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bankDashboardService.GetLenderSendRequestRequestdOnTheBasisOfBorrowerId()];
                    case 1:
                        result = _a.sent();
                        if (result.IsSuccess && result.IfDataFound == true) {
                            clearInterval(this.timer);
                            element = document.getElementById('ShowLendPopup');
                            element.click();
                            this.bestPriceViewService.lenderSendRequestModel = JSON.parse(result.data)[0];
                            // setInterval(this.timer);
                        }
                        this.spinner.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    BankDashboardComponent.prototype.UpdateLenderSendRequestRateOfInterest = function () {
        var _this = this;
        if (!this.ValidateSendRequest(this.bestPriceViewService.lenderSendRequestModel)) {
            return false;
        }
        this.spinner.show();
        var result = this.bankDashboardService.UpdateLenderSendRequestRateOfInterest(this.bestPriceViewService.lenderSendRequestModel).subscribe(function (data) {
            _this.toastr.success('Rate of interest saved successfully.', 'Dashboard');
            _this.spinner.hide();
            _this.SetTimeInterval();
            var element = document.getElementById('closeSendRequestModal');
            element.click();
            //setInterval(this.GetLenderSendRequestRequestdOnTheBasisOfBorrowerId,5000);
        });
    };
    BankDashboardComponent.prototype.ValidateSendRequest = function (requestModel) {
        if (requestModel.RateOfInterest == undefined || requestModel.RateOfInterest == null || requestModel.RateOfInterest.length == 0) {
            this.toastr.error("Please fill rate of interest.", "Dashboard");
            return false;
        }
        if (requestModel.RateOfInterest != undefined && requestModel.RateOfInterest != null && requestModel.RateOfInterest.length != 0) {
            try {
                if (isNaN(Number(requestModel.RateOfInterest.toString())) == true) {
                    this.toastr.error("Rate of interest must be numeric.", "Dashboard");
                    return false;
                }
            }
            catch (_a) {
                return false;
            }
        }
        if (requestModel.RateOfInterest == 0) {
            this.toastr.error('Rate of interest can not be 0.');
            return false;
        }
        return true;
    };
    //It checks if key pressed is integer or not if not then it returns false.
    BankDashboardComponent.prototype.numberWithDecimalOnly = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
            return false;
        }
        if (this.bestPriceViewService.lenderSendRequestModel.RateOfInterest.toString().indexOf('.') > -1 && charCode == 46)
            return false;
        if (this.bestPriceViewService.lenderSendRequestModel.RateOfInterest.toString().split(".").length > 1) {
            if (this.bestPriceViewService.lenderSendRequestModel.RateOfInterest.toString().split(".")[1].length == 2)
                return false;
        }
        return true;
    };
    BankDashboardComponent.prototype.ShowSendRequestModal = function (bank) {
        //  document.getElementById('modalSendRequest').style.display='block';
        //  document.getElementById('modalSendRequest').style.display='block';
        // // // this.bestPriceViewService.lenderSendRequestModel.Amount=0;
        // // // this.bestPriceViewService.lenderSendRequestModel.NoOfDays=0;
        // // // this.bestPriceViewService.lenderSendRequestModel.BorrowerId=bank.UserId;
        // // // this.bestPriceViewService.lenderSendRequestModel.LenderId=this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetUserId();
        // // // this.bestPriceViewService.lenderSendRequestModel.BorrowerName=bank.Bank;
        // // // this.bestPriceViewService.lenderSendRequestModel.LenderName=this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetLenderName();
        // // // this.bestPriceViewService.lenderSendRequestModel.StartDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
        // // // this.bestPriceViewService.lenderSendRequestModel.EndDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
        // // // this.bestPriceViewService.lenderSendRequestModel.InterestConvention=this.bestPriceViewService.listInterestConvention[0].Id;
        // // // this.bestPriceViewService.lenderSendRequestModel.Payments=this.bestPriceViewService.listPayments[0].Id;
        // // // this.bestPriceViewService.lenderSendRequestModel.LenderEmailId=this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetEmailId();
    };
    BankDashboardComponent.prototype.SwitchScreen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lenderDashboardService.userId = this.authenticateServiceService.GetUserId();
                        return [4 /*yield*/, this.lenderDashboardService.GetLenderStartPage()];
                    case 1:
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
                        return [2 /*return*/];
                }
            });
        });
    };
    BankDashboardComponent = __decorate([
        Component({
            selector: 'app-bank-dashboard',
            templateUrl: './bank-dashboard.component.html',
            styleUrls: ['./bank-dashboard.component.css']
        }),
        __metadata("design:paramtypes", [BankDashboardService, AuthenticateServiceService, Router,
            ToastrService, NgxSpinnerService, BestPriceViewService,
            DatePipe, LenderDashboardService])
    ], BankDashboardComponent);
    return BankDashboardComponent;
}());
export { BankDashboardComponent };
//# sourceMappingURL=bank-dashboard.component.js.map