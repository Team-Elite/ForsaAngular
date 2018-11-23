import { async, TestBed } from '@angular/core/testing';
import { KontactDashboardLComponent } from './kontact-dashboard-l.component';
describe('KontactDashboardLComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [KontactDashboardLComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(KontactDashboardLComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=kontact-dashboard-l.component.spec.js.map