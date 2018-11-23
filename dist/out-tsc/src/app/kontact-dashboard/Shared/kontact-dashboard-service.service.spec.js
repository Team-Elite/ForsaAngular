import { TestBed, inject } from '@angular/core/testing';
import { KontactDashboardServiceService } from './kontact-dashboard-service.service';
describe('KontactDashboardServiceService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [KontactDashboardServiceService]
        });
    });
    it('should be created', inject([KontactDashboardServiceService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=kontact-dashboard-service.service.spec.js.map