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
import { BestPriceViewService } from './Shared/best-price-view.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { LenderDashboardService } from '../Shared/lender-dashboard.service';
import { hubConnection } from 'signalr-no-jquery';
var connection = hubConnection('http://socket.elitewebdemo.com/signalr');
var hubProxy = connection.createHubProxy('NgHub');
var BestPriceViewComponent = /** @class */ (function () {
    function BestPriceViewComponent(bestPriceViewService, spinner, toastr, pipe, lenderDashboardService) {
        var _this = this;
        this.bestPriceViewService = bestPriceViewService;
        this.spinner = spinner;
        this.toastr = toastr;
        this.pipe = pipe;
        this.lenderDashboardService = lenderDashboardService;
        this.selectedTimePeriod = null;
        this.IfBankResponseFound = false;
        hubProxy.on('sendBankRate', function (data) {
            _this.getData();
        });
        connection.start({ jsonp: true })
            .done(function () { console.log('Now connected, connection ID=' + connection.id); })
            .fail(function () { console.log('Could not connect'); });
    }
    BestPriceViewComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    BestPriceViewComponent.prototype.getData = function () {
        this.spinner.show();
        this.GetRatesByTimePeriod();
        this.bestPriceViewService.listBankByTimePeriod = [];
        var selectedTimePeriodId = undefined;
        selectedTimePeriodId = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetSavedSelectedTimePeriodId();
        if (selectedTimePeriodId != undefined) {
            this.selectedTimePeriod = selectedTimePeriodId;
            this.GetBanksByTimePeriod(selectedTimePeriodId);
        }
        this.bestPriceViewService.listInterestConvention = [{ Id: 1, Value: 'act/360' }];
        this.bestPriceViewService.listPayments = [{ Id: 1, Value: 'yearly payments' }];
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
        this.spinner.hide();
    };
    BestPriceViewComponent.prototype.CalculateNumberOfDays = function () {
        debugger;
        var fromDate = new Date(this.bestPriceViewService.lenderSendRequestModel.StartDate);
        var toDate = new Date(this.bestPriceViewService.lenderSendRequestModel.EndDate);
        if (this.bestPriceViewService.lenderSendRequestModel.StartDate != "" && this.bestPriceViewService.lenderSendRequestModel.EndDate != "") {
            this.bestPriceViewService.lenderSendRequestModel.NoOfDays = (toDate - fromDate) / 86400000;
        }
        else {
            this.bestPriceViewService.lenderSendRequestModel.NoOfDays = 0;
        }
    };
    BestPriceViewComponent.prototype.GetRatesByTimePeriod = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.lenderDashboardService.UserTypeId == 6)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.bestPriceViewService.GetRatesByTimePeriodK()];
                    case 1:
                        rates = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.bestPriceViewService.GetRatesByTimePeriod()];
                    case 3:
                        rates = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.bestPriceViewService.listRatesByTimePeriod = JSON.parse(rates.data);
                        this.spinner.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    BestPriceViewComponent.prototype.GetBanksByTimePeriod = function (timePeriodId) {
        return __awaiter(this, void 0, void 0, function () {
            var rates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        //document.getElementById(timePeriodId.toString());
                        this.selectedTimePeriod = timePeriodId;
                        this.bestPriceViewService.lenderDashboardService.authenticateServiceService.SaveSelectedTimePeriodId(timePeriodId);
                        this.bestPriceViewService.timePeriod = timePeriodId;
                        this.bestPriceViewService.pageNumber = 1;
                        this.spinner.show();
                        if (!(this.lenderDashboardService.UserTypeId == 6)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.bestPriceViewService.GetBanksByTimePeriodK()];
                    case 1:
                        rates = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.bestPriceViewService.GetBanksByTimePeriod()];
                    case 3:
                        // if (this.lenderDashboardService.UserTypeId == 5) {
                        rates = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.bestPriceViewService.listBankByTimePeriod = JSON.parse(rates.data);
                        this.spinner.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    //It checks if key pressed is integer or not if not then it returns false.
    BestPriceViewComponent.prototype.numberOnly = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    BestPriceViewComponent.prototype.ShowSendRequestModal = function (bank) {
        debugger;
        //  document.getElementById('modalSendRequest').style.display='block';
        //  document.getElementById('modalSendRequest').style.display='block';
        this.IfBankResponseFound = false;
        this.bestPriceViewService.lenderSendRequestModel = this.bestPriceViewService.lenderSendRequestModel = {
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
        this.bestPriceViewService.lenderSendRequestModel.Amount = 0;
        this.bestPriceViewService.lenderSendRequestModel.NoOfDays = 0;
        this.bestPriceViewService.lenderSendRequestModel.BorrowerId = bank.UserId;
        this.bestPriceViewService.lenderSendRequestModel.LenderId = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetUserId();
        this.bestPriceViewService.lenderSendRequestModel.BorrowerName = bank.Bank;
        this.bestPriceViewService.lenderSendRequestModel.LenderName = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetLenderName();
        this.bestPriceViewService.lenderSendRequestModel.StartDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
        this.bestPriceViewService.lenderSendRequestModel.EndDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
        this.bestPriceViewService.lenderSendRequestModel.InterestConvention = this.bestPriceViewService.listInterestConvention[0].Id;
        this.bestPriceViewService.lenderSendRequestModel.Payments = this.bestPriceViewService.listPayments[0].Id;
        this.bestPriceViewService.lenderSendRequestModel.LenderEmailId = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetEmailId();
    };
    BestPriceViewComponent.prototype.SaveSendRequest = function () {
        var _this = this;
        debugger;
        for (var i = 0; i <= this.bestPriceViewService.listInterestConvention.length - 1; i++) {
            if (this.bestPriceViewService.lenderSendRequestModel.InterestConvention == this.bestPriceViewService.listInterestConvention[i].Id) {
                this.bestPriceViewService.lenderSendRequestModel.InterestConventionName = this.bestPriceViewService.listInterestConvention[i].Value;
                break;
            }
        }
        for (var i = 0; i <= this.bestPriceViewService.listPayments.length - 1; i++) {
            if (this.bestPriceViewService.lenderSendRequestModel.Payments == this.bestPriceViewService.listPayments[i].Id) {
                this.bestPriceViewService.lenderSendRequestModel.PaymentsName = this.bestPriceViewService.listPayments[i].Value;
                break;
            }
        }
        if (!this.ValidateSendRequest(this.bestPriceViewService.lenderSendRequestModel)) {
            return false;
        }
        this.spinner.show();
        this.bestPriceViewService.SaveSendRequest(this.bestPriceViewService.lenderSendRequestModel).subscribe(function (data) {
            _this.spinner.hide();
            _this.toastr.success("Your Requst has been sent, kindly check your email for more details.", "Dashboard");
            var element = document.getElementById('closeSendRequestModal');
            element.click();
        });
    };
    BestPriceViewComponent.prototype.ValidateSendRequest = function (requestModel) {
        if (requestModel.Amount == undefined && requestModel.Amount == null && requestModel.Amount.length == 0) {
            this.toastr.error("Please fill amount.", "Dashboard");
            return false;
        }
        if (requestModel.Amount != undefined && requestModel.Amount != null && requestModel.Amount.length != 0) {
            try {
                if (isNaN(Number(requestModel.Amount.toString())) == true) {
                    this.toastr.error("Amount must be numeric.", "Registration");
                    return false;
                }
            }
            catch (_a) {
                return false;
            }
        }
        if (requestModel.Amount == 0) {
            this.toastr.error('Amounut can not be 0.');
            return false;
        }
        var currentDate = new Date(this.pipe.transform(new Date(), 'yyyy-MM-dd')).getTime();
        var startDate = new Date(requestModel.StartDate).getTime();
        var endDate = new Date(requestModel.EndDate).getTime();
        if (startDate < currentDate) {
            this.toastr.error('Start date can not be less than from today date.');
            return false;
        }
        if (endDate < currentDate) {
            this.toastr.error('End date can not be less than from today date.');
            return false;
        }
        if (endDate < startDate) {
            this.toastr.error('End date can not be less than start date.');
            return false;
        }
        if (currentDate == endDate) {
            this.toastr.error('Start and End date can not be same.');
            return false;
        }
        return true;
    };
    BestPriceViewComponent = __decorate([
        Component({
            selector: 'app-best-price-view',
            templateUrl: './best-price-view.component.html',
            styleUrls: ['./best-price-view.component.css']
        }),
        __metadata("design:paramtypes", [BestPriceViewService, NgxSpinnerService,
            ToastrService, DatePipe,
            LenderDashboardService])
    ], BestPriceViewComponent);
    return BestPriceViewComponent;
}());
export { BestPriceViewComponent };
//# sourceMappingURL=best-price-view.component.js.map