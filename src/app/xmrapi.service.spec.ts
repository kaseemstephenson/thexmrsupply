import { TestBed } from '@angular/core/testing';

import { XmrapiService } from './xmrapi.service';

describe('XmrapiService', () => {
  let service: XmrapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmrapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
