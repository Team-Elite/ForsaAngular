import { Component, OnInit } from '@angular/core';
import { ViewAllPriceService } from '../Shared/view-all-price.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { hubConnection, connection } from 'signalr-no-jquery';
import * as _ from 'lodash';
// import {LocalStorage} from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

const connection = hubConnection('http://socket.elitewebdemo.com/signalr');
const hubProxy = connection.createHubProxy('NgHub');

@Component({
    selector: 'app-settingratefield',
    templateUrl: './settingratefield.component.html',
    styleUrls: ['./settingratefield.component.css']
})
export class SettingratefieldComponent implements OnInit { 
    allChecked: boolean;
    previousPage: any;
    obj = {
        class1: true,
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

    constructor(public viewAllPriceService: ViewAllPriceService, public spinner: NgxSpinnerService
        , public toastr: ToastrService, public router: Router, public storage: Storage) {
        hubProxy.on('sendBankRate', (data) => {
            this.viewAllPriceService.listViewAllPrice1 = [];
            this.viewAllPriceService.listViewAllPrice2 = [];
            this.viewAllPriceService.listViewAllPrice3 = [];
            this.GetAllBanksWithStatusIsDeselected();
            //this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
            // this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
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
        this.spinner.show();
        this.spinner.hide();
        const self = this;
        this.storage.get('viewAllPrice').then(function (result) {
            console.log(result);
            if (result) self.obj = result.obj;
        });
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
    isSelected(val, type) {
        if (type == 1) {
            if (val) {
                this.obj.class1 = true;
            } else {
                this.obj.class1 = false;
            }
        } else if (type == 2) {
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
    save() {
        const self = this;
        this.storage.set('viewAllPrice', { obj: this.obj }).then(function () {
            self.router.navigateByUrl('/lenderDashboard/ViewAllPrice');
        });
    }

    pageChange(page: number) {
        if (page !== this.previousPage) {
            this.viewAllPriceService.selectedPageNumber = page;
            //this.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(this.orderByColumn);
            this.GetAllBanksWithStatusIsDeselected();
        }
    }

}
