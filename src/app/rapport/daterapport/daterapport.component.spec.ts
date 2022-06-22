import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaterapportComponent } from './daterapport.component';

describe('DaterapportComponent', () => {
  let component: DaterapportComponent;
  let fixture: ComponentFixture<DaterapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaterapportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaterapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
