import { DebugService } from './debug.service';

describe('DebugService', () => {
  let debugService: DebugService;
  beforeEach(() => {
    debugService = new DebugService();
  });
  describe('getUsersCondition', () => {
    it('should no user', () => {
      expect(debugService.getUsersNullable(undefined, undefined)).toBe(
        'no user',
      );
    });
    it('should no user', () => {
      expect(debugService.getUsersNullable(null, null)).toBe('no user');
    });

    it('should no user', () => {
      expect(debugService.getUsersNullable()).toBe('no user');
    });

    it('should no user', () => {
      expect(debugService.getUsersNullable([], [])).toBe('no user');
    });

    it('should no user', () => {
      expect(debugService.getUsersOnlyArrayAccept([], [])).toBe('no user');
    });

    //fail because number is not assignable.
    // it('should no user', () => {
    //   //fail because number is not assignable
    //   expect(debugService.getUsersOnlyArrayAccept(0, 0)).toBe('no user');
    // });

    //fail because number is not assignable.
    // it('should no user', () => {
    //   expect(debugService.getUsersNullable(0, 0)).toBe('no user');
    // });
  });
});
