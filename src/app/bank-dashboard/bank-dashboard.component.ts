import { Component, OnInit } from '@angular/core';
import { BankDashboardService } from './Shared/bank-dashboard.service';
import { AuthenticateServiceService } from '../Shared/authenticate-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BestPriceViewService } from '../lender-dashboard/best-price-view/Shared/best-price-view.service';
import { DatePipe } from '@angular/common';
import { LenderDashboardService } from '../lender-dashboard/Shared/lender-dashboard.service';
import { LenderSendRequestModel } from '../lender-dashboard/best-price-view/Shared/lender-send-request-model.class';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { parse } from 'url';
import { state } from '@angular/animations';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-bank-dashboard',
    templateUrl: './bank-dashboard.component.html',
    styleUrls: ['./bank-dashboard.component.css']
})
export class BankDashboardComponent implements OnInit {
    tempValue: any;
    IfRequestSent:boolean=false;
    state: string = "expanded";
    bankRateOfinterst: any[];
    _MaturityList: any;
    IfShowBankDashBoard: boolean;
    IsPublished: boolean = false;
    copyLoggedInUser: any;
    testTrue: boolean = false;
    timer: any;
    
    listrateofinterstofbank: any = [];
    flagArray = [];
    Timeperiod = ['Week', 'Month', 'Year']
    Week = [];
    Month = [];
    Year = [];
    IfBothUserTypeFound: boolean = false;
    lenderSendRequestModel: LenderSendRequestModel;
    _authenticateServiceService: AuthenticateServiceService
    orderBy:string='EndDate';
    responseTimerId: any;
    responseMessage:string='';



    constructor(public bankDashboardService: BankDashboardService, public authenticateServiceService: AuthenticateServiceService, public router: Router
        , public toastr: ToastrService, public spinner: NgxSpinnerService, public bestPriceViewService: BestPriceViewService
        , public pipe: DatePipe, public lenderDashboardService: LenderDashboardService, private exportAsService: ExportAsService) {

        this._authenticateServiceService = authenticateServiceService;
    }

    config: ExportAsConfig = {
        type: 'pdf',
        elementId: 'mytable',
    };
    exportAs(type) {
        this.config.type = type;
        this.exportAsService.save(this.config, 'myFile');
        // this.exportAsService.get(this.config).subscribe(content => {
        //   console.log(content);
        // });
    }
   
