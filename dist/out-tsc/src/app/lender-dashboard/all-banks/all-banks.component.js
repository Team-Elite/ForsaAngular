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
import { ToastrService } from 'ngx-toastr';
import { AllBanksService } from '../Shared/all-banks.service';
import { hubConnection } from 'signalr-no-jquery';
var connection = hubConnection('http://socket.elitewebdemo.com/signalr');
var hubProxy = connection.createHubProxy('NgHub');
var AllBanksComponent = /** @class */ (function () {
    function AllBanksComponent(allBanksService, spinner, toastr) {
        var _this = this;
        this.allBanksService = allBanksService;
        this.spinner = spinner;
        this.toastr = toastr;
        this.orderByColumn = "Bank";
        // set up event listeners i.e. for incoming "message" event
        hubProxy.on('sendBankRate', function (data) {
            //this.GetAllBanksWithInterestRateHorizontaly();
            _this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(_this.orderByColumn);
        });
        connection.start({ jsonp: true })
            .done(function () { console.log('Now connected, connection ID=' + connection.id); })
            .fail(function () { console.log('Could not connect'); });
    }
    AllBanksComponent.prototype.ngOnInit = function () {
        this.spinner.show();
        //this.GetAllBanksWithInterestRateHorizontaly();
        //this.GetAllBanksWithInterestRateHorizontaly();
        this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
        //this.SetTimeInterval();
        //setInterval(this.GetAllBanksWithInterestRateHorizontaly, 5000);
        this.spinner.hide();
    };
    AllBanksComponent.prototype.SetTimeInterval = function () {
        var _this = this;
        this.timer = setInterval(function () {
            //this.GetAllBanksWithInterestRateHorizontaly();
            _this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(_this.orderByColumn);
        }, 5000);
    };
    AllBanksComponent.prototype.GetAllBanksWithInterestRateHorizontaly = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        return [4 /*yield*/, this.allBanksService.GetAllBanksWithInterestRateHorizontaly()];
                    case 1:
                        rates = _a.sent();
                        //this.tmpList=JSON.parse(rates.data);
                        // this.sortProduct(this.orderByColumn,"DESC");
                        this.allBanksService.listAllBanks = JSON.parse(rates.data);
                        this.GetHighestRates();
                        return [2 /*return*/];
                }
            });
        });
    };
    //   sortProduct<T>(propName: any, order: "ASC" | "DESC"): void {
    //     this.tmpList.sort((a, b) => {
    //         if (a[propName] < b[propName])
    //             return -1;
    //         if (a[propName] > b[propName])
    //             return 1;
    //         return 0;
    //     });
    // } 
    AllBanksComponent.prototype.GetAllBanksWithInterestRateHorizontalyOrderByColumnName = function (columnName) {
        return __awaiter(this, void 0, void 0, function () {
            var rates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.orderByColumn = columnName;
                        return [4 /*yield*/, this.allBanksService.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(columnName)];
                    case 1:
                        rates = _a.sent();
                        this.allBanksService.listAllBanks = JSON.parse(rates.data);
                        this.GetHighestRates();
                        this.spinner.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllBanksComponent.prototype.GetHighestRates = function () {
        if (this.allBanksService.listAllBanks != undefined && this.allBanksService.listAllBanks != null && this.allBanksService.listAllBanks.length != 0) {
            var HighestRateTN, HighestRateW1, HighestRateW2, HighestRateW3, HighestRateM1, HighestRateM2, HighestRateM3, HighestRateM4, HighestRateM5, HighestRateM6, HighestRateM7, HighestRateM8, HighestRateM9, HighestRateM10, HighestRateM11, HighestRateM12, HighestRateY2, HighestRateY3, HighestRateY4, HighestRateY5;
            var HighestRateTNIndex, HighestRateW1Index, HighestRateW2Index, HighestRateW3Index, HighestRateM1Index, HighestRateM2Index, HighestRateM3Index, HighestRateM4Index, HighestRateM5Index, HighestRateM6Index, HighestRateM7Index, HighestRateM8Index, HighestRateM9Index, HighestRateM10Index, HighestRateM11Index, HighestRateM12Index, HighestRateY2Index, HighestRateY3Index, HighestRateY4Index, HighestRateY5Index;
            for (var i = 0; i <= this.allBanksService.listAllBanks.length - 1; i++) {
                if (HighestRateTN == undefined || parseFloat(this.allBanksService.listAllBanks[i].TN) >= parseFloat(HighestRateTN)) {
                    HighestRateTNIndex = i.toString();
                    HighestRateTN = this.allBanksService.listAllBanks[i].TN;
                }
                if (HighestRateW1 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Week1) >= parseFloat(HighestRateW1)) {
                    HighestRateW1Index = i.toString();
                    HighestRateW1 = this.allBanksService.listAllBanks[i].Week1;
                }
                if (HighestRateW2 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Week2) >= parseFloat(HighestRateW2)) {
                    HighestRateW2Index = i.toString();
                    HighestRateW2 = this.allBanksService.listAllBanks[i].Week2;
                }
                if (HighestRateW3 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Week3) >= parseFloat(HighestRateW3)) {
                    HighestRateW3Index = i.toString();
                    HighestRateW3 = this.allBanksService.listAllBanks[i].Week3;
                }
                if (HighestRateM1 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month1) >= parseFloat(HighestRateM1)) {
                    HighestRateM1Index = i.toString();
                    HighestRateM1 = this.allBanksService.listAllBanks[i].Month1;
                }
                if (HighestRateM2 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month2) >= parseFloat(HighestRateM2)) {
                    HighestRateM2Index = i.toString();
                    HighestRateM2 = this.allBanksService.listAllBanks[i].Month2;
                }
                if (HighestRateM3 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month3) >= parseFloat(HighestRateM3)) {
                    HighestRateM3Index = i.toString();
                    HighestRateM3 = this.allBanksService.listAllBanks[i].Month3;
                }
                if (HighestRateM4 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month4) >= parseFloat(HighestRateM4)) {
                    HighestRateM4Index = i.toString();
                    HighestRateM4 = this.allBanksService.listAllBanks[i].Month4;
                }
                if (HighestRateM5 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month5) >= parseFloat(HighestRateM5)) {
                    HighestRateM5Index = i.toString();
                    HighestRateM5 = this.allBanksService.listAllBanks[i].Month5;
                }
                if (HighestRateM6 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month6) >= parseFloat(HighestRateM6)) {
                    HighestRateM6Index = i.toString();
                    HighestRateM6 = this.allBanksService.listAllBanks[i].Month6;
                }
                if (HighestRateM7 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month7) >= parseFloat(HighestRateM7)) {
                    HighestRateM7Index = i.toString();
                    HighestRateM7 = this.allBanksService.listAllBanks[i].Month7;
                }
                if (HighestRateM8 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month8) >= parseFloat(HighestRateM8)) {
                    HighestRateM8Index = i.toString();
                    HighestRateM8 = this.allBanksService.listAllBanks[i].Month8;
                }
                if (HighestRateM9 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month9) >= parseFloat(HighestRateM9)) {
                    HighestRateM9Index = i.toString();
                    HighestRateM9 = this.allBanksService.listAllBanks[i].Month9;
                }
                if (HighestRateM10 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month10) >= parseFloat(HighestRateM10)) {
                    HighestRateM10Index = i.toString();
                    HighestRateM10 = this.allBanksService.listAllBanks[i].Month10;
                }
                if (HighestRateM11 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month11) >= parseFloat(HighestRateM11)) {
                    HighestRateM11Index = i.toString();
                    HighestRateM11 = this.allBanksService.listAllBanks[i].Month11;
                }
                if (HighestRateM12 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month12) >= parseFloat(HighestRateM12)) {
                    HighestRateM12Index = i.toString();
                    HighestRateM12 = this.allBanksService.listAllBanks[i].Month12;
                }
                if (HighestRateY2 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Year2) >= parseFloat(HighestRateY2)) {
                    HighestRateY2Index = i.toString();
                    HighestRateY2 = this.allBanksService.listAllBanks[i].Year2;
                }
                if (HighestRateY3 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Year3) >= parseFloat(HighestRateY3)) {
                    HighestRateY3Index = i.toString();
                    HighestRateY3 = this.allBanksService.listAllBanks[i].Year3;
                }
                if (HighestRateY4 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Year4) >= parseFloat(HighestRateY4)) {
                    HighestRateY4Index = i.toString();
                    HighestRateY4 = this.allBanksService.listAllBanks[i].Year4;
                }
                if (HighestRateY5 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Year5) >= parseFloat(HighestRateY5)) {
                    HighestRateY5Index = i.toString();
                    HighestRateY5 = this.allBanksService.listAllBanks[i].Year5;
                }
            }
            this.allBanksService.HighestRateTN = this.allBanksService.listAllBanks[HighestRateTNIndex].TN;
            this.allBanksService.HighestRateW1 = this.allBanksService.listAllBanks[HighestRateW1Index].Week1;
            this.allBanksService.HighestRateW2 = this.allBanksService.listAllBanks[HighestRateW2Index].Week2;
            this.allBanksService.HighestRateW3 = this.allBanksService.listAllBanks[HighestRateW3Index].Week3;
            this.allBanksService.HighestRateM1 = this.allBanksService.listAllBanks[HighestRateM1Index].Month1;
            this.allBanksService.HighestRateM2 = this.allBanksService.listAllBanks[HighestRateM2Index].Month2;
            this.allBanksService.HighestRateM3 = this.allBanksService.listAllBanks[HighestRateM3Index].Month3;
            this.allBanksService.HighestRateM4 = this.allBanksService.listAllBanks[HighestRateM4Index].Month4;
            this.allBanksService.HighestRateM5 = this.allBanksService.listAllBanks[HighestRateM5Index].Month5;
            this.allBanksService.HighestRateM6 = this.allBanksService.listAllBanks[HighestRateM6Index].Month6;
            this.allBanksService.HighestRateM7 = this.allBanksService.listAllBanks[HighestRateM7Index].Month7;
            this.allBanksService.HighestRateM8 = this.allBanksService.listAllBanks[HighestRateM8Index].Month8;
            this.allBanksService.HighestRateM9 = this.allBanksService.listAllBanks[HighestRateM9Index].Month9;
            this.allBanksService.HighestRateM10 = this.allBanksService.listAllBanks[HighestRateM10Index].Month10;
            this.allBanksService.HighestRateM11 = this.allBanksService.listAllBanks[HighestRateM11Index].Month11;
            this.allBanksService.HighestRateM12 = this.allBanksService.listAllBanks[HighestRateM12Index].Month12;
            this.allBanksService.HighestRateY2 = this.allBanksService.listAllBanks[HighestRateY2Index].Year2;
            this.allBanksService.HighestRateY3 = this.allBanksService.listAllBanks[HighestRateY3Index].Year3;
            this.allBanksService.HighestRateY4 = this.allBanksService.listAllBanks[HighestRateY4Index].Year4;
            this.allBanksService.HighestRateY5 = this.allBanksService.listAllBanks[HighestRateY5Index].Year5;
        }
    };
    AllBanksComponent = __decorate([
        Component({
            selector: 'app-all-banks',
            templateUrl: './all-banks.component.html',
            styleUrls: ['./all-banks.component.css']
        }),
        __metadata("design:paramtypes", [AllBanksService, NgxSpinnerService,
            ToastrService])
    ], AllBanksComponent);
    return AllBanksComponent;
}());
export { AllBanksComponent };
//# sourceMappingURL=all-banks.component.js.map