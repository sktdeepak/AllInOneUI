import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageCalculateComponent } from './average-calculate.component';

describe('AverageCalculateComponent', () => {
  let component: AverageCalculateComponent;
  let fixture: ComponentFixture<AverageCalculateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageCalculateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
