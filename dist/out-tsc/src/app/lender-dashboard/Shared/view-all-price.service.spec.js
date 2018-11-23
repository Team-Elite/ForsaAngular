import { TestBed, inject } from '@angular/core/testing';
import { ViewAllPriceService } from './view-all-price.service';
describe('ViewAllPriceService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [ViewAllPriceService]
        });
    });
    it('should be created', inject([ViewAllPriceService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=view-all-price.service.spec.js.map