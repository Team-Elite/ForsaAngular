import { ForsaLanguageComponent } from "./forsalanguage.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";


describe('forsalanguageLanguageComponent', () => {
    let component: ForsaLanguageComponent;
    let fixture: ComponentFixture<ForsaLanguageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ForsaLanguageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForsaLanguageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
