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

IfVerificationDone:boolean=false;
  public resolved(captchaResponse: string) {
    if(captchaResponse != undefined && captchaResponse != null && captchaResponse.trim().length !=0){
      this.IfVerificationDone=true;
    }
    else{
      this.IfVerificationDone=false;
    }
  }

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
this.registrationService.getDepositInsuranceList();
this.registrationService.GetRatingAgeNturList();
this.registrationService.GetRatingAgeNturList2();
this.registrationService.GetSubGroupList();
this.registrationService.GetSalutationList();
this.registrationService.GetGroupList();

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
     NameOfCompany:'',
     Street: '',
     PostalCode: '',
     Place: '',
     AccountHolder: '',
     Bank: '',
     IBAN: '',
     BICCode: '',
     GroupIds: '',
     SubGroupId: '',
     LEINumber: '',
     FurtherField4: '',
     Salutation: 0 ,
     Title: '',
     FirstName: '',
     SurName: '',
     ContactNumber: '',
     EmailAddress: '',
     UserName: '',
     Password: '',
     FurtherField1: '',
     FurtherField2: '',
     LEINumber2: '',
     UserTypeId: '0' ,
     RatingAgentur1: '',
     RatingAgenturValue1: '',
     RatingAgentur2: '',
     RatingAgenturValue2: '',
     DepositInsurance: 0,
     ClientGroupId: 0,
     AgreeToThePrivacyPolicy: false,
     GroupCommunities:false,  
     GroupCompanyGMBH:false,
     GroupCompany:false,
     AgreeToTheRatingsMayPublish: false,
     AgreeThatInformationOfCompanyMayBePublished: false,
     AcceptAGBS: false,
     DateCreated: new Date(),
     DateModified: new Date(),
     ModifiedBy: -1,
     rdbBank:false,
     rdbNonBank:false,
     NewPassword:'',
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

if(form.value.rdbBank){
  form.value.GroupIds='';
  if(form.value.GroupCommunities)
  form.value.GroupIds="1,";
  if(form.value.GroupCompanyGMBH)
  form.value.GroupIds=form.value.GroupIds+"2,";
  if(form.value.GroupCompany)
  form.value.GroupIds=form.value.GroupIds+"3,";
  form.value.GroupIds =form.value.GroupIds.substring(0,form.value.GroupIds.length-1);  
}
else{
  form.value.GroupIds="";
}


form.value.UserTypeId='';
if(form.value.rdbBank)
form.value.UserTypeId='2,';
if(form.value.rdbNonBank)
form.value.UserTypeId=form.value.UserTypeId+'3,';
form.value.UserTypeId= form.value.UserTypeId.substring(0,form.value.UserTypeId.length-1);

// Registering user..
this.registrationService.RegisterUser(form.value).subscribe(data =>{
  this.resetForm(form);
  alert('Registration is successfull. An email is sent to registered email id. This email have your login credentails.');
  //location.reload();
  this.router.navigate(['/login']);
})
  }


