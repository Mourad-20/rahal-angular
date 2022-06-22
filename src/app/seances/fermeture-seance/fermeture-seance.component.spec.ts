import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermetureSeanceComponent } from './fermeture-seance.component';

describe('FermetureSeanceComponent', () => {
  let component: FermetureSeanceComponent;
  let fixture: ComponentFixture<FermetureSeanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FermetureSeanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FermetureSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
