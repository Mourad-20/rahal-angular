import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlerapportComponent } from './articlerapport.component';

describe('ArticlerapportComponent', () => {
  let component: ArticlerapportComponent;
  let fixture: ComponentFixture<ArticlerapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlerapportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlerapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
