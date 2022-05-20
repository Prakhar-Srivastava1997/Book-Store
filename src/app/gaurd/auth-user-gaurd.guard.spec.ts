import { TestBed } from '@angular/core/testing';

import { AuthUserGaurdGuard } from './auth-user-gaurd.guard';

describe('AuthUserGaurdGuard', () => {
  let guard: AuthUserGaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthUserGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
