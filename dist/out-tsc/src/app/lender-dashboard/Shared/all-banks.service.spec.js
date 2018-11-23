import { TestBed, inject } from '@angular/core/testing';
import { AllBanksService } from './all-banks.service';
describe('AllBanksService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [AllBanksService]
        });
    });
    it('should be created', inject([AllBanksService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=all-banks.service.spec.js.map