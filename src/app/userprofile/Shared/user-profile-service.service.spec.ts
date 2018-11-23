import { TestBed, inject } from '@angular/core/testing';

import { UserProfileServiceService } from './user-profile-service.service';

describe('UserProfileServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProfileServiceService]
    });
  });

  it('should be created', inject([UserProfileServiceService], (service: UserProfileServiceService) => {
    expect(service).toBeTruthy();
  }));
});
