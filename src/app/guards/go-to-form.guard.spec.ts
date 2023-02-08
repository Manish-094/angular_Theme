import { TestBed } from '@angular/core/testing';

import { GoToFormGuard } from './go-to-form.guard';

describe('GoToFormGuard', () => {
  let guard: GoToFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GoToFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
