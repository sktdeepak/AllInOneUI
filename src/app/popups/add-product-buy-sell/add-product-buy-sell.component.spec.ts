import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductBuySellComponent } from './add-product-buy-sell.component';

describe('AddProductBuySellComponent', () => {
  let component: AddProductBuySellComponent;
  let fixture: ComponentFixture<AddProductBuySellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductBuySellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductBuySellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
