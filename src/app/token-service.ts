import { Injectable, Inject } from '@angular/core';
//import { HttpInterceptor } from '@angular/common/http';
import { AuthenticateServiceService } from './Shared/authenticate-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service'
@Injectable({
  providedIn: 'root'
})
export class TokenService  {

    constructor(@Inject(LOCAL_STORAGE) public storage: StorageService) {  }

    public jwtdecrypt(token) {

        const helper = new JwtHelperService();
        return helper.decodeToken(token);
       
    }
}
