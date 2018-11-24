import { Component, OnInit } from '@angular/core';
import { AuthenticateServiceService } from '../../Shared/authenticate-service.service';
import { TokenService } from '../../token-service';
import { Http, Response, Headers,RequestOptions, RequestMethod } from '@angular/http';
import { LenderDashboardService } from '../Shared/lender-dashboard.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
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
    _landerdashboardservice: LenderDashboardService;
    _MaturityList: any;
    bankDashboardService: any;
  
    constructor(public authenticateServiceService: AuthenticateServiceService, public landerdashboardservice: LenderDashboardService, private exportAsService: ExportAsService)
    {
        this._authenticateServiceService = authenticateServiceService;
        this._landerdashboardservice = landerdashboardservice;
        this._MaturityList = this._landerdashboardservice.GetlenderMaturityList();
    }
    config: ExportAsConfig = {
        type: 'pdf',
        elementId: 'mytable',
    };
    ngOnInit() {
       
    }


    exportAs(type) {
        this.config.type = type;
        this.exportAsService.save(this.config, 'myFile');
        // this.exportAsService.get(this.config).subscribe(content => {
        //   console.log(content);
        // });
    }
    

}
