import { ComponentFixture, TestBed } from '@angular/core/testing';

import { listeCommandesComponent } from './commandes.component';

describe('listeCommandesComponent', () => {
  let component: listeCommandesComponent;
  let fixture: ComponentFixture<listeCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ listeCommandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(listeCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
