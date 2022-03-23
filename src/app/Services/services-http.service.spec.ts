import { TestBed } from '@angular/core/testing';

import { ServicesHttpService } from './services-http.service';

describe('ServicesHttpService', () => {
  let service: ServicesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
