import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from './Shared/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public registrationService:RegistrationService) { }

  ngOnInit() {
this.registrationService.getCountryList();
this.registrationService.getLanguageList();
this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form != null){
      form.reset();
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

// Registering user..
this.registrationService.RegisterUser(form.value).subscribe(data =>{
  this.resetForm(form);
  alert('saved successfully');
})
  }

ValidateUserForm(form:NgForm){

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
