import { TestBed } from '@angular/core/testing';

import { AccusationService } from './accusation.service';

describe('AccusationService', () => {
  let service: AccusationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccusationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
