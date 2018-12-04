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
import {GroupModel} from '../../Shared/group-model.class';
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
  headerOptions = new Headers({ 'Content-Type': 'application/json' });
  requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });

//   constructor(private http:Http,public authenticateServiceService:AuthenticateServiceService) { }

//   getCountryList(){
    
//     this.http.get(this.authenticateServiceService.baseURL+'/api/Country/GettblCountries').map((data:Response) => {return data.json() as Country[];
//   }).toPromise().then(x=>{
//   this.CountryList=x;
//   })
//   }

//   getDepositInsuranceList(){  
//     this.http.get(this.authenticateServiceService.baseURL+'/api/DepositInsurance/GetDepositInsurance').map((data:Response) => {return data.json() as DepositInsuranceModel[];
//   }).toPromise().then(x=>{
//   this.listDepositInsurance=x;
//   })
//   }

//   GetRatingAgeNturList(){  
//     this.http.get(this.authenticateServiceService.baseURL+'/api/RatingAgeNtur/GetRatingAgeNtur').map((data:Response) => {return data.json() as RatingAgeNturModel[];
//   }).toPromise().then(x=>{
//   this.listRatingAgeNturModel1=x;
//   })
//   }

//   GetRatingAgeNturList2(){  
//     this.http.get(this.authenticateServiceService.baseURL+'/api/RatingAgeNtur/GetRatingAgeNtur').map((data:Response) => {return data.json() as RatingAgeNturModel[];
//   }).toPromise().then(x=>{
//   this.listRatingAgeNturModel2=x;
//   })
//   }

//   GetSubGroupList(){  
//     this.http.get(this.authenticateServiceService.baseURL+'/api/SubGroup/GetSubGroup').map((data:Response) => {
//       console.log(data.json());
//       return data.json() as SubGroupModel[];
//   }).toPromise().then(x=>{
//     console.log({result: x});
//   this.listSubGroupModel=x;
//   })
//   }

//   GetSalutationList(){  
//     this.http.get(this.authenticateServiceService.baseURL+'/api/Salutation/GetSalutation').map((data:Response) => {return data.json() as SalutationModel[];
//   }).toPromise().then(x=>{
//   this.listSalutationModel=x;
//   })
//   }

//   GetGroupList(){  
//     this.http.get(this.authenticateServiceService.baseURL+'/api/Group/GetGroup').map((data:Response) => {return data.json() as GroupModel[];
//   }).toPromise().then(x=>{
//   this.listGroupModel=x;
//   })
//   }

//   getLanguageList(){
    
//     this.http.get(this.authenticateServiceService.baseURL+'/api/Language/GettblLanguages').map((data:Response) => {return data.json() as Language[];}).toPromise().then(
//       x=>{this.languageList=x;})
//   }

//   RegisterUser(user:UserModel){
//     var body=JSON.stringify(user);
//     var headerOptions= new Headers({'Content-Type':'application/json'});
//     var requestOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
//     return this.http.post(this.authenticateServiceService.baseURL+'/api/User/PosttblUser',body,requestOptions).map(x=> x.json());
//     }

//   UpdateUserDetails(user:UserModel){
//       var body=JSON.stringify(user);
//       var headerOptions= new Headers({'Content-Type':'application/json'});
//       var requestOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
//       return this.http.post(this.authenticateServiceService.baseURL+'/api/User/UpdateUserDetails',body,requestOptions).map(x=> x.json());
// }

//   async CheckIfUserNameIsAvailable(userName:string){
    
//       // this.http.get(this.baseURL+'/api/User/IfUserNameAvailable?userName='+userName).map((data:Response) => {return data.json() as UserModel
//       // }).toPromise().then( x=>{
//       //     this.userModelExist=x;
//       // });

//       const response= await this.http.get(this.authenticateServiceService.baseURL+'/api/User/IfUserNameAvailable?userName='+userName).toPromise();
//       return response.json();
//     }

//   async CheckIfEmailIdIsRegistered(emailId:string){
//      const response= await this.http.get(this.authenticateServiceService.baseURL+'/api/User/IfEmailIdIsRegistered?emailId='+emailId).toPromise();
//      return response.json();
//     }

//   async GetUserDetailByUserId(){
//       const response= await this.http.get(this.authenticateServiceService.baseURL+'/api/User/GetUserDetailByUserId?userId='+this.userId).toPromise();
//       return response.json();
//       }



constructor(private http: Http, public authenticateServiceService: AuthenticateServiceService) { }

