import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import{FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
//import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
