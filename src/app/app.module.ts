import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import{FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BlockPasteDirective } from './Shared/block-paste.directive';
//import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    BlockPasteDirective
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
