import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from './Shared/registration.service';
import {CustomValidationServiceService} from '../Shared/custom-validation-service.service';
import {Router} from '@angular/router'
//import {FormBuilder, FormGroup, Validators} from '@angular/forms'; 
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
  //imports:[FormGroup]
})
export class RegistrationComponent implements OnInit {

  constructor(public registrationService:RegistrationService,public customValidationServiceService:CustomValidationServiceService
    , public router: Router
//  ,public formBuilder:FormBuilder, public formGroup:FormGroup
) { }

//It checks if key pressed is integer or not if not then it returns false.
numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}

  ngOnInit() {
this.registrationService.getCountryList();
this.registrationService.getLanguageList();
this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form != null){
      form.reset();

      //var numberControl = new FormControl("", CustomValidators.number({min: 10000000000, max: 999999999999 }))
  //     this.formGroup = this.formBuilder.group({
  //       phone: ['',  [Validators.required, CustomValidationServiceService.checkLimit(10000000000,999999999999)]]
  //  });
    }
    this.registrationService.userModel={
      UserId :0,
     UserTypeId: 2,
     BankName :'',
     Address :'',
     ZipCode :'',
     City :'',
     CountryId :0,
     LanguageId :0,
     FirstName :'',
     LastName :'',
     UserName :'',
     Password :'',
     ContactNumber :'',
     EmailAddress :'',
     LongTermRatingAgency :'',
     LongTermRating :'',
     ShortTermRatingAgency :'',
     ShortTermRating :'',
     PromissaryNotesLenderOn : false,
     PromissaryNotesBorrower :false,
     MoneyMarket : false,
     DateCreated :new Date(),
     DateModified :new Date(),
     CreatedBy : 0
    }
  }

async registerUser(form:NgForm){
debugger;
form.value.DateCreated=new Date();
form.value.DateModified=new Date();
form.value.CreatedBy=-1;  
if(!this.ValidateUserForm(form)){
return false;
}

// Checking ifUserExist
let userExist= await this.registrationService.CheckIfUserNameIsAvailable(form.value.UserName);
debugger;
if(userExist == true){
  alert('User name not available.');
  this.registrationService.userModelExist=null;
  return;
}

// Checking if email already registered
let ifEmailIdAlreadyRegistered= await this.registrationService.CheckIfEmailIdIsRegistered(form.value.EmailAddress);
debugger;
if(ifEmailIdAlreadyRegistered == true){
  alert('This email id is already registered.');
  //this.registrationService.userModelExist=null;
  return;
}

// Registering user..
this.registrationService.RegisterUser(form.value).subscribe(data =>{
  this.resetForm(form);
  alert('Registration is successfull. An email is sent to registered email id. This email have your login credentails.');
  //location.reload();
  this.router.navigate(['/login']);
})
  }


ValidateUserForm(form:NgForm){

  if(form.value.UserTypeId ==0){
    alert('Please select is it Bank or Non-Bank.');
  return false;  
  }

  if(form.value.UserName != undefined && form.value.UserName !=  null && form.value.UserName.length !=0){
    if(form.value.UserName.indexOf(' ')>=0){
    alert('User name can not have space.');
  return false;
    }
  }

  if(form.value.ContactNumber != undefined && form.value.ContactNumber != null && form.value.ContactNumber.length!=0){
    try{
      if(isNaN(Number(form.value.ContactNumber.toString())) == true ){
        alert('Contact number must be numeric.');
        return false;  
      }
      else if(form.value.ContactNumber.indexOf('.')>=0 ){
        alert('Contact number must be numeric.');
        return false;  
      }
      else if(form.value.ContactNumber.length <10 ){
        alert('Contact number must be of length 10.');
        return false;  
      }
    }
    catch{
return false;
    }
  }
  if(form.value.EmailAddress == undefined || form.value.EmailAddress ==  null || form.value.EmailAddress.length ==0){
    alert('Email address is required.');
  return false;
  }

  let expression: RegExp ;
expression =new RegExp(/^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/)
if(form.value.EmailAddress!= undefined && form.value.EmailAddress !=  null && form.value.EmailAddress.length !=0){
if(!expression.test(form.value.EmailAddress)){
  alert('Email address is not valid.');
  return false;
}
}

if(form.value.EmailAddress!= undefined && form.value.EmailAddress !=  null && form.value.EmailAddress.length !=0){
  if(form.value.confirmEmailAddress == undefined || form.value.confirmEmailAddress ==  null || form.value.confirmEmailAddress.length ==0 ||form.value.confirmEmailAddress!=form.value.EmailAddress ){
    alert('Email address not matched.');
    return false;
  }
}
if(form.value.UserName == undefined || form.value.UserName ==  null || form.value.UserName.length ==0){
  alert('User name is required.');
    return false;
}

if(form.value.AcceptTermsAndConditions == false){
  alert('Terms and Conditions are not accepted.');
  return false;
}
return true;
  }
}


