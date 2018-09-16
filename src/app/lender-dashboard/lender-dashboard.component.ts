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
    this.toastr.warning('Loging you out');
    //if(confirm("Are you sure you want to log out?")){
    this.authenticateServiceService.ClearSession();
    this.router.navigate(['/login']);
    //}
  }
}
