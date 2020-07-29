import { TestBed } from '@angular/core/testing';

import { ProductBuySellService } from './product-buy-sell.service';

describe('ProductBuySellService', () => {
  let service: ProductBuySellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductBuySellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
