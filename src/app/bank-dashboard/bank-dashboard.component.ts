import { Component, OnInit } from '@angular/core';
import {BankDashboardService } from './Shared/bank-dashboard.service';
import {AuthenticateServiceService} from '../Shared/authenticate-service.service';

@Component({
  selector: 'app-bank-dashboard',
  templateUrl: './bank-dashboard.component.html',
  styleUrls: ['./bank-dashboard.component.css']
})
export class BankDashboardComponent implements OnInit {

  constructor(public bankDashboardService:BankDashboardService, public authenticateServiceService:AuthenticateServiceService) { }
  IsPublished:boolean=false;

  ngOnInit() {
    debugger;
    this.authenticateServiceService.AuthenticateSession();
    this.bankDashboardService.userId = this.authenticateServiceService.GetUserId();
    this.GetRateOfInterestOfBank();
    this.GetUserGroupForSettingRateOfInterestVisibility();
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

}
