import { TestBed } from '@angular/core/testing';

import { MakeHeadersService } from './make-headers.service';

describe('MakeHeadersService', () => {
  let service: MakeHeadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeHeadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
