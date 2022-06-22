import { ComponentFixture, TestBed } from '@angular/core/testing';

import { listedevisComponent } from './devis.component';

describe('listeallimentationsComponent', () => {
  let component: listedevisComponent;
  let fixture: ComponentFixture<listedevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ listedevisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(listedevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
