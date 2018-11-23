import { TestBed, inject } from '@angular/core/testing';
import { RegistrationService } from './registration.service';
describe('RegistrationService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [RegistrationService]
        });
    });
    it('should be created', inject([RegistrationService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=registration.service.spec.js.map