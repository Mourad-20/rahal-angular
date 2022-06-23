import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportlotComponent } from './rapportlot.component';

describe('RapportlotComponent', () => {
  let component: RapportlotComponent;
  let fixture: ComponentFixture<RapportlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
