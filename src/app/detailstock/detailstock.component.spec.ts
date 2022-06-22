import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailstockComponent } from './detailstock.component';

describe('DetailstockComponent', () => {
  let component: DetailstockComponent;
  let fixture: ComponentFixture<DetailstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
