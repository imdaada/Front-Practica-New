import { TestBed } from '@angular/core/testing';

import { ServerDateService } from './server-date.service';

describe('ServerDateService', () => {
  let service: ServerDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
