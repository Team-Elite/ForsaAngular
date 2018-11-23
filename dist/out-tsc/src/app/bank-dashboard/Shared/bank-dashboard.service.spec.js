import { TestBed, inject } from '@angular/core/testing';
import { BankDashboardService } from './bank-dashboard.service';
describe('BankDashboardService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [BankDashboardService]
        });
    });
    it('should be created', inject([BankDashboardService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=bank-dashboard.service.spec.js.map