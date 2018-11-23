import { TestBed, inject } from '@angular/core/testing';
import { LenderDashboardService } from './lender-dashboard.service';
describe('LenderDashboardService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [LenderDashboardService]
        });
    });
    it('should be created', inject([LenderDashboardService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=lender-dashboard.service.spec.js.map