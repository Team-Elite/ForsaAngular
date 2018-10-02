import { Inject,Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthenticateServiceService {
  userValue:string='userValue';
  sessionCreatedAt:string='sessionCreatedAt';
  selectedBestPriceId:string='selectedBestPriceId';
  baseURL:string='http://elitecore.cloudapp.net:8081';
  //baseURL:string='http://localhost:60744/';
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public router: Router) { }

  SaveSession(value:any){
    debugger;
  this.storage.set(this.userValue,value);
  this.storage.set(this.sessionCreatedAt,new Date());
  }

  UpdateSession(value:any){
    debugger;
  this.storage.set(this.userValue,value);
  this.storage.set(this.sessionCreatedAt,new Date());
  }

  AuthenticateSession(){
    debugger;
    let val= this.storage.get(this.userValue);
    let sessionDate=this.storage.get(this.sessionCreatedAt);
    if(val == undefined || val== null){
      this.router.navigate(['/login']);
    }
     if((new Date().getTime()-new Date(sessionDate).getTime())> 7200000){
      //alert("Session expired. Please login again.")
      this.router.navigate(['/login']);
    }
    }

    GetUserId(){
      debugger;
      let userId =this.storage.get(this.userValue);
      return JSON.parse(userId)[0].UserId;
    }

    GetLenderName(){
      debugger;
      let userId =this.storage.get(this.userValue);
      return JSON.parse(userId)[0].NameOfCompany;
    }

    GetEmailId(){
      debugger;
      let userId =this.storage.get(this.userValue);
      return JSON.parse(userId)[0].EmailAddress;
    }

    GetBorrowerName(){
      debugger;
      let userId =this.storage.get(this.userValue);
      return JSON.parse(userId)[0].Bank;
    }

    GetUserDetail(){
      debugger;
      let userId =this.storage.get(this.userValue);
      return JSON.parse(userId)[0];
    }

    ClearSession(){
      debugger;
      this.storage.remove(this.userValue);
      this.storage.remove(this.selectedBestPriceId);
      this.storage.remove(this.sessionCreatedAt);
    }

    SaveSelectedTimePeriodId(value:any){
      this.storage.set(this.selectedBestPriceId,value);
      }
  
      GetSavedSelectedTimePeriodId(){
        debugger;
        let Id =this.storage.get(this.selectedBestPriceId);
        return Id;
      }
}
