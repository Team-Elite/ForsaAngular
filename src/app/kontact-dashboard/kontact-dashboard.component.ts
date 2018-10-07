import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService  } from 'ngx-toastr';
import {AllBanksService} from '../lender-dashboard/Shared/all-banks.service';
import {LenderDashboardService} from '../lender-dashboard/Shared/lender-dashboard.service';
import {AuthenticateServiceService} from '../Shared/authenticate-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-kontact-dashboard',
  templateUrl: './kontact-dashboard.component.html',
  styleUrls: ['./kontact-dashboard.component.css']
})
export class KontactDashboardComponent implements OnInit {

  constructor(public allBanksService:AllBanksService,public spinner:NgxSpinnerService
    , public toastr:ToastrService
    ,public lenderDashboardService:LenderDashboardService
    ,public authenticateServiceService:AuthenticateServiceService
    ,public router: Router
    ) { }

  ngOnInit() {
    this.authenticateServiceService.AuthenticateSession();
    this.lenderDashboardService.userId = this.authenticateServiceService.GetUserId();
    this.GetAllBanksWithInterestRateHorizontaly();
  }
  async GetAllBanksWithInterestRateHorizontaly(){
    debugger;
    this.spinner.show();
    let rates= await this.allBanksService.GetAllBanksWithInterestRateHorizontaly();
    this.allBanksService.listAllBanks=JSON.parse(rates.data);
    this.GetHighestRates();
    this.spinner.hide();
   }

   async GetAllBanksWithInterestRateHorizontalyOrderByColumnName(columnName:string){
    debugger;
    this.spinner.show();
    let rates= await this.allBanksService.GetAllBanksWithInterestRateHorizontalyOrderByColumnName(columnName);
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
   RegisterAsPartner(){
    this.authenticateServiceService.ClearSession();
    this.router.navigate(['/registration/',this.lenderDashboardService.userId]);
   }
   Logout(){
    //if(confirm("Are you sure you want to log out?")){
    this.authenticateServiceService.ClearSession();
    this.router.navigate(['/login']);
    //}
  }
}
