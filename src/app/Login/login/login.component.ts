import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import { NgForm } from '@angular/forms';
import {AuthenticateServiceService} from '../../Shared/authenticate-service.service';
import {Router} from '@angular/router';
import { ToastrService  } from 'ngx-toastr';
import { UserModel } from '../../registration/Shared/user-model.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public loginService:LoginService, public authenticateServiceService:AuthenticateServiceService
    , public router: Router,public  toastr: ToastrService) { }


  IfVerificationDone:boolean=false;
  public resolved(captchaResponse: string) {
    if(captchaResponse != undefined && captchaResponse != null && captchaResponse.trim().length !=0){
      this.IfVerificationDone=true;
    }
    else{
      this.IfVerificationDone=false;
    }
  }

  ngOnInit() {
    this.loginService.loginModel={
      UserName:'',
      UserPassword:'',
      ForgotPasswordEmailId:'',
      //UserEmailId:''
    }
  }

  async ValidateUser(form : NgForm){
    debugger;

      if(form !=null){
      if(form.value.UserName == undefined || form.value.UserName == null || form.value.UserName.trim().length == 0){
        this.toastr.error("User name / Email id is required.","Login");
        return false;
      }
if(form.value.UserName.indexOf('@')>-1){
  let expression: RegExp ;
  expression =new RegExp(/^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/)
  if(form.value.UserName!= undefined && form.value.UserName !=  null && form.value.UserName.length !=0){
  if(!expression.test(form.value.UserName)){ 
    this.toastr.error("Email address is not valid.","Login");
    return false;
  }
}
}
    

      if(form.value.UserPassword == undefined || form.value.UserPassword == null || form.value.UserPassword.trim().length == 0){
        this.toastr.error("Password is required.","Login");
        return false;
      }
      
    if(!this.IfVerificationDone){
      this.toastr.error("Please verify captcha.","Login");
      return false;
    }
    let user= await this.loginService.ValidateUser(form.value);
    if(user.IsSuccess == true){
      debugger;
      this.authenticateServiceService.SaveSession(user.data);
      if(JSON.parse(user.data)[0].UserTypeId==5){
      this.router.navigate(['/bankDashBoard']);
    }
    }
    else{
      this.toastr.error("User Name / Email Id or Password is incorrect.","Login");
    }
  }
}

  async ForgotPassword(form:NgForm){
    debugger;
    if(form.value.ForgotPasswordEmailId == undefined || form.value.ForgotPasswordEmailId == null || form.value.ForgotPasswordEmailId.trim().length == 0){
      this.toastr.error("Email id is required.","Login");
      return false;
    }

    let expression: RegExp ;
    expression =new RegExp(/^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/)
    if(form.value.ForgotPasswordEmailId!= undefined && form.value.ForgotPasswordEmailId !=  null && form.value.ForgotPasswordEmailId.length !=0){
    if(!expression.test(form.value.ForgotPasswordEmailId)){
      this.toastr.error("Email address is not valid.","Login");
      return false;
    }
    }
    let forgotEmail =await this.loginService.ForgotPassword(form.value);
    if(forgotEmail.IsSuccess == true){
      this.toastr.success("Password sent.","Login - Forgot Password");
    }
    else{
      this.toastr.error("Email id is wrong.","Login - Forgot Password");
    }
  }

}
