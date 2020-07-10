import { TestBed } from '@angular/core/testing';

import { AgricultureservieService } from './agricultureservie.service';

describe('AgricultureservieService', () => {
  let service: AgricultureservieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgricultureservieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
