import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {AuthenticateServiceService} from '../Shared/authenticate-service.service';
import {Router} from '@angular/router';
import { ToastrService  } from 'ngx-toastr';
import {LenderDashboardService} from './Shared/lender-dashboard.service';
import {StartPageModel} from './Shared/start-page-model.class';
import {BestPriceViewService} from '../lender-dashboard/best-price-view/Shared/best-price-view.service';

@Component({
  selector: 'app-lender-dashboard',
  templateUrl: './lender-dashboard.component.html',
  styleUrls: ['./lender-dashboard.component.css']
})
export class LenderDashboardComponent implements OnInit {

  constructor(public lenderDashboardService:LenderDashboardService, public spinner:NgxSpinnerService
    ,public authenticateServiceService:AuthenticateServiceService, public router:Router
    , public  toastr: ToastrService
    , public bestPriceViewService:BestPriceViewService) { }

    copyLoggedInUser:any;
    SelectedStartPage:any;
    listPagesForStartingPage:StartPageModel[];
    testList=[{Id:1,Value:'Test1'},
    {Id:2,Value:'Test2'},
    {Id:3,Value:'Test3'},
    {Id:4,Value:'Test4'},
    {Id:5,Value:'Test5'}];
    timer:any;
    IfBankResponseFound:boolean=false;
    IfBothUserTypeFound:boolean=false;

