import { Injectable } from '@angular/core';
import{Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AuthenticateServiceService} from '../../Shared/authenticate-service.service';
import { Language } from './language.model';
import { Country } from './country.model';
// import {UserModel} from './UserModel.model';
import {UserModel} from './user-model.model';
import {DepositInsuranceModel} from '../../Shared/deposit-insurance-model.class';
import {RatingAgeNturModel} from '../../Shared/rating-age-ntur-model.class';
import {SubGroupModel} from '../../Shared/sub-group-model.class';
import {SalutationModel} from '../../Shared/salutation-model.class';
import { GroupModel } from '../../Shared/group-model.class';
import { TokenService } from '../../token-service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
    tokenService: TokenService = new TokenService;
  userId:number;
  CountryList:Country[];
  languageList:Language[];
  userModel:UserModel;
  confirmEmailAddress:string='';
  AcceptTermsAndConditions:boolean=false;
  ShowSection2 : boolean =false;
  ShowSection3 : boolean =false;
  userModelExist:UserModel;
  listDepositInsurance:DepositInsuranceModel[];
  listRatingAgeNturModel1:RatingAgeNturModel[];
  listRatingAgeNturModel2:RatingAgeNturModel[];
  listSubGroupModel:SubGroupModel[];
  listSalutationModel:SalutationModel[];
  listGroupModel:GroupModel[];

  constructor(private http:Http,public authenticateServiceService:AuthenticateServiceService) { }

  getCountryList(){
    
    this.http.get(this.authenticateServiceService.baseURL+'/api/Country/GettblCountries').map((data:Response) => {return data.json() as Country[];
  }).toPromise().then(x=>{
  this.CountryList=x;
  })
  }

  getDepositInsuranceList(){  
    this.http.get(this.authenticateServiceService.baseURL+'/api/DepositInsurance/GetDepositInsurance').map((data:Response) => {return data.json() as DepositInsuranceModel[];
  }).toPromise().then(x=>{
  this.listDepositInsurance=x;
  })
  }

  GetRatingAgeNturList(){  
    this.http.get(this.authenticateServiceService.baseURL+'/api/RatingAgeNtur/GetRatingAgeNtur').map((data:Response) => {return data.json() as RatingAgeNturModel[];
  }).toPromise().then(x=>{
  this.listRatingAgeNturModel1=x;
  })
  }

  GetRatingAgeNturList2(){  
    this.http.get(this.authenticateServiceService.baseURL+'/api/RatingAgeNtur/GetRatingAgeNtur').map((data:Response) => {return data.json() as RatingAgeNturModel[];
  }).toPromise().then(x=>{
  this.listRatingAgeNturModel2=x;
  })
  }

  GetSubGroupList(){  
    this.http.get(this.authenticateServiceService.baseURL+'/api/SubGroup/GetSubGroup').map((data:Response) => {return data.json() as SubGroupModel[];
  }).toPromise().then(x=>{
  this.listSubGroupModel=x;
  })
  }

  GetSalutationList(){  
    this.http.get(this.authenticateServiceService.baseURL+'/api/Salutation/GetSalutation').map((data:Response) => {return data.json() as SalutationModel[];
  }).toPromise().then(x=>{
  this.listSalutationModel=x;
  })
  }

  GetGroupList(){  
    this.http.get(this.authenticateServiceService.baseURL+'/api/Group/GetGroup').map((data:Response) => {return data.json() as GroupModel[];
  }).toPromise().then(x=>{
  this.listGroupModel=x;
  })
  }

  getLanguageList(){
    
    this.http.get(this.authenticateServiceService.baseURL+'/api/Language/GettblLanguages').map((data:Response) => {return data.json() as Language[];}).toPromise().then(
      x=>{this.languageList=x;})
  }

  RegisterUser(user:UserModel){
    var body=JSON.stringify(user);
    var headerOptions= new Headers({'Content-Type':'application/json'});
    var requestOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.authenticateServiceService.baseURL+'/api/User/PosttblUser',body,requestOptions).map(x=> x.json());
    }

  UpdateUserDetails(user:UserModel){
      var body=JSON.stringify(user);
      var headerOptions= new Headers({'Content-Type':'application/json'});
      var requestOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
      return this.http.post(this.authenticateServiceService.baseURL+'/api/User/UpdateUserDetails',body,requestOptions).map(x=> x.json());
}

  async CheckIfUserNameIsAvailable(userName:string){
    
      // this.http.get(this.baseURL+'/api/User/IfUserNameAvailable?userName='+userName).map((data:Response) => {return data.json() as UserModel
      // }).toPromise().then( x=>{
      //     this.userModelExist=x;
      // });

      let token = await this.http.get(this.authenticateServiceService.baseURL + '/api/User/IfUserNameAvailable?userName=' + userName).toPromise();
      var response;
      if (token != undefined) {
          token = token.json().data;
          response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
      }

      return response;
     // return response.json();
    }

  async CheckIfEmailIdIsRegistered(emailId:string){
      let token= await this.http.get(this.authenticateServiceService.baseURL+'/api/User/IfEmailIdIsRegistered?emailId='+emailId).toPromise();
      var response;
      if (token != undefined) {
          token = token.json().data;
          response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
      }

      return response;
      //return response.json();
    }

  async GetUserDetailByUserId(){
      let token= await this.http.get(this.authenticateServiceService.baseURL+'/api/User/GetUserDetailByUserId?userId='+this.userId).toPromise();
      var response;
      if (token != undefined) {
          token = token.json().data;
          response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
      }

      return response;
      //return response.json();
      }
}
