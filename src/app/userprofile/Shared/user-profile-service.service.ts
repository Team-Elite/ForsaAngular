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

  constructor(public http:Http
    ,public authenticateServiceService:AuthenticateServiceService) {} 
  
  public uploadFile(fileToUpload: File) {
    const _formData = new FormData();
    _formData.append('file', fileToUpload, fileToUpload.name);   
    return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashboard/UploadFiles', _formData);
  }
}
