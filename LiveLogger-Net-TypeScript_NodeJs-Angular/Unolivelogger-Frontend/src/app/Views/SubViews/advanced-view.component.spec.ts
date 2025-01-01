import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvancedViewComponent } from './advanced-view.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AdvancedViewComponent', () => {
  let component: AdvancedViewComponent;
  let fixture: ComponentFixture<AdvancedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedViewComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
