import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BctransfertComponent } from './bctransfert.component';

describe('BctransfertComponent', () => {
  let component: BctransfertComponent;
  let fixture: ComponentFixture<BctransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BctransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BctransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
