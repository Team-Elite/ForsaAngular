import { TestBed, inject } from '@angular/core/testing';

import { KontactDashboardServiceService } from './kontact-dashboard-service.service';

describe('KontactDashboardServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KontactDashboardServiceService]
    });
  });

  it('should be created', inject([KontactDashboardServiceService], (service: KontactDashboardServiceService) => {
    expect(service).toBeTruthy();
  }));
});
