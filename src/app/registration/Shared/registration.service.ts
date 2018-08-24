import { Injectable } from '@angular/core';
import { Language } from './language.model';
import { Country } from './country.model';
// import {UserModel} from './UserModel.model';
import {UserModel} from './user-model.model';

import{Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  CountryList:Country[];
  languageList:Language[];
  userModel:UserModel;
  confirmEmailAddress:string='';
  AcceptTermsAndConditions:boolean=false;
  ShowSection2 : boolean =false;
  ShowSection3 : boolean =false;
  baseURL:string='http://localhost:60744/';
  //baseURL:string='http://elitecore.cloudapp.net:8081';
  userModelExist:UserModel;
  constructor(private http:Http) { }

  getCountryList(){
    
    this.http.get(this.baseURL+'/api/Country/GettblCountries').map((data:Response) => {return data.json() as Country[];
  }).toPromise().then(x=>{
  this.CountryList=x;
  })
  }

  getLanguageList(){
    
    this.http.get(this.baseURL+'/api/Language/GettblLanguages').map((data:Response) => {return data.json() as Language[];}).toPromise().then(
      x=>{this.languageList=x;})
  }

  RegisterUser(user:UserModel){
    var body=JSON.stringify(user);
    var headerOptions= new Headers({'Content-Type':'application/json'});
    var requestOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.baseURL+'/api/User/PosttblUser',body,requestOptions).map(x=> x.json());
    }

    async CheckIfUserNameIsAvailable(userName:string){
    
      // this.http.get(this.baseURL+'/api/User/IfUserNameAvailable?userName='+userName).map((data:Response) => {return data.json() as UserModel
      // }).toPromise().then( x=>{
      //     this.userModelExist=x;
      // });

      const response= await this.http.get(this.baseURL+'/api/User/IfUserNameAvailable?userName='+userName).toPromise();
      return response.json();
    }
}
