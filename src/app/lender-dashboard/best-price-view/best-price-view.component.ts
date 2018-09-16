import { Component, OnInit } from '@angular/core';
import {BestPriceViewService} from './Shared/best-price-view.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService  } from 'ngx-toastr';

@Component({
  selector: 'app-best-price-view',
  templateUrl: './best-price-view.component.html',
  styleUrls: ['./best-price-view.component.css']
})
export class BestPriceViewComponent implements OnInit {

  constructor(public bestPriceViewService:BestPriceViewService,public spinner:NgxSpinnerService
    , public toastr:ToastrService) { }

  ngOnInit() {
    this.spinner.show();
    this.GetRatesByTimePeriod();
  }

  async GetRatesByTimePeriod(){
    debugger;
    let rates= await this.bestPriceViewService.GetRatesByTimePeriod();
    this.bestPriceViewService.listRatesByTimePeriod=JSON.parse(rates.data);
    this.spinner.hide();
   }

   async GetBanksByTimePeriod(timePeriodId:number){
    debugger;
    this.bestPriceViewService.timePeriod=timePeriodId;
    this.bestPriceViewService.pageNumber=1;
    this.spinner.show();
    let rates= await this.bestPriceViewService.GetBanksByTimePeriod();
    this.bestPriceViewService.listBankByTimePeriod=JSON.parse(rates.data);
    this.spinner.hide();
   }
}
