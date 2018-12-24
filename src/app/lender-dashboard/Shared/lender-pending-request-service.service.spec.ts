import { TestBed, inject } from '@angular/core/testing';

import { LenderPendingRequestServiceService } from './lender-pending-request-service.service';

describe('LenderPendingRequestServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LenderPendingRequestServiceService]
    });
  });

  it('should be created', inject([LenderPendingRequestServiceService], (service: LenderPendingRequestServiceService) => {
    expect(service).toBeTruthy();
  }));
});
