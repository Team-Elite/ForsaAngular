import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticateServiceService } from '../Shared/authenticate-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LenderDashboardService } from './Shared/lender-dashboard.service';
import { StartPageModel } from './Shared/start-page-model.class';
import { BestPriceViewService } from '../lender-dashboard/best-price-view/Shared/best-price-view.service';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { isNullOrUndefined } from 'util';
import { BankDashboardService } from '../bank-dashboard/Shared/bank-dashboard.service';
declare var $: any;

@Component({
    selector: 'app-lender-dashboard',
    templateUrl: './lender-dashboard.component.html',
    styleUrls: ['./lender-dashboard.component.css']
})
export class LenderDashboardComponent implements OnInit {
    ifTimerForRetrievingPendingRequestHastToStart = false; // It will ensure that accept/reject and chat with forsa pop up is closed.
    responseTimerId: any; 
    responseMessage: string = '';
    tempAmount: any;
    selectedItem: string;
    _http: any;
    IfRequestSent: boolean = false;
    _userId: any
    _authenticateServiceService: AuthenticateServiceService
    _showMaturity: boolean;
    reacted_message;
    chat_message;
    display = 'none'; //default Variable
    constructor(public lenderDashboardService: LenderDashboardService, public spinner: NgxSpinnerService
        , public authenticateServiceService: AuthenticateServiceService, public router: Router
        , public toastr: ToastrService
        , public bestPriceViewService: BestPriceViewService
        , public bankDashboardService: BankDashboardService) {

        this._authenticateServiceService = authenticateServiceService;
    }

