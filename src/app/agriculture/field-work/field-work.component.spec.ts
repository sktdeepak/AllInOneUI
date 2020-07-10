import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldWorkComponent } from './field-work.component';

describe('FieldWorkComponent', () => {
  let component: FieldWorkComponent;
  let fixture: ComponentFixture<FieldWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
