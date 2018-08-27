import { TestBed, inject } from '@angular/core/testing';

import { CustomValidationServiceService } from './custom-validation-service.service';

describe('CustomValidationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomValidationServiceService]
    });
  });

  it('should be created', inject([CustomValidationServiceService], (service: CustomValidationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
