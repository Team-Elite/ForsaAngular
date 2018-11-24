import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router'
import { TokenService } from '../token-service';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, RequestMethod,Response, Headers, } from '@angular/http';

@Injectable({
    providedIn: 'root'
})
export class AuthenticateServiceService {
    
    public userValue: string = 'userValue';
    sessionCreatedAt: string = 'sessionCreatedAt';
    selectedBestPriceId: string = 'selectedBestPriceId';
    ifBothUserTypeFound: string = 'ifBothUserTypeFound';
    UserTypeId: string = 'UserTypeId';

    tokenService: any = new TokenService;
    Usertoken: any = this.storage.get(this.userValue);
    Userdata: any;
    requestedForReport: string='';
    baseURL: string = !(environment.production) ? 'http://40.89.139.123:4043' : 'http://localhost:60744';
    headerOptions = new Headers({ 'Content-Type': 'application/json' });
    requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });

    constructor(@Inject(LOCAL_STORAGE) public storage: StorageService, public router: Router,public http: Http) {
        
      
    }
    SaveSession(value: any) {

        this.storage.set(this.userValue, value);
        this.storage.set(this.sessionCreatedAt, new Date());
    }

    UpdateSession(value: any) {

        this.storage.set(this.userValue, value);
        this.storage.set(this.sessionCreatedAt, new Date());
    }
    GetUserSession() {
        this.Usertoken = this.storage.get(this.userValue);
        this.Userdata = this.tokenService.jwtdecrypt(this.Usertoken);


    }


    AuthenticateSession() {

       // let val = this.storage.get(this.userValue);
        this.GetUserSession();
        let sessionDate = this.storage.get(this.sessionCreatedAt);
        if (this.Userdata == undefined || this.Userdata == null) {
            this.router.navigate(['/login']);
            return;
        }
        else {

        }
        if ((new Date().getTime() - new Date(sessionDate).getTime()) > 7200000) {
            //alert("Session expired. Please login again.")
            this.router.navigate(['/login']);
            return;
        }


    }

    GetUserId() {
        //var data = this.tokenService.jwtdecrypt(this.Usertoken);
        this.GetUserSession();
        return JSON.parse(this.Userdata.unique_name)[0].UserId;
    }

    GetLenderName() {
       
        //let userId = this.storage.get(this.userValue);
        return JSON.parse(this.Userdata.unique_name)[0].NameOfCompany;
    }

    GetEmailId() {

        //let userId = this.storage.get(this.userValue);
        return JSON.parse(this.Userdata.unique_name)[0].EmailAddress;
    }

    GetBorrowerName() {
        this.GetUserSession();
       // let userId = this.storage.get(this.userValue);
        return JSON.parse(this.Userdata.unique_name)[0].Bank;
    }

    GetUserTypeId() {
        this.GetUserSession();
       // let userId = this.storage.get(this.userValue);
        return JSON.parse(this.Userdata.unique_name)[0].UserTypeId;
    }

    GetUserDetail() {
        this.GetUserSession();
       // let userId = this.storage.get(this.userValue);
        return JSON.parse(this.Userdata.unique_name)[0];
    }

    ClearSession() {

        this.storage.remove(this.userValue);
        this.storage.remove(this.selectedBestPriceId);
        this.storage.remove(this.sessionCreatedAt);
        this.storage.remove(this.ifBothUserTypeFound);
    }

    SaveSelectedTimePeriodId(value: any) {
        this.storage.set(this.selectedBestPriceId, value);
    }

    GetSavedSelectedTimePeriodId() {

        let Id = this.storage.get(this.selectedBestPriceId);
        return Id;
    }

    SaveIfBothUserTypeFound(value: any) {
        this.storage.set(this.ifBothUserTypeFound, value);
    }

    GetIfBothUserTypeFound() {

        let Id = this.storage.get(this.ifBothUserTypeFound);
        return Id;
    }
   
    SaveReportRequestedFor(value: string) {

        this.storage.set(this.requestedForReport, value);
        this.storage.set(this.sessionCreatedAt, new Date());
    }
    GetReportRequestedFor() {

        let requestedFor = this.storage.get(this.requestedForReport);
        return requestedFor;
    }

      GetUserData() {
        //var data = this.tokenService.jwtdecrypt(this.Usertoken);
        var userId = this.GetUserId();
       
        var webtoken = { data: this.tokenService.jwtencrypt({ userId: userId }) };
        var data = this.http.put(this.baseURL + '/api/user/GetUserDetailByUserId', webtoken, this.requestOptions).map((data: Response) => {
            return data.json();
          }).toPromise().then(token => { return JSON.parse(this.tokenService.jwtdecrypt(token.data).unique_name) });
          debugger;
          return data;
      
    }
    
}
