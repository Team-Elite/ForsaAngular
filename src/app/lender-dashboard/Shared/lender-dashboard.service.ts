import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AuthenticateServiceService } from '../../Shared/authenticate-service.service';
import { UserModel } from '../../registration/Shared/user-model.model';
import { TokenService } from '../../token-service';

@Injectable({
    providedIn: 'root'
})
export class LenderDashboardService {

    constructor(public http: Http, public authenticateServiceService: AuthenticateServiceService, public tokenService: TokenService) { }

    userId: number;
    StartingScreen: any[];
    baseURL: string = this.authenticateServiceService.baseURL;
    loggedInUser: UserModel;
    NewPassword: string;
    ConfirmPassword: string;
    CurrentPageName: string;
    UserTypeId: any = 5;

    async GetLenderStartPage() {
        const token = await this.http.get(this.authenticateServiceService.baseURL + '/api/LenderStartPage/GetLenderStartPage?id=' + this.userId).map((response) => response.json()).toPromise();
        //const token = this.http.get(this.authenticateServiceService.baseURL + '/api/LenderStartPage/GetLenderStartPage?id=' + this.userId);//.toPromise();
        var response;
        if (token != undefined) response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name)[0];
        return response;
    }

    UpdateUserProfile(userModel: UserModel) {
        var body = JSON.stringify(userModel);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.authenticateServiceService.baseURL + '/api/User/UpdateUser', body, requestOptions).map(x => x.json());
    }

    async GetPagesForLenderSettingStartPage() {
        const response = await this.http.get(this.authenticateServiceService.baseURL + '/api/LenderDashboard/GetPagesForLenderSettingStartPage?userId=' + this.userId).toPromise();
        return response.json();
    }

    async LenderSaveStartPage(pageId: number) {
        const response = await this.http.get(this.authenticateServiceService.baseURL + '/api/LenderDashboard/LenderSaveStartPage?userId=' + this.userId
            + "&pageId=" + pageId.toString()).toPromise();
        return response.json();
    }
}
