import { Component, OnInit } from '@angular/core';
import {BestPriceViewService} from './Shared/best-price-view.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService  } from 'ngx-toastr';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-best-price-view',
  templateUrl: './best-price-view.component.html',
  styleUrls: ['./best-price-view.component.css']
})
export class BestPriceViewComponent implements OnInit {

  constructor(public bestPriceViewService:BestPriceViewService,public spinner:NgxSpinnerService
    , public toastr:ToastrService, public pipe:DatePipe) { }

  ngOnInit() {
    this.spinner.show();
    this.GetRatesByTimePeriod();

    this.bestPriceViewService.listInterestConvention=[{Id:1, Value:'act/360'}];
    this.bestPriceViewService.listPayments=[{Id:1, Value:'yearly payments'}];

    this.bestPriceViewService.lenderSendRequestModel={
    RequestId :0,
    LenderId :0,
    BorrowerId :0,
    LenderName:'',
    BorrowerName:'',
    Amount :0.00,
    StartDate :new Date(),
    EndDate :new Date(),
    NoOfDays :0,
    InterestConvention :'',
    Payments :'',
    IsRequestAccepted :false,
    DateCreated :new Date(),
    DateModified :new Date(),
    RequestCreatedBy :this.bestPriceViewService.lenderDashboardService.userId
    }
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

   ShowSendRequestModal(bank:any){
     debugger;
     this.bestPriceViewService.lenderSendRequestModel.BorrowerName=bank.Bank;
     this.bestPriceViewService.lenderSendRequestModel.LenderName=this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetLenderName();
     this.bestPriceViewService.lenderSendRequestModel.StartDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
     this.bestPriceViewService.lenderSendRequestModel.EndDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
     this.bestPriceViewService.lenderSendRequestModel.InterestConvention=this.bestPriceViewService.listInterestConvention[0].Id;
     this.bestPriceViewService.lenderSendRequestModel.Payments=this.bestPriceViewService.listPayments[0].Id;
   }
}
