import { TestBed } from '@angular/core/testing';

import { CurrentTaskService } from './current-task.service';

describe('CurrentTaskService', () => {
  let service: CurrentTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
