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
  HighestRateTN:string;
  HighestRateW1:string;
  HighestRateW2:string;
  HighestRateW3:string;
  HighestRateM1:string;
  HighestRateM2:string;
  HighestRateM3:string;
  HighestRateM4:string;
  HighestRateM5:string;
  HighestRateM6:string;
  HighestRateM7:string;
  HighestRateM8:string;
  HighestRateM9:string;
  HighestRateM10:string;
  HighestRateM11:string;
  HighestRateM12:string;
  HighestRateY2:string;
  HighestRateY3:string;
  HighestRateY4:string;
  HighestRateY5:string;

  async GetAllBanksWithInterestRateHorizontaly(){
    const response= await this.http.get(this.lenderDashboardService.baseURL+'/api/LenderDashboard/GetAllBanksWithInterestRateHorizontaly?userId='+this.lenderDashboardService.userId).toPromise();
    return response.json();
    }

  async GetAllBanksWithInterestRateHorizontalyOrderByColumnName(orderByColumn:string){
      const response= await this.http.get(this.lenderDashboardService.baseURL+'/api/LenderDashboard/GetAllBanksWithInterestRateHorizontalyOrderByColumnName?userId='+this.lenderDashboardService.userId
      +'&orderBy='+orderByColumn).toPromise();
      return response.json();
    }
}
