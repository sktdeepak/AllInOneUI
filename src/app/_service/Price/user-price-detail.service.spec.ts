import { TestBed } from '@angular/core/testing';

import { UserPriceDetailService } from './user-price-detail.service';

describe('UserPriceDetailService', () => {
  let service: UserPriceDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPriceDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
