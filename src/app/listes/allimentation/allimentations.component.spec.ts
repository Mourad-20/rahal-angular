import { ComponentFixture, TestBed } from '@angular/core/testing';

import { listeallimentationsComponent } from './allimentations.component';

describe('listeallimentationsComponent', () => {
  let component: listeallimentationsComponent;
  let fixture: ComponentFixture<listeallimentationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ listeallimentationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(listeallimentationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
