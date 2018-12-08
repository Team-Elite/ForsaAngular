import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { NgForm } from '@angular/forms';
import { AuthenticateServiceService } from '../../Shared/authenticate-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LenderDashboardService } from '../../lender-dashboard/Shared/lender-dashboard.service';
import { TokenService } from '../../token-service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    tokenService: TokenService = new TokenService;
    constructor(public loginService: LoginService, public authenticateServiceService: AuthenticateServiceService
        , public router: Router, public toastr: ToastrService
        , public spinner: NgxSpinnerService
        , public lenderDashboardService: LenderDashboardService

    ) { }


    IfVerificationDone: boolean = false;
    IfShowPassword: boolean = false;
    public resolved(captchaResponse: string) {
        if (captchaResponse != undefined && captchaResponse != null && captchaResponse.trim().length != 0) {
            this.IfVerificationDone = true;
        }
        else {
            this.IfVerificationDone = false;
        }
    }

    ngOnInit() {
        this.authenticateServiceService.ClearSession();
        this.loginService.loginModel = {
            UserName: '',
            UserPassword: '',
            ForgotPasswordEmailId: '',
            LoginTime: undefined
            //UserEmailId:''
        }
    }

    async ValidateUser(form: NgForm) {
        if (form != null) {
            if (form.value.UserName == undefined || form.value.UserName == null || form.value.UserName.trim().length == 0) {
                this.toastr.error("User name / Email id is required.", "Login");
                return false;
            }
            if (form.value.UserName.indexOf('@') > -1) {
                let expression: RegExp;
                expression = new RegExp(/^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/)
                if (form.value.UserName != undefined && form.value.UserName != null && form.value.UserName.length != 0) {
                    if (!expression.test(form.value.UserName)) {
                        this.toastr.error("Email address is not valid.", "Login");
                        return false;
                    }
                }
            }


            if (form.value.UserPassword == undefined || form.value.UserPassword == null || form.value.UserPassword.trim().length == 0) {
                this.toastr.error("Password is required.", "Login");
                return false;
            }

            if (!this.IfVerificationDone) {
                this.toastr.error("Please verify captcha.", "Login");
                return false;
            }
            this.spinner.show();
            let user = await this.loginService.ValidateUser(form.value);
            if (user.IsSuccess == true) {

                this.authenticateServiceService.SaveSession(user.data);
                //let token = this.authenticateServiceService.storage.get(this.authenticateServiceService.userValue);
                var data = this.tokenService.jwtdecrypt(user.data);

                user = JSON.parse(data.unique_name)[0];
                var IfBothUserTypeFound = user.UserTypeId.split(',').length > 1 ? true : false;
                if (IfBothUserTypeFound) {
                    this.authenticateServiceService.SaveIfBothUserTypeFound(IfBothUserTypeFound);
                }

                // else if(user.UserTypeId==6){
                //   this.router.navigate(['/KontactDashBoard']);
                // }

                if (user.UserTypeId === "5" || user.UserTypeId === "6") {

                    this.lenderDashboardService.userId = user.UserId; //this.authenticateServiceService.GetUserId();
                    let startPage = await this.lenderDashboardService.GetLenderStartPage();
                    if (startPage == undefined) { this.lenderDashboardService.StartingScreen = "All Banks"; }
                    else {
                        this.lenderDashboardService.StartingScreen = startPage.PageName;
                    }
                    if (this.lenderDashboardService.StartingScreen == "Best Price View") {
                        this.router.navigate(['lenderDashboard/BestPriceView']);
                    }
                    else if (this.lenderDashboardService.StartingScreen == "View All Price") {
                        this.router.navigate(['lenderDashboard/ViewAllPrice']);
                    }
                    else if (this.lenderDashboardService.StartingScreen == "All Banks") {
                        this.router.navigate(['lenderDashboard/AllBanks']);
                    }


                }
                else {
                    // if (user.UserTypeId == 4 || IfBothUserTypeFound) {
                    this.router.navigate(['/bankDashBoard']);
                    // }
                }
                this.spinner.hide();
            }
            else {
                this.spinner.hide();
                this.toastr.error("Invalid Login Credentials or User is not active.Contact Administrator.", "Login");
            }
        }
    }

    async ForgotPassword(form: NgForm) {

        if (form.value.ForgotPasswordEmailId == undefined || form.value.ForgotPasswordEmailId == null || form.value.ForgotPasswordEmailId.trim().length == 0) {
            this.toastr.error("Email id is required.", "Login");
            return false;
        }

        let expression: RegExp;
        expression = new RegExp(/^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/)
        if (form.value.ForgotPasswordEmailId != undefined && form.value.ForgotPasswordEmailId != null && form.value.ForgotPasswordEmailId.length != 0) {
            if (!expression.test(form.value.ForgotPasswordEmailId)) {
                this.toastr.error("Email address is not valid.", "Login");
                return false;
            }
        }
        this.spinner.show();
        let forgotEmail = await this.loginService.ForgotPassword(form.value);
        if (forgotEmail.IsSuccess == true) {
            this.toastr.success("Password sent.", "Login - Forgot Password");
        }
        else {

            this.toastr.error("Email id is wrong.", "Login - Forgot Password");
        } this.spinner.hide();
    }

    keydown(event) {
        this.IfShowPassword = true;
    }

    keyup(event) {
        this.IfShowPassword = false;
    }

}
