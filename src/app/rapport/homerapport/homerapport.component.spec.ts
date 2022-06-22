import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomerapportComponent } from './homerapport.component';

describe('HomerapportComponent', () => {
  let component: HomerapportComponent;
  let fixture: ComponentFixture<HomerapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomerapportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomerapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
