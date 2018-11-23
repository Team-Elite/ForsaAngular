import { TestBed, inject } from '@angular/core/testing';
import { AuthenticateServiceService } from './authenticate-service.service';
describe('AuthenticateServiceService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [AuthenticateServiceService]
        });
    });
    it('should be created', inject([AuthenticateServiceService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=authenticate-service.service.spec.js.map