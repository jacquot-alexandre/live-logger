import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionsViewComponent } from './actions-view.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ActionsViewComponent', () => {
  let component: ActionsViewComponent;
  let fixture: ComponentFixture<ActionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsViewComponent, HttpClientTestingModule, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
