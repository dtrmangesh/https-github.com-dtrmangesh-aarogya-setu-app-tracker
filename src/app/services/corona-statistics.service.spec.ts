import { TestBed } from '@angular/core/testing';
import { CoronaStatisticsService } from './corona-statistics.service';


describe('CoronaStatisticsService', () => {
  let service: CoronaStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronaStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});