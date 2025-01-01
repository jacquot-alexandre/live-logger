import { TestBed } from '@angular/core/testing';
import { FrontServiceService } from './front-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FrontServiceService', () => {
  let service: FrontServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FrontServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
