import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPriceDetailComponent } from './user-price-detail.component';

describe('UserPriceDetailComponent', () => {
  let component: UserPriceDetailComponent;
  let fixture: ComponentFixture<UserPriceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPriceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPriceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
