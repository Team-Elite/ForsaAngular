import { Component, OnInit } from '@angular/core';
import { ViewAllPriceService } from '../Shared/view-all-price.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { hubConnection, connection } from 'signalr-no-jquery';

const connection = hubConnection('http://socket.elitewebdemo.com/signalr');
const hubProxy = connection.createHubProxy('NgHub');
@Component({
    selector: 'app-view-all-price',
    templateUrl: './view-all-price.component.html',
    styleUrls: ['./view-all-price.component.css']
})
export class ViewAllPriceComponent implements OnInit {

    constructor(public viewAllPriceService: ViewAllPriceService, public spinner: NgxSpinnerService
        , public toastr: ToastrService) {
        // set up event listeners i.e. for incoming "message" event
        hubProxy.on('sendBankRate', (data) => {
            this.viewAllPriceService.listViewAllPrice1 = [];
            this.viewAllPriceService.listViewAllPrice2 = [];
            this.viewAllPriceService.listViewAllPrice3 = [];
            this.GetAllBanksWithStatusIsDeselected();
            //this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
            this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
        })
        connection.start({ jsonp: true })
            .done(function () { console.log('Now connected, connection ID=' + connection.id); })
            .fail(function () { console.log('Could not connect'); });
    }

    previousPage: any;
    timer: any;
    timer1: any;
    orderByColumn:string="Bank";
    ngOnInit() {
        this.viewAllPriceService.listViewAllPrice1 = [];
        this.viewAllPriceService.listViewAllPrice2 = [];
        this.viewAllPriceService.listViewAllPrice3 = [];
        this.GetAllBanksWithStatusIsDeselected();
        this.spinner.show();
        //this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
        this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
        //this.SetTimeInterval();
        this.spinner.hide();
       
    }

    async GetAllBanksWithStatusIsDeselected() {

        this.viewAllPriceService.count = 0;
        this.viewAllPriceService.listViewAllPrice1 = [];
        this.viewAllPriceService.listViewAllPrice2 = [];
        this.viewAllPriceService.listViewAllPrice3 = [];
        this.spinner.show();
        let rates = await this.viewAllPriceService.GetAllBanksWithStatusIsDeselected();
        this.viewAllPriceService.listViewAllPrice = JSON.parse(rates.data);
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

    async DeselectSelectBank(bank: any) {

        this.spinner.show();
        var result = await this.viewAllPriceService.DeselectSelectBank(bank.UserId, bank.IsSelected);
        if (JSON.parse(result.IsSuccess)) {
            //this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
            this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
        } else {
            this.toastr.error("Some issue occured.", "Dashboard");
        }
        this.spinner.hide();
    }

    async GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected() {
       
        let rates = await this.viewAllPriceService.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
        if (rates.IfDataFound) {
            this.viewAllPriceService.listAllBanks = JSON.parse(rates.data);
           
           this.GetHighestRatesViewAllPrice();
          
        }
        else {
            this.viewAllPriceService.listAllBanks = [];

        }
       
     
       
    }

    SetTimeInterval() {
        this.timer = setInterval(() => {
            this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(); 
        }, 5000);
    }
    SetHighestRatesTimeInterval() {
        this.timer1 = setInterval(() => {
            this.GetHighestRatesViewAllPrice();
        }, 5000);
    }

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

    async GetAllBanksWithInterestRateHorizontalyOrderByColumnName(columnName: string) {
        this.orderByColumn=columnName;
        this.spinner.show();
        let rates = await this.viewAllPriceService.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(columnName);
        this.viewAllPriceService.listAllBanks = JSON.parse(rates.data);
        this.GetHighestRatesViewAllPrice();
        //this.SetHighestRatesTimeInterval();
       
        this.spinner.hide();
    }

    pageChange(page: number) {
        if (page !== this.previousPage) {
            this.viewAllPriceService.selectedPageNumber = page;
            this.GetAllBanksWithStatusIsDeselected();
        }
    }
}
