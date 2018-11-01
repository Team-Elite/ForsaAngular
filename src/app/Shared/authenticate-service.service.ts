import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from '../token-service';


@Injectable({
    providedIn: 'root'
})
export class AuthenticateServiceService {
    public userValue: string = 'userValue';
    sessionCreatedAt: string = 'sessionCreatedAt';
    selectedBestPriceId: string = 'selectedBestPriceId';
    ifBothUserTypeFound: string = 'ifBothUserTypeFound';
    UserTypeId: string = 'UserTypeId';
    baseURL: string = 'http://localhost:60744';
    //baseURL:string='http://localhost:60744/';
    constructor(@Inject(LOCAL_STORAGE) public storage: StorageService, public tokenService: TokenService, public router: Router) { }

    SaveSession(value: any) {

        this.storage.set(this.userValue, value);
        this.storage.set(this.sessionCreatedAt, new Date());
    }

    UpdateSession(value: any) {

        this.storage.set(this.userValue, value);
        this.storage.set(this.sessionCreatedAt, new Date());
    }

    AuthenticateSession() {

        let val = this.storage.get(this.userValue);
        let sessionDate = this.storage.get(this.sessionCreatedAt);
        if (val == undefined || val == null) {
            this.router.navigate(['/login']);
        }
        if ((new Date().getTime() - new Date(sessionDate).getTime()) > 7200000) {
            //alert("Session expired. Please login again.")
            this.router.navigate(['/login']);
        }
    }

    GetUserId() {
        
        let token = this.storage.get(this.userValue);
        var data = this.tokenService.jwtdecrypt(token);
        return JSON.parse(data.unique_name)[0].UserId;
    }

    GetLenderName() {

        let userId = this.storage.get(this.userValue);
        return JSON.parse(userId)[0].NameOfCompany;
    }

    GetEmailId() {

        let userId = this.storage.get(this.userValue);
        return JSON.parse(userId)[0].EmailAddress;
    }

    GetBorrowerName() {

        let userId = this.storage.get(this.userValue);
        return JSON.parse(userId)[0].Bank;
    }

    GetUserTypeId() {

        let userId = this.storage.get(this.userValue);
        return JSON.parse(userId)[0].UserTypeId;
    }

    GetUserDetail() {

        let userId = this.storage.get(this.userValue);
        return JSON.parse(userId)[0];
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
    //public jwtdecrypt(token) {

    //    const helper = new JwtHelperService();
    //    return helper.decodeToken(token);

    //}

}
