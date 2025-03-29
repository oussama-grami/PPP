/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EsgService } from './esg.service';

describe('Service: Esg', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsgService]
    });
  });

  it('should ...', inject([EsgService], (service: EsgService) => {
    expect(service).toBeTruthy();
  }));
});
