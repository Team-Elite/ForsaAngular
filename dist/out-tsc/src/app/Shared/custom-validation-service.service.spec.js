import { TestBed, inject } from '@angular/core/testing';
import { CustomValidationServiceService } from './custom-validation-service.service';
describe('CustomValidationServiceService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [CustomValidationServiceService]
        });
    });
    it('should be created', inject([CustomValidationServiceService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=custom-validation-service.service.spec.js.map