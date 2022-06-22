import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisserapportComponent } from './caisserapport.component';

describe('CaisserapportComponent', () => {
  let component: CaisserapportComponent;
  let fixture: ComponentFixture<CaisserapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaisserapportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaisserapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
