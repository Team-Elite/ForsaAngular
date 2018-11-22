import { Component, OnInit } from '@angular/core';
import { BankDashboardService } from './Shared/bank-dashboard.service';
import { AuthenticateServiceService } from '../Shared/authenticate-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BestPriceViewService } from '../lender-dashboard/best-price-view/Shared/best-price-view.service';
import { DatePipe } from '@angular/common';
import { LenderDashboardService } from '../lender-dashboard/Shared/lender-dashboard.service';

@Component({
    selector: 'app-bank-dashboard',
    templateUrl: './bank-dashboard.component.html',
    styleUrls: ['./bank-dashboard.component.css']
})
export class BankDashboardComponent implements OnInit {
    _MaturityList: any;
    IfShowBankDashBoard: boolean;
    IsPublished: boolean = false;
    copyLoggedInUser: any;
    testTrue: boolean = false;
    timer: any;
    IfBothUserTypeFound: boolean = false;
    _authenticateServiceService: AuthenticateServiceService
    constructor(public bankDashboardService: BankDashboardService, public authenticateServiceService: AuthenticateServiceService, public router: Router
        , public toastr: ToastrService, public spinner: NgxSpinnerService, public bestPriceViewService: BestPriceViewService
        , public pipe: DatePipe, public lenderDashboardService: LenderDashboardService) {

        this._authenticateServiceService = authenticateServiceService;
    }
   
