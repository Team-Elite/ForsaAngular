import { Component, OnInit } from '@angular/core';
import { BestPriceViewService } from './Shared/best-price-view.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatePipe, DeprecatedI18NPipesModule } from '@angular/common';
import { LenderDashboardService } from '../Shared/lender-dashboard.service';
import { hubConnection, connection } from 'signalr-no-jquery';
import { environment } from '../../../environments/environment.prod';
import { UserProfileServiceService } from '../../userprofile/Shared/user-profile-service.service';
import { AuthenticateServiceService } from '../../Shared/authenticate-service.service';
import { UserModel } from '../../registration/Shared/user-model.model';
import { IMyDpOptions } from 'mydatepicker';

const connection = (environment.production) ? hubConnection('http://40.89.139.123:4044') : hubConnection('http://localhost:50859');

const hubProxy = connection.createHubProxy('ForsaHub');
@Component({
    selector: 'app-best-price-view',
    templateUrl: './best-price-view.component.html',    
    styleUrls: ['./best-price-view.component.css']
})
export class BestPriceViewComponent implements OnInit {
    tempAmount: any;
    tempStorage: any;
    path: string;
    request_sent;
    objBankInfo: any = { Bank: '', NameOfCompany: '', Place: '', Street: '' };
    IfRequestSent:boolean=false;
  
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
    selectedRateType: string = '';
    selectedTimePeriod: any = null;
    IfBankResponseFound: boolean = false;
    timer: any;
    ngOnInit() {
        this.request_sent = false;
        this.path = this.authenticateServiceService.baseURL + "/Uploads/Docs/";// + this.authenticateServiceService.GetUserId() + "/UserProfile/";
        this.getData();
    }

