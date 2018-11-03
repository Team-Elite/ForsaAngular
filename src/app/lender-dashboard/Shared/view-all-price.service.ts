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
        let token = await this.http.get(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithStatusIsDeselected?Id=' + this.lenderDashboardService.userId + '&PageNumber=' + this.selectedPageNumber).toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        }
        return response;
    }

    async GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected() {
        let token = await this.http.get(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected?Id=' + this.lenderDashboardService.userId).toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        }
        return response;
    }

    async GetAllBanksWithInterestRateHorizontalyOrderByColumnName(orderByColumn: string) {
        let token = await this.http.get(this.lenderDashboardService.baseURL + '/api/LenderDashboard/GetAllBanksWithInterestRateHorizontalyOrderByColumnName?Id=' + this.lenderDashboardService.userId + '&orderBy=' + orderByColumn).toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        }
        return response;
    }

    async DeselectSelectBank(bankId: number, IsSelected: Boolean) {
        let token = await this.http.get(this.lenderDashboardService.baseURL + '/api/LenderDashboard/DeselectBank?userId=' + this.lenderDashboardService.userId + "&bankId=" + bankId + "&IsSelected=" + IsSelected).toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        }
        return response;
    }
}
