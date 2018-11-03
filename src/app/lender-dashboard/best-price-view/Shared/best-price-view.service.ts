import { Injectable } from '@angular/core';
import{Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LenderDashboardService} from '../../Shared/lender-dashboard.service';
import {LenderModel} from '../../Shared/lender-model.class';
import {LenderSendRequestModel} from '../Shared/lender-send-request-model.class';
import { TokenService } from '../../../token-service';


@Injectable({
  providedIn: 'root'
})
export class BestPriceViewService {

    tokenService: TokenService = new TokenService;
  constructor(public http:Http, public lenderDashboardService:LenderDashboardService) { }
  
  timePeriod:number;
  pageNumber:number;
  listRatesByTimePeriod:LenderModel[];
  listBankByTimePeriod:LenderModel[];
  lenderSendRequestModel:LenderSendRequestModel;
  lenderSendRequestModel2:LenderSendRequestModel;
  listInterestConvention:any[]=[{Id:1, Value:'act/360'}];
  listPayments:any[]=[{Id:1, Value:'yearly payments'}];

  async GetRatesByTimePeriod(){
    let token= await this.http.get(this.lenderDashboardService.baseURL+'/api/LenderBestPriceView/GetRatesByTimePeriod?id='+this.lenderDashboardService.userId).toPromise();
      var response;
      if (token != undefined) {
          token = token.json().data;
          response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
      }
      return response;
    }

    async GetRatesByTimePeriodK(){
        let token= await this.http.get(this.lenderDashboardService.baseURL+'/api/LenderBestPriceView/GetRatesByTimePeriodK').toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        }
        return response;
      }

    async GetBanksByTimePeriod(){
        let token= await this.http.get(this.lenderDashboardService.baseURL+'/api/LenderBestPriceView/GetBanksByTimePeriod?id='      +this.lenderDashboardService.userId+'&timePeriod='+this.timePeriod+'&pageNumber='+this.pageNumber).toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        }
        return response;
      }

      async GetBanksByTimePeriodK(){
          let token= await this.http.get(this.lenderDashboardService.baseURL+'/api/LenderBestPriceView/GetBanksByTimePeriodK?timePeriod='+this.timePeriod+'&pageNumber='+this.pageNumber).toPromise();
          var response;
          if (token != undefined) {
              token = token.json().data;
              response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
          }
          return response;
        }

  SaveSendRequest(sendRequestModel:LenderSendRequestModel){
    var body=JSON.stringify(sendRequestModel);
    var headerOptions= new Headers({'Content-Type':'application/json'});
    var requestOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.lenderDashboardService.baseURL+'/api/LenderBestPriceView/SaveSendRequest',body,requestOptions).map(x=> x.json());
    }      
  
    async GetLenderSendRequestPendingLendedRequestByLenderId(){
        let token = await this.http.get(this.lenderDashboardService.authenticateServiceService.baseURL+'/api/LenderDashboard/GetLenderSendRequestPendingLendedRequestByLenderId?Id='+this.lenderDashboardService.userId).toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = this.tokenService.jwtdecrypt(token).unique_name == "[]" ? [] : JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        }
        return response;
    }
  
    AcceptLendedRequest(lenderSendRequestModel:any){
      var body=JSON.stringify(lenderSendRequestModel);
      var headerOptions= new Headers({'Content-Type':'application/json'});
      var requestOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
      return this.http.post(this.lenderDashboardService.authenticateServiceService.baseURL+'/api/LenderDashboard/AcceptLendedRequest',body,requestOptions).map(x=> x.json());
    }  

    RejectLendedRequest(lenderSendRequestModel:any){
      var body=JSON.stringify(lenderSendRequestModel);
      var headerOptions= new Headers({'Content-Type':'application/json'});
      var requestOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
      return this.http.post(this.lenderDashboardService.authenticateServiceService.baseURL+'/api/LenderDashboard/RejectLendedRequest',body,requestOptions).map(x=> x.json());
    }
    SaveForsaMessage(sendRequestModel:LenderSendRequestModel){
      var body=JSON.stringify(sendRequestModel);
      var headerOptions= new Headers({'Content-Type':'application/json'});
      var requestOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
      return this.http.post(this.lenderDashboardService.baseURL+'/api/LenderDashboard/SaveForsaMessage',body,requestOptions).map(x=> x.json());
      } 

    
}
