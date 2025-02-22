import { TestBed } from '@angular/core/testing';

import { ArboricultureService } from './arboriculture.service';

describe('ArboricultureService', () => {
  let service: ArboricultureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArboricultureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
