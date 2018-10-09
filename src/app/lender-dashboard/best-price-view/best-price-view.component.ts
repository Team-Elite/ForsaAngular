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

    p:any;
    selectedTimePeriod:number=null;
    IfBankResponseFound:boolean=false;
    timer:any;
  ngOnInit() {
    this.spinner.show();
    this.GetRatesByTimePeriod();
    this.bestPriceViewService.listBankByTimePeriod=[];
    var selectedTimePeriodId= undefined;
    selectedTimePeriodId =this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetSavedSelectedTimePeriodId();
    if(selectedTimePeriodId != undefined){
      this.selectedTimePeriod=selectedTimePeriodId;
      this.GetBanksByTimePeriod(selectedTimePeriodId);
    }

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
    RequestCreatedBy :this.bestPriceViewService.lenderDashboardService.userId,
    InterestConventionName:'',
    LenderEmailId:'',
    PaymentsName:'',
    IsAccepted:null,
    IsRejected:null,
    RateOfInterest:0.00,
    BorrowerEmailId:'',
    MessageForForsa:'',
    IsMessageSentToForsa:false
    }
this.SetTimeInterval();
    
  }
  
  SetTimeInterval(){
    this.timer= setInterval(() => {
      this.GetLenderSendRequestPendingLendedRequestByLenderId();
    }, 5000);
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
    //document.getElementById(timePeriodId.toString());
    this.selectedTimePeriod=timePeriodId;
    this.bestPriceViewService.lenderDashboardService.authenticateServiceService.SaveSelectedTimePeriodId(timePeriodId);
    this.bestPriceViewService.timePeriod=timePeriodId;
    this.bestPriceViewService.pageNumber=1;
    this.spinner.show();
    let rates= await this.bestPriceViewService.GetBanksByTimePeriod();
    this.bestPriceViewService.listBankByTimePeriod=JSON.parse(rates.data);
    this.spinner.hide();
   }

   //It checks if key pressed is integer or not if not then it returns false.
numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}
   ShowSendRequestModal(bank:any){
     debugger;
    //  document.getElementById('modalSendRequest').style.display='block';
    //  document.getElementById('modalSendRequest').style.display='block';
    this.IfBankResponseFound=false;
     this.bestPriceViewService.lenderSendRequestModel=this.bestPriceViewService.lenderSendRequestModel={
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
      RequestCreatedBy :this.bestPriceViewService.lenderDashboardService.userId,
      InterestConventionName:'',
      LenderEmailId:'',
      PaymentsName:'',
      IsAccepted:null,
      IsRejected:null,
      RateOfInterest:0.00,
      BorrowerEmailId:'',
      MessageForForsa:'',
    IsMessageSentToForsa:false
      };
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
     this.bestPriceViewService.lenderSendRequestModel.LenderEmailId=this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetEmailId();
   }

   SaveSendRequest(){
     debugger;
     for(var i =0; i<= this.bestPriceViewService.listInterestConvention.length-1;i++){
       if(this.bestPriceViewService.lenderSendRequestModel.InterestConvention == this.bestPriceViewService.listInterestConvention[i].Id){
        this.bestPriceViewService.lenderSendRequestModel.InterestConventionName=this.bestPriceViewService.listInterestConvention[i].Value;
        break;
       }
     }

     for(var i =0; i<= this.bestPriceViewService.listPayments.length-1;i++){
      if(this.bestPriceViewService.lenderSendRequestModel.Payments == this.bestPriceViewService.listPayments[i].Id){
       this.bestPriceViewService.lenderSendRequestModel.PaymentsName=this.bestPriceViewService.listPayments[i].Value;
       break;
      }
    }
     

     if(!this.ValidateSendRequest(this.bestPriceViewService.lenderSendRequestModel)){
       return false;
     }

    this.spinner.show(); 
    this.bestPriceViewService.SaveSendRequest(this.bestPriceViewService.lenderSendRequestModel).subscribe(data =>{
    this.spinner.hide();
    this.toastr.success("Your Requst has been sent, kindly check your email for more details.","Dashboard");
    var element= document.getElementById('closeSendRequestModal');
    element.click();
    })
   }

   ValidateSendRequest(requestModel:any){

    if(requestModel.Amount == undefined && requestModel.Amount == null && requestModel.Amount.length==0){
      this.toastr.error("Please fill amount.","Dashboard");
      return false;
    }
    if(requestModel.Amount != undefined && requestModel.Amount != null && requestModel.Amount.length!=0){
      try{
        if(isNaN(Number(requestModel.Amount.toString())) == true ){
          this.toastr.error("Amount must be numeric.","Registration");
          return false;  
        }
      }
      catch{
  return false;
      }
    }

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

   async GetLenderSendRequestPendingLendedRequestByLenderId(){
    debugger;
    //this.spinner.show();
    var result = await this.bestPriceViewService.GetLenderSendRequestPendingLendedRequestByLenderId();
    if(result.IsSuccess && result.IfDataFound == true){
      clearInterval(this.timer);
      this.IfBankResponseFound=true;
      var element= document.getElementById('ShowSendRequestPopup');
      element.click();
      this.bestPriceViewService.lenderSendRequestModel=JSON.parse(result.data)[0];    
    }
    //this.spinner.hide();
  }

  AcceptLendedRequest(){
    debugger;

    for(var i =0; i<= this.bestPriceViewService.listInterestConvention.length-1;i++){
      if(this.bestPriceViewService.lenderSendRequestModel.InterestConvention == this.bestPriceViewService.listInterestConvention[i].Id){
       this.bestPriceViewService.lenderSendRequestModel.InterestConventionName=this.bestPriceViewService.listInterestConvention[i].Value;
       break;
      }
    }

    for(var i =0; i<= this.bestPriceViewService.listPayments.length-1;i++){
     if(this.bestPriceViewService.lenderSendRequestModel.Payments == this.bestPriceViewService.listPayments[i].Id){
      this.bestPriceViewService.lenderSendRequestModel.PaymentsName=this.bestPriceViewService.listPayments[i].Value;
      break;
     }
   }
    
    this.spinner.show();
    this.bestPriceViewService.lenderSendRequestModel.IsAccepted=true;
    var result= this.bestPriceViewService.AcceptLendedRequest(this.bestPriceViewService.lenderSendRequestModel).subscribe(data =>{
      this.toastr.success('Your deal is completed.','Dashboard');
      this.spinner.hide();
      this.SetTimeInterval();
      var element= document.getElementById('closeSendRequestModal');
   element.click();
    });
    
  }

  RejectLendedRequest(){
    debugger;

    for(var i =0; i<= this.bestPriceViewService.listInterestConvention.length-1;i++){
      if(this.bestPriceViewService.lenderSendRequestModel.InterestConvention == this.bestPriceViewService.listInterestConvention[i].Id){
       this.bestPriceViewService.lenderSendRequestModel.InterestConventionName=this.bestPriceViewService.listInterestConvention[i].Value;
       break;
      }
    }

    for(var i =0; i<= this.bestPriceViewService.listPayments.length-1;i++){
     if(this.bestPriceViewService.lenderSendRequestModel.Payments == this.bestPriceViewService.listPayments[i].Id){
      this.bestPriceViewService.lenderSendRequestModel.PaymentsName=this.bestPriceViewService.listPayments[i].Value;
      break;
     }
   }
    
    this.spinner.show();
    this.bestPriceViewService.lenderSendRequestModel.IsRejected=true;
    var result= this.bestPriceViewService.RejectLendedRequest(this.bestPriceViewService.lenderSendRequestModel).subscribe(data =>{
      this.toastr.success('The Deal request has been declined.','Dashboard');
      this.spinner.hide();
      var element= document.getElementById('closeSendRequestModal');
      this.SetTimeInterval();
   element.click();
    });
    
  }

  SaveForsaMessage(){
    if(this.bestPriceViewService.lenderSendRequestModel.MessageForForsa == undefined || this.bestPriceViewService.lenderSendRequestModel.MessageForForsa == null|| this.bestPriceViewService.lenderSendRequestModel.MessageForForsa.toString().trim().length==0){
      this.toastr.error("Please enter message","Dashbaord");
      return;
    }
    this.spinner.show(); 
    this.bestPriceViewService.lenderSendRequestModel.IsMessageSentToForsa=true;
    this.bestPriceViewService.SaveForsaMessage(this.bestPriceViewService.lenderSendRequestModel).subscribe(data=>{
      this.spinner.hide(); 
      this.toastr.success("Message sent to Forsa","Dashboard");
      this.SetTimeInterval();
    var element= document.getElementById('closeSendRequestModal');
    element.click();
    });
  }
}