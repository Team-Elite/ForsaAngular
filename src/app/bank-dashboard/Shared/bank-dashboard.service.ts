import { Injectable } from '@angular/core';
import {RateOfInterestOfBankModel} from './rate-of-interest-of-bank-model.class';

import{Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { GroupModel } from '../../Shared/group-model.class';
import {AuthenticateServiceService} from '../../Shared/authenticate-service.service';

@Injectable({
  providedIn: 'root'
})
export class BankDashboardService {
selectedRateOfInterestOfBankModel:RateOfInterestOfBankModel;
listRateOfInterestOfBankModel:RateOfInterestOfBankModel[];
listUserGroupForSettingRateOfInterestVisibility:GroupModel[];
userId:number=57;
//baseURL:string='http://localhost:60744/';
//baseURL:string='http://elitecore.cloudapp.net:8081';
  constructor(private http:Http,public authenticateServiceService:AuthenticateServiceService) { }

  async GetRateOfInterestOfBank(){
    await this.http.get(this.authenticateServiceService.baseURL+'/api/BankDashBoard/GetRateOfInterestOfBank?userId='+this.userId).map((data:Response) => {return data.json() as RateOfInterestOfBankModel[];
  }).toPromise().then(x=>{
  this.listRateOfInterestOfBankModel=x;
  })
  }

  UpdateRateOfInterest(rateModel: RateOfInterestOfBankModel){
    var body=JSON.stringify(rateModel);
    var headerOptions= new Headers({'Content-Type':'application/json'});
    var requestOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.authenticateServiceService.baseURL+'/api/BankDashBoard/UpdateRateOfInterestOfBank',body,requestOptions).map(x=> x.json());
  }

  PublishAndUnPublish(IsPublished:boolean){
    //var body=JSON.stringify(rateModel);
    var headerOptions= new Headers({'Content-Type':'application/text'});
    var requestOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.authenticateServiceService.baseURL+'/api/BankDashBoard/PublishAndUnPublish?IsPublished='+IsPublished+"&userId="+this.userId,requestOptions).map(x=> x.json());
  }

  async GetUserGroupForSettingRateOfInterestVisibility(){
    await this.http.get(this.authenticateServiceService.baseURL+'/api/BankDashBoard/GetUserGroupForSettingRateOfInterestVisibility?userId='+this.userId).map((data:Response) => {return data.json() as GroupModel[];
  }).toPromise().then(x=>{
  this.listUserGroupForSettingRateOfInterestVisibility=x;
  })
  }

  UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible(GroupIds:string){
    //var body=JSON.stringify(rateModel);
    var headerOptions= new Headers({'Content-Type':'application/text'});
    var requestOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.authenticateServiceService.baseURL+'/api/BankDashBoard/UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible?GroupIds='+GroupIds+"&userId="+this.userId,requestOptions).map(x=> x.json());
  }
}
