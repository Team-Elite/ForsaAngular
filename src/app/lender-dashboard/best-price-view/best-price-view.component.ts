import { Component, OnInit } from '@angular/core';
import { BestPriceViewService } from './Shared/best-price-view.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { LenderDashboardService } from '../Shared/lender-dashboard.service';
import { hubConnection, connection } from 'signalr-no-jquery';
import { environment } from '../../../environments/environment.prod';
import { UserProfileServiceService } from '../../userprofile/Shared/user-profile-service.service';
import { AuthenticateServiceService } from '../../Shared/authenticate-service.service';
import { UserModel } from '../../registration/Shared/user-model.model';

const connection = (environment.production) ? hubConnection('http://40.89.139.123:4044/signalr') : hubConnection('http://localhost:61088/signalr');

const hubProxy = connection.createHubProxy('NgHub');
@Component({
    selector: 'app-best-price-view',
    templateUrl: './best-price-view.component.html',
    styleUrls: ['./best-price-view.component.css']
})
export class BestPriceViewComponent implements OnInit {
   
    path: string;
    objBankInfo: any = { Bank: '', NameOfCompany: '', Place: '', Street: '' };
  
    constructor(public bestPriceViewService: BestPriceViewService, public spinner: NgxSpinnerService
        , public toastr: ToastrService, public pipe: DatePipe
        , public lenderDashboardService: LenderDashboardService, public userProfileServiceService: UserProfileServiceService, public authenticateServiceService: AuthenticateServiceService) {

        hubProxy.on('sendBankRate', (data) => {
            this.getData();
        })
        connection.start({ jsonp: true })
            .done(function () { console.log('Now connected, connection ID=' + connection.id); })
            .fail(function () { console.log('Could not connect'); });
    }

    p: any;
    selectedTimePeriod: number = null;
    IfBankResponseFound: boolean = false;
    timer: any;
    ngOnInit() {
        this.path = this.authenticateServiceService.baseURL + "/Uploads/Docs/";// + this.authenticateServiceService.GetUserId() + "/UserProfile/";
        this.getData();
    }

    //SetTimeInterval() {
    //    this.timer = setInterval(() => {
    //        this.getData();
    //    }, 5000);
    //}
    getData() {
        this.spinner.show();
        
        this.GetRatesByTimePeriod();
        this.bestPriceViewService.listBankByTimePeriod = [];
        var selectedTimePeriodId = undefined;
        selectedTimePeriodId = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetSavedSelectedTimePeriodId();
        if (selectedTimePeriodId != undefined) {
            this.selectedTimePeriod = selectedTimePeriodId;
            this.GetBanksByTimePeriod(selectedTimePeriodId);
        }

        this.bestPriceViewService.listInterestConvention = [{ Id: 1, Value: 'act/360' }];
        this.bestPriceViewService.listPayments = [{ Id: 1, Value: 'yearly payments' }];

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
        this.spinner.hide();

    }



    CalculateNumberOfDays() {
        
        let fromDate: any = new Date(this.bestPriceViewService.lenderSendRequestModel.StartDate);
        let toDate: any = new Date(this.bestPriceViewService.lenderSendRequestModel.EndDate);
        if (this.bestPriceViewService.lenderSendRequestModel.StartDate != "" && this.bestPriceViewService.lenderSendRequestModel.EndDate != "") {
            this.bestPriceViewService.lenderSendRequestModel.NoOfDays = (toDate - fromDate) / 86400000;
        }
        else {
            this.bestPriceViewService.lenderSendRequestModel.NoOfDays = 0;
        }
    }

    async GetRatesByTimePeriod() {

        let rates: any;
        // alert(this.lenderDashboardService.UserTypeId );
        //if (this.lenderDashboardService.UserTypeId == 5) {
        //    rates = await this.bestPriceViewService.GetRatesByTimePeriod();
        //}
        if (this.lenderDashboardService.UserTypeId == 6) {
            rates = await this.bestPriceViewService.GetRatesByTimePeriodK();
        }
        else {
            rates = await this.bestPriceViewService.GetRatesByTimePeriod();
        }


        this.bestPriceViewService.listRatesByTimePeriod = rates;
        this.spinner.hide();
    }

    async GetBanksByTimePeriod(timePeriodId: number) {
        
        //document.getElementById(timePeriodId.toString());
        this.selectedTimePeriod = timePeriodId;
        this.bestPriceViewService.lenderDashboardService.authenticateServiceService.SaveSelectedTimePeriodId(timePeriodId);
        this.bestPriceViewService.timePeriod = timePeriodId;
        this.bestPriceViewService.pageNumber = 1;
        this.spinner.show();
        let rates: any;
       
        if (this.lenderDashboardService.UserTypeId == 6) {
            rates = await this.bestPriceViewService.GetBanksByTimePeriodK();
        }
        else {
           // if (this.lenderDashboardService.UserTypeId == 5) {
                rates = await this.bestPriceViewService.GetBanksByTimePeriod();
            //}
        }
      

        this.bestPriceViewService.listBankByTimePeriod = rates;
        this.spinner.hide();
    }

