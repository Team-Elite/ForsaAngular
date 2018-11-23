import { Injectable } from '@angular/core';
import{Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LoginModel} from './login-model.model';
import {AuthenticateServiceService} from '../../Shared/authenticate-service.service';
import { TokenService } from '../../token-service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
    headerOptions = new Headers({ 'Content-Type': 'application/json' });
    requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });
  //baseURL:string='http://elitecore.cloudapp.net:8081';
  // baseURL:string='http://localhost:60744/';
  loginModel:LoginModel;
  
    constructor(public http: Http, public authenticateServiceService: AuthenticateServiceService, public tokenService: TokenService) {}

 async ValidateUser(loginModel:LoginModel){
    
     var webtoken = { data: this.tokenService.jwtencrypt(loginModel) };
    
    //var body=JSON.stringify(loginModel);
   
     const response = await this.http.post(this.authenticateServiceService.baseURL + '/api/Login/ValidateUser', webtoken,this.requestOptions).toPromise();
    return response.json();
  }

  async ForgotPassword(loginModel:LoginModel){
      var webtoken = { data: this.tokenService.jwtencrypt(loginModel) };
    
      const response = await this.http.post(this.authenticateServiceService.baseURL + '/api/Login/ForgotPassword ', webtoken,this.requestOptions).toPromise();
     return response.json();
   }
}
