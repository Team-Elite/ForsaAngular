import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AllBanksService } from '../Shared/all-banks.service';
import {LenderDashboardService} from '../../lender-dashboard/Shared/lender-dashboard.service';
import { MaturityReportModel } from '../../lender-dashboard/Shared/maturity-report-model.class';



@Component({
  selector: 'app-maturity-list-lender',
  templateUrl: './maturity-list-lender.component.html',
  styleUrls: ['./maturity-list-lender.component.css']
})


export class MaturityListLenderComponent implements OnInit {
  public maturityListModel:MaturityReportModel;
  constructor(
    public allBanksService: AllBanksService, public spinner: NgxSpinnerService
    , public toastr: ToastrService, public lenderDashboardService:LenderDashboardService
    ) { }

    MaturityList: any =[];
  ngOnInit() {

    // Geeting report  requested from session.
    var reportType =this.lenderDashboardService.authenticateServiceService.GetReportRequestedFor();
    
    //  LML :- Lender Maturity list
    if(reportType == 'LML'){
  this.maturityListModel= new MaturityReportModel();
  this.GetLenderMaturityList(false);
    }

    //  LML :- Lender History Maturity list
    else if(reportType == 'LHML'){
      this.maturityListModel= new MaturityReportModel();
      this.GetLenderMaturityList(true);
        }
  }

  async GetLenderMaturityList(IfHistoryReportRequested: boolean) {
    debugger;
    this.spinner.show();
    /*-- Uncoment below code for getting data from live sever. */
    // let maturityList = await this.lenderDashboardService.GetLenderMaturityList(IfHistoryReportRequested);
    // this.MaturityList = maturityList;

    this.DummyData();
    this.spinner.hide();
}

DummyData(){
  var mat= this.maturityListModel={
Amount:'10',
Borrower:'ANC',
BorrowerId:'1',
EndDate:'20-12-2018',
InterestConvention:'Yearly',
IsRequestAccepted:'True',
Lender:'Lender',
LenderId:'2',
NoOfDays:'365',
OfferredOn:'20-11-2017',
Payments:'yes',
RateOfInterestOfferred:'8.5 %',
RequestCreatedBy:'Lender',
RequestId:'1009',
StartDate:'20-11-2017'
  }
  this.MaturityList[0]=mat;
  this.MaturityList[1]=mat;
  this.MaturityList[2]=mat;
}

ExportToPDF(){
  // To Do Add export to PDF code here
}

ExportToExcel(){
  // To Do Add export to Excel code here
}

}
