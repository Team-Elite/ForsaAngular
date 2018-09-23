import { Injectable } from '@angular/core';
import{Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LenderDashboardService} from '../Shared/lender-dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class AllBanksService {

  constructor(public http:Http, public lenderDashboardService:LenderDashboardService) { }

  listAllBanks:any[];

  async GetAllBanksWithInterestRateHorizontaly(){
    const response= await this.http.get(this.lenderDashboardService.baseURL+'/api/LenderDashboard/GetAllBanksWithInterestRateHorizontaly?userId='+this.lenderDashboardService.userId).toPromise();
    return response.json();
    }
}
