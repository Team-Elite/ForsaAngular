import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-forsa-languages',
  templateUrl: './forsa-languages.component.html',
  styleUrls: ['./forsa-languages.component.css']
})
export class ForsaLanguagesComponent implements OnInit {

    constructor(public viewContainerRef: ViewContainerRef, public translate: TranslateService) {
     
        translate.addLangs(['en', 'gr']);
        translate.setDefaultLang('gr');
        translate.use(localStorage.getItem("language"));
    }
    changeLang(lang) {
        
        this.translate.use(lang);
        localStorage.setItem("language", lang);
    }

  ngOnInit() {
  }

}
