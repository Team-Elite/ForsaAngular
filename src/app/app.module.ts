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
import { RecaptchaModule } from 'ng-recaptcha';
import { BankDashboardComponent } from './bank-dashboard/bank-dashboard.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { TestComponent } from './test/test.component';
import {} from './test/test.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from './registration/Shared/modal-basic';
import { NgbModalBackdrop } from '../../node_modules/@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';


const appRoutes: Routes=[{path:'login',component:LoginComponent},
                         {path:'registration',component:RegistrationComponent},
                         {path:'',redirectTo:'login', pathMatch:'full'},
                         {path:'bankDashBoard',component:BankDashboardComponent},
                         {path:'test',component:TestComponent},
                        // {path:'',redirectTo:'bankDashBoard', pathMatch:'full'},
                        ];
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    BlockPasteDirective,
    LoginComponent,
    BankDashboardComponent,
    TestComponent,
    NgbdModalBasic,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{ useHash: true }),
    RecaptchaModule.forRoot(),
    StorageServiceModule ,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [
    NgbdModalBasic,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
