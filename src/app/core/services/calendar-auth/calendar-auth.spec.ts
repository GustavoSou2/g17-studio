import { TestBed } from '@angular/core/testing';

import { CalendarAuth } from './calendar-auth';

describe('CalendarAuth', () => {
  let service: CalendarAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
