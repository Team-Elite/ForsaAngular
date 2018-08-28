import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {HttpModule} from '@angular/http';
import{FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BlockPasteDirective } from './Shared/block-paste.directive';
import { LoginComponent } from './Login/login/login.component';
//import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//import {ToastrModule} from 'ngx-toastr';
import {RouterModule,Routes} from '@angular/router';

const appRoutes: Routes=[{path:'login',component:LoginComponent},
                         {path:'registration',component:RegistrationComponent},
                         {path:'',redirectTo:'login', pathMatch:'full'}
                        ];
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    BlockPasteDirective,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{ useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
