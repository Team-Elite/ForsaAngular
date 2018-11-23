var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BlockPasteDirective } from './Shared/block-paste.directive';
import { LoginComponent } from './Login/login/login.component';
//import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//import {ToastrModule} from 'ngx-toastr'; 
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { BankDashboardComponent } from './bank-dashboard/bank-dashboard.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { TestComponent } from './test/test.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from './registration/Shared/modal-basic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LenderDashboardComponent } from './lender-dashboard/lender-dashboard.component';
import { BestPriceViewComponent } from './lender-dashboard/best-price-view/best-price-view.component';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewAllPriceComponent } from './lender-dashboard/view-all-price/view-all-price.component';
import { AllBanksComponent } from './lender-dashboard/all-banks/all-banks.component';
import { KontactDashboardComponent } from './kontact-dashboard/kontact-dashboard.component';
import { KontactDashboardLComponent } from './lender-dashboard/kontact-dashboard-l/kontact-dashboard-l.component'; // <-- import the module
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ForsaLanguagesComponent } from './forsa-languages/forsa-languages.component';
export function HttpLoaderFactory(httpClient) {
    return new TranslateHttpLoader(httpClient);
    //return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json')
}
var appRoutes = [{ path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    //  {path:'registration/:uId',component:RegistrationComponent},
    { path: 'registration/:uId/:uRole', component: RegistrationComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'bankDashBoard', component: BankDashboardComponent },
    { path: 'KontactDashBoard', component: KontactDashboardComponent },
    { path: 'test', component: TestComponent },
    {
        path: 'lenderDashboard', component: LenderDashboardComponent,
        children: [{ path: "BestPriceView", component: BestPriceViewComponent },
            { path: "ViewAllPrice", component: ViewAllPriceComponent },
            { path: 'AllBanks', component: AllBanksComponent },
            { path: 'AllBanksK', component: KontactDashboardLComponent }
        ]
    }
    //  {path:'BestPriceView', component:BestPriceViewComponent}
    // {path:'',redirectTo:'bankDashBoard', pathMatch:'full'},
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                RegistrationComponent,
                BlockPasteDirective,
                LoginComponent,
                BankDashboardComponent,
                TestComponent,
                NgbdModalBasic,
                LenderDashboardComponent,
                BestPriceViewComponent,
                ViewAllPriceComponent,
                AllBanksComponent,
                KontactDashboardComponent,
                KontactDashboardLComponent,
                ForsaLanguagesComponent
            ],
            imports: [
                BrowserModule,
                HttpModule,
                FormsModule,
                RouterModule.forRoot(appRoutes, { useHash: true }),
                RecaptchaModule.forRoot(),
                StorageServiceModule,
                ToastrModule.forRoot(),
                NgbModule,
                BrowserAnimationsModule,
                NgxSpinnerModule,
                NgxPaginationModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                }),
                HttpClientModule,
            ],
            providers: [
                NgbdModalBasic,
                DatePipe
                //{
                //    provide: LocationStrategy, useClass: PathLocationStrategy
                //}
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map