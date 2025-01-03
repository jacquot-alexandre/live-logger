import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleViewComponent } from './simple-view.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SimpleViewComponent', () => {
  let component: SimpleViewComponent;
  let fixture: ComponentFixture<SimpleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleViewComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
