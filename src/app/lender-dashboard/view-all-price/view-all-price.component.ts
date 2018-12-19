import { Inject, Component, OnInit } from '@angular/core';
import { ViewAllPriceService } from '../Shared/view-all-price.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { hubConnection, connection } from 'signalr-no-jquery';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment.prod';
// import {Storage} from '@ionic/storage';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { AuthenticateServiceService } from '../../Shared/authenticate-service.service';
import { UserProfileServiceService } from '../../userprofile/Shared/user-profile-service.service';
//import { UserModel } from '../../registration/Shared/user-model.model';
//import { Console } from '@angular/core/src/console';
import { BestPriceViewService } from '../best-price-view/Shared/best-price-view.service';
import { DatePipe } from '@angular/common';

const connection = (environment.production) ? hubConnection('http://40.89.139.123:4044') : hubConnection('http://localhost:50859');
const hubProxy = connection.createHubProxy('ForsaHub');
@Component({
    selector: 'app-view-all-price',
    templateUrl: './view-all-price.component.html',
    styleUrls: ['./view-all-price.component.css']
})
export class ViewAllPriceComponent implements OnInit {
    request_sent: boolean=false;
    tempStorage: any;
    tempAmount: any;
    IfBankResponseFound: boolean = false;
    temp_array = [];
    ratesOfIntrest = [];
    allChecked: boolean;
    IfRequestSent:boolean=false;
    objBankInfo: any = { BankId: '', Bank: '', NameOfCompany: '', Place: '', Street: '' };
    obj = {
        class1: false,
        class2: true,
        class3: true,
        class4: true,
        class5: true,
        class6: true,
        class7: true,
        class8: true,
        class9: true,
        class10: true,
        class11: true,
        class12: true,
        class13: true,
        class14: true,
        class15: true,
        class16: true,
        class17: true,
        class18: true,
        class19: true,
        class20: true
    };
    hideShowArray = [
        { class1: true },
        { class2: true },
        { class3: true },
        { class4: true },
        { class5: true },
        { class6: true },
        { class7: true },
        { class8: true },
        { class9: true },
        { class10: true },
        { class11: true },
        { class12: true },
        { class13: true },
        { class14: true },
        { class15: true },
        { class16: true },
        { class17: true },
        { class18: true },
        { class19: true },
        { class20: true }
    ];

    path: string;


    constructor(public viewAllPriceService: ViewAllPriceService, public spinner: NgxSpinnerService
        , public toastr: ToastrService, @Inject(LOCAL_STORAGE) private storage: StorageService, public authenticateServiceService: AuthenticateServiceService, public userProfileServiceService: UserProfileServiceService
        , public bestPriceViewService: BestPriceViewService
        , public pipe: DatePipe) {
        // set up event listeners i.e. for incoming "message" event
        hubProxy.on('sendBankRate', (data) => {
            this.viewAllPriceService.listViewAllPrice1 = [];
            this.viewAllPriceService.listViewAllPrice2 = [];
            this.viewAllPriceService.listViewAllPrice3 = [];
            this.GetAllBanksWithStatusIsDeselected();
            this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(this.orderByColumn);
           // this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
        })
        connection.start({ jsonp: true })
            .done(function () { console.log('Now connected, connection ID=' + connection.id); })
            .fail(function () { console.log('Could not connect'); });
    }

    previousPage: any;
    timer: any;
    timer1: any;
    orderByColumn: string = "Bank";
    loginUserTypeId: string;
    ngOnInit() {
        this.request_sent = false;
        this.path = this.authenticateServiceService.GetUserId().baseURL + "/Uploads/Docs/";// + this.authenticateServiceService.GetUserId() + "/UserProfile/";
        this.allChecked = true;
        this.viewAllPriceService.listViewAllPrice1 = [];
        this.viewAllPriceService.listViewAllPrice2 = [];
        this.viewAllPriceService.listViewAllPrice3 = [];
       // this.GetAllBanksWithStatusIsDeselected();
        this.spinner.show();
        // this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
        this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(this.orderByColumn);
        //this.SetTimeInterval();
        this.spinner.hide();
        const self = this;
        const result = this.storage.get('viewAllPrice');
        if (result) {
            result.obj.class1 = false;
            this.obj = result.obj;
        }
        console.log(result);


        this.bestPriceViewService.lenderSendRequestModel = {
            RequestId: 0,
            LenderId: 0,
            BorrowerId: 0,
            LenderName: '',
            BorrowerName: '',
            Amount: 0.00,
            StartDate: null,
            EndDate: null,
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
        }
    }
    GermanFormat(amount) {
        if(!amount) return;
        const val = parseFloat(amount);
        this.tempStorage = val;
        this.tempAmount = val.toLocaleString('de-DE');
        console.log(this.tempAmount);
        
        // var amt = this.bestPriceViewService.lenderSendRequestModel2.Amount;
        // var parts = amt.toString().split(".");
        // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        // this.bestPriceViewService.lenderSendRequestModel2.Amount = parts.join(".");
        
    }

