import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService  {
    Secret = "db3OIsj+BXE9NZDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw=="
   // constructor(@Inject(LOCAL_STORAGE) public storage: StorageService) {  }
    jwt = require('jwt-simple');
    public jwtdecrypt(token) {
        if (token == undefined || token == null) return;
       // const helper = new JwtHelperService();
        var result = this.jwt.decode(token, this.Secret);   //helper.decodeToken(token);
        return result;
    }

    public jwtencrypt(token) {
        if (token == undefined || token == null) return;
        // const helper = new JwtHelperService();
        var result = this.jwt.encode(token, this.Secret);   //helper.decodeToken(token);
        return result;
    }
}
