import { TestBed } from '@angular/core/testing';

import { PanneauxService } from './panneaux.service';

describe('PanneauxService', () => {
  let service: PanneauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanneauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