ValidateUserForm(form:NgForm){
let IfErrorFound:boolean=false;
let numberOfErrorFound:number=0;
let errorMessage : string='Fields marked with * are required. Please fill';

if(form.value.NameOfCompany == undefined || form.value.NameOfCompany ==  null || form.value.NameOfCompany.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Name of company,";
}
if(form.value.Street == undefined || form.value.Street ==  null || form.value.Street.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Street,";
}
if(form.value.PostalCode == undefined || form.value.PostalCode ==  null || form.value.PostalCode.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Postal Code,";
}
if(form.value.Place == undefined || form.value.Place ==  null || form.value.Place.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Place,";
}
if(form.value.AccountHolder == undefined || form.value.AccountHolder ==  null || form.value.AccountHolder.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Account Holder,";
}

if(form.value.Bank == undefined || form.value.Bank ==  null || form.value.Bank.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Bank,";
}
if(form.value.IBAN == undefined || form.value.IBAN ==  null || form.value.IBAN.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" IBAN,";
}
if(form.value.BICCode == undefined || form.value.BICCode ==  null || form.value.BICCode.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" BICCode,";
}
if(form.value.ClientGroupId == undefined || form.value.ClientGroupId ==  null || form.value.ClientGroupId ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Client group,";
}
if(form.value.SubGroupId == undefined || form.value.SubGroupId ==  null || form.value.SubGroupId =="0"){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Sub group,";
}
if(form.value.Salutation == undefined || form.value.Salutation ==  null || form.value.Salutation ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Salutation,";
}
if(form.value.FirstName == undefined || form.value.FirstName ==  null || form.value.FirstName.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" First Name,";
}
if(form.value.SurName == undefined || form.value.SurName ==  null || form.value.SurName.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Sur Name,";
}
if(form.value.ContactNumber == undefined || form.value.ContactNumber ==  null || form.value.ContactNumber.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Contact Number,";
}
if(form.value.EmailAddress == undefined || form.value.EmailAddress ==  null || form.value.EmailAddress.trim().length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Mail Address,";
}
if(form.value.UserName == undefined || form.value.UserName ==  null || form.value.UserName.trim().length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" User Name,";
}
if(form.value.UserTypeId ==2 && (form.value.DepositInsurance == undefined || form.value.DepositInsurance ==  null || form.value.DepositInsurance ==0)){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Deposit Insurance,";
}

if(form.value.rdbBank){
if(form.value.GroupCommunities == false){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Communities checkbox,";
}
if(form.value.GroupCompanyGMBH == false){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Company Gmbh checkbox,";
}

if(form.value.GroupCompany == false){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Company (AöR, KdöR) checkbox,";
}

if(form.value.AgreeToThePrivacyPolicy == false){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Agree to the privacy policy checkbox,";
}

if(form.value.AgreeToTheRatingsMayPublish == false){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" I agree that ratings may be published on our company checkbox,";
}

if(form.value.AgreeThatInformationOfCompanyMayBePublished == false){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" that information about our company may be published on the platform checkbox,";
}

}

if(IfErrorFound){
  errorMessage=errorMessage.substring(0,errorMessage.length-1);
  alert(errorMessage);
  return false;
}

  if(form.value.rdbBank ==false && form.value.rdbNonBank == false){
    alert('Please select is it Borrower or Lender.');
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

// if(form.value.EmailAddress!= undefined && form.value.EmailAddress !=  null && form.value.EmailAddress.length !=0){
//   if(form.value.confirmEmailAddress == undefined || form.value.confirmEmailAddress ==  null || form.value.confirmEmailAddress.length ==0 ||form.value.confirmEmailAddress!=form.value.EmailAddress ){
//     alert('Email address not matched.');
//     return false;
//   }
// }


if(form.value.AcceptAGBS == false){
  alert('Please accept AGBs.');
  return false;
}
return true;
  }

Section2Visible(form:NgForm){
let IfErrorFound:boolean=false;
let numberOfErrorFound:number=0;
let errorMessage : string='Fields marked with * are required. Please fill';

if(form.value.NameOfCompany == undefined || form.value.NameOfCompany ==  null || form.value.NameOfCompany.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Name of company,";
}
if(form.value.Street == undefined || form.value.Street ==  null || form.value.Street.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Street,";
}
if(form.value.PostalCode == undefined || form.value.PostalCode ==  null || form.value.PostalCode.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Postal Code,";
}
if(form.value.Place == undefined || form.value.Place ==  null || form.value.Place.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Place,";
}
if(form.value.AccountHolder == undefined || form.value.AccountHolder ==  null || form.value.AccountHolder.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Account Holder,";
}

if(form.value.Bank == undefined || form.value.Bank ==  null || form.value.Bank.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Bank,";
}
if(form.value.IBAN == undefined || form.value.IBAN ==  null || form.value.IBAN.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" IBAN,";
}
if(form.value.BICCode == undefined || form.value.BICCode ==  null || form.value.BICCode.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" BICCode,";
}
if(form.value.ClientGroupId == undefined || form.value.ClientGroupId ==  null || form.value.ClientGroupId ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Client group,";
}
if(form.value.SubGroupId == undefined || form.value.SubGroupId ==  null || form.value.SubGroupId ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Sub group,";
}
if(!IfErrorFound)
this.registrationService.ShowSection2=true;
else{
this.registrationService.ShowSection2=false;
errorMessage=errorMessage.substring(0,errorMessage.length-1);
alert(errorMessage);
}
  }

Section3Visible(form:NgForm){
  let IfErrorFound:boolean=false;
let numberOfErrorFound:number=0;
let errorMessage : string='Fields marked with * are required. Please fill';
if(form.value.Salutation == undefined || form.value.Salutation ==  null || form.value.Salutation ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Salutation,";
}
if(form.value.FirstName == undefined || form.value.FirstName ==  null || form.value.FirstName.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" First Name,";
}
if(form.value.SurName == undefined || form.value.SurName ==  null || form.value.SurName.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Sur Name,";
}
if(form.value.ContactNumber == undefined || form.value.ContactNumber ==  null || form.value.ContactNumber.length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Contact Number,";
}
if(form.value.EmailAddress == undefined || form.value.EmailAddress ==  null || form.value.EmailAddress.trim().length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Mail Address,";
}
if(form.value.UserName == undefined || form.value.UserName ==  null || form.value.UserName.trim().length ==0){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" User Name,";
}
if(form.value.UserTypeId ==2 && (form.value.DepositInsurance == undefined || form.value.DepositInsurance ==  null || form.value.DepositInsurance ==0)){
  IfErrorFound=true;
  numberOfErrorFound++;
  errorMessage=errorMessage+" Deposit Insurance,";
}
if(!IfErrorFound)
this.registrationService.ShowSection3=true;
else{
this.registrationService.ShowSection3=false;
errorMessage=errorMessage.substring(0,errorMessage.length-1);
alert(errorMessage);
}
}
}


