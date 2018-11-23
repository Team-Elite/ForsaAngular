import { TestBed, inject } from '@angular/core/testing';
import { BestPriceViewService } from './best-price-view.service';
describe('BestPriceViewService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [BestPriceViewService]
        });
    });
    it('should be created', inject([BestPriceViewService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=best-price-view.service.spec.js.map