    //It checks if key pressed is integer or not if not then it returns false.
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }
    ShowSendRequestModal(bank: any) {
        
        //  document.getElementById('modalSendRequest').style.display='block';
        //  document.getElementById('modalSendRequest').style.display='block';
        this.IfBankResponseFound = false;
        this.bestPriceViewService.lenderSendRequestModel = this.bestPriceViewService.lenderSendRequestModel = {
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
        };
        this.bestPriceViewService.lenderSendRequestModel.Amount = 0;
        this.bestPriceViewService.lenderSendRequestModel.NoOfDays = 0;
        this.bestPriceViewService.lenderSendRequestModel.BorrowerId = bank.UserId;
        this.bestPriceViewService.lenderSendRequestModel.LenderId = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetUserId();
        this.bestPriceViewService.lenderSendRequestModel.BorrowerName = bank.Bank;
        this.bestPriceViewService.lenderSendRequestModel.LenderName = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetLenderName();
        this.bestPriceViewService.lenderSendRequestModel.StartDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
        this.bestPriceViewService.lenderSendRequestModel.EndDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
        this.bestPriceViewService.lenderSendRequestModel.InterestConvention = this.bestPriceViewService.listInterestConvention[0].Id;
        this.bestPriceViewService.lenderSendRequestModel.Payments = this.bestPriceViewService.listPayments[0].Id;
        this.bestPriceViewService.lenderSendRequestModel.LenderEmailId = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetEmailId();
    }

    SaveSendRequest() {
        
        for (var i = 0; i <= this.bestPriceViewService.listInterestConvention.length - 1; i++) {
            if (this.bestPriceViewService.lenderSendRequestModel.InterestConvention == this.bestPriceViewService.listInterestConvention[i].Id) {
                this.bestPriceViewService.lenderSendRequestModel.InterestConventionName = this.bestPriceViewService.listInterestConvention[i].Value;
                break;
            }
        }

        for (var i = 0; i <= this.bestPriceViewService.listPayments.length - 1; i++) {
            if (this.bestPriceViewService.lenderSendRequestModel.Payments == this.bestPriceViewService.listPayments[i].Id) {
                this.bestPriceViewService.lenderSendRequestModel.PaymentsName = this.bestPriceViewService.listPayments[i].Value;
                break;
            }
        }


        if (!this.ValidateSendRequest(this.bestPriceViewService.lenderSendRequestModel)) {
            return false;
        }

        this.spinner.show();
        this.bestPriceViewService.SaveSendRequest(this.bestPriceViewService.lenderSendRequestModel).subscribe(data => {
            this.spinner.hide();
            this.toastr.success("Your Requst has been sent, kindly check your email for more details.", "Dashboard");
            var element = document.getElementById('closeSendRequestModal');
            element.click();
        })
    }

    ValidateSendRequest(requestModel: any) {

        if (requestModel.Amount == undefined && requestModel.Amount == null && requestModel.Amount.length == 0) {
            this.toastr.error("Please fill amount.", "Dashboard");
            return false;
        }
        if (requestModel.Amount != undefined && requestModel.Amount != null && requestModel.Amount.length != 0) {
            try {
                if (isNaN(Number(requestModel.Amount.toString())) == true) {
                    this.toastr.error("Amount must be numeric.", "Registration");
                    return false;
                }
            }
            catch{
                return false;
            }
        }

        if (requestModel.Amount == 0) {
            this.toastr.error('Amounut can not be 0.');
            return false;
        }
        let currentDate: any = new Date(this.pipe.transform(new Date(), 'yyyy-MM-dd')).getTime();
        let startDate: any = new Date(requestModel.StartDate).getTime();
        let endDate: any = new Date(requestModel.EndDate).getTime();
        if (startDate < currentDate) {
            this.toastr.error('Start date can not be less than from today date.');
            return false;
        }

        if (endDate < currentDate) {
            this.toastr.error('End date can not be less than from today date.');
            return false;
        }

        if (endDate < startDate) {
            this.toastr.error('End date can not be less than start date.');
            return false;
        }

        if (currentDate == endDate) {
            this.toastr.error('Start and End date can not be same.');
            return false;
        }

        return true;
    }
    async ShowBankPopup(data: any) {
        this.spinner.show();

        await this.userProfileServiceService.GetDocList(data.UserId);
        //this.objBankInfo.UserFiles = this.userProfileServiceService.listOfFileUploaded
        this.objBankInfo = await this.authenticateServiceService.GetUserById(data.UserId)[0];

        this.spinner.hide();
        var element = document.getElementById('btnShowBankInfo');
        element.click();

    }

}
