import { TestBed } from '@angular/core/testing';

import { ConsommablesService } from './consommables.service';

describe('ConsommablesService', () => {
  let service: ConsommablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsommablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