    SetTimeInterval() {
        this.timer = setInterval(() => {
            this.getData();
        }, 5000);
    }
    getData() {
        this.spinner.show();
        
        this.GetRatesByTimePeriod();
        this.bestPriceViewService.listBankByTimePeriod = [];
       
        //selectedTimePeriodId = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetSavedSelectedTimePeriodId();
        //if (selectedTimePeriodId != undefined) {
            //this.selectedTimePeriod = selectedTimePeriodId;
            this.GetBanksByTimePeriod(2,'1 Woche');
       // }

        this.bestPriceViewService.listInterestConvention = [{ Id: 1, Value: 'act / 360' }, { Id: 2, Value: 'act / act' }];
        this.bestPriceViewService.listPayments = [{ Id: 1, Value: 'jahrliche Zahlung' }, { Id: 2, Value: 'halbjahrliche Zahlung' }, { Id: 3, Value: 'vierteljahrliche Zahlung' }, { Id: 4, Value: 'endfallig' }];

        this.bestPriceViewService.lenderSendRequestModel = {
            RequestId: 0,
            LenderId: 0,
            BorrowerId: 0,
            LenderName: '',
            BorrowerName: '',
            Amount: 0.00,
            StartDate: null,
            EndDate: null,
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
    getNumberOfDays(){
        // console.log(this.bestPriceViewService.lenderSendRequestModel.StartDate);
        // console.log(this.bestPriceViewService.lenderSendRequestModel.EndDate);
        let fromDate: any;
        let toDate: any;
        if(this.bestPriceViewService.lenderSendRequestModel.StartDate) {
            fromDate = this.bestPriceViewService.lenderSendRequestModel.StartDate['epoc'];
        }
        if(this.bestPriceViewService.lenderSendRequestModel.EndDate) {
            toDate = this.bestPriceViewService.lenderSendRequestModel.EndDate['epoc'];
        }
        if (toDate && fromDate) {
            this.bestPriceViewService.lenderSendRequestModel.NoOfDays = (toDate - fromDate) / 86400;
            return (toDate - fromDate) / 86400;
        }
        else {
            this.bestPriceViewService.lenderSendRequestModel.NoOfDays = 0
            return 0;
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

    async GetBanksByTimePeriod(timePeriodId: number,timePeriodName:string) {
        //document.getElementById(timePeriodId.toString());
        //this.selectedRateType = timePeriodId;
       
        this.selectedTimePeriod = timePeriodName;
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
        this.IfRequestSent = false;
        this.request_sent = false;
        this.bestPriceViewService.lenderSendRequestModel = this.bestPriceViewService.lenderSendRequestModel = {
            RequestId: 0,
            LenderId: 0,
            BorrowerId: 0,
            LenderName: '',
            BorrowerName: '',
            Amount: null,
            StartDate: null,
            EndDate: null,
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
        this.tempAmount = '';
        this.bestPriceViewService.lenderSendRequestModel.Amount = null;
        this.bestPriceViewService.lenderSendRequestModel.NoOfDays = 0;
        this.bestPriceViewService.lenderSendRequestModel.BorrowerId = bank.UserId;
        this.bestPriceViewService.lenderSendRequestModel.LenderId = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetUserId();
        this.bestPriceViewService.lenderSendRequestModel.BorrowerName = bank.Bank;
        this.bestPriceViewService.lenderSendRequestModel.LenderName = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetLenderName();
        // this.bestPriceViewService.lenderSendRequestModel.StartDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
        // this.bestPriceViewService.lenderSendRequestModel.EndDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
        this.bestPriceViewService.lenderSendRequestModel.InterestConvention = this.bestPriceViewService.listInterestConvention[0].Id;
        this.bestPriceViewService.lenderSendRequestModel.Payments = this.bestPriceViewService.listPayments[0].Id;
        this.bestPriceViewService.lenderSendRequestModel.LenderEmailId = this.bestPriceViewService.lenderDashboardService.authenticateServiceService.GetEmailId();
    }

    SaveSendRequest() {
        this.bestPriceViewService.lenderSendRequestModel.Amount = this.tempStorage;
        console.log(this.bestPriceViewService.lenderSendRequestModel.Amount);
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
        var d1 = this.bestPriceViewService.lenderSendRequestModel.StartDate['jsdate'];
        d1.setTime( d1.getTime() - d1.getTimezoneOffset()*60*1000 );
        var d2 = this.bestPriceViewService.lenderSendRequestModel.EndDate['jsdate'];
        d2.setTime( d2.getTime() - d2.getTimezoneOffset()*60*1000 );
        this.bestPriceViewService.SaveSendRequest({...this.bestPriceViewService.lenderSendRequestModel, ...{StartDate: d1}, ...{EndDate: d2}})
        .subscribe(data => {
            this.spinner.hide();
            this.request_sent = true;
            // this.toastr.success(".REQUEST SENT SUCCESFULLY. PLEASE WAIT FOR BORROWER’S RESPONSE.", "Dashboard");
            this.IfRequestSent=true;
            // var element = document.getElementById('closeSendRequestModal');
            // element.click();
        })
    }

    ValidateSendRequest(requestModel: any) {

        if (!requestModel.Amount || requestModel.Amount == '0') {
            this.toastr.error("Please fill amount.", "Dashboard");
            return false;
        }
        if (requestModel.Amount != undefined && requestModel.Amount != null) {
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
        let currentDate: any = (new Date(this.pipe.transform(new Date().setDate(new Date().getDate() - 1), 'yyyy-MM-dd')).getTime())/1000;
        let startDate: any = requestModel.StartDate['epoc'];
        let endDate: any = requestModel.EndDate['epoc'];

        if (!startDate) {
            this.toastr.error('Please select Start date');
            return false;
        }
        if (!endDate) {
            this.toastr.error('Please select End date');
            return false;
        }
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

        if (startDate == endDate) {
            this.toastr.error('Start and End date can not be same.');
            return false;
        }

        return true;
    }
    GermanFormat(amount) {
        if(!amount) return;
        const val = parseFloat(amount);
        this.tempStorage = val;
        this.tempAmount = val.toLocaleString('de-DE');
        console.log(this.tempAmount);
        
        // var amt = this.bestPriceViewService.lenderSendRequestModel2.Amount;
        // var parts = amt.toString().split(".");
        // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        // this.bestPriceViewService.lenderSendRequestModel2.Amount = parts.join(".");
        
    }
    async ShowBankPopup(data: any) {
        this.spinner.show();


        //this.objBankInfo.UserFiles = this.userProfileServiceService.listOfFileUploaded
        await this.authenticateServiceService.GetUserById(data.UserId,false);
        this.objBankInfo = this.authenticateServiceService.bankInfo;
        await this.userProfileServiceService.GetDocList(data.UserId);
        this.spinner.hide();
        var element = document.getElementById('btnShowBankInfo');
        element.click();

    }


}
