import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtransfertComponent } from './dtransfert.component';

describe('DtransfertComponent', () => {
  let component: DtransfertComponent;
  let fixture: ComponentFixture<DtransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DtransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
