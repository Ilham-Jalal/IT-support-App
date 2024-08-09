import { TestBed } from '@angular/core/testing';

import { DecodejwtServiceService } from './decodejwt-service.service';

describe('DecodejwtServiceService', () => {
  let service: DecodejwtServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecodejwtServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
