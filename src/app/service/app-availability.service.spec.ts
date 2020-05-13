import { TestBed } from '@angular/core/testing';

import { AppAvailabilityService } from './app-availability.service';

describe('AppAvailabilityService', () => {
  let service: AppAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
