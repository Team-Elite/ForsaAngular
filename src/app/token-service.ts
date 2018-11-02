import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class TokenService  {

   // constructor(@Inject(LOCAL_STORAGE) public storage: StorageService) {  }

    public jwtdecrypt(token) {
        if (token == undefined || token == null) return;
        const helper = new JwtHelperService();
        return helper.decodeToken(token);
       
    }
}
