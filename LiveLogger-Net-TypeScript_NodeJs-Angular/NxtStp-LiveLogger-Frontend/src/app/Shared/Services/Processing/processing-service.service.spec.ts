import { TestBed } from '@angular/core/testing';

import { ProcessingServiceService } from './processing-service.service';

describe('ProcessingServiceService', () => {
  let service: ProcessingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