  ngOnInit() {
    this.spinner.show();
    
    this.authenticateServiceService.AuthenticateSession();
    this.lenderDashboardService.UserTypeId=this.authenticateServiceService.GetUserTypeId();
    this.lenderDashboardService.userId = this.authenticateServiceService.GetUserId();
    this.IfBothUserTypeFound = this.authenticateServiceService.GetIfBothUserTypeFound() ==( undefined || null) ? false: true;
    this.lenderDashboardService.loggedInUser= this.authenticateServiceService.GetUserDetail();
    this.copyLoggedInUser = Object.assign({}, this.lenderDashboardService.loggedInUser);
    this.GetPagesForLenderSettingStartPage();
    
    this.SelectedStartPage=this.testList[0].Id;
    //this.GetLenderStartPage();
    this.bestPriceViewService.lenderSendRequestModel2={
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

  AcceptLendedRequest(){
    

    for(var i =0; i<= this.bestPriceViewService.listInterestConvention.length-1;i++){
      if(this.bestPriceViewService.lenderSendRequestModel2.InterestConvention == this.bestPriceViewService.listInterestConvention[i].Id){
       this.bestPriceViewService.lenderSendRequestModel2.InterestConventionName=this.bestPriceViewService.listInterestConvention[i].Value;
       break;
      }
    }

    for(var i =0; i<= this.bestPriceViewService.listPayments.length-1;i++){
     if(this.bestPriceViewService.lenderSendRequestModel2.Payments == this.bestPriceViewService.listPayments[i].Id){
      this.bestPriceViewService.lenderSendRequestModel2.PaymentsName=this.bestPriceViewService.listPayments[i].Value;
      break;
     }
   }
    
    this.spinner.show();
    this.bestPriceViewService.lenderSendRequestModel2.IsAccepted=true;
    var result= this.bestPriceViewService.AcceptLendedRequest(this.bestPriceViewService.lenderSendRequestModel2).subscribe(data =>{
      this.toastr.success('Your deal is completed.','Dashboard');
      this.spinner.hide();
      this.SetTimeInterval();
      var element= document.getElementById('closeSendRequestModalLender');
      element.click();
    });
    
  }

  RejectLendedRequest(){
    

    for(var i =0; i<= this.bestPriceViewService.listInterestConvention.length-1;i++){
      if(this.bestPriceViewService.lenderSendRequestModel2.InterestConvention == this.bestPriceViewService.listInterestConvention[i].Id){
       this.bestPriceViewService.lenderSendRequestModel2.InterestConventionName=this.bestPriceViewService.listInterestConvention[i].Value;
       break;
      }
    }

    for(var i =0; i<= this.bestPriceViewService.listPayments.length-1;i++){
     if(this.bestPriceViewService.lenderSendRequestModel2.Payments == this.bestPriceViewService.listPayments[i].Id){
      this.bestPriceViewService.lenderSendRequestModel2.PaymentsName=this.bestPriceViewService.listPayments[i].Value;
      break;
     }
   }
    
    this.spinner.show();
    this.bestPriceViewService.lenderSendRequestModel2.IsRejected=true;
    var result= this.bestPriceViewService.RejectLendedRequest(this.bestPriceViewService.lenderSendRequestModel2).subscribe(data =>{
      this.toastr.success('The Deal request has been declined.','Dashboard');
      this.spinner.hide();
      var element= document.getElementById('closeSendRequestModalLender');
      element.click();
      this.SetTimeInterval();
    });
    
  }

  SaveForsaMessage(){
    if(this.bestPriceViewService.lenderSendRequestModel2.MessageForForsa == undefined || this.bestPriceViewService.lenderSendRequestModel2.MessageForForsa == null|| this.bestPriceViewService.lenderSendRequestModel2.MessageForForsa.toString().trim().length==0){
      this.toastr.error("Please enter message","Dashbaord");
      return;
    }
    this.spinner.show(); 
    this.bestPriceViewService.lenderSendRequestModel2.IsMessageSentToForsa=true;
    this.bestPriceViewService.SaveForsaMessage(this.bestPriceViewService.lenderSendRequestModel2).subscribe(data=>{
      this.spinner.hide(); 
      this.toastr.success("Message sent to Forsa","Dashboard");
      this.SetTimeInterval();
    var element= document.getElementById('closeSendChatModalLender');
   element.click();
    });
  }
///
chtforse(){
     var element= document.getElementById('closeSendRequestModalLender');
    element.click();
}	
///	
  async GetLenderSendRequestPendingLendedRequestByLenderId(){
    
    //this.spinner.show();
    var result = await this.bestPriceViewService.GetLenderSendRequestPendingLendedRequestByLenderId();
    if(result.IsSuccess && result.IfDataFound == true){
      clearInterval(this.timer);
      this.IfBankResponseFound=true;
      var element= document.getElementById('ShowSendRequestLDPopup');
      element.click();
      this.bestPriceViewService.lenderSendRequestModel2=JSON.parse(result.data)[0];    
    }
    //this.spinner.hide();
  }

  async GetLenderStartPage(){
   
   let startPage= await this.lenderDashboardService.GetLenderStartPage();
   this.lenderDashboardService.StartingScreen=JSON.parse(startPage.data);
   this.spinner.hide();
   if(this.lenderDashboardService.StartingScreen[0].PageName == "Best Price View"){
    //this.lenderDashboardService.CurrentPageName="Best Price View";
    //this.router.navigate(['lenderDashboard/BestPriceView']);
   }
  }

  Logout(){
    //if(confirm("Are you sure you want to log out?")){
    this.authenticateServiceService.ClearSession();
    this.router.navigate(['/login']);
    //}
  }

  UpdateUserProfile(){
    

    /* Validating controls */
    if(this.ValidateUserPfrofileFields(this.copyLoggedInUser,this.lenderDashboardService.NewPassword,this.lenderDashboardService.ConfirmPassword)){
      this.copyLoggedInUser.NewPassword=this.lenderDashboardService.NewPassword.trim();
      this.copyLoggedInUser.Password=this.copyLoggedInUser.Password.trim();
      this.spinner.show();
      this.lenderDashboardService.UpdateUserProfile(this.copyLoggedInUser).subscribe(data=>{
        this.spinner.hide();
      if(data !=undefined && data !=null){
        
        if(data.IsSuccess == false){
          this.toastr.error("Old password is not correct.","Dashboard");
          return;
        }
        this.authenticateServiceService.UpdateSession(data.data);
        this.lenderDashboardService.loggedInUser= this.authenticateServiceService.GetUserDetail();
        this.toastr.success("Updated successfully. An email has been sent to your email id.","Dashboard");
      }
    
    });
  }
  } 

  ValidateUserPfrofileFields(userModel:any,NewPassword:string,ConfirmPassword:string){
    let IfErrorFound:boolean=false;
    let message:string='Fields marked with * are mandatory. Please fill';
    if(userModel.FirstName == undefined || userModel.FirstName == null || userModel.FirstName.trim().length==0)
    {
      IfErrorFound=true;
      message=message+" First Name,";
    }
    
    if(userModel.SurName == undefined || userModel.SurName == null || userModel.SurName.trim().length==0)
    {
      IfErrorFound=true;
      message=message+" Sur Name,";
    }
    if(userModel.NameOfCompany == undefined || userModel.NameOfCompany == null || userModel.NameOfCompany.trim().length==0)
    {
      IfErrorFound=true;
      message=message+" Name of company,";
    }
    if(userModel.Password == undefined || userModel.Password == null || userModel.Password.trim().length==0)
    {
      IfErrorFound=true;
      message=message+" Old Password,";
    }
    if(NewPassword == undefined || NewPassword == null || NewPassword.trim().length==0)
    {
      IfErrorFound=true;
      message=message+" New Password,";
    }
    if(ConfirmPassword == undefined || ConfirmPassword == null || ConfirmPassword.trim().length==0)
    {
      IfErrorFound=true;
      message=message+" Confirm Password,";
    }
    if(IfErrorFound){
      message=message.substring(0,message.length-1);
      this.toastr.error(message,"Dashboard");
      return false;
    }
    
    if(NewPassword.trim().length<6){
      this.toastr.error("Password must be at least of six characters.","Dashboard");
      return false;
    }
    
    // if(userModel.NewPassword.trim() == userModel.Password.trim()){
    //   alert('Old password and new password can not be same.');
    //   return false;
    // }
    
    if(NewPassword.trim() != ConfirmPassword.trim()){
      this.toastr.error("New password and confirm password not matched.","Dashboard");
      return false;
    }
    return true;
    
    }

  ShowUpdateProfileModal(){
      this.lenderDashboardService.NewPassword='';
      this.lenderDashboardService.ConfirmPassword='';
       this.copyLoggedInUser = Object.assign({}, this.lenderDashboardService.loggedInUser);
     }

  SetCurrentPage(pageName:string){
    
    this.lenderDashboardService.CurrentPageName=pageName;
    if(pageName==="Best Price View"){
      this.router.navigate(['lenderDashboard/BestPriceView']);
    }
    if(pageName=="All Banks"){
      this.router.navigate(['lenderDashboard/AllBanks']);
    }
    else if(pageName=='View All Price'){
      this.router.navigate(['lenderDashboard/ViewAllPrice']);
    }
   
  }

async GetPagesForLenderSettingStartPage(){
  this.spinner.show();
 var response=await this.lenderDashboardService.GetPagesForLenderSettingStartPage();
 this.listPagesForStartingPage=JSON.parse(response.data);
 if(this.listPagesForStartingPage !=undefined && this.listPagesForStartingPage.length!=0){
   for(var i=0; this.listPagesForStartingPage.length-1;i++){
     if(this.listPagesForStartingPage[i].IsStartPage == true){
       
        this.SelectedStartPage=this.listPagesForStartingPage[i].PageId;
        break;
     }
   }
 }
 this.spinner.hide();
}

async LenderSaveStartPage(){
  this.spinner.show();
var response=await this.lenderDashboardService.LenderSaveStartPage(this.SelectedStartPage);
if(response.IsSuccess)
{
this.toastr.success("Start page updated successfully.","Dashboard");
var element= document.getElementById('btnCloseSetStartPageModal');
    element.click();
}
else{
this.toastr.error("Something went wrong");
}
this.spinner.hide();

 }

 async SwitchScreen(){
  this.router.navigate(['/bankDashBoard']);
}
    RegisterAsPartner() {
        this.authenticateServiceService.ClearSession();
        this.router.navigate(['/registration/', this.lenderDashboardService.userId, 'KT']);
    }
}
