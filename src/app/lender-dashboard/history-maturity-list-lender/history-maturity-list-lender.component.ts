import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AllBanksService } from '../Shared/all-banks.service';
import {LenderDashboardService} from '../../lender-dashboard/Shared/lender-dashboard.service';

@Component({
  selector: 'app-history-maturity-list-lender',
  templateUrl: './history-maturity-list-lender.component.html',
  styleUrls: ['./history-maturity-list-lender.component.css']
})
export class HistoryMaturityListLenderComponent implements OnInit {

  constructor(public allBanksService: AllBanksService, public spinner: NgxSpinnerService
    , public toastr: ToastrService, public lenderDashboardService:LenderDashboardService) { }

    MaturityList: any =[];
  ngOnInit() {
//this.GetAllBanksWithInterestRateHorizontaly(); 
  }

//   async GetAllBanksWithInterestRateHorizontaly() {
//     let list = await this.lenderDashboardService.GetLenderMaturityList(true);
//     this.MaturityList = list;
// }

}
