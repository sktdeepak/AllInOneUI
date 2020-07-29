import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserPriceDetailComponent } from './add-user-price-detail.component';

describe('AddUserPriceDetailComponent', () => {
  let component: AddUserPriceDetailComponent;
  let fixture: ComponentFixture<AddUserPriceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserPriceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserPriceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
