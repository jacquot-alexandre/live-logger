import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationViewComponent } from './navigation-view.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('NavigationViewComponent', () => {
  let component: NavigationViewComponent;
  let fixture: ComponentFixture<NavigationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationViewComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
