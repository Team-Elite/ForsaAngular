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
