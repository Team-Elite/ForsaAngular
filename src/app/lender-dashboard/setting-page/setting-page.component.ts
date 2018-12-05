import { Inject, Component, OnInit } from '@angular/core';
import { ViewAllPriceService } from '../Shared/view-all-price.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { hubConnection, connection } from 'signalr-no-jquery';
import * as _ from 'lodash';
// import {LocalStorage} from '@ngx-pwa/local-storage';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

const connection = hubConnection('http://socket.elitewebdemo.com/signalr');
const hubProxy = connection.createHubProxy('NgHub');

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent implements OnInit {
    allChecked: boolean;
    orderByColumn: string = "Bank";
    previousPage: any;
    obj = {
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
    ratesOfIntrest: any[];

  constructor(public viewAllPriceService: ViewAllPriceService, public spinner: NgxSpinnerService
      , public toastr: ToastrService, public router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService) {
      hubProxy.on('sendBankRate', (data) => {
          this.viewAllPriceService.listViewAllPrice1 = [];
          this.viewAllPriceService.listViewAllPrice2 = [];
          this.viewAllPriceService.listViewAllPrice3 = [];
          this.GetAllBanksWithStatusIsDeselected();
          this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(this.orderByColumn);
          //this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
          // 
      })
      connection.start({ jsonp: true })
          .done(function () { console.log('Now connected, connection ID=' + connection.id); })
          .fail(function () { console.log('Could not connect'); });
  }

  ngOnInit() {
      this.allChecked = true;
      this.viewAllPriceService.listViewAllPrice1 = [];
      this.viewAllPriceService.listViewAllPrice2 = [];
      this.viewAllPriceService.listViewAllPrice3 = [];
      this.GetAllBanksWithStatusIsDeselected();
      this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(this.orderByColumn);
      this.spinner.show();
      this.spinner.hide();
      const self = this;
      const result = this.storage.get('viewAllPrice');
      if (result) this.obj = result.obj;
      
  }
   
    isSelected(val, type) {
        if (type == 2) {
            if (val) {
                this.obj.class2 = true;
            } else {
                this.obj.class2 = false;
            }
        } else if (type == 3) {
            if (val) {
                this.obj.class3 = true;
            } else {
                this.obj.class3 = false;
            }
        } else if (type == 4) {
            if (val) {
                this.obj.class4 = true;
            } else {
                this.obj.class4 = false;
            }
        } else if (type == 5) {
            if (val) {
                this.obj.class5 = true;
            } else {
                this.obj.class5 = false;
            }
        } else if (type == 6) {
            if (val) {
                this.obj.class6 = true;
            } else {
                this.obj.class6 = false;
            }
        } else if (type == 7) {
            if (val) {
                this.obj.class7 = true;
            } else {
                this.obj.class7 = false;
            }
        } else if (type == 8) {
            if (val) {
                this.obj.class8 = true;
            } else {
                this.obj.class8 = false;
            }
        } else if (type == 9) {
            if (val) {
                this.obj.class9 = true;
            } else {
                this.obj.class9 = false;
            }
        } else if (type == 10) {
            if (val) {
                this.obj.class10 = true;
            } else {
                this.obj.class10 = false;
            }
        } else if (type == 11) {
            if (val) {
                this.obj.class11 = true;
            } else {
                this.obj.class11 = false;
            }
        } else if (type == 12) {
            if (val) {
                this.obj.class12 = true;
            } else {
                this.obj.class12 = false;
            }
        } else if (type == 13) {
            if (val) {
                this.obj.class13 = true;
            } else {
                this.obj.class13 = false;
            }
        } else if (type == 14) {
            if (val) {
                this.obj.class14 = true;
            } else {
                this.obj.class14 = false;
            }
        } else if (type == 15) {
            if (val) {
                this.obj.class15 = true;
            } else {
                this.obj.class15 = false;
            }
        } else if (type == 16) {
            if (val) {
                this.obj.class16 = true;
            } else {
                this.obj.class16 = false;
            }
        } else if (type == 17) {
            if (val) {
                this.obj.class17 = true;
            } else {
                this.obj.class17 = false;
            }
        } else if (type == 18) {
            if (val) {
                this.obj.class18 = true;
            } else {
                this.obj.class18 = false;
            }
        } else if (type == 19) {
            if (val) {
                this.obj.class19 = true;
            } else {
                this.obj.class19 = false;
            }
        } else if (type == 20) {
            if (val) {
                this.obj.class20 = true;
            } else {
                this.obj.class20 = false;
            }
        }
  }
  save () {
      const self = this;
      this.storage.set('viewAllPrice', {obj: this.obj});
      self.router.navigateByUrl('/lenderDashboard/ViewAllPrice');
    //   this.storage.set('viewAllPrice', {obj: this.obj}).then(function () {
    //       self.router.navigateByUrl('/lenderDashboard/ViewAllPrice');
    //   });
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
        console.log(this.viewAllPriceService.listViewAllPrice1);
        console.log(this.viewAllPriceService.listViewAllPrice2);
        console.log(this.viewAllPriceService.listViewAllPrice3);
        this.spinner.hide();
    }
        
    async GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(columnName: string) {
        this.orderByColumn = columnName;
     //   this.spinner.show();
        let rates = await this.viewAllPriceService.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(columnName);
        this.viewAllPriceService.listAllBanks = rates;
        this.ratesOfIntrest = this.viewAllPriceService.listAllBanks;
        this.GetHighestRatesViewAllPrice();
        //this.SetHighestRatesTimeInterval();

       // this.spinner.hide();
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
    async DeselectSelectBank(bank: any) {

        this.spinner.show();
        var result = await this.viewAllPriceService.DeselectSelectBank(bank.UserId, bank.IsSelected);
        if (JSON.parse(result.IsSuccess)) {
            this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(this.orderByColumn);
            //this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
        } else {
            this.toastr.error('Some issue occured.', 'Dashboard');
        }
        this.spinner.hide();
    }

    pageChange(page: number) {
        if (page !== this.previousPage) {
            this.viewAllPriceService.selectedPageNumber = page;
            //this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
            this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(this.orderByColumn);
        }
    }

}
