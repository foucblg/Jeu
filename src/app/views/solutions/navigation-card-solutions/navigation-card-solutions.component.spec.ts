import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationCardSolutionsComponent } from './navigation-card-solutions.component';

describe('NavigationCardSolutionsComponent', () => {
  let component: NavigationCardSolutionsComponent;
  let fixture: ComponentFixture<NavigationCardSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationCardSolutionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationCardSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
