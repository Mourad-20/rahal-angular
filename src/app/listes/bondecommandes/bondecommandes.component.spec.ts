import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondecommandesComponent } from './bondecommandes.component';

describe('BondecommandesComponent', () => {
  let component: BondecommandesComponent;
  let fixture: ComponentFixture<BondecommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondecommandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondecommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
