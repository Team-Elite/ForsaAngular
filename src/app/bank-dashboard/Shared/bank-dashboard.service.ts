import { Injectable } from '@angular/core';
import { RateOfInterestOfBankModel } from './rate-of-interest-of-bank-model.class';

import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { GroupModel } from '../../Shared/group-model.class';
import { AuthenticateServiceService } from '../../Shared/authenticate-service.service';
import { UserModel } from '../../registration/Shared/user-model.model';
import { LenderSendRequestModel } from '../../lender-dashboard/best-price-view/Shared/lender-send-request-model.class';
import { TokenService } from '../../token-service';
@Injectable({
    providedIn: 'root'
})
export class BankDashboardService {
    selectedRateOfInterestOfBankModel: RateOfInterestOfBankModel;
    listRateOfInterestOfBankModel: RateOfInterestOfBankModel[];
    listUserGroupForSettingRateOfInterestVisibility: GroupModel[];
    tokenService: TokenService = new TokenService;
    userId: number = 0;
    loggedInUser: UserModel;
    NewPassword: string = '';
    ConfirmPassword: string = '';
    lastGroupId: string = '';
    lenderSendRequestModel: LenderSendRequestModel;

    constructor(private http: Http, public authenticateServiceService: AuthenticateServiceService) { }

    async GetRateOfInterestOfBank() {
      
        let token = await this.http.get(this.authenticateServiceService.baseURL + '/api/BankDashBoard/GetRateOfInterestOfBank?id=' + this.userId).map((data: Response) => {
            return data.json();
        }).toPromise().then(token => this.listRateOfInterestOfBankModel = JSON.parse(this.tokenService.jwtdecrypt(token.data).unique_name));
       
    }

    UpdateRateOfInterest(rateModel: RateOfInterestOfBankModel) {
        var body = JSON.stringify(rateModel);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/UpdateRateOfInterestOfBank', body, requestOptions).map(x => x.json());
    }

    PublishAndUnPublish(IsPublished: boolean) {
        //var body=JSON.stringify(rateModel);
        var headerOptions = new Headers({ 'Content-Type': 'application/text' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/PublishAndUnPublish?IsPublished=' + IsPublished + "&id=" + this.userId, requestOptions).map(x => x.json());
    }

    async GetUserGroupForSettingRateOfInterestVisibility() {
        await this.http.get(this.authenticateServiceService.baseURL + '/api/BankDashBoard/GetUserGroupForSettingRateOfInterestVisibility?id=' + this.userId).map((data: Response) => {
            return data.json() ;
        }).toPromise().then(x => {
            this.listUserGroupForSettingRateOfInterestVisibility = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name);
        })
    }

    UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible(GroupIds: string) {
        //var body=JSON.stringify(rateModel);
        var headerOptions = new Headers({ 'Content-Type': 'application/text' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible?GroupIds=' + GroupIds + "&id=" + this.userId, requestOptions).map(x => x.json());
    }

    UpdateUserProfile(userModel: UserModel) {
        var body = JSON.stringify(userModel);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.authenticateServiceService.baseURL + '/api/User/UpdateUser', body, requestOptions).map(x => x.json());
    }

    async GetLenderSendRequestRequestdOnTheBasisOfBorrowerId() {

        let token = await this.http.get(this.authenticateServiceService.baseURL + '/api/BankDashBoard'
            + '/GetLenderSendRequestRequestdOnTheBasisOfBorrowerId?borrowerId=' + this.userId).toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name)[0];
        }
        return response;
        //return response.json();
    }

    UpdateLenderSendRequestRateOfInterest(lenderSendRequestModel: any) {
        var body = JSON.stringify(lenderSendRequestModel);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/UpdateRateOfInterest', body, requestOptions).map(x => x.json());
    }
}
