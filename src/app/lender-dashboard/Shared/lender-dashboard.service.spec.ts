import { TestBed, inject } from '@angular/core/testing';

import { LenderDashboardService } from './lender-dashboard.service';

describe('LenderDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LenderDashboardService]
    });
  });

  it('should be created', inject([LenderDashboardService], (service: LenderDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
