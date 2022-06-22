import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeancerapportComponent } from './seancerapport.component';

describe('SeancerapportComponent', () => {
  let component: SeancerapportComponent;
  let fixture: ComponentFixture<SeancerapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeancerapportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeancerapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
