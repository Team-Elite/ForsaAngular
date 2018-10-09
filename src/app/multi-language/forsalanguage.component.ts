import { OnInit, Component, Directive, ViewContainerRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
@Component({
        selector: '[app-language]',
    templateUrl: './forsalanguage.component.html'
   
})
export class ForsaLanguageComponent implements OnInit {

    ngOnInit(): void {
       
    }
    constructor(public viewContainerRef: ViewContainerRef,public translate: TranslateService) {
        translate.addLangs(['en', 'gr']);
        translate.setDefaultLang('gr');
        translate.use(localStorage.getItem("language"));
    }
    changeLang(lang) {
        this.translate.use(lang);
        localStorage.setItem("language", lang);
    }
}