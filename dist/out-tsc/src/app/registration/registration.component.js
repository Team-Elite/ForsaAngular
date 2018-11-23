var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { RegistrationService } from './Shared/registration.service';
import { CustomValidationServiceService } from '../Shared/custom-validation-service.service';
import { Router, ActivatedRoute } from '@angular/router';
//import {NgbModal, ModalDismissReasons, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap'
//import { $$ } from '../../../node_modules/protractor';
//import { NgbdModalBasic } from './Shared/modal-basic';
import { ToastrService } from 'ngx-toastr';
//import {FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import { NgxSpinnerService } from 'ngx-spinner';
var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(registrationService, customValidationServiceService, router, toastr, spinner, activatedRoute
    //  ,public formBuilder:FormBuilder, public formGroup:FormGroup
    ) {
        this.registrationService = registrationService;
        this.customValidationServiceService = customValidationServiceService;
        this.router = router;
        this.toastr = toastr;
        this.spinner = spinner;
        this.activatedRoute = activatedRoute;
        this.IfVerificationDone = false;
    }
    RegistrationComponent.prototype.resolved = function (captchaResponse) {
        if (captchaResponse != undefined && captchaResponse != null && captchaResponse.trim().length != 0) {
            this.IfVerificationDone = true;
        }
        else {
            this.IfVerificationDone = false;
        }
    };
    //It checks if key pressed is integer or not if not then it returns false.
    RegistrationComponent.prototype.numberOnly = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    RegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.registrationService.getCountryList();
        this.registrationService.getLanguageList();
        this.registrationService.getDepositInsuranceList();
        this.registrationService.GetRatingAgeNturList();
        this.registrationService.GetRatingAgeNturList2();
        this.registrationService.GetSubGroupList();
        this.registrationService.GetSalutationList();
        this.registrationService.GetGroupList();
        this.registrationService.ShowSection3 = false;
        this.registrationService.ShowSection2 = false;
        this.resetForm();
        this.activatedRoute.params.subscribe(function (x) {
            console.log(x["uId"]);
            debugger;
            if (x["uId"] != undefined && x["uId"] != null) {
                debugger;
                _this.registrationService.userId = x["uId"];
                _this.GetUserDetailByUserId();
            }
        });
    };
    RegistrationComponent.prototype.resetForm = function (form) {
        if (form != null) {
            form.reset();
            //var numberControl = new FormControl("", CustomValidators.number({min: 10000000000, max: 999999999999 }))
            //     this.formGroup = this.formBuilder.group({
            //       phone: ['',  [Validators.required, CustomValidationServiceService.checkLimit(10000000000,999999999999)]]
            //  });
        }
        this.registrationService.userModel = {
            UserId: 0,
            NameOfCompany: '',
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
            Salutation: 0,
            Title: '',
            FirstName: '',
            SurName: '',
            ContactNumber: '',
            EmailAddress: '',
            UserName: '',
            Password: '',
            FurtherField1: '',
            FurtherField2: '',
            FurtherField3: '',
            UserTypeId: '0',
            RatingAgentur1: '',
            RatingAgenturValue1: '',
            RatingAgentur2: '',
            RatingAgenturValue2: '',
            DepositInsurance: 0,
            ClientGroupId: 0,
            AgreeToThePrivacyPolicy: false,
            GroupCommunities: false,
            GroupCompanyGMBH: false,
            GroupCompany: false,
            AgreeToTheRatingsMayPublish: false,
            AgreeThatInformationOfCompanyMayBePublished: false,
            AcceptAGBS: false,
            DateCreated: new Date(),
            DateModified: new Date(),
            ModifiedBy: -1,
            rdbBank: false,
            rdbNonBank: false,
            NewPassword: '',
        };
    };
    RegistrationComponent.prototype.registerUser = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var userExist, ifEmailIdAlreadyRegistered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        if (form.value.UserId != undefined && form.value.UserId != null && form.value.UserId > 0) {
                            this.UpdateUserDetails(form);
                            return [2 /*return*/];
                        }
                        form.value.DateCreated = new Date();
                        form.value.DateModified = new Date();
                        form.value.CreatedBy = -1;
                        if (!this.ValidateUserForm(form)) {
                            return [2 /*return*/, false];
                        }
                        this.spinner.show();
                        return [4 /*yield*/, this.registrationService.CheckIfUserNameIsAvailable(form.value.UserName)];
                    case 1:
                        userExist = _a.sent();
                        debugger;
                        if (userExist == true) {
                            this.spinner.hide();
                            this.toastr.error("User name not available.", "Registration");
                            this.registrationService.userModelExist = null;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.registrationService.CheckIfEmailIdIsRegistered(form.value.EmailAddress)];
                    case 2:
                        ifEmailIdAlreadyRegistered = _a.sent();
                        debugger;
                        if (ifEmailIdAlreadyRegistered == true) {
                            this.spinner.hide();
                            this.toastr.error("This email id is already registered.", "Registration");
                            //this.registrationService.userModelExist=null;
                            return [2 /*return*/];
                        }
                        this.spinner.hide();
                        if (form.value.rdbBank) {
                            form.value.GroupIds = '';
                            if (form.value.GroupCommunities)
                                form.value.GroupIds = "4,";
                            if (form.value.GroupCompanyGMBH)
                                form.value.GroupIds = form.value.GroupIds + "2,";
                            if (form.value.GroupCompany)
                                form.value.GroupIds = form.value.GroupIds + "3,";
                            form.value.GroupIds = form.value.GroupIds.substring(0, form.value.GroupIds.length - 1);
                        }
                        else {
                            form.value.GroupIds = "";
                        }
                        form.value.UserTypeId = '';
                        if (form.value.rdbBank)
                            form.value.UserTypeId = '4,';
                        if (form.value.rdbNonBank)
                            form.value.UserTypeId = form.value.UserTypeId + '5,';
                        form.value.UserTypeId = form.value.UserTypeId.substring(0, form.value.UserTypeId.length - 1);
                        this.spinner.show();
                        // Registering user..
                        this.registrationService.RegisterUser(form.value).subscribe(function (data) {
                            _this.resetForm(form);
                            _this.spinner.hide();
                            setTimeout(function () {
                                /** spinner ends after 5 seconds */
                                _this.router.navigate(['/login']);
                            }, 5000);
                            _this.toastr.success("Registration is successfull. An email is sent to registered email id. This email have your login credentails.", "Registration");
                            //location.reload();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    RegistrationComponent.prototype.ValidateUserForm = function (form) {
        var IfErrorFound = false;
        var numberOfErrorFound = 0;
        var errorMessage = 'Fields marked with * are required. Please fill';
        if (form.value.NameOfCompany == undefined || form.value.NameOfCompany == null || form.value.NameOfCompany.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Name of company,";
        }
        if (form.value.Street == undefined || form.value.Street == null || form.value.Street.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Street,";
        }
        if (form.value.PostalCode == undefined || form.value.PostalCode == null || form.value.PostalCode.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Postal Code,";
        }
        if (form.value.Place == undefined || form.value.Place == null || form.value.Place.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Place,";
        }
        if (form.value.AccountHolder == undefined || form.value.AccountHolder == null || form.value.AccountHolder.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Account Holder,";
        }
        if (form.value.Bank == undefined || form.value.Bank == null || form.value.Bank.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Bank,";
        }
        if (form.value.IBAN == undefined || form.value.IBAN == null || form.value.IBAN.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " IBAN,";
        }
        if (form.value.BICCode == undefined || form.value.BICCode == null || form.value.BICCode.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " BICCode,";
        }
        if (form.value.ClientGroupId == undefined || form.value.ClientGroupId == null || form.value.ClientGroupId == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Client group,";
        }
        if (form.value.SubGroupId == undefined || form.value.SubGroupId == null || form.value.SubGroupId == "0") {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Sub group,";
        }
        if (form.value.Salutation == undefined || form.value.Salutation == null || form.value.Salutation == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Salutation,";
        }
        if (form.value.FirstName == undefined || form.value.FirstName == null || form.value.FirstName.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " First Name,";
        }
        if (form.value.SurName == undefined || form.value.SurName == null || form.value.SurName.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Sur Name,";
        }
        if (form.value.ContactNumber == undefined || form.value.ContactNumber == null || form.value.ContactNumber.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Contact Number,";
        }
        if (form.value.UserId == undefined || form.value.UserId == null || form.value.UserId == 0) {
            if (form.value.EmailAddress == undefined || form.value.EmailAddress == null || form.value.EmailAddress.trim().length == 0) {
                IfErrorFound = true;
                numberOfErrorFound++;
                errorMessage = errorMessage + " Mail Address,";
            }
        }
        debugger;
        if (form.value.UserId == undefined || form.value.UserId == null || form.value.UserId == 0) {
            if (form.value.UserName == undefined || form.value.UserName == null || form.value.UserName.trim().length == 0) {
                IfErrorFound = true;
                numberOfErrorFound++;
                errorMessage = errorMessage + " User Name,";
            }
        }
        if (form.value.UserTypeId == 4 && (form.value.DepositInsurance == undefined || form.value.DepositInsurance == null || form.value.DepositInsurance == 0)) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Deposit Insurance,";
        }
        if (form.value.rdbBank) {
            if (form.value.AgreeToThePrivacyPolicy == false) {
                IfErrorFound = true;
                numberOfErrorFound++;
                errorMessage = errorMessage + " Agree to the privacy policy checkbox,";
            }
            if (form.value.AgreeToTheRatingsMayPublish == false) {
                IfErrorFound = true;
                numberOfErrorFound++;
                errorMessage = errorMessage + " I agree that ratings may be published on our company checkbox,";
            }
            if (form.value.AgreeThatInformationOfCompanyMayBePublished == false) {
                IfErrorFound = true;
                numberOfErrorFound++;
                errorMessage = errorMessage + " that information about our company may be published on the platform checkbox,";
            }
        }
        if (form.value.rdbBank) {
            if (form.value.GroupCommunities == false && form.value.GroupCompanyGMBH == false && form.value.GroupCompany == false) {
                this.toastr.error("Please mark check atleast one out of Communities, Company Gmbh and Company (AöR, KdöR) checkboxes");
                return false;
            }
        }
        if (IfErrorFound) {
            errorMessage = errorMessage.substring(0, errorMessage.length - 1);
            this.toastr.error(errorMessage, "Registration");
            //alert(errorMessage);
            return false;
        }
        if (form.value.rdbBank == false && form.value.rdbNonBank == false) {
            this.toastr.error("Please select is it Borrower or Lender.", "Registration");
            return false;
        }
        if (form.value.UserName != undefined && form.value.UserName != null && form.value.UserName.length != 0) {
            if (form.value.UserName.indexOf(' ') >= 0) {
                this.toastr.error("User name can not have space.", "Registration");
                return false;
            }
        }
        if (form.value.ContactNumber != undefined && form.value.ContactNumber != null && form.value.ContactNumber.length != 0) {
            try {
                if (isNaN(Number(form.value.ContactNumber.toString())) == true) {
                    this.toastr.error("Contact number must be numeric.", "Registration");
                    return false;
                }
                else if (form.value.ContactNumber.indexOf('.') >= 0) {
                    this.toastr.error("Contact number must be numeric.", "Registration");
                    return false;
                }
                else if (form.value.ContactNumber.length < 10) {
                    this.toastr.error("Contact number must be of length 10.", "Registration");
                    return false;
                }
            }
            catch (_a) {
                return false;
            }
        }
        if (form.value.UserId == undefined || form.value.UserId == null || form.value.UserId == 0) {
            if (form.value.EmailAddress == undefined || form.value.EmailAddress == null || form.value.EmailAddress.length == 0) {
                this.toastr.error("Email address is required.", "Registration");
                return false;
            }
            var expression = void 0;
            expression = new RegExp(/^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/);
            if (form.value.EmailAddress != undefined && form.value.EmailAddress != null && form.value.EmailAddress.length != 0) {
                if (!expression.test(form.value.EmailAddress)) {
                    this.toastr.error("Email address is not valid.", "Registration");
                    return false;
                }
            }
        }
        // if(form.value.EmailAddress!= undefined && form.value.EmailAddress !=  null && form.value.EmailAddress.length !=0){
        //   if(form.value.confirmEmailAddress == undefined || form.value.confirmEmailAddress ==  null || form.value.confirmEmailAddress.length ==0 ||form.value.confirmEmailAddress!=form.value.EmailAddress ){
        //     alert('Email address not matched.');
        //     return false;
        //   }
        // }
        debugger;
        if (form.value.AcceptAGBS == false) {
            this.toastr.error("Please accept AGBs.", "Registration");
            return false;
        }
        if (!this.IfVerificationDone) {
            this.toastr.error("Please verify captcha.", "Registration");
            return false;
        }
        return true;
    };
    RegistrationComponent.prototype.Section2Visible = function (form) {
        var IfErrorFound = false;
        var numberOfErrorFound = 0;
        var errorMessage = 'Fields marked with * are required. Please fill';
        if (form.value.NameOfCompany == undefined || form.value.NameOfCompany == null || form.value.NameOfCompany.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Name of company,";
        }
        if (form.value.Street == undefined || form.value.Street == null || form.value.Street.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Street,";
        }
        if (form.value.PostalCode == undefined || form.value.PostalCode == null || form.value.PostalCode.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Postal Code,";
        }
        if (form.value.Place == undefined || form.value.Place == null || form.value.Place.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Place,";
        }
        if (form.value.AccountHolder == undefined || form.value.AccountHolder == null || form.value.AccountHolder.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Account Holder,";
        }
        if (form.value.Bank == undefined || form.value.Bank == null || form.value.Bank.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Bank,";
        }
        if (form.value.IBAN == undefined || form.value.IBAN == null || form.value.IBAN.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " IBAN,";
        }
        if (form.value.BICCode == undefined || form.value.BICCode == null || form.value.BICCode.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " BICCode,";
        }
        if (form.value.ClientGroupId == undefined || form.value.ClientGroupId == null || form.value.ClientGroupId == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Client group,";
        }
        if (form.value.SubGroupId == undefined || form.value.SubGroupId == null || form.value.SubGroupId == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Sub group,";
        }
        debugger;
        if ((form.value.rdbBank == undefined && form.value.rdbNonBank == undefined) || (form.value.rdbBank == false && form.value.rdbNonBank == false)) {
            this.toastr.error("Please select is it Borrower or Lender.", "Registration");
            return false;
        }
        if (!IfErrorFound)
            this.registrationService.ShowSection2 = true;
        else {
            this.registrationService.ShowSection2 = false;
            errorMessage = errorMessage.substring(0, errorMessage.length - 1);
            this.toastr.error(errorMessage, "Registration");
        }
    };
    RegistrationComponent.prototype.Section3Visible = function (form) {
        var IfErrorFound = false;
        var numberOfErrorFound = 0;
        var errorMessage = 'Fields marked with * are required. Please fill';
        if (form.value.Salutation == undefined || form.value.Salutation == null || form.value.Salutation == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Salutation,";
        }
        if (form.value.FirstName == undefined || form.value.FirstName == null || form.value.FirstName.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " First Name,";
        }
        if (form.value.SurName == undefined || form.value.SurName == null || form.value.SurName.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Sur Name,";
        }
        if (form.value.ContactNumber == undefined || form.value.ContactNumber == null || form.value.ContactNumber.length == 0) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Contact Number,";
        }
        if (form.value.UserId == undefined || form.value.UserId == null || form.value.UserId == 0) {
            if (form.value.EmailAddress == undefined || form.value.EmailAddress == null || form.value.EmailAddress.trim().length == 0) {
                IfErrorFound = true;
                numberOfErrorFound++;
                errorMessage = errorMessage + " Mail Address,";
            }
        }
        debugger;
        if (form.value.UserId == undefined || form.value.UserId == null || form.value.UserId == 0) {
            if (form.value.UserName == undefined || form.value.UserName == null || form.value.UserName.trim().length == 0) {
                IfErrorFound = true;
                numberOfErrorFound++;
                errorMessage = errorMessage + " User Name,";
            }
        }
        if (form.value.UserTypeId == 4 && (form.value.DepositInsurance == undefined || form.value.DepositInsurance == null || form.value.DepositInsurance == 0)) {
            IfErrorFound = true;
            numberOfErrorFound++;
            errorMessage = errorMessage + " Deposit Insurance,";
        }
        if (!IfErrorFound)
            this.registrationService.ShowSection3 = true;
        else {
            this.registrationService.ShowSection3 = false;
            errorMessage = errorMessage.substring(0, errorMessage.length - 1);
            this.toastr.error(errorMessage, "Registration");
        }
    };
    RegistrationComponent.prototype.GetUserDetailByUserId = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        //this.registrationService.userId=74;
                        this.spinner.show();
                        return [4 /*yield*/, this.registrationService.GetUserDetailByUserId()];
                    case 1:
                        result = _a.sent();
                        if (result.IsSuccess) {
                            if (JSON.parse(result.data)[0].UserTypeId != 6) {
                                this.toastr.error('No information found.', 'Registration');
                                this.spinner.hide();
                                this.resetForm();
                                this.registrationService.userId = undefined;
                                return [2 /*return*/];
                            }
                            this.registrationService.userModel = JSON.parse(result.data)[0];
                            this.registrationService.userModel.UserTypeId = '0';
                            //form.value=this.registrationService.userModel;
                        }
                        this.spinner.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    RegistrationComponent.prototype.UpdateUserDetails = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                debugger;
                form.value.DateCreated = new Date();
                form.value.DateModified = new Date();
                form.value.CreatedBy = -1;
                if (!this.ValidateUserForm(form)) {
                    return [2 /*return*/, false];
                }
                this.spinner.show();
                // // Checking ifUserExist
                // let userExist= await this.registrationService.CheckIfUserNameIsAvailable(form.value.UserName);
                // debugger;
                // if(userExist == true){
                //   this.spinner.hide();
                //   this.toastr.error("User name not available.","Registration");
                //   this.registrationService.userModelExist=null;
                //   return;
                // }
                // Checking if email already registered
                // // // let ifEmailIdAlreadyRegistered= await this.registrationService.CheckIfEmailIdIsRegistered(form.value.EmailAddress);
                // // // debugger;
                // // // if(ifEmailIdAlreadyRegistered == true){
                // // //   this.spinner.hide();
                // // //   this.toastr.error("This email id is already registered.","Registration");
                // // //   //this.registrationService.userModelExist=null;
                // // //   return;
                // // // }
                this.spinner.hide();
                if (form.value.rdbBank) {
                    form.value.GroupIds = '';
                    if (form.value.GroupCommunities)
                        form.value.GroupIds = "4,";
                    if (form.value.GroupCompanyGMBH)
                        form.value.GroupIds = form.value.GroupIds + "2,";
                    if (form.value.GroupCompany)
                        form.value.GroupIds = form.value.GroupIds + "3,";
                    form.value.GroupIds = form.value.GroupIds.substring(0, form.value.GroupIds.length - 1);
                }
                else {
                    form.value.GroupIds = "";
                }
                form.value.UserTypeId = '';
                if (form.value.rdbBank)
                    form.value.UserTypeId = '4,';
                if (form.value.rdbNonBank)
                    form.value.UserTypeId = form.value.UserTypeId + '5,';
                form.value.UserTypeId = form.value.UserTypeId.substring(0, form.value.UserTypeId.length - 1);
                this.spinner.show();
                // Updating user..
                form.value.UserName = this.registrationService.userModel.UserName;
                form.value.EmailAddress = this.registrationService.userModel.EmailAddress;
                this.registrationService.UpdateUserDetails(form.value).subscribe(function (data) {
                    _this.resetForm(form);
                    _this.spinner.hide();
                    setTimeout(function () {
                        /** spinner ends after 5 seconds */
                        _this.router.navigate(['/login']);
                    }, 5000);
                    _this.toastr.success("Registration is successfull. An email is sent to registered email id. This email have your login credentails.", "Registration");
                    //location.reload();
                });
                return [2 /*return*/];
            });
        });
    };
    RegistrationComponent = __decorate([
        Component({
            selector: '[app-registration]',
            templateUrl: './registration.component.html',
            styleUrls: ['./registration.component.css'],
        }),
        __metadata("design:paramtypes", [RegistrationService, CustomValidationServiceService,
            Router, ToastrService, NgxSpinnerService,
            ActivatedRoute
            //  ,public formBuilder:FormBuilder, public formGroup:FormGroup
        ])
    ], RegistrationComponent);
    return RegistrationComponent;
}());
export { RegistrationComponent };
//# sourceMappingURL=registration.component.js.map