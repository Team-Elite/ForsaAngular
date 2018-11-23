import { Component, OnInit } from '@angular/core';
import { AuthenticateServiceService } from '../Shared/authenticate-service.service';
import { UserProfileServiceService } from './Shared/user-profile-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

    constructor(public authenticateServiceService: AuthenticateServiceService, public userProfileServiceService: UserProfileServiceService
        , public spinner: NgxSpinnerService
        , public toastr: ToastrService) { }
    userProfileData: any;
    listOfFileUploaded: any = [];
    ngOnInit() {
        this.userProfileData = this.authenticateServiceService.GetUserDetail();
    }


    fileuploaderFileChange(files: FileList) {
        debugger;
        this.spinner.show();
        const fileSelected: File = files[0];
        this.userProfileServiceService.uploadFile(fileSelected)
            .subscribe((response) => {
                debugger;
                this.spinner.hide();
                this.listOfFileUploaded[this.listOfFileUploaded.length] = { name: fileSelected.name };
                console.log('set any success actions...');
                this.toastr.success('Uploaded successfully.');
                return response;
            }
                //  .(error) => {
                //     console.log('set any error actions...');
                //   }
            );
    }


}
