import { TestBed } from '@angular/core/testing';

import { MakeParamsService } from './make-params.service';

describe('MakeParamsService', () => {
  let service: MakeParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
