import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {AuthenticateServiceService} from '../Shared/authenticate-service.service';
import {Router} from '@angular/router';
import { ToastrService  } from 'ngx-toastr';
import {LenderDashboardService} from './Shared/lender-dashboard.service';

@Component({
  selector: 'app-lender-dashboard',
  templateUrl: './lender-dashboard.component.html',
  styleUrls: ['./lender-dashboard.component.css']
})
export class LenderDashboardComponent implements OnInit {

  constructor(public lenderDashboardService:LenderDashboardService, public spinner:NgxSpinnerService
    ,public authenticateServiceService:AuthenticateServiceService, public router:Router, public  toastr: ToastrService) { }

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
   if(this.lenderDashboardService.StartingScreen == "Best Price View")
   this.router.navigate(['/BestPriceView']);
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
}
