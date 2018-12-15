import { Component, OnInit } from '@angular/core';
//import { BankDashboardService } from '../../Shared/bank-dashboard.service';
import { AuthenticateServiceService } from '../Shared/authenticate-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BestPriceViewService } from '../lender-dashboard/best-price-view/Shared/best-price-view.service';
import { DatePipe } from '@angular/common';
import { LenderDashboardService } from '../lender-dashboard/Shared/lender-dashboard.service';
import { LenderSendRequestModel } from '../lender-dashboard/best-price-view/Shared/lender-send-request-model.class';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { parse } from 'url';
import { TokenService } from '../token-service';
import { RequestOptions, RequestMethod, Headers, Response } from '@angular/http';
import { BankDashboardService } from '../bank-dashboard/Shared/bank-dashboard.service';
declare var $: any;

@Component({
  selector: 'app-maturity-list',
  templateUrl: './maturity-list.component.html',
  styleUrls: ['./maturity-list.component.css']
})
export class MaturityListComponent implements OnInit {
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
    orderBy:string='EndDate';
    //lenderSendRequestModel: LenderSendRequestModel;
    //_authenticateServiceService: AuthenticateServiceService

    async GetMaturityList(orderBy:string) {
        this.orderBy=orderBy;
        if (window.location.hash.replace("#","") === '/maturityList') this._MaturityList = await this.bankDashService.GetBorrowerMaturityList(true, this._authenticateServiceService.GetUserId(),this.orderBy);
        if (window.location.hash.replace("#", "") === '/historyMaturityList') this._MaturityList = await this.bankDashService.GetBorrowerMaturityList(false, this._authenticateServiceService.GetUserId(),this.orderBy)
    }
    _history: boolean;
    http: any;
    _authenticateServiceService: AuthenticateServiceService;
    _tokenService: TokenService;
    headerOptions = new Headers({ 'Content-Type': 'application/json' });
    requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });
    _landerdashboardservice: LenderDashboardService;

    constructor(public authenticateServiceService: AuthenticateServiceService, public landerdashboardservice: LenderDashboardService, private exportAsService: ExportAsService,
        private activeRoute: ActivatedRoute, private spinner: NgxSpinnerService, private toastr: ToastrService, public bankDashService: BankDashboardService, private router: Router) {
        this._authenticateServiceService = authenticateServiceService;
        this._landerdashboardservice = landerdashboardservice;


    }
    config: ExportAsConfig = {
        type: 'pdf',
        elementId: 'mytable',
    };
    ngOnInit() {
        this.IfShowBankDashBoard = true;
        this.IfBothUserTypeFound = this._authenticateServiceService.GetIfBothUserTypeFound() == (undefined || null) ? false : true;
        this.bankDashService.userId = this._authenticateServiceService.GetUserId();
        this.GetRateOfInterestOfBank();
        this.GetUserGroupForSettingRateOfInterestVisibility();
        this.bankDashService.loggedInUser = this._authenticateServiceService.GetUserDetail();
        this.copyLoggedInUser = Object.assign({}, this.bankDashService.loggedInUser);
        this.GetMaturityList('EndDate');


        //this.activeRoute.url.subscribe(url => {
        //    console.log(url);
        //})
        //this.GetMaturityList();
    }


    exportAs(type) {
        this.config.type = type;
        this.exportAsService.save(this.config, 'myFile');
        //this.exportAsService.get(this.config).subscribe(content => {
        //   console.log(content);
        // });
    }
    Logout() {
        //if(confirm("Are you sure you want to log out?")){
        this._authenticateServiceService.ClearSession();
        this.authenticateServiceService.ClearSession();
        this.router.navigate(['/login']);
        //}
    }
    PublishAndUnPublish(value) {
        this.spinner.show();
        this.bankDashService.PublishAndUnPublish(value).subscribe(data => {
            this.spinner.hide();
            this.IsPublished = value;
            this.toastr.success("Changes saved successfully.", "Dashboard");
        })
    }
    async GetRateOfInterestOfBank() {

        await this.bankDashService.GetRateOfInterestOfBank();
        if (this.bankDashService.listRateOfInterestOfBankModel != undefined && this.bankDashService.listRateOfInterestOfBankModel != null
            && this.bankDashService.listRateOfInterestOfBankModel.length != 0) {
            this.IsPublished = this.bankDashService.listRateOfInterestOfBankModel[0].IsPublished;

            console.log(this.bankDashService.listRateOfInterestOfBankModel);

            for (let i = 0; i < this.Timeperiod.length; i++) {
                ;
                let splitetimepriod = this.Timeperiod[i];

                if (splitetimepriod == "Week") {
                    for (let j = 0; j < this.bankDashService.listRateOfInterestOfBankModel.length; j++) {
                        let splitetimepriod1 = this.bankDashService.listRateOfInterestOfBankModel[j].TimePeriod.split(" ");
                        if (splitetimepriod1[1] == "Week") {
                            this.Week.push(this.bankDashService.listRateOfInterestOfBankModel[j])
                        }

                    }


                }
                else if (splitetimepriod == "Month") {

                    for (let j = 0; j < this.bankDashService.listRateOfInterestOfBankModel.length; j++) {
                        let splitetimepriod1 = this.bankDashService.listRateOfInterestOfBankModel[j].TimePeriod.split(" ");
                        if (splitetimepriod1[1] == "Month") {
                            this.Month.push(this.bankDashService.listRateOfInterestOfBankModel[j])
                        }
                    }


                }
                else if (splitetimepriod == "Year") {
                    for (let j = 0; j < this.bankDashService.listRateOfInterestOfBankModel.length; j++) {
                        let splitetimepriod1 = this.bankDashService.listRateOfInterestOfBankModel[j].TimePeriod.split(" ");
                        if (splitetimepriod1[1] == "Year") {
                            this.Year.push(this.bankDashService.listRateOfInterestOfBankModel[j])
                        }
                    }

                }
                this.flagArray[i] = true;
                // this.listrateofinterstofbank.push({})
            }
            this.listrateofinterstofbank.push({ timeprioed: "Week", listintersteRate: this.Week });
            this.listrateofinterstofbank.push({ timeprioed: "Month", listintersteRate: this.Month });
            this.listrateofinterstofbank.push({ timeprioed: "Year", listintersteRate: this.Year });
            console.log(this.listrateofinterstofbank);

            // this.listrateofinterstofbank=this.bankDashService.listRateOfInterestOfBankModel;
        }
    }
    async GetUserGroupForSettingRateOfInterestVisibility() {
        this.spinner.show();
        await this.bankDashService.GetUserGroupForSettingRateOfInterestVisibility();
        // Checking if only one group is left checked or not.
        // If true then disabling control from getting unchecked.
        this.IfLastGroupLeftThenDisablingControl();
        this.spinner.hide();
    }
    ShowScreen(screen: string) {
        if (screen == 'BankDashboard') {
            this.IfShowBankDashBoard = true;
            this.router.navigate(['/bankDashBoard']);
        }
        //else if (screen == 'Mreport') {
        //    this.GetMaturityList('EndDate');
        //    this.IfShowBankDashBoard = false;
        //}
        else //if (screen == 'HMreport') {
        {  this.GetMaturityList('EndDate');
            this.IfShowBankDashBoard = false;
        }
    }
    IfLastGroupLeftThenDisablingControl() {
        var numberOfGroupsChecked = 0;
        for (var i = 0; i <= this.bankDashService.listUserGroupForSettingRateOfInterestVisibility.length - 1; i++) {
            let obj: any = this.bankDashService.listUserGroupForSettingRateOfInterestVisibility[i];
            if (obj.RateVisible) {
                this.bankDashService.lastGroupId = obj.GroupName;
                numberOfGroupsChecked++;
            }
        }
        if (numberOfGroupsChecked == 1) {

        }
        else {
            this.bankDashService.lastGroupId = '';
        }
    }

    GroupCheckUnCheck(event, group) {
        //    
        let groupsString: string = '';
        var ifNoneIsSelected: boolean = true;

        // Making string of group ids which are checked.
        for (var i = 0; i <= this.bankDashService.listUserGroupForSettingRateOfInterestVisibility.length - 1; i++) {
            let obj: any = this.bankDashService.listUserGroupForSettingRateOfInterestVisibility[i];
            // if(obj.GroupName != group.GroupName && obj.IfRateWillBeVisible == true){
            if (obj.RateVisible == true) {
                ifNoneIsSelected = false;
                groupsString = groupsString + obj.GroupId + ',';
            }
        }


        groupsString = groupsString.substring(0, groupsString.length - 1);

        // Checking if none is selected then not saving last remaining grous value in db.
        if (!ifNoneIsSelected) {
            this.spinner.show();
            this.bankDashService.UpdateUserGroupAgainstBankWhomRateOfInterestWillBeVisible(groupsString).subscribe(data => {
                this.spinner.hide();
                this.toastr.success("Saved successfully.", "Dashboard");

                // Checking if only one group is left checked or not.
                // If true then disabling control from getting unchecked.
                this.IfLastGroupLeftThenDisablingControl();
            })
        }
    }

}
