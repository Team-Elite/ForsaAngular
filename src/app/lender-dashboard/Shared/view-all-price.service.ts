import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { LenderDashboardService } from '../Shared/lender-dashboard.service';
import { TokenService } from '../../token-service';
@Injectable({
    providedIn: 'root'
})
export class ViewAllPriceService {
    headerOptions = new Headers({ 'Content-Type': 'application/json' });
    requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });

    tokenService : TokenService= new TokenService;
    constructor(public http: Http, public lenderDashboardService: LenderDashboardService) { }

    listViewAllPrice: any[] = [];
    listViewAllPrice1: any[] = [];
    listViewAllPrice2: any[] = [];
    listViewAllPrice3: any[] = [];
    listAllBanks: any[] = [];
    count: number = 0;
    selectedPageNumber: number = 1;
    toatlBanksCount: number;

    HighestRateTN: string;
    HighestRateW1: string;
    HighestRateW2: string;
    HighestRateW3: string;
    HighestRateM1: string;
    HighestRateM2: string;
    HighestRateM3: string;
    HighestRateM4: string;
    HighestRateM5: string;
    HighestRateM6: string;
    HighestRateM7: string;
    HighestRateM8: string;
    HighestRateM9: string;
    HighestRateM10: string;
    HighestRateM11: string;
    HighestRateM12: string;
    HighestRateY2: string;
    HighestRateY3: string;
    HighestRateY4: string;
    HighestRateY5: string;

    async GetAllBanksWithStatusIsDeselected() {

        var webtoken = { data: this.tokenService.jwtencrypt({ userId: this.lenderDashboardService.userId }), PageNumber:this.selectedPageNumber  };
        let token = await this.http.post(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithStatusIsDeselected', webtoken, this.requestOptions ).toPromise();

       // let token = await this.http.get(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithStatusIsDeselected?Id=' + this.lenderDashboardService.userId + '&PageNumber=' + this.selectedPageNumber).toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        }
        return response;
    }

    async GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected() {
        var webtoken = { data: this.tokenService.jwtencrypt({ userId: this.lenderDashboardService.userId }) };
        let token = await this.http.post(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected', webtoken, this.requestOptions  ).toPromise();

       // let token = await this.http.get(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected?Id=' + this.lenderDashboardService.userId).toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        }
        return response;
    }

    async GetAllBanksWithInterestRateHorizontalyOrderByColumnName(orderByColumn: string) {
       
        var webtoken = { data: this.tokenService.jwtencrypt({ userId: this.lenderDashboardService.userId }), orderBy: orderByColumn };
        var response;
        let token = await this.http.post(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithInterestRateHorizontalyOrderByColumnName', webtoken, this.requestOptions).map((data: Response) => { return data.json() }).toPromise().then(token => {
            response = (token.data == undefined) ? null : JSON.parse(this.tokenService.jwtdecrypt(token.data).unique_name)
            });
        return response;
    }

    async DeselectSelectBank(bankId: number, IsSelected: any) {
        var webtoken = { data: this.tokenService.jwtencrypt({ userId: this.lenderDashboardService.userId, bankId: bankId, IsSelected: (IsSelected)?1:0 }) };
        let token = await this.http.put(this.lenderDashboardService.baseURL + '/api/LenderDashboard/DeselectBank', webtoken, this.requestOptions).toPromise();

       // let token = await this.http.get(this.lenderDashboardService.baseURL + '/api/LenderDashboard/DeselectBank?userId=' + this.lenderDashboardService.userId + "&bankId=" + bankId + "&IsSelected=" + IsSelected).toPromise();
        var response;
        if (token != undefined) {
            token = token.json();
            response = token;
        }
        return response;
    }
}
