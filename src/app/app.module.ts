import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import{FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BlockPasteDirective } from './Shared/block-paste.directive';
import { LoginComponent } from './Login/login/login.component';
//import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';


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
    RouterModule.forRoot([{path:"", component:LoginComponent},
    {path:"app-registration", component:RegistrationComponent}
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