    ngOnInit() {
        this.spinner.show();

        //  this.authenticateServiceService.AuthenticateSession();
        this.IfShowBankDashBoard = true;
        this.IfBothUserTypeFound = this._authenticateServiceService.GetIfBothUserTypeFound() == (undefined || null) ? false : true;
        this.bankDashboardService.userId = this._authenticateServiceService.GetUserId();
        this.GetRateOfInterestOfBank();
        this.GetUserGroupForSettingRateOfInterestVisibility();
        this.bankDashboardService.loggedInUser = this._authenticateServiceService.GetUserDetail();
        this.copyLoggedInUser = Object.assign({}, this.bankDashboardService.loggedInUser);
        this.SetTimeInterval();

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
           
            console.log(this.bankDashboardService.listRateOfInterestOfBankModel);

            for (let i = 0; i < this.Timeperiod.length; i++) {
                ;
                let splitetimepriod = this.Timeperiod[i];

                if (splitetimepriod == "Week") {
                    for (let j = 0; j < this.bankDashboardService.listRateOfInterestOfBankModel.length; j++) {
                        let splitetimepriod1 = this.bankDashboardService.listRateOfInterestOfBankModel[j].TimePeriod.split(" ");
                        if (splitetimepriod1[1] == "Week") {
                            this.bankDashboardService.listRateOfInterestOfBankModel[j].TimePeriodShort = splitetimepriod1[0] + " " + splitetimepriod1[1].substr(0, 1);

                            this.Week.push(this.bankDashboardService.listRateOfInterestOfBankModel[j])
                        }

                    }
                    this.flagArray[i] = false;

                }
                else if (splitetimepriod == "Month") {

                    for (let j = 0; j < this.bankDashboardService.listRateOfInterestOfBankModel.length; j++) {
                        let splitetimepriod1 = this.bankDashboardService.listRateOfInterestOfBankModel[j].TimePeriod.split(" ");
                       
                        if (splitetimepriod1[1] == "Month") {
                            this.bankDashboardService.listRateOfInterestOfBankModel[j].TimePeriodShort = splitetimepriod1[0] +" "+ splitetimepriod1[1].substr(0, 1);
                            this.Month.push(this.bankDashboardService.listRateOfInterestOfBankModel[j])
                        }
                    }
                    this.flagArray[i] = true;

                }
                else if (splitetimepriod == "Year") {
                    for (let j = 0; j < this.bankDashboardService.listRateOfInterestOfBankModel.length; j++) {

                        let splitetimepriod1 = this.bankDashboardService.listRateOfInterestOfBankModel[j].TimePeriod.split(" ");
                        
                        if (splitetimepriod1[1] == "Year") {
                            this.bankDashboardService.listRateOfInterestOfBankModel[j].TimePeriodShort = splitetimepriod1[0] + " " + splitetimepriod1[1].substr(0, 1);
                            this.Year.push(this.bankDashboardService.listRateOfInterestOfBankModel[j])
                        }
                    }
                    this.flagArray[i] = false;
                }
                
                // this.listrateofinterstofbank.push({})
            }
          
            this.listrateofinterstofbank.push({ timeprioed: "Week", listintersteRate: this.Week });
            this.listrateofinterstofbank.push({ timeprioed: "Month", listintersteRate: this.Month });
            this.listrateofinterstofbank.push({ timeprioed: "Year", listintersteRate: this.Year });
            console.log(this.listrateofinterstofbank);

            // this.listrateofinterstofbank=this.bankDashboardService.listRateOfInterestOfBankModel;
        }
    }

    EnableTextBox(rate, type: number) {
        
        if (type == 1)
            rate.IsDoubleTapped1 = true;
        else if (type == 2)
            rate.IsDoubleTapped2 = true;
        else if (type == 3)
            rate.IsDoubleTapped3 = true;
        else if (type == 4)
            rate.IsDoubleTapped4 = true;
        else if (type == 5)
            rate.IsDoubleTapped5 = true;
        else if (type == 6)
            rate.IsDoubleTapped6 = true;
    }
    EnableTextBox2() {
        this.testTrue = true;
    }


    UpdateRateOfInterest(rate) {

        if (rate.BaseCurve == undefined || rate.BaseCurve == null || rate.BaseCurve.length == 0) {
            this.toastr.error("Rate1 must be entered.", "Dashboard");
            return;
        }
        if (rate.BaseCurve > 9999.99) {
            this.toastr.error("Interest rate1 can not be greater than 9999.99", "Dashboard");
            return;
        }
        if (rate.BaseCurve < -9999.99) {
            this.toastr.error("Interest rate1 can not be less than -9999.99", "Dashboard");
            return;
        }




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
        rate.IsDoubleTapped1 = false;
        rate.ModifiedBy = this.bankDashboardService.userId;
        //rate.RateOfInterest = parseFloat( rate.RateOfInterest).toFixed(2);
        //rate.RateOfInterest2 = parseFloat(rate.RateOfInterest2).toFixed(2);
        //rate.RateOfInterest3 = parseFloat(rate.RateOfInterest3).toFixed(2);

        /************************************/
        //puneet changes 2018-12-26
        rate.RateOfInterest = parseInt(rate.RateOfInterest);
        rate.RateOfInterest2 = parseInt(rate.RateOfInterest2);
        rate.RateOfInterest3 = parseInt(rate.RateOfInterest3);
        rate.FractionRate = parseInt(rate.FractionRate);
        rate.FractionRate2 = parseInt(rate.FractionRate2);
        rate.FractionRate3 = parseInt(rate.FractionRate3);
        /*******************************/
        rate.BaseCurve = parseFloat(rate.BaseCurve).toFixed(2);
        //this.spinner.show();
        //this.bankDashboardService.UpdateRateOfInterest(rate).subscribe(data => {
        //    this.spinner.hide();
        //})
        this.CalculateBaseCurve(rate)
        
    }
    CalculateBaseCurve(rate) {
        //changes in calculation so that comma can be converted to dot in interest rate
        //#region Commented code . This Code is Replace a ',' Seprated Value Replace in '.'
        //start

        //if (parseFloat(rate.BaseCurve.replace(',', '.')) && typeof parseFloat(rate.BaseCurve.replace(',','.')) === 'number') {
        //    rate.BaseCurve = parseFloat(rate.BaseCurve.replace(',','.')).toFixed(2)
        //} else{
        //    //rate.BaseCurve = 0;
        //  //  this.toastr.warning("Ihre Eingabe enthält unzulässige Zeichen", "Dashboard");
        //}
        //end done by prabhjot
        //#endregion
        rate.RateOfInterest = ((rate.FractionRate/100) + parseFloat(rate.BaseCurve)).toFixed(2);
        rate.RateOfInterest2 = ((rate.FractionRate2/100) + parseFloat(rate.BaseCurve)).toFixed(2);;
        rate.RateOfInterest3 = ((rate.FractionRate3/100) + parseFloat(rate.BaseCurve)).toFixed(2);;
        // this.UpdateRateOfInterest(rate);
        $(".update").addClass("btn-secondary");
        $(".update").removeClass("update-active");
    }
    
    //IncreaseRateOfInterest(rate, type: number) {
    //    ;
    //    if (type == 3) {
    //        if (rate.BaseCurve == undefined || rate.BaseCurve == null || rate.BaseCurve.length == 0) {
    //            this.toastr.error("Rate must be entered.", "Dashboard");
    //            return;
    //        }

    //        if (rate.BaseCurve >= 9999.99) {
    //            this.toastr.error("Interest rate can not be greater than 9999.99", "Dashboard");
    //            return;
    //        }
          
    //        rate.BaseCurve = parseFloat(rate.BaseCurve) + .01;
    //        rate.BaseCurve = parseFloat(rate.BaseCurve).toFixed(2);
    //    }
    //    else if (type == 4) {
    //        if (rate.RateOfInterest == undefined || rate.RateOfInterest == null || rate.RateOfInterest.length == 0) {
    //            this.toastr.error("Rate must be entered.", "Dashboard");
    //            return;
    //        }

    //        if (rate.RateOfInterest >= 9999.99) {
    //            this.toastr.error("Interest rate can not be greater than 9999.99", "Dashboard");
    //            return;
    //        }
    //        rate.FractionRate = parseInt(rate.FractionRate);
    //        rate.RateOfInterest = parseFloat(rate.RateOfInterest) + .01;
    //        rate.RateOfInterest = parseFloat(rate.RateOfInterest).toFixed(2);
    //    }
    //    else if (type == 5) {
    //        if (rate.RateOfInterest2 == undefined || rate.RateOfInterest2 == null || rate.RateOfInterest2.length == 0) {
    //            this.toastr.error("Rate2 must be entered.", "Dashboard");
    //            return;
    //        }

    //        if (rate.RateOfInterest2 >= 9999.99) {
    //            this.toastr.error("Interest rate2 can not be greater than 9999.99", "Dashboard");
    //            return;
    //        }
    //        rate.FractionRate2 = parseInt(rate.FractionRate2);
    //        rate.RateOfInterest2 = parseFloat(rate.RateOfInterest2) + .01;
    //        rate.RateOfInterest2 = parseFloat(rate.RateOfInterest2).toFixed(2);
    //    }
    //    else if (type == 6) {
    //        if (rate.RateOfInterest3 == undefined || rate.RateOfInterest3 == null || rate.RateOfInterest3.length == 0) {
    //            this.toastr.error("Rate3 must be entered.", "Dashboard");
    //            return;
    //        }

    //        if (rate.RateOfInterest3 >= 9999.99) {
    //            this.toastr.error("Interest rate3 can not be greater than 9999.99", "Dashboard");
    //            return;
    //        }
    //        rate.FractionRate3 = parseInt(rate.FractionRate3);
    //        rate.RateOfInterest3 = parseFloat(rate.RateOfInterest3) + .01;
    //        rate.RateOfInterest3 = parseFloat(rate.RateOfInterest3).toFixed(2);
    //    }

    //    rate.ModifiedBy = this.bankDashboardService.userId;
    //    //this.spinner.show();
    //    //this.bankDashboardService.UpdateRateOfInterest(rate).subscribe(data => {
    //    //    this.spinner.hide();
    //    //})
    //   this.CalculateBaseCurve(rate)
    //}
    IncreaseRateOfInterest(rate, type: number) {
      
        if (type == 3) {
            if (rate.BaseCurve == undefined || rate.BaseCurve == null || rate.BaseCurve.length == 0) {
                this.toastr.error("Rate must be entered.", "Dashboard");
                return;
            }

            if (rate.BaseCurve <= -9999.99) {
                this.toastr.error("Interest rate can not be less than 9999.99", "Dashboard");
                return;
            }
            console.log("Puneet Call...........");
           // console.log(rate.BaseCurve);
            rate.BaseCurve = parseFloat(rate.BaseCurve) + .01;
            rate.BaseCurve = parseFloat(rate.BaseCurve).toFixed(2);
        }
        else if (type == 4) {
            if (rate.FractionRate == undefined || rate.FractionRate == null || rate.FractionRate.length == 0) {
                this.toastr.error("Fraction Rate must be entered.", "Dashboard");
                return;
            }
            if (rate.FractionRate <= -9999.99) {
                this.toastr.error("Fraction Rate rate can not be less than -9999.99", "Dashboard");
                return;
            }
            rate.FractionRate = parseFloat(rate.FractionRate) + 1;
            rate.FractionRate = parseInt(rate.FractionRate);
            //rate.RateOfInterest = parseFloat(rate.RateOfInterest) - .01;
            //rate.RateOfInterest = parseFloat(rate.RateOfInterest).toFixed(2);
        }
        else if (type == 5) {
            if (rate.FractionRate2 == undefined || rate.FractionRate2 == null || rate.FractionRate2.length == 0) {
                this.toastr.error("Fraction Rate 2 must be entered.", "Dashboard");
                return;
            }
            if (rate.FractionRate2 <= -9999.99) {
                this.toastr.error("Fraction Rate2 can not be less than -9999.99", "Dashboard");
                return;
            }
            rate.FractionRate2 = parseFloat(rate.FractionRate2) + 1;
            rate.FractionRate2 = parseInt(rate.FractionRate2);

            //rate.FractionRate2 = parseInt(rate.FractionRate2);
            //rate.RateOfInterest2 = parseFloat(rate.RateOfInterest2) - .01;
            //rate.RateOfInterest2 = parseFloat(rate.RateOfInterest2).toFixed(2);
        }
        else if (type == 6) {
            if (rate.FractionRate3 == undefined || rate.FractionRate3 == null || rate.FractionRate3.length == 0) {
                this.toastr.error("Fraction Rate 3 must be entered.", "Dashboard");
                return;
            }
            if (rate.RateOfInterest3 <= -9999.99) {
                this.toastr.error("Fraction rate3 can not be less than -9999.99", "Dashboard");
                return;
            }
            rate.FractionRate3 = parseFloat(rate.FractionRate3) + 1;
            rate.FractionRate3 = parseInt(rate.FractionRate3);
            //rate.RateOfInterest3 = parseFloat(rate.RateOfInterest3) - .01;
            //rate.RateOfInterest3 = parseFloat(rate.RateOfInterest3).toFixed(2);
        }

        rate.ModifiedBy = this.bankDashboardService.userId;
        //this.spinner.show();
        //this.bankDashboardService.UpdateRateOfInterest(rate).subscribe(data => {
        //    this.spinner.hide();
        //})
        this.CalculateBaseCurve(rate);
       
    }
    DecreaseRateOfInterest(rate, type: number) {
        if (type == 3) {
            if (rate.BaseCurve == undefined || rate.BaseCurve == null || rate.BaseCurve.length == 0) {
                this.toastr.error("Rate must be entered.", "Dashboard");
                return;
            }

            if (rate.BaseCurve <= -9999.99) {
                this.toastr.error("Interest rate can not be less than 9999.99", "Dashboard");
                return;
            }
            rate.BaseCurve = parseFloat(rate.BaseCurve) - .01;
            rate.BaseCurve = parseFloat(rate.BaseCurve).toFixed(2);
        }
        else if (type == 4) {
            if (rate.FractionRate == undefined || rate.FractionRate == null || rate.FractionRate.length == 0) {
                this.toastr.error("Fraction Rate must be entered.", "Dashboard");
                return;
            }
            if (rate.FractionRate <= -9999.99) {
                this.toastr.error("Fraction Rate rate can not be less than -9999.99", "Dashboard");
                return;
            }
            rate.FractionRate = parseFloat(rate.FractionRate) - 1;
            rate.FractionRate = parseInt(rate.FractionRate);
            //rate.RateOfInterest = parseFloat(rate.RateOfInterest) - .01;
            //rate.RateOfInterest = parseFloat(rate.RateOfInterest).toFixed(2);
        }
        else if (type == 5) {
            if (rate.FractionRate2 == undefined || rate.FractionRate2 == null || rate.FractionRate2.length == 0) {
                this.toastr.error("Fraction Rate 2 must be entered.", "Dashboard");
                return;
            }
            if (rate.FractionRate2 <= -9999.99) {
                this.toastr.error("Fraction Rate2 can not be less than -9999.99", "Dashboard");
                return;
            }
            rate.FractionRate2 = parseFloat(rate.FractionRate2) - 1;
            rate.FractionRate2 = parseInt(rate.FractionRate2);

            //rate.FractionRate2 = parseInt(rate.FractionRate2);
            //rate.RateOfInterest2 = parseFloat(rate.RateOfInterest2) - .01;
            //rate.RateOfInterest2 = parseFloat(rate.RateOfInterest2).toFixed(2);
        }
        else if (type == 6) {
            if (rate.FractionRate3 == undefined || rate.FractionRate3 == null || rate.FractionRate3.length == 0) {
                this.toastr.error("Fraction Rate 3 must be entered.", "Dashboard");
                return;
            }
            if (rate.RateOfInterest3 <= -9999.99) {
                this.toastr.error("Fraction rate3 can not be less than -9999.99", "Dashboard");
                return;
            }
            rate.FractionRate3 = parseFloat(rate.FractionRate3) - 1;
            rate.FractionRate3 = parseInt(rate.FractionRate3);
            //rate.RateOfInterest3 = parseFloat(rate.RateOfInterest3) - .01;
            //rate.RateOfInterest3 = parseFloat(rate.RateOfInterest3).toFixed(2);
        }

        rate.ModifiedBy = this.bankDashboardService.userId;
        //this.spinner.show();
        //this.bankDashboardService.UpdateRateOfInterest(rate).subscribe(data => {
        //    this.spinner.hide();
        //})
        this.CalculateBaseCurve(rate);
        $(".update").addClass("btn-secondary");
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
            if (obj.RateVisible == true) {
                ifNoneIsSelected = false;
                groupsString = groupsString + obj.GroupId + ',';
            }
        }


        groupsString = groupsString.substring(0, groupsString.length - 1);

        // Checking if none is selected then not saving last remaining grous value in db.
        ///if (!ifNoneIsSelected) {
            this.spinner.show();
            this.bankDashboardService.UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible(groupsString).subscribe(data => {
                this.spinner.hide();
                this.toastr.success("Saved successfully.", "Dashboard");

                // Checking if only one group is left checked or not.
                // If true then disabling control from getting unchecked.
                this.IfLastGroupLeftThenDisablingControl();
            })
       // }
    }
    update(ratedata) {
        $(".update").removeClass("btn-secondary");
        $(".update").addClass("update-active");
        this.bankRateOfinterst = [];
        for (let i = 0; i < ratedata.length; i++) {
            let ratebankdetail = ratedata[i].listintersteRate
            for (let j = 0; j < ratebankdetail.length; j++) {
                this.bankRateOfinterst.push(ratebankdetail[j])
            }
        }
        this.spinner.show();
        this.bankDashboardService.UpdateRateOfInterest(this.bankRateOfinterst).subscribe(data => {
            this.spinner.hide();
        })

        console.log(this.bankRateOfinterst);
    }

    IfLastGroupLeftThenDisablingControl() {
        var numberOfGroupsChecked = 0;
        for (var i = 0; i <= this.bankDashboardService.listUserGroupForSettingRateOfInterestVisibility.length - 1; i++) {
            let obj: any = this.bankDashboardService.listUserGroupForSettingRateOfInterestVisibility[i];
            if (obj.RateVisible) {
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

    async ChangePassword() {

        /* Validating controls */
        if (this.ValidateUserPfrofileFields(this.copyLoggedInUser, this.bankDashboardService.NewPassword, this.bankDashboardService.ConfirmPassword)) {
            this.copyLoggedInUser.NewPassword = this.bankDashboardService.NewPassword.trim();
            this.copyLoggedInUser.Password = this.copyLoggedInUser.Password.trim();
            this.spinner.show();
            var data;
            data = await this.bankDashboardService.UpdateUserProfile(this.copyLoggedInUser);
                this.spinner.hide();
                if (data != undefined && data != null) {

                    if (data.IsSuccess == false) {
                        this.toastr.error("Old password is not correct.", "Dashboard");
                        return;
                    }
                    var element = document.getElementById('closeUpdateProfileModal');
                    element.click();
                    this.authenticateServiceService.UpdateSession(data.data);
                    this.toastr.success("Updated successfully. An email has been sent to your email id.", "Dashboard");
                    this.bankDashboardService.loggedInUser = this._authenticateServiceService.GetUserDetail();
                 
                }

            
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

        if (NewPassword.trim().length < 3) {
            this.toastr.error("Password must be at least of three characters.", "Dashboard");
            return false;
        }
        if (NewPassword.trim().length > 20) {
            this.toastr.error("Password must be at least of less then twenty characters.", "Dashboard");
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
        let maturityList = await this.bankDashboardService.GetBorrowerMaturityList(IfHistoryReportRequested, this.bankDashboardService.loggedInUser.UserId, this.orderBy);
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

        this.lenderSendRequestModel = await this.bankDashboardService.GetLenderSendRequestRequestdOnTheBasisOfBorrowerId();
       
        if (this.lenderSendRequestModel != undefined) {
            this.lenderSendRequestModel = this.lenderSendRequestModel[0];
            if(this.lenderSendRequestModel.Amount) {
                this.tempValue = this.lenderSendRequestModel.Amount;
                this.tempValue = this.lenderSendRequestModel.Amount.toLocaleString('de-DE');
            }
            clearInterval(this.timer);
            //this.bestPriceViewService.lenderSendRequestModel = result.data;
            //$('#modalSendRequest').modal('show');
            this.IfRequestSent=false;
            var element = document.getElementById('ShowLendPopup');
            element.click();
            

            // setInterval(this.timer);
        }
        this.spinner.hide();
    }
    iconChange(i: number) {
        this.flagArray[i] = !this.flagArray[i];
    }
    UpdateLenderSendRequestRateOfInterest() {

        if (!this.ValidateSendRequest(this.lenderSendRequestModel)) {
            return false;
        }
        this.spinner.show();
        var result = this.bankDashboardService.UpdateLenderSendRequestRateOfInterest(this.lenderSendRequestModel).subscribe(data => {
            // this.toastr.success('Die Anfrage wurde erfolgreich beantwortet, bitte warten Sie auf die Antwort des Geldgebers.', 'Dashboard');
            this.spinner.hide();
            //this.SetTimeInterval();
            this.IfRequestSent=true;

          

            // Starting timer for getting response of this particular request
            this.SetResponseTimeInterval(this.lenderSendRequestModel.RequestId);

            // var element = document.getElementById('closeSendRequestModal');
            // element.click();
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
        if (this.lenderSendRequestModel.RateOfInterest.toString().indexOf('.') > -1 && charCode == 46)
            return false;
        if (this.lenderSendRequestModel.RateOfInterest.toString().split(".").length > 1) {
            if (this.lenderSendRequestModel.RateOfInterest.toString().split(".")[1].length == 2)
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
        console.log("Switch Screen Call");
        this.lenderDashboardService.userId = this._authenticateServiceService.GetUserId();
        let startPage = await this.lenderDashboardService.GetLenderStartPage();
        this.lenderDashboardService.StartingScreen = startPage;
        if (this.lenderDashboardService.StartingScreen.PageName == "Best Price View") {
            this.router.navigate(['/lenderDashboard/BestPriceView']);
        }
        else if (this.lenderDashboardService.StartingScreen.PageName == "View All Price") {
            this.router.navigate(['/lenderDashboard/ViewAllPrice']);
        }
        else if (this.lenderDashboardService.StartingScreen.PageName == "All Banks") {
            this.router.navigate(['/lenderDashboard/AllBanks']);
        }
    }
   // $('#navbar-toggle').click(function() {
    toggelebar() {
        if ($("body").hasClass('sidebar-mini')) {
            $('.sidebar').css('margin-left', '0px');
            $("body").removeClass("sidebar-mini ")
        } else {
            $('.sidebar').css('margin-left', '-212px');
            $("body").addClass("sidebar-mini ")
        }
       

        

    }
    
    //})




    /* STARTS--------Repsonse of Lender request work starts here  */


    // Starting timer which will retrieve response of a particular request.
    SetResponseTimeInterval(RequestId:number) {
      
        this.responseTimerId = setInterval(() => {
            this.GetAndUpdateResponseOfPendingRequestOnTheBasisOfRequestId(RequestId);
        }, 5000);
    }

    // Get response method. It gets response when borrower add rate of interest and send it to lender.
    // It also updates status of response is shown to borrower.
    async GetAndUpdateResponseOfPendingRequestOnTheBasisOfRequestId(RequestId:number) {
      
        var obj={RequestId:RequestId,UserTypeId:4};
        var responseRequestModel = await this.bankDashboardService.GetAndUpdateResponseOfPendingRequestOnTheBasisOfRequestId(obj);
     
        if (responseRequestModel != undefined) {

            // this variaable will be by default false.
            // It will be true once any of response i.e Accepted/Rejected/Forsa Response is received.
            var ifAnyResponseFound=false;

            responseRequestModel = responseRequestModel[0];
            if ((!isNullOrUndefined( responseRequestModel.IsAcceptedResponseReceivedByBorrower) 
                    && responseRequestModel.IsAcceptedResponseReceivedByBorrower == true)&& isNullOrUndefined(responseRequestModel.IsForsaAcceptedResponseReceivedByBorrower)){
                        // Show popup response accepted.
                    this.responseMessage = responseRequestModel.NameOfCompany +" has accepted your request. Please check your email.";
                        ifAnyResponseFound=true;
                        var elementResponseModal = document.getElementById('ShowResponseModalPopup');
                        elementResponseModal.click();
                    }
            else if (!isNullOrUndefined((responseRequestModel.IsRejectedResponseReceivedByBorrower)
                    && responseRequestModel.IsRejectedResponseReceivedByBorrower == true) && isNullOrUndefined(responseRequestModel.IsForsaRejectedResponseReceivedByBorrower)  ) {
                            // Show popup response rejected.
                            this.responseMessage=responseRequestModel.NameOfCompany+ " has declined your request.";
                            ifAnyResponseFound=true;
                            var elementResponseModal = document.getElementById('ShowResponseModalPopup');
                            elementResponseModal.click();
                        }
            else if (!isNullOrUndefined( responseRequestModel.IsForsaAcceptedResponseReceivedByBorrower)
                            && responseRequestModel.IsForsaAcceptedResponseReceivedByBorrower == true){
                                // Show popup when forsa accepted response.
                                this.responseMessage="Forsa has accepted your request!";
                                ifAnyResponseFound=true;
                                var elementResponseModal = document.getElementById('ShowResponseModalPopup');
                                elementResponseModal.click();
                            }

            else if (!isNullOrUndefined(responseRequestModel.IsForsaRejectedResponseReceivedByBorrower)
                                && responseRequestModel.IsForsaRejectedResponseReceivedByBorrower == true){
                                    // Show popup when forsa rejected response.
                    this.responseMessage ="Forsa has declined your request!";
                                    ifAnyResponseFound=true;
                                    var elementResponseModal = document.getElementById('ShowResponseModalPopup');
                                    elementResponseModal.click();
                                }
            // Closing fill rate of interest and send pop up when response is received.
            var element = document.getElementById('closeSendRequestModal');
            element.click();

            // Stoping get response timer if any response i.e Accepted/Rejected/ Forsa response found.
            if(ifAnyResponseFound){
            clearInterval(this.responseTimerId);
            }
            
        }
        this.spinner.hide();
    }



    
    /* ENDS-----------Repsonse of Lender request work starts here */
}





