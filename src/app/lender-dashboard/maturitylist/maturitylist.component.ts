import { Component, OnInit } from '@angular/core';
import { AuthenticateServiceService } from '../../Shared/authenticate-service.service';
import { TokenService } from '../../token-service';
import { Http, Response, Headers,RequestOptions, RequestMethod } from '@angular/http';
import { LenderDashboardService } from '../Shared/lender-dashboard.service';

@Component({
  selector: 'app-maturitylist',
  templateUrl: './maturitylist.component.html',
  styleUrls: ['./maturitylist.component.css']
})
export class MaturitylistComponent implements OnInit {

    _history: boolean;
    http: any;
    _authenticateServiceService: AuthenticateServiceService;
    _tokenService: TokenService;
    headerOptions = new Headers({ 'Content-Type': 'application/json' });
    requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });
    _MaturityList: any;
    bankDashboardService: any;
    _landerdashboardservice: LenderDashboardService;
    constructor(public authenticateServiceService: AuthenticateServiceService, public landerdashboardservice: LenderDashboardService) {
        this._authenticateServiceService = authenticateServiceService;
        this._landerdashboardservice = landerdashboardservice;
       
    }

    ngOnInit() {
        this._MaturityList = this._landerdashboardservice.GetlenderMaturityList()
    }


    

}
