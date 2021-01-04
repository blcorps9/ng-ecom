import { TestBed } from '@angular/core/testing';

import { ReduxConnectService } from './redux-connect.service';

describe('ReduxConnectService', () => {
  let service: ReduxConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReduxConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