    copyLoggedInUser: any;
    SelectedStartPage: any;
    listPagesForStartingPage: StartPageModel[];
    //testList = [{ Id: 1, Value: 'Test1' },
    //{ Id: 2, Value: 'Test2' },
    //{ Id: 3, Value: 'Test3' },
    //{ Id: 4, Value: 'Test4' },
    //{ Id: 5, Value: 'Test5' }];
    timer: any;
    IfBankResponseFound: boolean = false;
    IfBothUserTypeFound: boolean = false;
    headerOptions = new Headers({ 'Content-Type': 'application/json' });
    requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });
    _MaturityList: any;
    ngOnInit() {
        this.reacted_message = '';
        this.chat_message = '';
        this.spinner.show();
        this._authenticateServiceService.GetUserSession();
        this._authenticateServiceService.AuthenticateSession();

        this.lenderDashboardService.UserTypeId = this._authenticateServiceService.GetUserTypeId();
        //console.log("this.lenderDashboardService.UserTypeId",this.lenderDashboardService.UserTypeId)
        this.lenderDashboardService.userId = this._authenticateServiceService.GetUserId();
        this.IfBothUserTypeFound = this._authenticateServiceService.GetIfBothUserTypeFound() == (undefined || null) ? false : true;
        this.lenderDashboardService.loggedInUser = this._authenticateServiceService.GetUserDetail();
        this.copyLoggedInUser = Object.assign({}, this.lenderDashboardService.loggedInUser);
        this.GetPagesForLenderSettingStartPage();

        //this.SelectedStartPage = this.testList[0].Id;
        //this.GetLenderStartPage();
        this.bestPriceViewService.lenderSendRequestModel2 = {
            RequestId: 0,
            LenderId: 0,
            BorrowerId: 0,
            LenderName: '',
            BorrowerName: '',
            Amount: 0.00,
            StartDate: '',
            EndDate: '',
            NoOfDays: 0,
            InterestConvention: '',
            Payments: '',
            IsRequestAccepted: false,
            DateCreated: new Date(),
            DateModified: new Date(),
            RequestCreatedBy: this.bestPriceViewService.lenderDashboardService.userId,
            InterestConventionName: '',
            LenderEmailId: '',
            PaymentsName: '',
            IsAccepted: null,
            IsRejected: null,
            RateOfInterest: 0.00,
            BorrowerEmailId: '',
            MessageForForsa: '',
            IsMessageSentToForsa: false
        }
        //   this.GetLenderSendRequestPendingLendedRequestByLenderId()
        this.SetTimeInterval();
        this.spinner.hide();
    }
    toggelebar() {
        if ($("body").hasClass('sidebar-mini')) {
            $('.sidebar').css('margin-left', '0px');
            $("body").removeClass("sidebar-mini ")
        } else {
            $('.sidebar').css('margin-left', '-212px');
            $("body").addClass("sidebar-mini ")
        }
    }
    SetTimeInterval() {
        console.log('lender dashboard');
        this.timer = setInterval(() => {
            console.log('lender dashboard');
            this.GetLenderSendRequestPendingLendedRequestByLenderId();
        }, 5000);
    }

    AcceptLendedRequest() {

        for (var i = 0; i <= this.bestPriceViewService.listInterestConvention.length - 1; i++) {
            if (this.bestPriceViewService.lenderSendRequestModel2.InterestConvention == this.bestPriceViewService.listInterestConvention[i].Id) {
                this.bestPriceViewService.lenderSendRequestModel2.InterestConventionName = this.bestPriceViewService.listInterestConvention[i].Value;
                break;
            }
        }

        for (var i = 0; i <= this.bestPriceViewService.listPayments.length - 1; i++) {
            if (this.bestPriceViewService.lenderSendRequestModel2.Payments == this.bestPriceViewService.listPayments[i].Id) {
                this.bestPriceViewService.lenderSendRequestModel2.PaymentsName = this.bestPriceViewService.listPayments[i].Value;
                break;
            }
        }

        this.spinner.show();
        this.bestPriceViewService.lenderSendRequestModel2.IsAccepted = true;
        var result = this.bestPriceViewService.AcceptLendedRequest(this.bestPriceViewService.lenderSendRequestModel2).subscribe(data => {
            this.reacted_message = 'Successfully accepted Trade, please check E-Mail.'
            // this.toastr.success('Successfully accepted Trade, please check E-Mail.', 'Dashboard');
            this.spinner.hide();
            this.IfRequestSent = true;
            // this.SetTimeInterval();
            // var element = document.getElementById('closeSendRequestModalLender');
            // element.click();
        });

    }

    RejectLendedRequest() {


        for (var i = 0; i <= this.bestPriceViewService.listInterestConvention.length - 1; i++) {
            if (this.bestPriceViewService.lenderSendRequestModel2.InterestConvention == this.bestPriceViewService.listInterestConvention[i].Id) {
                this.bestPriceViewService.lenderSendRequestModel2.InterestConventionName = this.bestPriceViewService.listInterestConvention[i].Value;
                break;
            }
        }

        for (var i = 0; i <= this.bestPriceViewService.listPayments.length - 1; i++) {
            if (this.bestPriceViewService.lenderSendRequestModel2.Payments == this.bestPriceViewService.listPayments[i].Id) {
                this.bestPriceViewService.lenderSendRequestModel2.PaymentsName = this.bestPriceViewService.listPayments[i].Value;
                break;
            }
        }

        this.spinner.show();
        this.bestPriceViewService.lenderSendRequestModel2.IsRejected = true;
        var result = this.bestPriceViewService.RejectLendedRequest(this.bestPriceViewService.lenderSendRequestModel2).subscribe(data => {
            // this.toastr.success('The Deal request has been declined.', 'Dashboard');
            this.reacted_message = 'The Deal request has been declined.'
            this.spinner.hide();
            this.IfRequestSent = true;
            // var element = document.getElementById('closeSendRequestModalLender');
            // element.click();
            // this.SetTimeInterval();
        });

    }

    SaveForsaMessage() {

        if (this.bestPriceViewService.lenderSendRequestModel2.MessageForForsa == undefined || this.bestPriceViewService.lenderSendRequestModel2.MessageForForsa == null || this.bestPriceViewService.lenderSendRequestModel2.MessageForForsa.toString().trim().length == 0) {
            this.toastr.error("Please enter message", "Dashbaord");
            return;
        }
        this.spinner.show();
        this.bestPriceViewService.lenderSendRequestModel2.IsMessageSentToForsa = true;
        this.bestPriceViewService.SaveForsaMessage(this.bestPriceViewService.lenderSendRequestModel2).subscribe(data => {
            this.spinner.hide();
            this.chat_message = 'Forsa wird mit mit Ihnen Kontakt aufnehmen';
            // this.toastr.success("YOU WILL BE CONTACTED BY FORSA.", "Dashboard");
            //this.SetTimeInterval();

            // Closing accept/ Reject /Chat with forsa pop up when Message is sent/save to Forsa for help.
            var element = document.getElementById('btnCloseSendRequestModal123');
            element.click();

            // Starting timer for retrieving forsa message when requested for forsa help.
            this.SetResponseTimeInterval(this.bestPriceViewService.lenderSendRequestModel2.RequestId);
        });
    }
    ///
    chtforse() {
        var element = document.getElementById('closeSendRequestModalLender');
        element.click();
    }
    ///	
    async GetLenderSendRequestPendingLendedRequestByLenderId() {


        //  this.spinner.show();
        if (this.lenderDashboardService.userId === undefined || this.timer == undefined) {
            return;
        };
        var result = await this.bestPriceViewService.GetLenderSendRequestPendingLendedRequestByLenderId();
      //  debugger;
        if (result != undefined && result.length > 0) {
            clearInterval(this.timer);
            this.IfBankResponseFound = true;
            this.IfRequestSent = false;

            // Hiding lend popup modal when pending lend request is found.
            var element = document.getElementById('closeSendRequestModal');
            element.click();

            var element = document.getElementById('ShowSendRequestLDPopup');
            element.click();


            this.bestPriceViewService.lenderSendRequestModel2 = result[0];
            if (this.bestPriceViewService.lenderSendRequestModel2.Amount) {
                this.tempAmount = this.bestPriceViewService.lenderSendRequestModel2.Amount;
                this.tempAmount = this.tempAmount.toLocaleString('de-DE');
            }
        }
        //this.spinner.hide();
    }

    async GetLenderStartPage() {

        let startPage = await this.lenderDashboardService.GetLenderStartPage();
        if (startPage == undefined) return;
        this.lenderDashboardService.StartingScreen = JSON.parse(startPage);
        //  this.spinner.hide();
        if (this.lenderDashboardService.StartingScreen[0].PageName == "Best Price View") {
            //this.lenderDashboardService.CurrentPageName="Best Price View";
            //this.router.navigate(['lenderDashboard/BestPriceView']);
        }
    }

    Logout() {
        //if(confirm("Are you sure you want to log out?")){
        this.authenticateServiceService.ClearSession();
        this.lenderDashboardService.userId = undefined;
        this.timer = undefined;
        this.router.navigate(['/login']);
        //}
    }

    async UpdateUserProfile() {

        /* Validating controls */
        if (this.ValidateUserPfrofileFields(this.copyLoggedInUser, this.lenderDashboardService.NewPassword, this.lenderDashboardService.ConfirmPassword)) {
            this.copyLoggedInUser.NewPassword = this.lenderDashboardService.NewPassword.trim();
            this.copyLoggedInUser.Password = this.copyLoggedInUser.Password.trim();
            this.spinner.show();
            var data;
            data = await this.lenderDashboardService.UpdateUserProfile(this.copyLoggedInUser);//.subscribe(data => {
            this.spinner.hide();
            if (!isNullOrUndefined(data)) {

                if (data.IsSuccess == false) {
                    this.toastr.error("Old password is not correct.", "Dashboard");
                    return;
                }
                //alert("ss");
                //$(".bd-example-modal-lg-editsetting-page").removeClass("show");
                this.display = 'none'; //set none css after close dialog
                console.log('UpdateProfile Call ');
                console.log(document.getElementById('closeModal'));
                this.authenticateServiceService.UpdateSession(data.data);
                this.toastr.success("Updated successfully. An email has been sent to your email id.", "Dashboard");
                this.lenderDashboardService.loggedInUser = this.authenticateServiceService.GetUserDetail();

            }

            //});
        }
    }

    ValidateUserPfrofileFields(userModel: any, NewPassword: string, ConfirmPassword: string) {
        let IfErrorFound: boolean = false;
        let message: string = 'Fields marked with * are mandatory. Please fill';
        if (userModel.FirstName == undefined || userModel.FirstName == null || userModel.FirstName.trim().length == 0) {
            IfErrorFound = true;
            message = message + " First Name,";
        }

        if (userModel.SurName == undefined || userModel.SurName == null || userModel.SurName.trim().length == 0) {
            IfErrorFound = true;
            message = message + " Sur Name,";
        }
        if (userModel.NameOfCompany == undefined || userModel.NameOfCompany == null || userModel.NameOfCompany.trim().length == 0) {
            IfErrorFound = true;
            message = message + " Name of company,";
        }
        if (userModel.Password == undefined || userModel.Password == null || userModel.Password.trim().length == 0) {
            IfErrorFound = true;
            message = message + " Old Password,";
        }
        if (NewPassword == undefined || NewPassword == null || NewPassword.trim().length == 0) {
            IfErrorFound = true;
            message = message + " New Password,";
        }
        if (ConfirmPassword == undefined || ConfirmPassword == null || ConfirmPassword.trim().length == 0) {
            IfErrorFound = true;
            message = message + " Confirm Password,";
        }
        if (IfErrorFound) {
            message = message.substring(0, message.length - 1);
            this.toastr.error(message, "Dashboard");
            return false;
        }

        if (NewPassword.trim().length < 6) {
            this.toastr.error("Password must be at least of six characters.", "Dashboard");
            return false;
        }

        // if(userModel.NewPassword.trim() == userModel.Password.trim()){
        //   alert('Old password and new password can not be same.');
        //   return false;
        // }

        if (NewPassword.trim() != ConfirmPassword.trim()) {
            this.toastr.error("New password and confirm password not matched.", "Dashboard");
            return false;
        }
        return true;

    }

    ShowUpdateProfileModal() {
        this.lenderDashboardService.NewPassword = '';
        this.lenderDashboardService.ConfirmPassword = '';
        this.copyLoggedInUser = Object.assign({}, this.lenderDashboardService.loggedInUser);
    }

    async ShowMaturityList(History: boolean) {

        this._showMaturity = true;
        //  this.lenderDashboardService.showhistory = History;
        // await this.lenderDashboardService.GetlenderMaturityList();
        this.router.onSameUrlNavigation = "reload";
        this.router.navigate(['lenderDashboard/Maturitylist']);
        //await this.lenderDashboardService.GetlenderMaturityList(ShowMaturity);
    }




    SetCurrentPage(pageName: string) {
        this.selectedItem = pageName;
        this.spinner.show();
        this._showMaturity = false;
        this.lenderDashboardService.CurrentPageName = pageName;
        if (pageName === "Best Price View") {
            this.router.navigate(['lenderDashboard/BestPriceView']);
        }
        if (pageName == "All Banks") {
            this.router.navigate(['lenderDashboard/AllBanks']);
        }
        else if (pageName == 'View All Price') {
            this.router.navigate(['lenderDashboard/ViewAllPrice']);
        }
        else if (pageName == 'Kontact Dashboard') {
            this.router.navigate(['lenderDashboard/AllBanksK']);
        }
        else if (pageName == 'Setting') {
            this.router.navigate(['lenderDashboard/setting']);
        }
        this.spinner.hide();
    }

    async GetPagesForLenderSettingStartPage() {

        var response = await this.lenderDashboardService.GetPagesForLenderSettingStartPage();
        this.listPagesForStartingPage = response;
        if (this.listPagesForStartingPage != undefined && this.listPagesForStartingPage.length != 0) {
            for (var i = 0; this.listPagesForStartingPage.length - 1; i++) {
                if (this.listPagesForStartingPage[i].IsStartPage == true) {
                    this.SelectedStartPage = this.listPagesForStartingPage[i].PageId;
                    break;
                }
            }
        }

    }

    async LenderSaveStartPage() {
        this.spinner.show();
        var response = await this.lenderDashboardService.LenderSaveStartPage(this.SelectedStartPage);

        this.spinner.hide();
        //debugger;
        if (response.IsSuccess) {
            this.toastr.success("Start page updated successfully.", "Dashboard");
            var element = document.getElementById('btnCloseSetStartPageModal');
            element.click();
        }
        else {
            this.toastr.error("Something went wrong");
        }


    }

    async SwitchScreen() {


        this.router.navigate(['/bankDashBoard']);
    }
    RegisterAsPartner() {
        this.authenticateServiceService.ClearSession();
        this.router.navigate(['/registration/', this.lenderDashboardService.userId, 'KT']);
    }
    getPathName() {
        console.log(window.location.pathname);
        return window.location.pathname;
    }


    /* STARTS--------Repsonse of Lender request work starts here  */


    // Starting timer which will retrieve response of a particular request.
    SetResponseTimeInterval(RequestId: number) {
     //   debugger;
        this.responseTimerId = setInterval(() => {
            this.GetAndUpdateResponseOfPendingRequestOnTheBasisOfRequestId(RequestId);
        }, 5000);
    }

    // Get response method. It gets response when lender requests for Forsa help by sending message to forsa.
    // It also updates status of response is shown to lender.
    async GetAndUpdateResponseOfPendingRequestOnTheBasisOfRequestId(RequestId: number) {

        var obj = { RequestId: RequestId, UserTypeId: 5 };
        var responseRequestModel = await this.bankDashboardService.GetAndUpdateResponseOfPendingRequestOnTheBasisOfRequestId(obj);

        if (responseRequestModel != undefined) {

            // this variaable will be by default false.
            // It will be true once any of response i.e Accepted/Rejected/Forsa Response is received.
            var ifAnyResponseFound = false;

            responseRequestModel = responseRequestModel[0];

            // Closing chat with forsa pop up when response is received.
            var element = document.getElementById('btncloseChatWithForsaPopUp123');
            element.click();

            if (responseRequestModel.IsForsaAcceptedResponseReceivedByLender != undefined
                && responseRequestModel.IsForsaAcceptedResponseReceivedByLender != null
                && responseRequestModel.IsForsaAcceptedResponseReceivedByLender == true) {
                // Show popup when forsa accepted response.
                this.responseMessage = "YOUR LENDING TO " + responseRequestModel.NameOfCompany +" HAS BEEN PERFORMED SUCCESFULLY BY FORSA, PLEASE CHECK E-MAIL";
                ifAnyResponseFound = true;
                var elementResponseModal = document.getElementById('ShowResponseModalPopup');
                elementResponseModal.click();
            }

            else if (responseRequestModel.IsForsaRejectedResponseReceivedByLender != undefined
                && responseRequestModel.IsForsaRejectedResponseReceivedByLender != null
                && responseRequestModel.IsForsaRejectedResponseReceivedByLender == true) {
                // Show popup when forsa rejected response.
                this.responseMessage = "YOUR LENDING TO " + responseRequestModel.NameOfCompany + " HAS BEEN REJECTED BY FORSA, PLEASE CHECK E-MAIL";;
                ifAnyResponseFound = true;
                var elementResponseModal = document.getElementById('ShowResponseModalPopup');
                elementResponseModal.click();
            }


            // Stoping get response timer if any response i.e Accepted/Rejected/ Forsa response found.
            if (ifAnyResponseFound) {
                clearInterval(this.responseTimerId);
            }

        }
        this.spinner.hide();
    }




    /* ENDS-----------Repsonse of Lender request work starts here */

    ClsoeChatWithForsaPopupAndStartTime() {
        if (this.ifTimerForRetrievingPendingRequestHastToStart) {
            this.SetTimeInterval();
        }
    }


}
