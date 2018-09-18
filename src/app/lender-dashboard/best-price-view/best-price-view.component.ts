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
    StartDate :'',
    EndDate :'',
    NoOfDays :0,
    InterestConvention :'',
    Payments :'',
    IsRequestAccepted :false,
    DateCreated :new Date(),
    DateModified :new Date(),
    RequestCreatedBy :this.bestPriceViewService.lenderDashboardService.userId
    }
  }
  
  CalculateNumberOfDays(){
    debugger; 
    let fromDate: any=new Date(this.bestPriceViewService.lenderSendRequestModel.StartDate);
    let toDate: any =new Date(this.bestPriceViewService.lenderSendRequestModel.EndDate);
    if(this.bestPriceViewService.lenderSendRequestModel.StartDate != "" && this.bestPriceViewService.lenderSendRequestModel.EndDate !=""){
      this.bestPriceViewService.lenderSendRequestModel.NoOfDays= (toDate-fromDate)/86400000;
    }
    else{
      this.bestPriceViewService.lenderSendRequestModel.NoOfDays=0;
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
     this.bestPriceViewService.lenderSendRequestModel.Amount=0;
     this.bestPriceViewService.lenderSendRequestModel.NoOfDays=0;
     this.bestPriceViewService.lenderSendRequestModel.BorrowerId=bank.UserId;
     this.bestPriceViewService.lenderSendRequestModel.LenderId=this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetUserId();
     this.bestPriceViewService.lenderSendRequestModel.BorrowerName=bank.Bank;
     this.bestPriceViewService.lenderSendRequestModel.LenderName=this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetLenderName();
     this.bestPriceViewService.lenderSendRequestModel.StartDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
     this.bestPriceViewService.lenderSendRequestModel.EndDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
     this.bestPriceViewService.lenderSendRequestModel.InterestConvention=this.bestPriceViewService.listInterestConvention[0].Id;
     this.bestPriceViewService.lenderSendRequestModel.Payments=this.bestPriceViewService.listPayments[0].Id;
   }

   SaveSendRequest(){
     debugger;

     if(!this.ValidateSendRequest(this.bestPriceViewService.lenderSendRequestModel)){
       return false;
     }

    this.spinner.show(); 
    this.bestPriceViewService.SaveSendRequest(this.bestPriceViewService.lenderSendRequestModel).subscribe(data =>{
    this.spinner.hide();
    this.toastr.success("Request sent successfully.","Dashboard");
      
    })
   }

   ValidateSendRequest(requestModel:any){

    if(requestModel.Amount ==0){
      this.toastr.error('Amounut can not be 0.');
      return false;
    }
    let currentDate:any= new Date(this.pipe.transform(new Date(), 'yyyy-MM-dd')).getTime();
    let startDate: any= new Date(requestModel.StartDate).getTime();
    let endDate: any= new Date(requestModel.EndDate).getTime();
    if(startDate< currentDate){
      this.toastr.error('Start date can not be less than from today date.');
      return false;
    }

    if(endDate< currentDate){
      this.toastr.error('End date can not be less than from today date.');
      return false;
    }

    if(endDate<startDate){
      this.toastr.error('End date can not be less than start date.');
      return false;
    }

    if(currentDate == endDate){
      this.toastr.error('Start and End date can not be same.');
      return false;
    }

    return true;
   }
}
