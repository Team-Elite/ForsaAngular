import { Injectable } from '@angular/core';
import{Http,Response,Headers,RequestOptions,RequestMethod} from'@angular/http';
//import{Http} from'@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AuthenticateServiceService} from '../../Shared/authenticate-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileServiceService {
   
    headerOptions = new Headers({ 'Content-Type': 'application/json' });
    requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });
  
  constructor(public http:Http
    ,public authenticateServiceService:AuthenticateServiceService) {} 

    public GetUserProfile() {
        var webtoken = { data: this.authenticateServiceService.tokenService.jwtencrypt({ userId: this.authenticateServiceService.GetUserId()}) };
        return this.http.post(this.authenticateServiceService.baseURL + '/api/user/GetUserDetailByUserId', webtoken, this.requestOptions).map((data: Response) => {
            return data.json();
        }).toPromise().then(token => JSON.parse(this.authenticateServiceService.tokenService.jwtdecrypt(token.data).unique_name));
    }


  public uploadFile(fileToUpload: File) {
    const _formData = new FormData();
    _formData.append('file', fileToUpload, fileToUpload.name);   
    return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashboard/UploadFiles', _formData);
  }
}