    async GetAllBanksWithStatusIsDeselected() {

        this.viewAllPriceService.count = 0;
        this.viewAllPriceService.listViewAllPrice1 = [];
        this.viewAllPriceService.listViewAllPrice2 = [];
        this.viewAllPriceService.listViewAllPrice3 = [];
        this.spinner.show();
        let rates = await this.viewAllPriceService.GetAllBanksWithStatusIsDeselected();
        this.viewAllPriceService.listViewAllPrice = rates;
        if (this.viewAllPriceService.listViewAllPrice != undefined && this.viewAllPriceService.listViewAllPrice != null && this.viewAllPriceService.listViewAllPrice.length != 0) {
            this.viewAllPriceService.toatlBanksCount = this.viewAllPriceService.listViewAllPrice[0].Count;
        }
        for (var i = 0; i <= this.viewAllPriceService.listViewAllPrice.length - 1; i++) {
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
    }
    async changeFormat(event) {
        console.log(event);
    }

    async DeselectSelectBank(bank: any) {

        this.spinner.show();
        var result = await this.viewAllPriceService.DeselectSelectBank(bank.UserId, bank.IsSelected);
        if (JSON.parse(result.IsSuccess)) {
            //this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
            this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(this.orderByColumn);
        } else {
            this.toastr.error("Some issue occured.", "Dashboard");
        }
        this.spinner.hide();
    }

    async GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(columnName: string) {
        this.orderByColumn = columnName;
        debugger;
        let rates = await this.viewAllPriceService.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(this.orderByColumn);
        if (rates != null || rates != undefined) {
            rates.forEach(ele => {
                ele.class1 = false;
                ele.class2 = this.obj.class2;
                ele.class3 = this.obj.class3;
                ele.class4 = this.obj.class4;
                ele.class5 = this.obj.class5;
                ele.class6 = this.obj.class6;
                ele.class7 = this.obj.class7;
                ele.class8 = this.obj.class8;
                ele.class9 = this.obj.class9;
                ele.class10 = this.obj.class10;
                ele.class11 = this.obj.class11;
                ele.class12 = this.obj.class12;
                ele.class13 = this.obj.class13;
                ele.class14 = this.obj.class14;
                ele.class15 = this.obj.class15;
                ele.class16 = this.obj.class16;
                ele.class17 = this.obj.class17;
                ele.class18 = this.obj.class18;
                ele.class19 = this.obj.class19;
                ele.class20 = this.obj.class20;
            });
            this.viewAllPriceService.listAllBanks = rates;
            this.ratesOfIntrest = this.viewAllPriceService.listAllBanks;

            this.GetHighestRatesViewAllPrice();

        }
        else {
            this.viewAllPriceService.listAllBanks = [];

        }
    }

    SetTimeInterval() {
        this.timer = setInterval(() => {
            this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(this.orderByColumn);
        }, 1000);
    }
    //SetHighestRatesTimeInterval() {
    //    this.timer1 = setInterval(() => {
    //        this.GetHighestRatesViewAllPrice();
    //    }, 5000);
    //}

    GetHighestRatesViewAllPrice() {

        if (this.viewAllPriceService.listAllBanks != undefined && this.viewAllPriceService.listAllBanks != null && this.viewAllPriceService.listAllBanks.length != 0) {
            var HighestRateTN: string, HighestRateW1: string, HighestRateW2: string, HighestRateW3: string
                , HighestRateM1: string
                , HighestRateM2: string, HighestRateM3: string, HighestRateM4: string, HighestRateM5: string, HighestRateM6: string
                , HighestRateM7: string, HighestRateM8: string, HighestRateM9: string, HighestRateM10: string
                , HighestRateM11: string
                , HighestRateM12: string, HighestRateY2: string, HighestRateY3: string, HighestRateY4: string
                , HighestRateY5: string;

            var HighestRateTNIndex: string, HighestRateW1Index: string, HighestRateW2Index: string, HighestRateW3Index: string, HighestRateM1Index: string
                , HighestRateM2Index: string, HighestRateM3Index: string, HighestRateM4Index: string, HighestRateM5Index: string, HighestRateM6Index: string
                , HighestRateM7Index: string, HighestRateM8Index: string, HighestRateM9Index: string, HighestRateM10Index: string, HighestRateM11Index: string
                , HighestRateM12Index: string, HighestRateY2Index: string, HighestRateY3Index: string, HighestRateY4Index: string, HighestRateY5Index: string;

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

    }

    //async GetAllBanksWithInterestRateHorizontalyOrderByColumnName(columnName: string) {
    //    this.orderByColumn = columnName;
    //    this.spinner.show();
    //    let rates = await this.viewAllPriceService.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(columnName);
    //    console.log(rates);
    //    rates.forEach(ele => {
    //        ele.class1 = false;
    //        ele.class2 = this.obj.class2;
    //        ele.class3 = this.obj.class3;
    //        ele.class4 = this.obj.class4;
    //        ele.class5 = this.obj.class5;
    //        ele.class6 = this.obj.class6;
    //        ele.class7 = this.obj.class7;
    //        ele.class8 = this.obj.class8;
    //        ele.class9 = this.obj.class9;
    //        ele.class10 = this.obj.class10;
    //        ele.class11 = this.obj.class11;
    //        ele.class12 = this.obj.class12;
    //        ele.class13 = this.obj.class13;
    //        ele.class14 = this.obj.class14;
    //        ele.class15 = this.obj.class15;
    //        ele.class16 = this.obj.class16;
    //        ele.class17 = this.obj.class17;
    //        ele.class18 = this.obj.class18;
    //        ele.class19 = this.obj.class19;
    //        ele.class20 = this.obj.class20;
    //    });
    //    this.viewAllPriceService.listAllBanks = rates;
    //    this.ratesOfIntrest = this.viewAllPriceService.listAllBanks;
     
    //    this.GetHighestRatesViewAllPrice();
    //   // this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
    //    //this.SetHighestRatesTimeInterval();

    //    this.spinner.hide();
    //}

    pageChange(page: number) {
        if (page !== this.previousPage) {
            this.viewAllPriceService.selectedPageNumber = page;
            this.GetAllBanksWithStatusIsDeselected();
        }
    }
    isChecked(val, index) {
        if (index == 0) {
            if (val) {
                this.allChecked = true;
                this.viewAllPriceService.listAllBanks.forEach((ele, i) => {
                    ele.class1 = false;
                    ele.class2 = true;
                    ele.class3 = true;
                    ele.class4 = true;
                    ele.class5 = true;
                    ele.class6 = true;
                    ele.class7 = true;
                    ele.class8 = true;
                    ele.class9 = true;
                    ele.class10 = true;
                    ele.class11 = true;
                    ele.class12 = true;
                    ele.class13 = true;
                    ele.class14 = true;
                    ele.class15 = true;
                    ele.class16 = true;
                    ele.class17 = true;
                    ele.class18 = true;
                    ele.class19 = true;
                    ele.class20 = true;
                });
                this.obj = {
                    class1: false,
                    class2: true,
                    class3: true,
                    class4: true,
                    class5: true,
                    class6: true,
                    class7: true,
                    class8: true,
                    class9: true,
                    class10: true,
                    class11: true,
                    class12: true,
                    class13: true,
                    class14: true,
                    class15: true,
                    class16: true,
                    class17: true,
                    class18: true,
                    class19: true,
                    class20: true
                };
            } else {

                this.viewAllPriceService.listAllBanks.forEach((ele, i) => {
                    ele.class1 = false;
                    ele.class2 = false;
                    ele.class3 = false;
                    ele.class4 = false;
                    ele.class5 = false;
                    ele.class6 = false;
                    ele.class7 = false;
                    ele.class8 = false;
                    ele.class9 = false;
                    ele.class10 = false;
                    ele.class11 = false;
                    ele.class12 = false;
                    ele.class13 = false;
                    ele.class14 = false;
                    ele.class15 = false;
                    ele.class16 = false;
                    ele.class17 = false;
                    ele.class18 = false;
                    ele.class19 = false;
                    ele.class20 = false;
                });
                this.obj = {
                    class1: false,
                    class2: false,
                    class3: false,
                    class4: false,
                    class5: false,
                    class6: false,
                    class7: false,
                    class8: false,
                    class9: false,
                    class10: false,
                    class11: false,
                    class12: false,
                    class13: false,
                    class14: false,
                    class15: false,
                    class16: false,
                    class17: false,
                    class18: false,
                    class19: false,
                    class20: false
                };
            }
        } else {
            if (!val) {

                this.allChecked = false;
                this.viewAllPriceService.listAllBanks.forEach((ele, i) => {
                    switch (index) {

                        case 1:
                            ele.class1 = false;
                            this.obj.class1 = false;

                            break;
                        case 2:
                            ele.class2 = false;
                            this.obj.class2 = false;

                            break;
                        case 3:
                            ele.class3 = false;
                            this.obj.class3 = false;

                            break;
                        case 4:
                            ele.class4 = false;
                            this.obj.class4 = false;

                            break;
                        case 5:
                            ele.class5 = false;
                            this.obj.class5 = false;

                            break;
                        case 6:
                            ele.class6 = false;
                            this.obj.class6 = false;

                            break;
                        case 7:
                            ele.class7 = false;
                            this.obj.class7 = false;

                            break;
                        case 8:
                            ele.class8 = false;
                            this.obj.class8 = false;

                            break;
                        case 9:
                            ele.class9 = false;
                            this.obj.class9 = false;

                            break;
                        case 10:
                            ele.class10 = false;
                            this.obj.class10 = false;

                            break;
                        case 11:
                            ele.class11 = false;
                            this.obj.class11 = false;

                            break;
                        case 12:
                            ele.class12 = false;
                            this.obj.class12 = false;

                            break;
                        case 13:
                            ele.class13 = false;
                            this.obj.class13 = false;

                            break;
                        case 14:
                            ele.class14 = false;
                            this.obj.class14 = false;

                            break;
                        case 15:
                            ele.class15 = false;
                            this.obj.class15 = false;

                            break;
                        case 16:
                            ele.class16 = false;
                            this.obj.class16 = false;

                            break;
                        case 17:
                            ele.class17 = false;
                            this.obj.class17 = false;

                            break;
                        case 18:
                            ele.class18 = false;
                            this.obj.class18 = false;

                            break;
                        case 19:
                            ele.class19 = false;
                            this.obj.class19 = false;

                            break;
                        case 20:
                            ele.class20 = false;
                            this.obj.class20 = false;

                    }
                });
            } else {

            }
        }

    }

    async ShowBankPopup(data: any) {
        this.spinner.show();
      
       
        //this.objBankInfo.UserFiles = this.userProfileServiceService.listOfFileUploaded
        await this.authenticateServiceService.GetUserById(data.UserId,false);
        this.objBankInfo = this.authenticateServiceService.bankInfo; 
        await this.userProfileServiceService.GetDocList(data.UserId);
        this.spinner.hide();
        var element = document.getElementById('btnShowBankInfo');
        element.click();
      
    }

    ShowSendRequestModal(bank: any) {
        
        //  document.getElementById('modalSendRequest').style.display='block';
        //  document.getElementById('modalSendRequest').style.display='block';
      
        this.IfBankResponseFound = false;
        this.request_sent = false;
        this.IfRequestSent=false;
        this.tempAmount = '';
        this.bestPriceViewService.lenderSendRequestModel = this.bestPriceViewService.lenderSendRequestModel = {
            RequestId: 0,
            LenderId: 0,
            BorrowerId: 0,
            LenderName: '',
            BorrowerName: '',
            Amount: null,
            StartDate: null,
            EndDate: null,
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
        this.bestPriceViewService.lenderSendRequestModel.Amount = null;
        this.bestPriceViewService.lenderSendRequestModel.NoOfDays = 0;
        this.bestPriceViewService.lenderSendRequestModel.BorrowerId = bank.UserId;
        this.bestPriceViewService.lenderSendRequestModel.LenderId = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetUserId();
        this.bestPriceViewService.lenderSendRequestModel.BorrowerName = bank.Bank;
        this.bestPriceViewService.lenderSendRequestModel.LenderName = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetLenderName();
        // this.bestPriceViewService.lenderSendRequestModel.StartDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
        // this.bestPriceViewService.lenderSendRequestModel.EndDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
        this.bestPriceViewService.lenderSendRequestModel.InterestConvention = this.bestPriceViewService.listInterestConvention[0].Id;
        this.bestPriceViewService.lenderSendRequestModel.Payments = this.bestPriceViewService.listPayments[0].Id;
        this.bestPriceViewService.lenderSendRequestModel.LenderEmailId = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetEmailId();
    }

    SaveSendRequest() {
        this.bestPriceViewService.lenderSendRequestModel.Amount = this.tempStorage;
        console.log(this.bestPriceViewService.lenderSendRequestModel.Amount);
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
        var d1 = this.bestPriceViewService.lenderSendRequestModel.StartDate['jsdate'];
        d1.setTime( d1.getTime() - d1.getTimezoneOffset()*60*1000 );
        var d2 = this.bestPriceViewService.lenderSendRequestModel.EndDate['jsdate'];
        d2.setTime( d2.getTime() - d2.getTimezoneOffset()*60*1000 );
        console.log({...this.bestPriceViewService.lenderSendRequestModel, ...{StartDate: d1}, ...{EndDate: d2}});
        this.bestPriceViewService.SaveSendRequest({...this.bestPriceViewService.lenderSendRequestModel, ...{StartDate: d1}, ...{EndDate: d2}})
        .subscribe(data => {
            this.spinner.hide();
            this.request_sent = true;
            // this.toastr.success(".REQUEST SENT SUCCESFULLY. PLEASE WAIT FOR BORROWER’S RESPONSE.", "Dashboard");
            // var element = document.getElementById('closeSendRequestModal');
            // element.click();
            this.IfRequestSent=true;
        })
    }

    ValidateSendRequest(requestModel: any) {

        if (requestModel.Amount == undefined || requestModel.Amount == null || requestModel.Amount.length == 0) {
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
            catch{
                return false;
            }
        }

        if (requestModel.Amount == 0) {
            this.toastr.error('Amounut can not be 0.');
            return false;
        }
        // let currentDate: any = new Date(this.pipe.transform(new Date(), 'yyyy-MM-dd')).getTime();
        // let startDate: any = new Date(requestModel.StartDate).getTime();
        // let endDate: any = new Date(requestModel.EndDate).getTime();
        let currentDate: any = (new Date(this.pipe.transform(new Date().setDate(new Date().getDate() - 1), 'yyyy-MM-dd')).getTime())/1000;
        let startDate: any = requestModel.StartDate['epoc'];
        let endDate: any = requestModel.EndDate['epoc'];
        if (!startDate) {
            this.toastr.error('Please select Start date');
            return false;
        }
        if (!endDate) {
            this.toastr.error('Please select End date');
            return false;
        }
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

        if (startDate == endDate) {
            this.toastr.error('Start and End date can not be same.');
            return false;
        }

        return true;
    }

    CalculateNumberOfDays() {
        
        // let fromDate: any = new Date(this.bestPriceViewService.lenderSendRequestModel.StartDate);
        // let toDate: any = new Date(this.bestPriceViewService.lenderSendRequestModel.EndDate);
        // if (this.bestPriceViewService.lenderSendRequestModel.StartDate != "" && this.bestPriceViewService.lenderSendRequestModel.EndDate != "") {
        //     this.bestPriceViewService.lenderSendRequestModel.NoOfDays = (toDate - fromDate) / 86400000;
        // }
        // else {
        //     this.bestPriceViewService.lenderSendRequestModel.NoOfDays = 0;
        // }
        let fromDate: any;
        let toDate: any;
        if(this.bestPriceViewService.lenderSendRequestModel.StartDate) {
            fromDate = this.bestPriceViewService.lenderSendRequestModel.StartDate['epoc'];
        }
        if(this.bestPriceViewService.lenderSendRequestModel.EndDate) {
            toDate = this.bestPriceViewService.lenderSendRequestModel.EndDate['epoc'];
        }
         
        if (fromDate && toDate) {
            this.bestPriceViewService.lenderSendRequestModel.NoOfDays = (toDate - fromDate) / 86400;
            return (toDate - fromDate) / 86400;
        }
        else {
            this.bestPriceViewService.lenderSendRequestModel.NoOfDays = 0
            return 0;
        }
    }

    //It checks if key pressed is integer or not if not then it returns false.
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }
}
