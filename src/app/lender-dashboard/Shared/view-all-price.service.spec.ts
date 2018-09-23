import { TestBed, inject } from '@angular/core/testing';

import { ViewAllPriceService } from './view-all-price.service';

describe('ViewAllPriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewAllPriceService]
    });
  });

  it('should be created', inject([ViewAllPriceService], (service: ViewAllPriceService) => {
    expect(service).toBeTruthy();
  }));
});
