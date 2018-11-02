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
    tokenService: TokenService;
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
        const token = await this.http.get(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithInterestRateHorizontaly?userId=' + this.lenderDashboardService.userId).map((response) => response.json()).toPromise();
        var response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        return response;


    }

    async GetAllBanksWithInterestRateHorizontalyOrderByColumnName(orderByColumn: string) {
        const token = await this.http.get(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithInterestRateHorizontalyOrderByColumnName?userId=' + this.lenderDashboardService.userId
            + '&orderBy=' + orderByColumn).map((response) => response.json()).toPromise();
        var response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        return response;
    }

    async GetAllBanksWithInterestRateHorizontalyForKontactUser(orderBy: string) {
        const token = await this.http.get(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithInterestRateHorizontalyForKontactUser?orderBy=' + orderBy).map((response) => response.json()).toPromise();
        var response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        return response;
    }
}
