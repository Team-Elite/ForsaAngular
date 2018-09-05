import { Component, OnInit } from '@angular/core';
import {BankDashboardService } from './Shared/bank-dashboard.service';
import {AuthenticateServiceService} from '../Shared/authenticate-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bank-dashboard',
  templateUrl: './bank-dashboard.component.html',
  styleUrls: ['./bank-dashboard.component.css']
})
export class BankDashboardComponent implements OnInit {

  constructor(public bankDashboardService:BankDashboardService, public authenticateServiceService:AuthenticateServiceService, public router: Router) { }
  IsPublished:boolean=false;
  copyLoggedInUser:any;

  ngOnInit() {
    debugger;
    this.authenticateServiceService.AuthenticateSession();
    this.bankDashboardService.userId = this.authenticateServiceService.GetUserId();
    this.GetRateOfInterestOfBank();
    this.GetUserGroupForSettingRateOfInterestVisibility();
    this.bankDashboardService.loggedInUser= this.authenticateServiceService.GetUserDetail();
    this.copyLoggedInUser = Object.assign({}, this.bankDashboardService.loggedInUser);
  }

  async GetRateOfInterestOfBank(){
    await this.bankDashboardService.GetRateOfInterestOfBank();
    if(this.bankDashboardService.listRateOfInterestOfBankModel != undefined && this.bankDashboardService.listRateOfInterestOfBankModel != null
    && this.bankDashboardService.listRateOfInterestOfBankModel.length!=0){
      this.IsPublished=this.bankDashboardService.listRateOfInterestOfBankModel[0].IsPublished;
    }
  }

  EnableTextBox(rate){
    rate.IsDoubleTapped=true;
  }

  UpdateRateOfInterest(rate){
    if(rate.RateOfInterest == undefined || rate.RateOfInterest == null || rate.RateOfInterest.length==0){
      alert("Rate must be entered.");
      return;
    }
    rate.IsDoubleTapped=false;
    rate.ModifiedBy=this.bankDashboardService.userId;
    this.bankDashboardService.UpdateRateOfInterest(rate).subscribe(data =>{
    })
  }

  IncreaseRateOfInterest(rate){
    if(rate.RateOfInterest == undefined || rate.RateOfInterest == null || rate.RateOfInterest.length==0){
      alert("Rate must be entered.");
      return;
    }
    rate.RateOfInterest=parseFloat(rate.RateOfInterest)+.10;
    rate.RateOfInterest= parseFloat(rate.RateOfInterest).toFixed(2);
    rate.ModifiedBy=this.bankDashboardService.userId;
    this.bankDashboardService.UpdateRateOfInterest(rate).subscribe(data =>{
    })
  }

  DecreaseRateOfInterest(rate){
    if(rate.RateOfInterest == undefined || rate.RateOfInterest == null || rate.RateOfInterest.length==0){
      alert("Rate must be entered.");
      return;
    }
    rate.RateOfInterest= parseFloat(rate.RateOfInterest)-.10;
    rate.RateOfInterest= parseFloat(rate.RateOfInterest).toFixed(2);
    rate.ModifiedBy=this.bankDashboardService.userId;
    this.bankDashboardService.UpdateRateOfInterest(rate).subscribe(data =>{
    })
  }

  PublishAndUnPublish(value){
  this.bankDashboardService.PublishAndUnPublish(value).subscribe(data =>{
    this.IsPublished=value;
    alert("Changes saved successfully.");
})
  }

 async GetUserGroupForSettingRateOfInterestVisibility(){
  await this.bankDashboardService.GetUserGroupForSettingRateOfInterestVisibility();
  }

  GroupCheckUnCheck(event,group){
    debugger;
    let groupsString:string='';
    for(var i=0;i<= this.bankDashboardService.listUserGroupForSettingRateOfInterestVisibility.length -1;i++){
      let obj:any= this.bankDashboardService.listUserGroupForSettingRateOfInterestVisibility[i];
      // if(obj.GroupName != group.GroupName && obj.IfRateWillBeVisible == true){
        if(obj.IfRateWillBeVisible == true){
        groupsString=groupsString+obj.GroupId+',';
      }
    }
    groupsString = groupsString.substring(0,groupsString.length-1);
    // if(event == true){
    //   groupsString=groupsString+group.GroupId+',';
    // }
    this.bankDashboardService.UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible(groupsString).subscribe(data=>{
    alert('saved successfully');
  })
  }

  Logout(){
    if(confirm("Are you sure you want to log out?")){
    this.authenticateServiceService.ClearSession();
    this.router.navigate(['/login']);
    }
  }

  UpdateUserProfile(){
    debugger;

    /* Validating controls */
    if(this.ValidateUserPfrofileFields(this.copyLoggedInUser,this.bankDashboardService.NewPassword,this.bankDashboardService.ConfirmPassword)){
      this.copyLoggedInUser.NewPassword=this.bankDashboardService.NewPassword.trim();
      this.copyLoggedInUser.Password=this.copyLoggedInUser.Password.trim();
      this.bankDashboardService.UpdateUserProfile(this.copyLoggedInUser).subscribe(data=>{
      if(data !=undefined && data !=null){
        debugger;
        if(data.IsSuccess == false){
          alert('Old password is not correct.')
          return;
        }
        this.authenticateServiceService.UpdateSession(data.data);
        this.bankDashboardService.loggedInUser= this.authenticateServiceService.GetUserDetail();
        alert('Updated successfully.');
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
  alert(message);
  return false;
}

if(NewPassword.trim().length<6){
  alert('Password must be at least of six characters.');
  return false;
}

// if(userModel.NewPassword.trim() == userModel.Password.trim()){
//   alert('Old password and new password can not be same.');
//   return false;
// }

if(NewPassword.trim() != ConfirmPassword.trim()){
  alert('New password and confirm password not matched.');
  return false;
}
return true;

}

ShowUpdateProfileModal(){
 //document.getElementById('updateProfile').style.display='block';
 this.bankDashboardService.NewPassword='';
 this.bankDashboardService.ConfirmPassword='';
  this.copyLoggedInUser = Object.assign({}, this.bankDashboardService.loggedInUser);
}
}
