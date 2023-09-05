import { AuthenticationGuard } from './authentication.guard';

describe('JwtGuardGuard', () => {
  it('should be defined', () => {
    expect(new AuthenticationGuard()).toBeDefined();
  });
});
