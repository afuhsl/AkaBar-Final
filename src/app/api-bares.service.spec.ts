import { TestBed } from '@angular/core/testing';

import { ApiBaresService } from './api-bares.service';

describe('ApiBaresService', () => {
  let service: ApiBaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
