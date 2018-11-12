import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { LenderDashboardService } from '../Shared/lender-dashboard.service';
import { TokenService } from '../../token-service';
@Injectable({
    providedIn: 'root'
})
export class AllBanksService {
    tokenService: TokenService = new TokenService;
    listAllBanks: any[];
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
    constructor(public http: Http, public lenderDashboardService: LenderDashboardService) { }
    async GetAllBanksWithInterestRateHorizontaly() {
        var response;
        if (this.lenderDashboardService.userId === undefined) { return response; }
        await this.http.get(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithInterestRateHorizontaly?Id=' + this.lenderDashboardService.userId)
            .map((data: Response) => { return data.json() })
            .toPromise().then(token => {
                response = JSON.parse(this.tokenService.jwtdecrypt(token.data).unique_name)
            });
        return response;


    }

    async GetAllBanksWithInterestRateHorizontalyOrderByColumnName(orderByColumn: string) {
        var response;
        if (this.lenderDashboardService.userId === undefined) { return response; }
        await this.http.get(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithInterestRateHorizontalyOrderByColumnName?Id=' + this.lenderDashboardService.userId + '&orderBy=' + orderByColumn)
            .map((data: Response) => { return data.json() })
            .toPromise().then(token => {
                response = JSON.parse(this.tokenService.jwtdecrypt(token.data).unique_name)
            });
        return response;
    }

    async GetAllBanksWithInterestRateHorizontalyForKontactUser(orderBy: string) {
        var response;
        if (this.lenderDashboardService.userId === undefined) { return response; }
        await this.http.get(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithInterestRateHorizontalyForKontactUser?orderBy=' + orderBy)
            .map((data: Response) => { return data.json() }).toPromise().then(token => {
                response = JSON.parse(this.tokenService.jwtdecrypt(token.data).unique_name)
            });
        return response;
    }
}
