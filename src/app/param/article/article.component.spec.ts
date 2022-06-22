import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleparamComponent } from './article.component';

describe('ArticleparamComponent', () => {
  let component: ArticleparamComponent;
  let fixture: ComponentFixture<ArticleparamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleparamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleparamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
