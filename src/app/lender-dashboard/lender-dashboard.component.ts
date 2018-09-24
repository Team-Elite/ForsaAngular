import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {AuthenticateServiceService} from '../Shared/authenticate-service.service';
import {Router} from '@angular/router';
import { ToastrService  } from 'ngx-toastr';
import {LenderDashboardService} from './Shared/lender-dashboard.service';
import {AllBanksService} from './Shared/all-banks.service';
import {ViewAllPriceService} from './Shared/view-all-price.service';

@Component({
  selector: 'app-lender-dashboard',
  templateUrl: './lender-dashboard.component.html',
  styleUrls: ['./lender-dashboard.component.css']
})
export class LenderDashboardComponent implements OnInit {

  constructor(public lenderDashboardService:LenderDashboardService, public spinner:NgxSpinnerService
    ,public authenticateServiceService:AuthenticateServiceService, public router:Router, public  toastr: ToastrService
    , public allBanksService:AllBanksService, public viewAllPriceService:ViewAllPriceService) { }

    copyLoggedInUser:any;
    

  ngOnInit() {
    this.spinner.show();
    debugger;
    this.authenticateServiceService.AuthenticateSession();
    this.lenderDashboardService.userId = this.authenticateServiceService.GetUserId();
    this.lenderDashboardService.loggedInUser= this.authenticateServiceService.GetUserDetail();
    this.copyLoggedInUser = Object.assign({}, this.lenderDashboardService.loggedInUser);
    this.GetLenderStartPage();
    
  }

  async GetLenderStartPage(){
   debugger;
   let startPage= await this.lenderDashboardService.GetLenderStartPage();
   this.lenderDashboardService.StartingScreen=JSON.parse(startPage.data);
   this.spinner.hide();
   if(this.lenderDashboardService.StartingScreen[0].PageName == "Best Price View"){
    this.lenderDashboardService.CurrentPageName="Best Price View";
    //this.router.navigate(['/BestPriceView']);
   }
  }

  Logout(){
    //if(confirm("Are you sure you want to log out?")){
    this.authenticateServiceService.ClearSession();
    this.router.navigate(['/login']);
    //}
  }

