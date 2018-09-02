import { TestBed, inject } from '@angular/core/testing';

import { AuthenticateServiceService } from './authenticate-service.service';

describe('AuthenticateServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticateServiceService]
    });
  });

  it('should be created', inject([AuthenticateServiceService], (service: AuthenticateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
