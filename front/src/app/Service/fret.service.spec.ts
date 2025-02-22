import { TestBed } from '@angular/core/testing';

import { FretService } from './fret.service';

describe('FretService', () => {
  let service: FretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