    ngOnInit() {
        this.spinner.show();

        this.authenticateServiceService.AuthenticateSession();
        this.IfShowBankDashBoard = true;
        this.IfBothUserTypeFound = this._authenticateServiceService.GetIfBothUserTypeFound() == (undefined || null) ? false : true;
        this.bankDashboardService.userId = this._authenticateServiceService.GetUserId();
        this.GetRateOfInterestOfBank();
        this.GetUserGroupForSettingRateOfInterestVisibility();
        this.bankDashboardService.loggedInUser = this._authenticateServiceService.GetUserDetail();
        this.copyLoggedInUser = Object.assign({}, this.bankDashboardService.loggedInUser);
        //this.SetTimeInterval();
       // this.GetLenderSendRequestRequestdOnTheBasisOfBorrowerId();
        this.spinner.hide();
        this.bestPriceViewService.lenderSendRequestModel = {
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
    }

    SetTimeInterval() {
       
        this.timer = setInterval(() => {
            this.GetLenderSendRequestRequestdOnTheBasisOfBorrowerId();
        }, 5000);
    }

    async GetRateOfInterestOfBank() {

        await this.bankDashboardService.GetRateOfInterestOfBank();
       if (this.bankDashboardService.listRateOfInterestOfBankModel != undefined && this.bankDashboardService.listRateOfInterestOfBankModel != null
            && this.bankDashboardService.listRateOfInterestOfBankModel.length != 0) {
            this.IsPublished = this.bankDashboardService.listRateOfInterestOfBankModel[0].IsPublished;
        }
    }

    EnableTextBox(rate, type: number) {
       
        if (type == 1)
            rate.IsDoubleTapped = true;
        else if (type == 2)
            rate.IsDoubleTapped2 = true;
        else if (type == 3)
            rate.IsDoubleTapped3 = true;
    }
    EnableTextBox2() {
        this.testTrue = true;
    }

    UpdateRateOfInterest(rate) {
        if (rate.RateOfInterest == undefined || rate.RateOfInterest == null || rate.RateOfInterest.length == 0) {
            this.toastr.error("Rate1 must be entered.", "Dashboard");
            return;
        }
        if (rate.RateOfInterest > 9999.99) {
            this.toastr.error("Interest rate1 can not be greater than 9999.99", "Dashboard");
            return;
        }
        if (rate.RateOfInterest < -9999.99) {
            this.toastr.error("Interest rate1 can not be less than -9999.99", "Dashboard");
            return;
        }

        if (rate.RateOfInterest2 == undefined || rate.RateOfInterest2 == null || rate.RateOfInterest2.length == 0) {
            this.toastr.error("Rate2 must be entered.", "Dashboard");
            return;
        }
        if (rate.RateOfInterest2 > 9999.99) {
            this.toastr.error("Interest rate2 can not be greater than 9999.99", "Dashboard");
            return;
        }
        if (rate.RateOfInterest2 < -9999.99) {
            this.toastr.error("Interest rate2 can not be less than -9999.99", "Dashboard");
            return;
        }

        if (rate.RateOfInterest3 == undefined || rate.RateOfInterest3 == null || rate.RateOfInterest3.length == 0) {
            this.toastr.error("Rate3 must be entered.", "Dashboard");
            return;
        }
        if (rate.RateOfInterest3 > 9999.99) {
            this.toastr.error("Interest rate3 can not be greater than 9999.99", "Dashboard");
            return;
        }
        if (rate.RateOfInterest3 < -9999.99) {
            this.toastr.error("Interest rate3 can not be less than -9999.99", "Dashboard");
            return;
        }
        rate.IsDoubleTapped = false;
        rate.ModifiedBy = this.bankDashboardService.userId;
        rate.RateOfInterest = parseFloat( rate.RateOfInterest).toFixed(2);
        rate.RateOfInterest2 = parseFloat(rate.RateOfInterest2).toFixed(2);
        rate.RateOfInterest3 = parseFloat(rate.RateOfInterest3).toFixed(2);
        this.spinner.show();
        this.bankDashboardService.UpdateRateOfInterest(rate).subscribe(data => {
            this.spinner.hide();
        })
    }

    IncreaseRateOfInterest(rate, type: number) {
        debugger;
        if (type == 1) {
            if (rate.RateOfInterest == undefined || rate.RateOfInterest == null || rate.RateOfInterest.length == 0) {
                this.toastr.error("Rate must be entered.", "Dashboard");
                return;
            }

            if (rate.RateOfInterest >= 9999.99) {
                this.toastr.error("Interest rate can not be greater than 9999.99", "Dashboard");
                return;
            }
            rate.RateOfInterest = parseFloat(rate.RateOfInterest) + .01;
            rate.RateOfInterest = parseFloat(rate.RateOfInterest).toFixed(2);
        }
        else if (type == 2) {
            if (rate.RateOfInterest2 == undefined || rate.RateOfInterest2 == null || rate.RateOfInterest2.length == 0) {
                this.toastr.error("Rate2 must be entered.", "Dashboard");
                return;
            }

            if (rate.RateOfInterest2 >= 9999.99) {
                this.toastr.error("Interest rate2 can not be greater than 9999.99", "Dashboard");
                return;
            }
            rate.RateOfInterest2 = parseFloat(rate.RateOfInterest2) + .01;
            rate.RateOfInterest2 = parseFloat(rate.RateOfInterest2).toFixed(2);
        }
        else if (type == 3) {
            if (rate.RateOfInterest3 == undefined || rate.RateOfInterest3 == null || rate.RateOfInterest3.length == 0) {
                this.toastr.error("Rate3 must be entered.", "Dashboard");
                return;
            }

            if (rate.RateOfInterest3 >= 9999.99) {
                this.toastr.error("Interest rate3 can not be greater than 9999.99", "Dashboard");
                return;
            }
            rate.RateOfInterest3 = parseFloat(rate.RateOfInterest3) + .01;
            rate.RateOfInterest3 = parseFloat(rate.RateOfInterest3).toFixed(2);
        }

        rate.ModifiedBy = this.bankDashboardService.userId;
        this.spinner.show();
        this.bankDashboardService.UpdateRateOfInterest(rate).subscribe(data => {
            this.spinner.hide();
        })
    }

    DecreaseRateOfInterest(rate, type: number) {
        if (type == 1) {
            if (rate.RateOfInterest == undefined || rate.RateOfInterest == null || rate.RateOfInterest.length == 0) {
                this.toastr.error("Rate must be entered.", "Dashboard");
                return;
            }
            if (rate.RateOfInterest <= -9999.99) {
                this.toastr.error("Interest rate can not be less than -9999.99", "Dashboard");
                return;
            }
            rate.RateOfInterest = parseFloat(rate.RateOfInterest) - .01;
            rate.RateOfInterest = parseFloat(rate.RateOfInterest).toFixed(2);
        }
        else if (type == 2) {
            if (rate.RateOfInterest2 == undefined || rate.RateOfInterest2 == null || rate.RateOfInterest2.length == 0) {
                this.toastr.error("Rate2 must be entered.", "Dashboard");
                return;
            }
            if (rate.RateOfInterest2 <= -9999.99) {
                this.toastr.error("Interest rate2 can not be less than -9999.99", "Dashboard");
                return;
            }
            rate.RateOfInterest2 = parseFloat(rate.RateOfInterest2) - .01;
            rate.RateOfInterest2 = parseFloat(rate.RateOfInterest2).toFixed(2);
        }
        else if (type == 3) {
            if (rate.RateOfInterest3 == undefined || rate.RateOfInterest3 == null || rate.RateOfInterest3.length == 0) {
                this.toastr.error("Rate3 must be entered.", "Dashboard");
                return;
            }
            if (rate.RateOfInterest3 <= -9999.99) {
                this.toastr.error("Interest rate3 can not be less than -9999.99", "Dashboard");
                return;
            }
            rate.RateOfInterest3 = parseFloat(rate.RateOfInterest3) - .01;
            rate.RateOfInterest3 = parseFloat(rate.RateOfInterest3).toFixed(2);
        }

        rate.ModifiedBy = this.bankDashboardService.userId;
        this.spinner.show();
        this.bankDashboardService.UpdateRateOfInterest(rate).subscribe(data => {
            this.spinner.hide();
        })
    }


    PublishAndUnPublish(value) {
        this.spinner.show();
        this.bankDashboardService.PublishAndUnPublish(value).subscribe(data => {
            this.spinner.hide();
            this.IsPublished = value;
            this.toastr.success("Changes saved successfully.", "Dashboard");
        })
    }

    async GetUserGroupForSettingRateOfInterestVisibility() {
        this.spinner.show();
        await this.bankDashboardService.GetUserGroupForSettingRateOfInterestVisibility();
        // Checking if only one group is left checked or not.
        // If true then disabling control from getting unchecked.
        this.IfLastGroupLeftThenDisablingControl();
        this.spinner.hide();
    }

    GroupCheckUnCheck(event, group) {
        //    
        let groupsString: string = '';
        var ifNoneIsSelected: boolean = true;

        // Making string of group ids which are checked.
        for (var i = 0; i <= this.bankDashboardService.listUserGroupForSettingRateOfInterestVisibility.length - 1; i++) {
            let obj: any = this.bankDashboardService.listUserGroupForSettingRateOfInterestVisibility[i];
            // if(obj.GroupName != group.GroupName && obj.IfRateWillBeVisible == true){
            if (obj.IfRateWillBeVisible == true) {
                ifNoneIsSelected = false;
                groupsString = groupsString + obj.GroupId + ',';
            }
        }


        groupsString = groupsString.substring(0, groupsString.length - 1);

        // Checking if none is selected then not saving last remaining grous value in db.
        if (!ifNoneIsSelected) {
            this.spinner.show();
            this.bankDashboardService.UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible(groupsString).subscribe(data => {
                this.spinner.hide();
                this.toastr.success("Saved successfully.", "Dashboard");

                // Checking if only one group is left checked or not.
                // If true then disabling control from getting unchecked.
                this.IfLastGroupLeftThenDisablingControl();
            })
        }
    }


    IfLastGroupLeftThenDisablingControl() {
        var numberOfGroupsChecked = 0;
        for (var i = 0; i <= this.bankDashboardService.listUserGroupForSettingRateOfInterestVisibility.length - 1; i++) {
            let obj: any = this.bankDashboardService.listUserGroupForSettingRateOfInterestVisibility[i];
            if (obj.IfRateWillBeVisible) {
                this.bankDashboardService.lastGroupId = obj.GroupName;
                numberOfGroupsChecked++;
            }
        }
        if (numberOfGroupsChecked == 1) {

        }
        else {
            this.bankDashboardService.lastGroupId = '';
        }
    }

    Logout() {
        //if(confirm("Are you sure you want to log out?")){
        this._authenticateServiceService.ClearSession();
        this.authenticateServiceService.ClearSession();
        this.router.navigate(['/login']);
        //}
    }

    UpdateUserProfile() {


        /* Validating controls */
        if (this.ValidateUserPfrofileFields(this.copyLoggedInUser, this.bankDashboardService.NewPassword, this.bankDashboardService.ConfirmPassword)) {
            this.copyLoggedInUser.NewPassword = this.bankDashboardService.NewPassword.trim();
            this.copyLoggedInUser.Password = this.copyLoggedInUser.Password.trim();
            this.spinner.show();
            this.bankDashboardService.UpdateUserProfile(this.copyLoggedInUser).subscribe(data => {
                this.spinner.hide();
                if (data != undefined && data != null) {

                    if (data.IsSuccess == false) {
                        this.toastr.error("Old password is not correct.", "Dashboard");
                        return;
                    }
                    this.authenticateServiceService.UpdateSession(data.data);
                    this.bankDashboardService.loggedInUser = this._authenticateServiceService.GetUserDetail();
                    this.toastr.success("Updated successfully. An email has been sent to your email id.", "Dashboard");
                }

            });
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
        //document.getElementById('updateProfile').style.display='block';
        this.bankDashboardService.NewPassword = '';
        this.bankDashboardService.ConfirmPassword = '';
        this.copyLoggedInUser = Object.assign({}, this.bankDashboardService.loggedInUser);
    }
    ShowMaturity(history:boolean) {
        this.spinner.show();
       
        if (history) {
            this.router.navigate(['bankDashboard/MaurityView/history=' + history]);
        }
     
        this.spinner.hide();

    }
    async GetLenderMaturityList(IfHistoryReportRequested: boolean) {
       
        this.spinner.show();
        let maturityList = await this.bankDashboardService.GetBorrowerMaturityList(IfHistoryReportRequested);
         this._MaturityList = maturityList;
         this.spinner.hide();
    }
    ShowScreen(screen: string) {
        if (screen == 'BankDashboard') {
            this.IfShowBankDashBoard = true;
        }
        else if (screen == 'Mreport') {
            this.GetLenderMaturityList(false);
            this.IfShowBankDashBoard = false;
        }
        else if (screen == 'HMreport') {
            this.GetLenderMaturityList(true);
            this.IfShowBankDashBoard = false;
        }
    }
    async GetLenderSendRequestRequestdOnTheBasisOfBorrowerId() {
       
        var result = await this.bankDashboardService.GetLenderSendRequestRequestdOnTheBasisOfBorrowerId();
        if (result.IsSuccess ) {
            clearInterval(this.timer);
           // this.bestPriceViewService.lenderSendRequestModel = result.data;
            var element = document.getElementById('ShowLendPopup');
            element.click();
            

            // setInterval(this.timer);
        }
        this.spinner.hide();
    }

    UpdateLenderSendRequestRateOfInterest() {

        if (!this.ValidateSendRequest(this.bestPriceViewService.lenderSendRequestModel)) {
            return false;
        }
        this.spinner.show();
        var result = this.bankDashboardService.UpdateLenderSendRequestRateOfInterest(this.bestPriceViewService.lenderSendRequestModel).subscribe(data => {
            this.toastr.success('Rate of interest saved successfully.', 'Dashboard');
            this.spinner.hide();
            this.SetTimeInterval();
            var element = document.getElementById('closeSendRequestModal');
            element.click();
            //setInterval(this.GetLenderSendRequestRequestdOnTheBasisOfBorrowerId,5000);
        });

    }

    ValidateSendRequest(requestModel: any) {

        if (requestModel.RateOfInterest == undefined || requestModel.RateOfInterest == null || requestModel.RateOfInterest.length == 0) {
            this.toastr.error("Please fill rate of interest.", "Dashboard");
            return false;
        }
        if (requestModel.RateOfInterest != undefined && requestModel.RateOfInterest != null && requestModel.RateOfInterest.length != 0) {
            try {
                if (isNaN(Number(requestModel.RateOfInterest.toString())) == true) {
                    this.toastr.error("Rate of interest must be numeric.", "Dashboard");
                    return false;
                }
            }
            catch{
                return false;
            }
        }

        if (requestModel.RateOfInterest == 0) {
            this.toastr.error('Rate of interest can not be 0.');
            return false;
        }

        return true;
    }

    //It checks if key pressed is integer or not if not then it returns false.
    numberWithDecimalOnly(event): boolean {

        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
            return false;
        }
        if (this.bestPriceViewService.lenderSendRequestModel.RateOfInterest.toString().indexOf('.') > -1 && charCode == 46)
            return false;
        if (this.bestPriceViewService.lenderSendRequestModel.RateOfInterest.toString().split(".").length > 1) {
            if (this.bestPriceViewService.lenderSendRequestModel.RateOfInterest.toString().split(".")[1].length == 2)
                return false;
        }
        return true;

    }

    ShowSendRequestModal(bank: any) {

        //  document.getElementById('modalSendRequest').style.display='block';
        //  document.getElementById('modalSendRequest').style.display='block';
        // // // this.bestPriceViewService.lenderSendRequestModel.Amount=0;
        // // // this.bestPriceViewService.lenderSendRequestModel.NoOfDays=0;
        // // // this.bestPriceViewService.lenderSendRequestModel.BorrowerId=bank.UserId;
        // // // this.bestPriceViewService.lenderSendRequestModel.LenderId=this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetUserId();
        // // // this.bestPriceViewService.lenderSendRequestModel.BorrowerName=bank.Bank;
        // // // this.bestPriceViewService.lenderSendRequestModel.LenderName=this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetLenderName();
        // // // this.bestPriceViewService.lenderSendRequestModel.StartDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
        // // // this.bestPriceViewService.lenderSendRequestModel.EndDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
        // // // this.bestPriceViewService.lenderSendRequestModel.InterestConvention=this.bestPriceViewService.listInterestConvention[0].Id;
        // // // this.bestPriceViewService.lenderSendRequestModel.Payments=this.bestPriceViewService.listPayments[0].Id;
        // // // this.bestPriceViewService.lenderSendRequestModel.LenderEmailId=this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetEmailId();
    }

    async SwitchScreen() {

        this.lenderDashboardService.userId = this._authenticateServiceService.GetUserId();
        let startPage = await this.lenderDashboardService.GetLenderStartPage();
        this.lenderDashboardService.StartingScreen = startPage;
        if (this.lenderDashboardService.StartingScreen.PageName == "Best Price View") {
            this.router.navigate(['lenderDashboard/BestPriceView']);
        }
        else if (this.lenderDashboardService.StartingScreen.PageName == "View All Price") {
            this.router.navigate(['lenderDashboard/ViewAllPrice']);
        }
        else if (this.lenderDashboardService.StartingScreen.PageName == "All Banks") {
            this.router.navigate(['lenderDashboard/AllBanks']);
        }
    }

}
