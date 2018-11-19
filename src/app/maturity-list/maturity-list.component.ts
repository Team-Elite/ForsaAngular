import { Component, OnInit } from '@angular/core';
import { AuthenticateServiceService } from '../Shared/authenticate-service.service';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { TokenService } from '../token-service';

@Component({
    selector: 'app-maturity-list',
    templateUrl: './maturity-list.component.html',
    styleUrls: ['./maturity-list.component.css']
})
export class MaturityListComponent implements OnInit {
    _history: boolean;
    http: any;
    _authenticateServiceService: AuthenticateServiceService;
    _tokenService: TokenService;
    headerOptions = new Headers({ 'Content-Type': 'application/json' });
    requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });
    _MaturityList: any;
    bankDashboardService: any;
    constructor(public authenticateServiceService: AuthenticateServiceService, public tokenService: TokenService) {
        this._authenticateServiceService = authenticateServiceService;
        this.GetLenderMaturityList(this._history);
    }

    ngOnInit() {
    }


    async GetLenderMaturityList(history: boolean) {
        var webtoken = { data: this._tokenService.jwtencrypt({ userId: this._authenticateServiceService.GetUserId(), History: history }) };
        if (this._authenticateServiceService.GetUserTypeId() == 5) {
            return await this.http.post(this._authenticateServiceService.baseURL + 'api/LenderDashBoard/GetMaturityList', webtoken, this.requestOptions).map((data: Response) => {
                return data.json();
            }).toPromise().then(token => this._MaturityList = JSON.parse(this._tokenService.jwtdecrypt(token.data).unique_name));
        }
        else {
            return await this.http.post(this._authenticateServiceService.baseURL + 'api/BankDashBoard/GetMaturityList', webtoken, this.requestOptions).map((data: Response) => {
                return data.json();
            }).toPromise().then(token => this._MaturityList = JSON.parse(this._tokenService.jwtdecrypt(token.data).unique_name));

        }
    }



  
}
