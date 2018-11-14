import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AuthenticateServiceService } from '../../Shared/authenticate-service.service';
import { Language } from './language.model';
import { Country } from './country.model';
// import {UserModel} from './UserModel.model';
import { UserModel } from './user-model.model';
import { DepositInsuranceModel } from '../../Shared/deposit-insurance-model.class';
import { RatingAgeNturModel } from '../../Shared/rating-age-ntur-model.class';
import { SubGroupModel } from '../../Shared/sub-group-model.class';
import { SalutationModel } from '../../Shared/salutation-model.class';
import { GroupModel } from '../../Shared/group-model.class';
import { TokenService } from '../../token-service';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    tokenService: TokenService = new TokenService;
    userId: number;
    CountryList: Country[];
    languageList: Language[];
    userModel: UserModel;
    confirmEmailAddress: string = '';
    AcceptTermsAndConditions: boolean = false;
    ShowSection2: boolean = false;
    ShowSection3: boolean = false;
    userModelExist: UserModel;
    listDepositInsurance: DepositInsuranceModel[];
    listRatingAgeNturModel1: RatingAgeNturModel[];
    listRatingAgeNturModel2: RatingAgeNturModel[];
    listSubGroupModel: SubGroupModel[];
    listSalutationModel: SalutationModel[];
    listGroupModel: GroupModel[];
    headerOptions = new Headers({ 'Content-Type': 'application/json' });
    requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });
    constructor(private http: Http, public authenticateServiceService: AuthenticateServiceService) { }

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
        })
    }

    GetRatingAgeNturList() {

        this.http.get(this.authenticateServiceService.baseURL + '/api/RatingAgeNtur/GetRatingAgeNtur').map((data: Response) => {
            return data.json().data;
        }).toPromise().then(x => {
            this.listRatingAgeNturModel1 = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name);
        })
    }

    GetRatingAgeNturList2() {
        this.http.get(this.authenticateServiceService.baseURL + '/api/RatingAgeNtur/GetRatingAgeNtur').map((data: Response) => {
            return data.json().data;
        }).toPromise().then(x => {
            this.listRatingAgeNturModel2 = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name);
        })
    }

    GetSubGroupList() {
        this.http.get(this.authenticateServiceService.baseURL + '/api/SubGroup/GetSubGroup').map((data: Response) => {
            return data.json().data ;
        }).toPromise().then(x => {
            this.listSubGroupModel = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name);
        })
    }

    GetSalutationList() {
        this.http.get(this.authenticateServiceService.baseURL + '/api/Salutation/GetSalutation').map((data: Response) => {
            return data.json().data;
        }).toPromise().then(x => {
            this.listSalutationModel = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name);
        })
    }

    GetGroupList() {
        this.http.get(this.authenticateServiceService.baseURL + '/api/Group/GetGroup').map((data: Response) => {
            return data.json().data;
        }).toPromise().then(x => {
            this.listGroupModel = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name);
        })
    }

    getLanguageList() {

        this.http.get(this.authenticateServiceService.baseURL + '/api/Language/GettblLanguages').map((data: Response) => { return data.json().data;}).toPromise().then(
            x => { this.languageList = JSON.parse(this.tokenService.jwtdecrypt(x).unique_name); })
    }

    RegisterUser(user: UserModel) {
        // var body=JSON.stringify(user);
        var webtoken = { data: this.tokenService.jwtencrypt(user) };

        return this.http.post(this.authenticateServiceService.baseURL + '/api/User/RegisterUser', webtoken, this.requestOptions).map(x => x.json());
    }

    UpdateUserDetails(user: UserModel) {
        var webtoken = { data: this.tokenService.jwtencrypt(user) };
        // var body=JSON.stringify(user);
       
        return  this.http.put(this.authenticateServiceService.baseURL + '/api/User/UpdateUserDetails', webtoken, this.requestOptions).map(x => x.json());
    }

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
            token = token.json().data;
            response = JSON.parse(this.tokenService.jwtdecrypt(token).unique_name);
        }

        return response;
        //return response.json();
    }
}
