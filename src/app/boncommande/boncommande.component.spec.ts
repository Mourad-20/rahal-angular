import { ComponentFixture, TestBed } from '@angular/core/testing';

import {BonCommandeComponent } from './boncommande.component';

describe('BonCommandeComponent', () => {
  let component: BonCommandeComponent;
  let fixture: ComponentFixture<BonCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
