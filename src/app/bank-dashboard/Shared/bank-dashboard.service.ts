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
    headerOptions = new Headers({ 'Content-Type': 'application/json' });
    requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });
    constructor(private http: Http, public authenticateServiceService: AuthenticateServiceService) { }

    async GetBorrowerMaturityList() {
        var webtoken = { data: this.tokenService.jwtencrypt({ userId: this.userId }) };
        return  await this.http.put(this.authenticateServiceService.baseURL + 'api/BankDashBoard/GetBorrowerMaturityList', webtoken, this.requestOptions).map((data: Response) => {
            return data.json();
        }).toPromise().then(token => this.listRateOfInterestOfBankModel = JSON.parse(this.tokenService.jwtdecrypt(token.data).unique_name));

    }


    async GetRateOfInterestOfBank() {
        var webtoken = { data: this.tokenService.jwtencrypt({ userId: this.userId }) };
       return await this.http.put(this.authenticateServiceService.baseURL + '/api/BankDashBoard/GetRateOfInterestOfBank', webtoken, this.requestOptions).map((data: Response) => {
            return data.json();
        }).toPromise().then(token => this.listRateOfInterestOfBankModel = JSON.parse(this.tokenService.jwtdecrypt(token.data).unique_name));

    }






    UpdateRateOfInterest(rateModel: RateOfInterestOfBankModel) {
        // var body = JSON.stringify(rateModel);
        var webtoken = { data: this.tokenService.jwtencrypt({ userId: this.userId }) };
        return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/UpdateRateOfInterestOfBank', webtoken, this.requestOptions).map(x => x.json());
    }

    PublishAndUnPublish(IsPublished: boolean) {
        //var body=JSON.stringify(rateModel);
        var data = { IsPublished: IsPublished, id: this.userId };
        var webtoken = { data: this.tokenService.jwtencrypt(data) };
        return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/PublishAndUnPublish', webtoken, this.requestOptions).map(x => x.json());
        // return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/PublishAndUnPublish?IsPublished=' + IsPublished + "&id=" + , requestOptions).map(x => x.json());//
    }

    async GetUserGroupForSettingRateOfInterestVisibility() {

        var webtoken = { data: this.tokenService.jwtencrypt({ userId: this.userId }) };
        //await this.http.get(this.authenticateServiceService.baseURL + '/api/BankDashBoard/GetUserGroupForSettingRateOfInterestVisibility?id=' + this.userId).map((data: Response) => {
        await this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/GetUserGroupForSettingRateOfInterestVisibility', webtoken, this.requestOptions).map((data: Response) => {
            return data.json();
        }).toPromise().then(x => {
            debugger;
            this.listUserGroupForSettingRateOfInterestVisibility = JSON.parse(this.tokenService.jwtdecrypt(x.data).unique_name);
        })
    }

    UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible(GroupIds: string) {
        //var body=JSON.stringify(rateModel);
        var data = { GroupIds: GroupIds, id: this.userId };
        var webtoken = { data: this.tokenService.jwtencrypt(data) };
        return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible', webtoken, this.requestOptions).map(x => x.json());
        //    return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible?GroupIds=' + GroupIds + "&id=" + this.userId, requestOptions).map(x => x.json());

    }

    UpdateUserProfile(userModel: UserModel) {
        // var body = JSON.stringify(userModel);
        var webtoken = { data: this.tokenService.jwtencrypt(userModel) };
        return this.http.post(this.authenticateServiceService.baseURL + '/api/User/UpdateUser', webtoken, this.requestOptions).map(x => x.json());
        //return this.http.post(this.authenticateServiceService.baseURL + '/api/User/UpdateUser', body, requestOptions).map(x => x.json());
    }

    async GetLenderSendRequestRequestdOnTheBasisOfBorrowerId() {

        var webtoken = { data: this.tokenService.jwtencrypt({ userId: this.userId }) };
        let token = await this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard'
            + '/GetLenderSendRequestRequestdOnTheBasisOfBorrowerId', webtoken, this.requestOptions).toPromise();
        var response;
        //let token = await this.http.get(this.authenticateServiceService.baseURL + '/api/BankDashBoard' + '/GetLenderSendRequestRequestdOnTheBasisOfBorrowerId?borrowerId=' + this.userId).toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name)[0];
        }
        return response;
        //return response.json();
    }

    UpdateLenderSendRequestRateOfInterest(lenderSendRequestModel: any) {
        //var body = JSON.stringify(lenderSendRequestModel);
        var webtoken = { data: this.tokenService.jwtencrypt(lenderSendRequestModel) };
        return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/UpdateRateOfInterest', webtoken, this.requestOptions).map(x => x.json());
    }
}
