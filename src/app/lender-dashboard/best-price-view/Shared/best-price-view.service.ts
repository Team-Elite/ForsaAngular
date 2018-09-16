import { Injectable } from '@angular/core';
import{Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LenderDashboardService} from '../../Shared/lender-dashboard.service';
import {LenderModel} from '../../Shared/lender-model.class';


@Injectable({
  providedIn: 'root'
})
export class BestPriceViewService {

  constructor(public http:Http, public lenderDashboardService:LenderDashboardService) { }
  
  timePeriod:number;
  pageNumber:number;
  listRatesByTimePeriod:LenderModel[];
  listBankByTimePeriod:LenderModel[];

  async GetRatesByTimePeriod(){
    const response= await this.http.get(this.lenderDashboardService.baseURL+'/api/LenderBestPriceView/GetRatesByTimePeriod?userId='+this.lenderDashboardService.userId).toPromise();
        return response.json();
    }

    async GetBanksByTimePeriod(){
      const response= await this.http.get(this.lenderDashboardService.baseURL+'/api/LenderBestPriceView/GetBanksByTimePeriod?userId='
      +this.lenderDashboardService.userId+'&timePeriod='+this.timePeriod+'&pageNumber='+this.pageNumber).toPromise();
          return response.json();
      }
}
