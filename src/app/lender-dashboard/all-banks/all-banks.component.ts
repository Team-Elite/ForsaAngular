import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AllBanksService } from '../Shared/all-banks.service';
import { hubConnection, connection } from 'signalr-no-jquery';
import { environment } from '../../../environments/environment.prod';
import { AuthenticateServiceService } from '../../Shared/authenticate-service.service';
import { UserProfileServiceService } from '../../userprofile/Shared/user-profile-service.service';


const connection = (environment.production) ? hubConnection('http://40.89.139.123:4044') : hubConnection('http://localhost:50859');

const hubProxy = connection.createHubProxy('ForsaHub');

@Component({
    selector: 'app-all-banks',
    templateUrl: './all-banks.component.html',
    styleUrls: ['./all-banks.component.css']
})
export class AllBanksComponent implements OnInit {
    path: string;
    ;

    constructor(public allBanksService: AllBanksService, public spinner: NgxSpinnerService
        , public toastr: ToastrService, public authenticateServiceService: AuthenticateServiceService, public userProfileServiceService: UserProfileServiceService) {
        // set up event listeners i.e. for incoming "message" event
        hubProxy.on('sendBankRate', (data) => {
            //this.GetAllBanksWithInterestRateHorizontaly();
            this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
        })
        connection.start({ jsonp: true })
            .done(function () { console.log('Now connected, connection ID=' + connection.id); })
            .fail(function () { console.log('Could not connect'); });
    }
    orderByColumn: string = "Bank";
    objBankInfo: any = {BankId:'', Bank: '', NameOfCompany: '', Place: '', Street: '' };
    tmpList: any[];
    timer: any;
    ngOnInit() {
        this.path = this.authenticateServiceService.baseURL + "/Uploads/Docs/";// + this.authenticateServiceService.GetUserId() + "/UserProfile/";
        this.spinner.show();
        this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
       //this.SetTimeInterval();
        this.spinner.hide();
    }
    SetTimeInterval() {
        this.timer = setInterval(() => {
            //this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
        }, 5000);
    }
    async GetAllBanksWithInterestRateHorizontaly() {

        let rates = await this.allBanksService.GetAllBanksWithInterestRateHorizontaly();
        this.allBanksService.listAllBanks = rates;
        this.GetHighestRates();

    }

    //   sortProduct<T>(propName: any, order: "ASC" | "DESC"): void {
    //     this.tmpList.sort((a, b) => {
    //         if (a[propName] < b[propName])
    //             return -1;
    //         if (a[propName] > b[propName])
    //             return 1;
    //         return 0;
    //     });
    // } 

    async GetAllBanksWithInterestRateHorizontalyOrderByColumnName(columnName: string) {
        
        this.orderByColumn = columnName;
        let rates = await this.allBanksService.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(columnName);

        this.allBanksService.listAllBanks = rates;
        this.GetHighestRates();

    }
    GetHighestRates() {

        if (this.allBanksService.listAllBanks != undefined && this.allBanksService.listAllBanks != null && this.allBanksService.listAllBanks.length != 0) {
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

    }
    async ShowBankPopup(data: any) {
        this.spinner.show();
        //this.objBankInfo.UserFiles = this.userProfileServiceService.listOfFileUploaded
        await this.authenticateServiceService.GetUserById(data.UserId);
        this.objBankInfo = this.authenticateServiceService.bankInfo;
        await this.userProfileServiceService.GetDocList(data.UserId);
        this.spinner.hide();
        var element = document.getElementById('btnShowBankInfo');
        element.click();

    }
}
