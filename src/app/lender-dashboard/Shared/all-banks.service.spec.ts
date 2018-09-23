import { TestBed, inject } from '@angular/core/testing';

import { AllBanksService } from './all-banks.service';

describe('AllBanksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllBanksService]
    });
  });

  it('should be created', inject([AllBanksService], (service: AllBanksService) => {
    expect(service).toBeTruthy();
  }));
});
