import { Component, OnInit } from '@angular/core';
import { AuthenticateServiceService } from '../Shared/authenticate-service.service';
import { UserProfileServiceService } from './Shared/user-profile-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

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
    path: string;
    ngOnInit() {

debugger;
        this.getUserData();
        this.path = this.authenticateServiceService.baseURL + "/Uploads/Docs/" + this.authenticateServiceService.GetUserId() + "/UserProfile/";

        this.GetDocList();
    }
   async getUserData() {
       await this.userProfileServiceService.GetUserById(this.authenticateServiceService.GetUserId(), true);
       this.userProfileData = this.userProfileServiceService.userinfo;
       debugger;
      
    }

    fileuploaderFileChange(files: FileList) {

        this.spinner.show();
        const fileSelected: File = files[0];
        this.userProfileServiceService.uploadFile(fileSelected)
            .subscribe((response) => {

                this.spinner.hide();
                this.userProfileServiceService.listOfFileUploaded[this.userProfileServiceService.listOfFileUploaded.length] = { name: fileSelected.name, docId: parseInt(response.text()) };
                console.log('set any success actions...');
                this.toastr.success('Uploaded successfully.');
                return response;
            }
                //  .(error) => {
                //     console.log('set any error actions...');
                //   }
            );
    }

    async UpdateProfile(form: NgForm) {

        if (confirm("Are you sure to update profile")) {
            this.spinner.show();
            // await this.userProfileServiceService.updateUserProfile(form.value);
            await this.userProfileServiceService.updateUserProfile(this.userProfileData);
            this.getUserData();
this.toastr.success('Updated successfully.');
            this.spinner.hide();
        }

    }

    async DeleteDocument(fileName: string, docId: number) {
        this.spinner.show();
        let response = await this.userProfileServiceService.DeleteDocument(docId, fileName, 0);
        //  var response = await this.userProfileServiceService.DeleteDocument(docId,fileName,0).subscribe(data => {

        if (response != undefined && response != null) {
            this.toastr.success('Deleted  successfully.');
            this.GetDocList();
        }

        this.spinner.hide();
    }
    async GetDocList() {

        this.spinner.show();
        let listOfFileUploaded = await this.userProfileServiceService.GetDocList(this.userProfileServiceService.userId);
        //  this.userProfileServiceService.listOfFileUploaded = listOfFileUploaded;
        this.spinner.hide();
    }
    //async updateUser() {
    //    this.spinner.show();
    //    const result = this.userProfileServiceService.updateUserProfile()
    //}

}