RegisterUser(fileToUpload: File[],user :UserModel) {
     debugger;
     var webtoken = { data: this.tokenService.jwtencrypt(user) };
    const _formData = new FormData();
    _formData.append('file', fileToUpload[0], fileToUpload[0].name);   
    _formData.append('file2', fileToUpload[1], fileToUpload[1].name);   
    _formData.append('encrypted',JSON.stringify(webtoken) );
    // _formData.append('encrypted',webtoken.toString() );
    // return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashboard/UploadFiles?Id='+this.authenticateServiceService.GetUserId(), _formData);
    //return this.http.post(this.authenticateServiceService.baseURL + '/api/BankDashboard/UploadFiles', _formData).map(x => x.json());
    return this.http.post(this.authenticateServiceService.baseURL + '/api/User/RegisterUser', _formData).map(x => x.json());
  }

  UpdateUserDetails(fileToUpload: File[],user: UserModel) {
    //var webtoken = { data: this.tokenService.jwtencrypt(user) };
    // var body=JSON.stringify(user);

    var webtoken = { data: this.tokenService.jwtencrypt(user) };
    const _formData = new FormData();
    _formData.append('file', fileToUpload[0], fileToUpload[0].name);   
    _formData.append('file2', fileToUpload[1], fileToUpload[1].name);   
    _formData.append('encrypted',JSON.stringify(webtoken) );
    return  this.http.post(this.authenticateServiceService.baseURL + '/api/User/UpdateUserDetails', _formData).map(x => x.json());
}
    getCountryList() {

        this.http.get(this.authenticateServiceService.baseURL + '/api/Country/GettblCountries').map((data: Response) => {
            return data.json() as Country[];
        }).toPromise().then(x => {
            this.CountryList = x;
        })
    }

    getDepositInsuranceList() {
        this.http.get(this.authenticateServiceService.baseURL + '/api/DepositInsurance/GetDepositInsurance').map((data: Response) => {
            return data.json().data;
        }).toPromise().then(x => {
            this.listDepositInsurance = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name);
            // this.listDepositInsurance = x;
        })
    }

    GetRatingAgeNturList() {

        this.http.get(this.authenticateServiceService.baseURL + '/api/RatingAgeNtur/GetRatingAgeNtur').map((data: Response) => {
            return data.json().data;
        }).toPromise().then(x => {
            this.listRatingAgeNturModel1 = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name);
            // this.listRatingAgeNturModel1 = x;
        })
    }

    GetRatingAgeNturList2() {
        this.http.get(this.authenticateServiceService.baseURL + '/api/RatingAgeNtur/GetRatingAgeNtur').map((data: Response) => {
            return data.json().data;
        }).toPromise().then(x => {
            this.listRatingAgeNturModel2 = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name);
            // this.listRatingAgeNturModel2 = x;
        })
    }

    GetSubGroupList() {
        this.http.get(this.authenticateServiceService.baseURL + '/api/SubGroup/GetSubGroup').map((data: Response) => {
            return data.json().data ;
        }).toPromise().then(x => {
            this.listSubGroupModel = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name);
            // this.listSubGroupModel = x;
        })
    }

    GetSalutationList() {
        this.http.get(this.authenticateServiceService.baseURL + '/api/Salutation/GetSalutation').map((data: Response) => {
            return data.json().data;
        }).toPromise().then(x => {
            this.listSalutationModel = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name);
            // this.listSalutationModel = x;
        })
    }

    GetGroupList() {
        this.http.get(this.authenticateServiceService.baseURL + '/api/Group/GetGroup').map((data: Response) => {
            return data.json().data;
        }).toPromise().then(x => {
            this.listGroupModel = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name);
            // this.listGroupModel = x;
        })
    }

    getLanguageList() {

        this.http.get(this.authenticateServiceService.baseURL + '/api/Language/GettblLanguages').map((data: Response) => { return data.json().data;}).toPromise().then(
            x => {
                this.languageList = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name);
                // this.languageList = x;
            })
    }

    // RegisterUser(user: UserModel) {
    //     // var body=JSON.stringify(user);
    //     var webtoken = { data: this.tokenService.jwtencrypt(user) };

    //         return this.http.post(this.authenticateServiceService.baseURL + '/api/User/RegisterUser', webtoken, this.requestOptions).map(x => x.json());
    // }

    

    async CheckIfUserNameIsAvailable(userName: string) {

        // this.http.get(this.baseURL+'/api/User/IfUserNameAvailable?userName='+userName).map((data:Response) => {return data.json() as UserModel
        // }).toPromise().then( x=>{
        //     this.userModelExist=x;
        // });
        var webtoken = { data: this.tokenService.jwtencrypt({ userName: userName }) };

        return await this.http.post(this.authenticateServiceService.baseURL + '/api/User/IfUserNameAvailable', webtoken, this.requestOptions).toPromise().then(x=>x.json().data);


    }

    async CheckIfEmailIdIsRegistered(emailId: string) {
        var webtoken = { data: this.tokenService.jwtencrypt({ EmailAddress: emailId }) };
        return await this.http.post(this.authenticateServiceService.baseURL + '/api/User/IfEmailIdIsRegistered', webtoken, this.requestOptions).toPromise().then(x => x.json().data);

    }

    async GetUserDetailByUserId() {

        var webtoken = null;
        if (this.userId != undefined || this.userId == null) webtoken={ data: this.tokenService.jwtencrypt({ userId: this.userId }) };

        let token = await this.http.post(this.authenticateServiceService.baseURL + '/api/User/GetUserDetailByUserId', webtoken, this.requestOptions).toPromise();
        var response;
        if (token != undefined) {
            var IsSuccess =token.json().IsSuccess;
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
            response.IsSuccess=IsSuccess;
        }

        return response;
        // return response.json();
    }
}
