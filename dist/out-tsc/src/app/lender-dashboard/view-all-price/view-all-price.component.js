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
import { ViewAllPriceService } from '../Shared/view-all-price.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { hubConnection } from 'signalr-no-jquery';
var connection = hubConnection('http://socket.elitewebdemo.com/signalr');
var hubProxy = connection.createHubProxy('NgHub');
var ViewAllPriceComponent = /** @class */ (function () {
    function ViewAllPriceComponent(viewAllPriceService, spinner, toastr) {
        var _this = this;
        this.viewAllPriceService = viewAllPriceService;
        this.spinner = spinner;
        this.toastr = toastr;
        this.orderByColumn = "Bank";
        // set up event listeners i.e. for incoming "message" event
        hubProxy.on('sendBankRate', function (data) {
            _this.viewAllPriceService.listViewAllPrice1 = [];
            _this.viewAllPriceService.listViewAllPrice2 = [];
            _this.viewAllPriceService.listViewAllPrice3 = [];
            _this.GetAllBanksWithStatusIsDeselected();
            //this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
            _this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(_this.orderByColumn);
        });
        connection.start({ jsonp: true })
            .done(function () { console.log('Now connected, connection ID=' + connection.id); })
            .fail(function () { console.log('Could not connect'); });
    }
    ViewAllPriceComponent.prototype.ngOnInit = function () {
        this.viewAllPriceService.listViewAllPrice1 = [];
        this.viewAllPriceService.listViewAllPrice2 = [];
        this.viewAllPriceService.listViewAllPrice3 = [];
        this.GetAllBanksWithStatusIsDeselected();
        this.spinner.show();
        //this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
        this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
        //this.SetTimeInterval();
        this.spinner.hide();
    };
    ViewAllPriceComponent.prototype.GetAllBanksWithStatusIsDeselected = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rates, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.viewAllPriceService.count = 0;
                        this.viewAllPriceService.listViewAllPrice1 = [];
                        this.viewAllPriceService.listViewAllPrice2 = [];
                        this.viewAllPriceService.listViewAllPrice3 = [];
                        this.spinner.show();
                        return [4 /*yield*/, this.viewAllPriceService.GetAllBanksWithStatusIsDeselected()];
                    case 1:
                        rates = _a.sent();
                        this.viewAllPriceService.listViewAllPrice = JSON.parse(rates.data);
                        if (this.viewAllPriceService.listViewAllPrice != undefined && this.viewAllPriceService.listViewAllPrice != null && this.viewAllPriceService.listViewAllPrice.length != 0) {
                            this.viewAllPriceService.toatlBanksCount = this.viewAllPriceService.listViewAllPrice[0].Count;
                        }
                        for (i = 0; i <= this.viewAllPriceService.listViewAllPrice.length - 1; i++) {
                            if (this.viewAllPriceService.count > 9) {
                                this.viewAllPriceService.listViewAllPrice3[this.viewAllPriceService.listViewAllPrice3.length] = this.viewAllPriceService.listViewAllPrice[i];
                            }
                            else if (this.viewAllPriceService.count > 4) {
                                this.viewAllPriceService.listViewAllPrice2[this.viewAllPriceService.listViewAllPrice2.length] = this.viewAllPriceService.listViewAllPrice[i];
                            }
                            else {
                                this.viewAllPriceService.listViewAllPrice1[i] = this.viewAllPriceService.listViewAllPrice[i];
                            }
                            this.viewAllPriceService.count++;
                        }
                        this.spinner.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewAllPriceComponent.prototype.DeselectSelectBank = function (bank) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinner.show();
                        return [4 /*yield*/, this.viewAllPriceService.DeselectSelectBank(bank.UserId, bank.IsSelected)];
                    case 1:
                        result = _a.sent();
                        if (JSON.parse(result.IsSuccess)) {
                            //this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
                            this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
                        }
                        else {
                            this.toastr.error("Some issue occured.", "Dashboard");
                        }
                        this.spinner.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewAllPriceComponent.prototype.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.viewAllPriceService.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn)];
                    case 1:
                        rates = _a.sent();
                        if (rates.IfDataFound) {
                            this.viewAllPriceService.listAllBanks = JSON.parse(rates.data);
                            this.GetHighestRatesViewAllPrice();
                        }
                        else {
                            this.viewAllPriceService.listAllBanks = [];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewAllPriceComponent.prototype.SetTimeInterval = function () {
        var _this = this;
        this.timer = setInterval(function () {
            _this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
        }, 5000);
    };
    ViewAllPriceComponent.prototype.SetHighestRatesTimeInterval = function () {
        var _this = this;
        this.timer1 = setInterval(function () {
            _this.GetHighestRatesViewAllPrice();
        }, 5000);
    };
    ViewAllPriceComponent.prototype.GetHighestRatesViewAllPrice = function () {
        if (this.viewAllPriceService.listAllBanks != undefined && this.viewAllPriceService.listAllBanks != null && this.viewAllPriceService.listAllBanks.length != 0) {
            var HighestRateTN, HighestRateW1, HighestRateW2, HighestRateW3, HighestRateM1, HighestRateM2, HighestRateM3, HighestRateM4, HighestRateM5, HighestRateM6, HighestRateM7, HighestRateM8, HighestRateM9, HighestRateM10, HighestRateM11, HighestRateM12, HighestRateY2, HighestRateY3, HighestRateY4, HighestRateY5;
            var HighestRateTNIndex, HighestRateW1Index, HighestRateW2Index, HighestRateW3Index, HighestRateM1Index, HighestRateM2Index, HighestRateM3Index, HighestRateM4Index, HighestRateM5Index, HighestRateM6Index, HighestRateM7Index, HighestRateM8Index, HighestRateM9Index, HighestRateM10Index, HighestRateM11Index, HighestRateM12Index, HighestRateY2Index, HighestRateY3Index, HighestRateY4Index, HighestRateY5Index;
            for (var i = 0; i <= this.viewAllPriceService.listAllBanks.length - 1; i++) {
                if (HighestRateTN == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].TN) >= parseFloat(HighestRateTN)) {
                    HighestRateTNIndex = i.toString();
                    HighestRateTN = this.viewAllPriceService.listAllBanks[i].TN;
                }
                if (HighestRateW1 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Week1) >= parseFloat(HighestRateW1)) {
                    HighestRateW1Index = i.toString();
                    HighestRateW1 = this.viewAllPriceService.listAllBanks[i].Week1;
                }
                if (HighestRateW2 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Week2) >= parseFloat(HighestRateW2)) {
                    HighestRateW2Index = i.toString();
                    HighestRateW2 = this.viewAllPriceService.listAllBanks[i].Week2;
                }
                if (HighestRateW3 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Week3) >= parseFloat(HighestRateW3)) {
                    HighestRateW3Index = i.toString();
                    HighestRateW3 = this.viewAllPriceService.listAllBanks[i].Week3;
                }
                if (HighestRateM1 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month1) >= parseFloat(HighestRateM1)) {
                    HighestRateM1Index = i.toString();
                    HighestRateM1 = this.viewAllPriceService.listAllBanks[i].Month1;
                }
                if (HighestRateM2 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month2) >= parseFloat(HighestRateM2)) {
                    HighestRateM2Index = i.toString();
                    HighestRateM2 = this.viewAllPriceService.listAllBanks[i].Month2;
                }
                if (HighestRateM3 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month3) >= parseFloat(HighestRateM3)) {
                    HighestRateM3Index = i.toString();
                    HighestRateM3 = this.viewAllPriceService.listAllBanks[i].Month3;
                }
                if (HighestRateM4 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month4) >= parseFloat(HighestRateM4)) {
                    HighestRateM4Index = i.toString();
                    HighestRateM4 = this.viewAllPriceService.listAllBanks[i].Month4;
                }
                if (HighestRateM5 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month5) >= parseFloat(HighestRateM5)) {
                    HighestRateM5Index = i.toString();
                    HighestRateM5 = this.viewAllPriceService.listAllBanks[i].Month5;
                }
                if (HighestRateM6 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month6) >= parseFloat(HighestRateM6)) {
                    HighestRateM6Index = i.toString();
                    HighestRateM6 = this.viewAllPriceService.listAllBanks[i].Month6;
                }
                if (HighestRateM7 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month7) >= parseFloat(HighestRateM7)) {
                    HighestRateM7Index = i.toString();
                    HighestRateM7 = this.viewAllPriceService.listAllBanks[i].Month7;
                }
                if (HighestRateM8 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month8) >= parseFloat(HighestRateM8)) {
                    HighestRateM8Index = i.toString();
                    HighestRateM8 = this.viewAllPriceService.listAllBanks[i].Month8;
                }
                if (HighestRateM9 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month9) >= parseFloat(HighestRateM9)) {
                    HighestRateM9Index = i.toString();
                    HighestRateM9 = this.viewAllPriceService.listAllBanks[i].Month9;
                }
                if (HighestRateM10 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month10) >= parseFloat(HighestRateM10)) {
                    HighestRateM10Index = i.toString();
                    HighestRateM10 = this.viewAllPriceService.listAllBanks[i].Month10;
                }
                if (HighestRateM11 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month11) >= parseFloat(HighestRateM11)) {
                    HighestRateM11Index = i.toString();
                    HighestRateM11 = this.viewAllPriceService.listAllBanks[i].Month11;
                }
                if (HighestRateM12 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month12) >= parseFloat(HighestRateM12)) {
                    HighestRateM12Index = i.toString();
                    HighestRateM12 = this.viewAllPriceService.listAllBanks[i].Month12;
                }
                if (HighestRateY2 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Year2) >= parseFloat(HighestRateY2)) {
                    HighestRateY2Index = i.toString();
                    HighestRateY2 = this.viewAllPriceService.listAllBanks[i].Year2;
                }
                if (HighestRateY3 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Year3) >= parseFloat(HighestRateY3)) {
                    HighestRateY3Index = i.toString();
                    HighestRateY3 = this.viewAllPriceService.listAllBanks[i].Year3;
                }
                if (HighestRateY4 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Year4) >= parseFloat(HighestRateY4)) {
                    HighestRateY4Index = i.toString();
                    HighestRateY4 = this.viewAllPriceService.listAllBanks[i].Year4;
                }
                if (HighestRateY5 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Year5) >= parseFloat(HighestRateY5)) {
                    HighestRateY5Index = i.toString();
                    HighestRateY5 = this.viewAllPriceService.listAllBanks[i].Year5;
                }
            }
            this.viewAllPriceService.HighestRateTN = this.viewAllPriceService.listAllBanks[HighestRateTNIndex].TN;
            this.viewAllPriceService.HighestRateW1 = this.viewAllPriceService.listAllBanks[HighestRateW1Index].Week1;
            this.viewAllPriceService.HighestRateW2 = this.viewAllPriceService.listAllBanks[HighestRateW2Index].Week2;
            this.viewAllPriceService.HighestRateW3 = this.viewAllPriceService.listAllBanks[HighestRateW3Index].Week3;
            this.viewAllPriceService.HighestRateM1 = this.viewAllPriceService.listAllBanks[HighestRateM1Index].Month1;
            this.viewAllPriceService.HighestRateM2 = this.viewAllPriceService.listAllBanks[HighestRateM2Index].Month2;
            this.viewAllPriceService.HighestRateM3 = this.viewAllPriceService.listAllBanks[HighestRateM3Index].Month3;
            this.viewAllPriceService.HighestRateM4 = this.viewAllPriceService.listAllBanks[HighestRateM4Index].Month4;
            this.viewAllPriceService.HighestRateM5 = this.viewAllPriceService.listAllBanks[HighestRateM5Index].Month5;
            this.viewAllPriceService.HighestRateM6 = this.viewAllPriceService.listAllBanks[HighestRateM6Index].Month6;
            this.viewAllPriceService.HighestRateM7 = this.viewAllPriceService.listAllBanks[HighestRateM7Index].Month7;
            this.viewAllPriceService.HighestRateM8 = this.viewAllPriceService.listAllBanks[HighestRateM8Index].Month8;
            this.viewAllPriceService.HighestRateM9 = this.viewAllPriceService.listAllBanks[HighestRateM9Index].Month9;
            this.viewAllPriceService.HighestRateM10 = this.viewAllPriceService.listAllBanks[HighestRateM10Index].Month10;
            this.viewAllPriceService.HighestRateM11 = this.viewAllPriceService.listAllBanks[HighestRateM11Index].Month11;
            this.viewAllPriceService.HighestRateM12 = this.viewAllPriceService.listAllBanks[HighestRateM12Index].Month12;
            this.viewAllPriceService.HighestRateY2 = this.viewAllPriceService.listAllBanks[HighestRateY2Index].Year2;
            this.viewAllPriceService.HighestRateY3 = this.viewAllPriceService.listAllBanks[HighestRateY3Index].Year3;
            this.viewAllPriceService.HighestRateY4 = this.viewAllPriceService.listAllBanks[HighestRateY4Index].Year4;
            this.viewAllPriceService.HighestRateY5 = this.viewAllPriceService.listAllBanks[HighestRateY5Index].Year5;
        }
    };
    ViewAllPriceComponent.prototype.GetAllBanksWithInterestRateHorizontalyOrderByColumnName = function (columnName) {
        return __awaiter(this, void 0, void 0, function () {
            var rates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.orderByColumn = columnName;
                        this.spinner.show();
                        return [4 /*yield*/, this.viewAllPriceService.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(columnName)];
                    case 1:
                        rates = _a.sent();
                        this.viewAllPriceService.listAllBanks = JSON.parse(rates.data);
                        this.GetHighestRatesViewAllPrice();
                        //this.SetHighestRatesTimeInterval();
                        this.spinner.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewAllPriceComponent.prototype.pageChange = function (page) {
        if (page !== this.previousPage) {
            this.viewAllPriceService.selectedPageNumber = page;
            this.GetAllBanksWithStatusIsDeselected();
        }
    };
    ViewAllPriceComponent = __decorate([
        Component({
            selector: 'app-view-all-price',
            templateUrl: './view-all-price.component.html',
            styleUrls: ['./view-all-price.component.css']
        }),
        __metadata("design:paramtypes", [ViewAllPriceService, NgxSpinnerService,
            ToastrService])
    ], ViewAllPriceComponent);
    return ViewAllPriceComponent;
}());
export { ViewAllPriceComponent };
//# sourceMappingURL=view-all-price.component.js.map