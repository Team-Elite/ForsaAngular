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


  IfVerificationDone:boolean=true;
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
      ForgotPasswordEmailId:''
    }
  }

  async ValidateUser(form : NgForm){
    debugger;

    if(form !=null){
      if(form.value.UserName == undefined || form.value.UserName == null || form.value.UserName.trim().length == 0){
        //alert("User name is required.");
        //this.toastr.success("Saved successfully.","Employee");
        this.toastr.error("User name is required.");
        return false;
      }

      if(form.value.UserPassword == undefined || form.value.UserPassword == null || form.value.UserPassword.trim().length == 0){
        alert("Password is required.");
        return false;
      }
      
    }
    let user= await this.loginService.ValidateUser(form.value);
    if(user.IsSuccess == true){
      debugger;
      this.authenticateServiceService.SaveSession(user.data);
      if(user.data.UserTypeId==4){
      this.router.navigate(['/bankDashBoard']);
    }
    }
    else{
      alert('User Name/ Password /Email Id is incorrect.');
    }
  }

  async ForgotPassword(form:NgForm){
    debugger;
    if(form.value.ForgotPasswordEmailId == undefined || form.value.ForgotPasswordEmailId == null || form.value.ForgotPasswordEmailId.trim().length == 0){
      alert("Email id is required.");
      return false;
    }

    let expression: RegExp ;
    expression =new RegExp(/^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/)
    if(form.value.ForgotPasswordEmailId!= undefined && form.value.ForgotPasswordEmailId !=  null && form.value.ForgotPasswordEmailId.length !=0){
    if(!expression.test(form.value.ForgotPasswordEmailId)){
      alert('Email address is not valid.');
      return false;
    }
    }
    let forgotEmail =await this.loginService.ForgotPassword(form.value);
    if(forgotEmail.IsSuccess == true){
      alert('Password sent.');
    }
    else{
      alert('Email id is wrong.');
    }
  }

}
