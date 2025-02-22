import { TestBed } from '@angular/core/testing';

import { AerienService } from './aerien.service';

describe('AerienService', () => {
  let service: AerienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AerienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
