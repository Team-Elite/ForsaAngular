import { Injectable } from '@angular/core';
import{Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LenderDashboardService} from '../Shared/lender-dashboard.service';
@Injectable({
  providedIn: 'root'
})
export class ViewAllPriceService {

  constructor(public http:Http, public lenderDashboardService:LenderDashboardService) { }

    listViewAllPrice:any[]=[];
    listViewAllPrice1:any[]=[];
    listViewAllPrice2:any[]=[];
    listViewAllPrice3:any[]=[];
    listAllBanks:any[]=[];
    count:number=0;

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

    async GetAllBanksWithStatusIsDeselected(){
    const response= await this.http.get(this.lenderDashboardService.baseURL+'/api/LenderDashboard/GetAllBanksWithStatusIsDeselected?userId='+this.lenderDashboardService.userId).toPromise();
    return response.json();
    }

    async GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected(){
    const response= await this.http.get(this.lenderDashboardService.baseURL+'/api/LenderDashboard/GetAllBanksWithInterestRateHorizontalyWhichAreNotDeSelected?userId='+this.lenderDashboardService.userId).toPromise();
    return response.json();
      }

    async DeselectSelectBank(bankId:number,IsSelected:Boolean){
      const response= await this.http.get(this.lenderDashboardService.baseURL+'/api/LenderDashboard/DeselectBank?userId='+this.lenderDashboardService.userId+"&bankId="+bankId+"&IsSelected="+IsSelected).toPromise();
      return response.json();
      }
}
