import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPageComponent } from './food-page.component';
import { ActivatedRoute, provideRouter, RouterModule } from '@angular/router';

describe('FoodPageComponent', () => {
  let component: FoodPageComponent;
  let fixture: ComponentFixture<FoodPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FoodPageComponent,
        // RouterModule.forRoot([]) 'This is for 
      ],
      providers: [
        provideRouter([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
