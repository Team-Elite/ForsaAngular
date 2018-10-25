import { Component, OnInit } from '@angular/core';
import {LenderDashboardService} from '../lender-dashboard/Shared/lender-dashboard.service';

@Component({
  selector: 'app-left-menu-bar',
  templateUrl: './left-menu-bar.component.html',
  styleUrls: ['./left-menu-bar.component.css']
})
export class LeftMenuBarComponent implements OnInit {

  constructor( public lenderDashboardService:LenderDashboardService) { }

  ngOnInit() {
  }

}
