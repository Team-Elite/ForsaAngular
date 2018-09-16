import { TestBed, inject } from '@angular/core/testing';

import { BestPriceViewService } from './best-price-view.service';

describe('BestPriceViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BestPriceViewService]
    });
  });

  it('should be created', inject([BestPriceViewService], (service: BestPriceViewService) => {
    expect(service).toBeTruthy();
  }));
});
