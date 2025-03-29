import { TestBed } from '@angular/core/testing';

import { EsgServiceService } from './esg-service.service';

describe('EsgServiceService', () => {
  let service: EsgServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsgServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
