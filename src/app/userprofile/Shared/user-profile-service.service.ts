import { Injectable } from '@angular/core';
import{Http,Response,Headers,RequestOptions,RequestMethod} from'@angular/http';
//import{Http} from'@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AuthenticateServiceService} from '../../Shared/authenticate-service.service';
import { TokenService } from '../../token-service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileServiceService {

  constructor(public http:Http
    ,public authenticateServiceService:AuthenticateServiceService) {} 
  
    // url:string='http://localhost:60744/';
    url:string=this.authenticateServiceService.baseURL;
    tokenService: TokenService = new TokenService;
    userId:number =this.authenticateServiceService.GetUserId();
    headerOptions = new Headers({ 'Content-Type': 'application/json' });
    requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });
    listOfFileUploaded:any=[];

  public uploadFile(fileToUpload: File) {
    debugger;
    const _formData = new FormData();
    _formData.append('file', fileToUpload, fileToUpload.name);   
    _formData.append('userId',this.authenticateServiceService.GetUserId());
    // return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashboard/UploadFiles?Id='+this.authenticateServiceService.GetUserId(), _formData);
    return this.http.post(this.url + '/api/BankDashboard/UploadFiles?Id='+this.authenticateServiceService.GetUserId(), _formData);
  }

async DeleteDocument(docId:number, docName:string,calledFrom:number) {
  var webtoken = null;
  if (this.userId != undefined || this.userId == null) webtoken={ data: this.tokenService.jwtencrypt({ userId:this.userId, docId: docId, docName:docName,calledFrom:calledFrom }) };
  return await this.http.post(this.url + '/api/BankDashBoard/DeleteDocument', webtoken, this.requestOptions).toPromise().then(x => x.json().data);
 
}

async GetDocList(userId:number) {
  //this.listOfFileUploaded=[];
  var webtoken = { data: this.tokenService.jwtencrypt({ userId: userId, type: 0 }) };
  // return await this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashBoard/GetDocList', webtoken, this.requestOptions).map((data: Response) => {
    return await this.http.post(this.url + '/api/BankDashBoard/GetDocList', webtoken, this.requestOptions).map((data: Response) => {
      return data.json();
  }).toPromise().then(token => this.listOfFileUploaded = JSON.parse(this.tokenService.jwtdecrypt(token.data).unique_name));

}

}
