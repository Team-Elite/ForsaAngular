import { Component, OnInit } from '@angular/core';
import { AuthenticateServiceService } from '../Shared/authenticate-service.service';
import {UserProfileServiceService} from './Shared/user-profile-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

    constructor(public authenticateServiceService: AuthenticateServiceService, public userProfileServiceService:UserProfileServiceService
      , public spinner: NgxSpinnerService
        , public toastr: ToastrService) { }
userProfileData: any;

ngOnInit() {
this.userProfileData= this.authenticateServiceService.GetUserData();
this.GetDocList();
  }

  
  fileuploaderFileChange(files: FileList){
    debugger;
    this.spinner.show();
    const fileSelected: File = files[0];
    this.userProfileServiceService.uploadFile(fileSelected)
    .subscribe( (response) => {
      debugger;
      this.spinner.hide();
      this.userProfileServiceService.listOfFileUploaded[this.userProfileServiceService.listOfFileUploaded.length]={name:fileSelected.name, docId:parseInt(response.text())};
       console.log('set any success actions...');
       this.toastr.success('Uploaded successfully.');
       return response;
     }
    //  .(error) => {
    //     console.log('set any error actions...');
    //   }
      );
  }

  async DeleteDocument(fileName:string, docId:number){
    debugger;
    this.spinner.show();
    let response = await this.userProfileServiceService.DeleteDocument(docId,fileName,0);
  //  var response = await this.userProfileServiceService.DeleteDocument(docId,fileName,0).subscribe(data => {
    
if(response!=undefined && response != null){
  this.toastr.success('Deleted  successfully.');
  this.GetDocList();
}
   
   this.spinner.hide();
   debugger;
  }
  async GetDocList() {
       
    this.spinner.show();
    let listOfFileUploaded = await this.userProfileServiceService.GetDocList(this.userProfileServiceService.userId);
    //  this.userProfileServiceService.listOfFileUploaded = listOfFileUploaded;
     this.spinner.hide();
}

}