  UpdateUserProfile(){
    debugger;

    /* Validating controls */
    if(this.ValidateUserPfrofileFields(this.copyLoggedInUser,this.lenderDashboardService.NewPassword,this.lenderDashboardService.ConfirmPassword)){
      this.copyLoggedInUser.NewPassword=this.lenderDashboardService.NewPassword.trim();
      this.copyLoggedInUser.Password=this.copyLoggedInUser.Password.trim();
      this.spinner.show();
      this.lenderDashboardService.UpdateUserProfile(this.copyLoggedInUser).subscribe(data=>{
        this.spinner.hide();
      if(data !=undefined && data !=null){
        debugger;
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
    debugger;
    this.lenderDashboardService.CurrentPageName=pageName;
    if(pageName=="All Banks"){
      this.GetAllBanksWithInterestRateHorizontaly();
    }
    else if(pageName=='View All Price'){
      this.viewAllPriceService.listViewAllPrice1=[];
      this.viewAllPriceService.listViewAllPrice2=[];
      this.viewAllPriceService.listViewAllPrice3=[];
      this.GetAllBanksWithStatusIsDeselected();
      this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
    }
  }

  /* STARTS -----------******* All Banks region ****------------------*/
  async GetAllBanksWithInterestRateHorizontaly(){
    debugger;
    this.spinner.show();
    let rates= await this.allBanksService.GetAllBanksWithInterestRateHorizontaly();
    this.allBanksService.listAllBanks=JSON.parse(rates.data);
    this.GetHighestRates();
    this.spinner.hide();
   }

   GetHighestRates(){
debugger;
     if(this.allBanksService.listAllBanks!=undefined &&this.allBanksService.listAllBanks!= null && this.allBanksService.listAllBanks.length !=0){
      var HighestRateTN:string, HighestRateW1:string, HighestRateW2:string,  HighestRateW3:string
      , HighestRateM1:string
      ,HighestRateM2:string, HighestRateM3:string,  HighestRateM4:string, HighestRateM5:string, HighestRateM6:string
      ,HighestRateM7:string, HighestRateM8:string,  HighestRateM9:string, HighestRateM10:string
      ,HighestRateM11:string
      ,HighestRateM12:string,HighestRateY2:string,  HighestRateY3:string, HighestRateY4:string
      , HighestRateY5:string;

       var HighestRateTNIndex:string, HighestRateW1Index:string, HighestRateW2Index:string,  HighestRateW3Index:string, HighestRateM1Index:string
       ,HighestRateM2Index:string, HighestRateM3Index:string,  HighestRateM4Index:string, HighestRateM5Index:string, HighestRateM6Index:string
       ,HighestRateM7Index:string, HighestRateM8Index:string,  HighestRateM9Index:string, HighestRateM10Index:string,HighestRateM11Index:string
       ,HighestRateM12Index:string,HighestRateY2Index:string,  HighestRateY3Index:string, HighestRateY4Index:string, HighestRateY5Index:string;

      for(var i=0;i<=this.allBanksService.listAllBanks.length-1;i++){
        if(HighestRateTN == undefined ||  parseFloat(this.allBanksService.listAllBanks[i].TN)>=parseFloat(HighestRateTN)){
        HighestRateTNIndex=i.toString();
        HighestRateTN=this.allBanksService.listAllBanks[i].TN;
        }
        if(HighestRateW1 == undefined ||parseFloat(this.allBanksService.listAllBanks[i].Week1)>=parseFloat(HighestRateW1)){
        HighestRateW1Index=i.toString();
        HighestRateW1=this.allBanksService.listAllBanks[i].Week1;
      }
        if(HighestRateW2 == undefined ||parseFloat(this.allBanksService.listAllBanks[i].Week2)>=parseFloat(HighestRateW2)){
        HighestRateW2Index=i.toString();
        HighestRateW2=this.allBanksService.listAllBanks[i].Week2;
      }
        if(HighestRateW3 == undefined ||parseFloat(this.allBanksService.listAllBanks[i].Week3)>=parseFloat(HighestRateW3)){
        HighestRateW3Index=i.toString();
        HighestRateW3=this.allBanksService.listAllBanks[i].Week3;
      }
        if(HighestRateM1 == undefined ||parseFloat(this.allBanksService.listAllBanks[i].Month1)>=parseFloat(HighestRateM1)){
        HighestRateM1Index=i.toString();
        HighestRateM1=this.allBanksService.listAllBanks[i].Month1;
      }
        if(HighestRateM2 == undefined ||parseFloat(this.allBanksService.listAllBanks[i].Month2)>=parseFloat(HighestRateM2)){
        HighestRateM2Index=i.toString();
        HighestRateM2=this.allBanksService.listAllBanks[i].Month2;
      }
        if( HighestRateM3 == undefined ||parseFloat(this.allBanksService.listAllBanks[i].Month3)>=parseFloat(HighestRateM3)){
        HighestRateM3Index=i.toString();
        HighestRateM3=this.allBanksService.listAllBanks[i].Month3;
      }
        if( HighestRateM4 == undefined ||parseFloat(this.allBanksService.listAllBanks[i].Month4)>=parseFloat(HighestRateM4)){
        HighestRateM4Index=i.toString();
        HighestRateM4=this.allBanksService.listAllBanks[i].Month4;
      }
        if(HighestRateM5 == undefined ||parseFloat(this.allBanksService.listAllBanks[i].Month5)>=parseFloat(HighestRateM5)){
        HighestRateM5Index=i.toString();
        HighestRateM5=this.allBanksService.listAllBanks[i].Month5;
      }
        if(HighestRateM6 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month6)>=parseFloat(HighestRateM6)){
        HighestRateM6Index=i.toString();
        HighestRateM6=this.allBanksService.listAllBanks[i].Month6;
      }
        if( HighestRateM7 == undefined ||parseFloat(this.allBanksService.listAllBanks[i].Month7)>=parseFloat(HighestRateM7)){
        HighestRateM7Index=i.toString();
        HighestRateM7=this.allBanksService.listAllBanks[i].Month7;
      }
        if(HighestRateM8 == undefined ||parseFloat(this.allBanksService.listAllBanks[i].Month8)>=parseFloat(HighestRateM8)){
        HighestRateM8Index=i.toString();
        HighestRateM8=this.allBanksService.listAllBanks[i].Month8;
      }
        if(HighestRateM9 == undefined ||parseFloat(this.allBanksService.listAllBanks[i].Month9)>=parseFloat(HighestRateM9)){
        HighestRateM9Index=i.toString();
        HighestRateM9=this.allBanksService.listAllBanks[i].Month9;
      }
        if(HighestRateM10 == undefined ||parseFloat(this.allBanksService.listAllBanks[i].Month10)>=parseFloat(HighestRateM10)){
        HighestRateM10Index=i.toString();
        HighestRateM10=this.allBanksService.listAllBanks[i].Month10;
      }
        if(HighestRateM11 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month11)>=parseFloat(HighestRateM11)){
        HighestRateM11Index=i.toString();
        HighestRateM11=this.allBanksService.listAllBanks[i].Month11;
      }
        if(HighestRateM12 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Month12)>=parseFloat(HighestRateM12)){
        HighestRateM12Index=i.toString();
        HighestRateM12=this.allBanksService.listAllBanks[i].Month12;
      }
        if(HighestRateY2 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Year2)>=parseFloat(HighestRateY2)){
        HighestRateY2Index=i.toString();
        HighestRateY2=this.allBanksService.listAllBanks[i].Year2;
      }
        if(HighestRateY3 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Year3)>=parseFloat(HighestRateY3)){
        HighestRateY3Index=i.toString();
        HighestRateY3=this.allBanksService.listAllBanks[i].Year3;
      }
        if(HighestRateY4 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Year4)>=parseFloat(HighestRateY4)){
        HighestRateY4Index=i.toString();
        HighestRateY4=this.allBanksService.listAllBanks[i].Year4;
      }
        if(HighestRateY5 == undefined || parseFloat(this.allBanksService.listAllBanks[i].Year5)>=parseFloat(HighestRateY5)){
        HighestRateY5Index=i.toString();
        HighestRateY5=this.allBanksService.listAllBanks[i].Year5;
      }
      }
      this.allBanksService.HighestRateTN= this.allBanksService.listAllBanks[HighestRateTNIndex].TN;
      this.allBanksService.HighestRateW1= this.allBanksService.listAllBanks[HighestRateW1Index].Week1;
      this.allBanksService.HighestRateW2= this.allBanksService.listAllBanks[HighestRateW2Index].Week2;
      this.allBanksService.HighestRateW3= this.allBanksService.listAllBanks[HighestRateW3Index].Week3;
      this.allBanksService.HighestRateM1= this.allBanksService.listAllBanks[HighestRateM1Index].Month1;
      this.allBanksService.HighestRateM2= this.allBanksService.listAllBanks[HighestRateM2Index].Month2;
      this.allBanksService.HighestRateM3= this.allBanksService.listAllBanks[HighestRateM3Index].Month3;
      this.allBanksService.HighestRateM4= this.allBanksService.listAllBanks[HighestRateM4Index].Month4;
      this.allBanksService.HighestRateM5= this.allBanksService.listAllBanks[HighestRateM5Index].Month5;
      this.allBanksService.HighestRateM6= this.allBanksService.listAllBanks[HighestRateM6Index].Month6;
      this.allBanksService.HighestRateM7= this.allBanksService.listAllBanks[HighestRateM7Index].Month7;
      this.allBanksService.HighestRateM8= this.allBanksService.listAllBanks[HighestRateM8Index].Month8;
      this.allBanksService.HighestRateM9= this.allBanksService.listAllBanks[HighestRateM9Index].Month9;
      this.allBanksService.HighestRateM10= this.allBanksService.listAllBanks[HighestRateM10Index].Month10;
      this.allBanksService.HighestRateM11= this.allBanksService.listAllBanks[HighestRateM11Index].Month11;
      this.allBanksService.HighestRateM12= this.allBanksService.listAllBanks[HighestRateM12Index].Month12;
      this.allBanksService.HighestRateY2= this.allBanksService.listAllBanks[HighestRateY2Index].Year2;
      this.allBanksService.HighestRateY3= this.allBanksService.listAllBanks[HighestRateY3Index].Year3;
      this.allBanksService.HighestRateY4= this.allBanksService.listAllBanks[HighestRateY4Index].Year4;
      this.allBanksService.HighestRateY5= this.allBanksService.listAllBanks[HighestRateY5Index].Year5;
     }
     
   }

   /* ENDS-----------******* All Banks region ****------------------*/

    /* STARTS -----------******* View All Price region ****------------------*/
  async GetAllBanksWithStatusIsDeselected(){
    debugger;
    this.viewAllPriceService.count=0;
    this.spinner.show();
    let rates= await this.viewAllPriceService.GetAllBanksWithStatusIsDeselected();
    this.viewAllPriceService.listViewAllPrice=JSON.parse(rates.data);
    for(var i=0;i<=this.viewAllPriceService.listViewAllPrice.length-1;i++){
      if(this.viewAllPriceService.count>16){
        this.viewAllPriceService.listViewAllPrice3[this.viewAllPriceService.listViewAllPrice3.length]=this.viewAllPriceService.listViewAllPrice[i];
      }
      else if(this.viewAllPriceService.count>7){
        this.viewAllPriceService.listViewAllPrice2[this.viewAllPriceService.listViewAllPrice2.length]=this.viewAllPriceService.listViewAllPrice[i];
      }
      else{
        this.viewAllPriceService.listViewAllPrice1[i]=this.viewAllPriceService.listViewAllPrice[i];
      }
    this.viewAllPriceService.count++;
    }
    this.spinner.hide();
   }

  async DeselectSelectBank(bank:any){
    debugger;
  this.spinner.show();
  var result = await this.viewAllPriceService.DeselectSelectBank(bank.UserId, bank.IsSelected);
  if(JSON.parse(result.IsSuccess)){
  this.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
  }else{
    this.toastr.error("Some issue occured.","Dashboard");
  }
  this.spinner.hide();
   }

   async GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(){
    this.spinner.show();
    let rates= await this.viewAllPriceService.GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected();
    if(rates.IfDataFound){
    this.viewAllPriceService.listAllBanks=JSON.parse(rates.data);
    this.GetHighestRatesViewAllPrice();
    }
    else{
      this.viewAllPriceService.listAllBanks=[];
    }
    this.spinner.hide(); 
   }

   GetHighestRatesViewAllPrice(){
    debugger;
         if(this.viewAllPriceService.listAllBanks!=undefined &&this.viewAllPriceService.listAllBanks!= null && this.viewAllPriceService.listAllBanks.length !=0){
          var HighestRateTN:string, HighestRateW1:string, HighestRateW2:string,  HighestRateW3:string
          , HighestRateM1:string
          ,HighestRateM2:string, HighestRateM3:string,  HighestRateM4:string, HighestRateM5:string, HighestRateM6:string
          ,HighestRateM7:string, HighestRateM8:string,  HighestRateM9:string, HighestRateM10:string
          ,HighestRateM11:string
          ,HighestRateM12:string,HighestRateY2:string,  HighestRateY3:string, HighestRateY4:string
          , HighestRateY5:string;

           var HighestRateTNIndex:string, HighestRateW1Index:string, HighestRateW2Index:string,  HighestRateW3Index:string, HighestRateM1Index:string
           ,HighestRateM2Index:string, HighestRateM3Index:string,  HighestRateM4Index:string, HighestRateM5Index:string, HighestRateM6Index:string
           ,HighestRateM7Index:string, HighestRateM8Index:string,  HighestRateM9Index:string, HighestRateM10Index:string,HighestRateM11Index:string
           ,HighestRateM12Index:string,HighestRateY2Index:string,  HighestRateY3Index:string, HighestRateY4Index:string, HighestRateY5Index:string;

          for(var i=0;i<=this.viewAllPriceService.listAllBanks.length-1;i++){
            if(HighestRateTN == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].TN)>=parseFloat(HighestRateTN)){
            HighestRateTNIndex=i.toString();
            HighestRateTN=this.viewAllPriceService.listAllBanks[i].TN;
            }
            if(HighestRateW1 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Week1)>=parseFloat(HighestRateW1)){
            HighestRateW1Index=i.toString();
            HighestRateW1=this.viewAllPriceService.listAllBanks[i].Week1;
          }
            if(HighestRateW2 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Week2)>=parseFloat(HighestRateW2)){
            HighestRateW2Index=i.toString();
            HighestRateW2=this.viewAllPriceService.listAllBanks[i].Week2;
          }
            if(HighestRateW3 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Week3)>=parseFloat(HighestRateW3)){
            HighestRateW3Index=i.toString();
            HighestRateW3=this.viewAllPriceService.listAllBanks[i].Week3;
          }
            if(HighestRateM1 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month1)>=parseFloat(HighestRateM1)){
            HighestRateM1Index=i.toString();
            HighestRateM1=this.viewAllPriceService.listAllBanks[i].Month1;
          }
            if(HighestRateM2 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month2)>=parseFloat(HighestRateM2)){
            HighestRateM2Index=i.toString();
            HighestRateM2=this.viewAllPriceService.listAllBanks[i].Month2;
          }
            if(HighestRateM3 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month3)>=parseFloat(HighestRateM3)){
            HighestRateM3Index=i.toString();
            HighestRateM3=this.viewAllPriceService.listAllBanks[i].Month3;
          }
            if(HighestRateM4 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month4)>=parseFloat(HighestRateM4)){
            HighestRateM4Index=i.toString();
            HighestRateM4=this.viewAllPriceService.listAllBanks[i].Month4;
          }
            if(HighestRateM5 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month5)>=parseFloat(HighestRateM5)){
            HighestRateM5Index=i.toString();
            HighestRateM5=this.viewAllPriceService.listAllBanks[i].Month5;
          }
            if(HighestRateM6 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month6)>=parseFloat(HighestRateM6)){
            HighestRateM6Index=i.toString();
            HighestRateM6=this.viewAllPriceService.listAllBanks[i].Month6;
          }
            if(HighestRateM7 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month7)>=parseFloat(HighestRateM7)){
            HighestRateM7Index=i.toString();
            HighestRateM7=this.viewAllPriceService.listAllBanks[i].Month7;
          }
            if(HighestRateM8 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month8)>=parseFloat(HighestRateM8)){
            HighestRateM8Index=i.toString();
            HighestRateM8=this.viewAllPriceService.listAllBanks[i].Month8;
          }
            if(HighestRateM9 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month9)>=parseFloat(HighestRateM9)){
            HighestRateM9Index=i.toString();
            HighestRateM9=this.viewAllPriceService.listAllBanks[i].Month9;
          }
            if(HighestRateM10 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month10)>=parseFloat(HighestRateM10)){
            HighestRateM10Index=i.toString();
            HighestRateM10=this.viewAllPriceService.listAllBanks[i].Month10;
          }
            if(HighestRateM11 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month11)>=parseFloat(HighestRateM11)){
            HighestRateM11Index=i.toString();
            HighestRateM11=this.viewAllPriceService.listAllBanks[i].Month11;
          }
            if(HighestRateM12 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Month12)>=parseFloat(HighestRateM12)){
            HighestRateM12Index=i.toString();
            HighestRateM12=this.viewAllPriceService.listAllBanks[i].Month12;
          }
            if(HighestRateY2 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Year2)>=parseFloat(HighestRateY2)){
            HighestRateY2Index=i.toString();
            HighestRateY2=this.viewAllPriceService.listAllBanks[i].Year2;
          }
            if(HighestRateY3 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Year3)>=parseFloat(HighestRateY3)){
            HighestRateY3Index=i.toString();
            HighestRateY3=this.viewAllPriceService.listAllBanks[i].Year3;
          }
            if(HighestRateY4 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Year4)>=parseFloat(HighestRateY4)){
            HighestRateY4Index=i.toString();
            HighestRateY4=this.viewAllPriceService.listAllBanks[i].Year4;
          }
            if(HighestRateY5 == undefined || parseFloat(this.viewAllPriceService.listAllBanks[i].Year5)>=parseFloat(HighestRateY5)){
            HighestRateY5Index=i.toString();
            HighestRateY5=this.viewAllPriceService.listAllBanks[i].Year5;
          }
          }
          this.viewAllPriceService.HighestRateTN= this.viewAllPriceService.listAllBanks[HighestRateTNIndex].TN;
          this.viewAllPriceService.HighestRateW1= this.viewAllPriceService.listAllBanks[HighestRateW1Index].Week1;
          this.viewAllPriceService.HighestRateW2= this.viewAllPriceService.listAllBanks[HighestRateW2Index].Week2;
          this.viewAllPriceService.HighestRateW3= this.viewAllPriceService.listAllBanks[HighestRateW3Index].Week3;
          this.viewAllPriceService.HighestRateM1= this.viewAllPriceService.listAllBanks[HighestRateM1Index].Month1;
          this.viewAllPriceService.HighestRateM2= this.viewAllPriceService.listAllBanks[HighestRateM2Index].Month2;
          this.viewAllPriceService.HighestRateM3= this.viewAllPriceService.listAllBanks[HighestRateM3Index].Month3;
          this.viewAllPriceService.HighestRateM4= this.viewAllPriceService.listAllBanks[HighestRateM4Index].Month4;
          this.viewAllPriceService.HighestRateM5= this.viewAllPriceService.listAllBanks[HighestRateM5Index].Month5;
          this.viewAllPriceService.HighestRateM6= this.viewAllPriceService.listAllBanks[HighestRateM6Index].Month6;
          this.viewAllPriceService.HighestRateM7= this.viewAllPriceService.listAllBanks[HighestRateM7Index].Month7;
          this.viewAllPriceService.HighestRateM8= this.viewAllPriceService.listAllBanks[HighestRateM8Index].Month8;
          this.viewAllPriceService.HighestRateM9= this.viewAllPriceService.listAllBanks[HighestRateM9Index].Month9;
          this.viewAllPriceService.HighestRateM10= this.viewAllPriceService.listAllBanks[HighestRateM10Index].Month10;
          this.viewAllPriceService.HighestRateM11= this.viewAllPriceService.listAllBanks[HighestRateM11Index].Month11;
          this.viewAllPriceService.HighestRateM12= this.viewAllPriceService.listAllBanks[HighestRateM12Index].Month12;
          this.viewAllPriceService.HighestRateY2= this.viewAllPriceService.listAllBanks[HighestRateY2Index].Year2;
          this.viewAllPriceService.HighestRateY3= this.viewAllPriceService.listAllBanks[HighestRateY3Index].Year3;
          this.viewAllPriceService.HighestRateY4= this.viewAllPriceService.listAllBanks[HighestRateY4Index].Year4;
          this.viewAllPriceService.HighestRateY5= this.viewAllPriceService.listAllBanks[HighestRateY5Index].Year5;
         }

       }


   /* ENDS-----------******* View All Price region ****------------------*/
}
