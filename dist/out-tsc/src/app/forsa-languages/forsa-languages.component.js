var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
var ForsaLanguagesComponent = /** @class */ (function () {
    function ForsaLanguagesComponent(viewContainerRef, translate) {
        this.viewContainerRef = viewContainerRef;
        this.translate = translate;
        translate.addLangs(['en', 'gr']);
        translate.setDefaultLang('gr');
        translate.use(localStorage.getItem("language"));
    }
    ForsaLanguagesComponent.prototype.changeLang = function (lang) {
        this.translate.use(lang);
        localStorage.setItem("language", lang);
    };
    ForsaLanguagesComponent.prototype.ngOnInit = function () {
    };
    ForsaLanguagesComponent = __decorate([
        Component({
            selector: 'app-forsa-languages',
            templateUrl: './forsa-languages.component.html',
            styleUrls: ['./forsa-languages.component.css']
        }),
        __metadata("design:paramtypes", [ViewContainerRef, TranslateService])
    ], ForsaLanguagesComponent);
    return ForsaLanguagesComponent;
}());
export { ForsaLanguagesComponent };
//# sourceMappingURL=forsa-languages.component.js.map