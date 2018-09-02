import { TestBed, inject } from '@angular/core/testing';

import { BankDashboardService } from './bank-dashboard.service';

describe('BankDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankDashboardService]
    });
  });

  it('should be created', inject([BankDashboardService], (service: BankDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
