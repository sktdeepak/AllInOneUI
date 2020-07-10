import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFieldWorkComponent } from './add-field-work.component';

describe('AddFieldWorkComponent', () => {
  let component: AddFieldWorkComponent;
  let fixture: ComponentFixture<AddFieldWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFieldWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFieldWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
