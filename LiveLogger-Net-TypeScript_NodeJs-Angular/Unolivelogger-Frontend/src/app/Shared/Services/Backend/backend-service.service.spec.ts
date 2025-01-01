import { TestBed } from '@angular/core/testing';
import { BackendServiceService } from './backend-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BackendServiceService', () => {
  let service: BackendServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BackendServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
