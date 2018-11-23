import { async, TestBed } from '@angular/core/testing';
import { ForsaLanguagesComponent } from './forsa-languages.component';
describe('ForsaLanguagesComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ForsaLanguagesComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ForsaLanguagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=forsa-languages.component.spec.js.map