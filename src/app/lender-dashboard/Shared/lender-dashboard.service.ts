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
    headerOptions = new Headers({ 'Content-Type': 'application/json' });
    requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });
    lenderMaturityList: any;
    constructor(public http: Http, public authenticateServiceService: AuthenticateServiceService) { }
    tokenService: TokenService = new TokenService;
    userId: number;
    StartingScreen: any;
    baseURL: string = this.authenticateServiceService.baseURL;
    loggedInUser: UserModel;
    NewPassword: string;
    ConfirmPassword: string;
    CurrentPageName: string;
    UserTypeId: any = 5;
   
    async GetlenderMaturityList(showHistory, userId) {
        var webtoken = { data: this.tokenService.jwtencrypt({ lenderId: userId, History: showHistory }) };
        var result = await this.http.post(this.authenticateServiceService.baseURL + '/api/LenderDashBoard/GetMaturityList', webtoken, this.requestOptions).map((data: Response) => {
            return data.json();
        }).toPromise().then(token => {
            
            return this.tokenService.jwtdecrypt(token.data)
        });
        
        result = JSON.parse(result.unique_name);
        return result;
    }
   public async GetLenderStartPage() {
       if (this.userId === undefined) return null;
       var webtoken = { data: this.tokenService.jwtencrypt({ userId: this.userId }) };
       let token = await this.http.post(this.authenticateServiceService.baseURL + '/api/LenderStartPage/GetLenderStartPage', webtoken, this.requestOptions).toPromise();
        //let token = await this.http.get(this.authenticateServiceService.baseURL + '/api/LenderStartPage/GetLenderStartPage?id=' + this.userId).toPromise();
        //const token = this.http.get(this.authenticateServiceService.baseURL + '/api/LenderStartPage/GetLenderStartPage?id=' + this.userId);//.toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name)[0];
        }
        return response;
    }

    UpdateUserProfile(userModel: UserModel) {
        var webtoken = { data: this.tokenService.jwtencrypt(userModel) };
        
        return this.http.post(this.authenticateServiceService.baseURL + '/api/User/UpdateUser', webtoken, this.requestOptions).map(x => x.json());
    }

    public async GetPagesForLenderSettingStartPage() {
     
        if (this.userId === undefined) return null;
        var webtoken = { data: this.tokenService.jwtencrypt({ userId: this.userId }) };
        let token = await this.http.post(this.authenticateServiceService.baseURL + '/api/LenderDashboard/GetPagesForLenderSettingStartPage', webtoken, this.requestOptions).toPromise();
        //let token = await this.http.get(this.authenticateServiceService.baseURL + '/api/LenderDashboard/GetPagesForLenderSettingStartPage?id=' + this.userId).toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        }
       
        return response;
    }

    async LenderSaveStartPage(pageId: number) {
        if (this.userId === undefined) return null;
        var webtoken = { data: this.tokenService.jwtencrypt({ userId: this.userId, pageId: pageId }) };
        let token = await this.http.post(this.authenticateServiceService.baseURL + '/api/LenderDashboard/LenderSaveStartPage', webtoken, this.requestOptions).toPromise();
       // let token = await this.http.get(this.authenticateServiceService.baseURL + '/api/LenderDashboard/LenderSaveStartPage?id=' + this.userId  + "&pageId=" + pageId.toString()).toPromise();
        var response;
        if (token != undefined) {
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        }

        return response;
      //  return response.json();
    }
}
